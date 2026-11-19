/* Run with Playwright and its Chromium installed: node tests/numeric-keypad.cjs.
   CHROMIUM_PATH can point to an existing Chromium executable. No server or account needed. */
const assert = require('node:assert/strict');
const {resolve} = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');

const site = resolve(__dirname, '..');
const file = path => pathToFileURL(resolve(site, path)).href;
const answer = page => page.locator('#answer');
const value = page => answer(page).inputValue();
const key = (page, name) => page.locator('#keys').getByRole('button',{name,exact:true});
const currentFact = async page => {
  const match = (await page.locator('#question').innerText()).match(/(\d+)\s*([×÷])\s*(\d+)/);
  return String(match[2] === '×' ? Number(match[1])*Number(match[3]) : Number(match[1])/Number(match[3]));
};

async function tables(browser, entry, viewport, hasTouch) {
  const context = await browser.newContext({viewport, hasTouch, isMobile:hasTouch});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(file(entry));
  await key(page,'0').waitFor();
  assert.equal(await answer(page).getAttribute('readonly'), '');
  assert.equal(await answer(page).getAttribute('inputmode'), 'none');
  assert.equal(await page.evaluate(() => document.activeElement.id), '');
  await page.locator('#start').click();
  assert.equal(await page.evaluate(() => document.activeElement.id), 'answer');
  await page.keyboard.type('10'); await page.keyboard.press('Backspace'); await page.keyboard.type('0');
  assert.equal(await value(page), '10');
  await key(page, 'Clear answer').click();
  await key(page, '0').click(); await key(page, 'Delete last digit or selection').click();
  assert.equal(await value(page), '');
  const solution = await currentFact(page);
  await answer(page).focus(); await page.keyboard.type('999');
  await page.keyboard.press('Enter');
  assert.match(await page.locator('#status').innerText(), /Not yet/);
  await page.keyboard.type(solution);
  assert.equal(await value(page), solution);
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#answer').value === '');
  assert.equal(await answer(page).getAttribute('readonly'), '');
  await key(page, 'Use device keyboard').click();
  assert.equal(await answer(page).getAttribute('readonly'), null);
  await answer(page).fill(await currentFact(page));
  await answer(page).press('Enter');
  await page.waitForFunction(() => document.querySelector('#answer').value === '');
  assert.equal(await answer(page).getAttribute('readonly'), '');
  const box = await page.locator('#keys').boundingBox();
  assert.ok(box.width > 0 && box.x >= 0 && box.x + box.width <= viewport.width, 'keypad fits viewport');
  assert.deepEqual(errors, []);
  await context.close();
}

async function curriculum(browser) {
  const context = await browser.newContext({viewport:{width:820,height:1180},hasTouch:true,isMobile:true});
  const page = await context.newPage();
  await page.goto(file('development/year4/block-workshop.html'));
  await page.locator('#answer').click();
  let pad = page.getByRole('group',{name:'Answer keypad'});
  await pad.getByRole('button',{name:'3',exact:true}).click();
  assert.equal(await value(page),'3');
  await page.goto(file('development/year5/units/fractions-a.html'));
  await answer(page).click();
  pad = page.getByRole('group',{name:'Answer keypad'});
  for (const symbol of ['1','Mixed number space','1','Fraction bar','2'])
    await pad.getByRole('button',{name:symbol,exact:true}).click();
  assert.equal(await value(page),'1 1/2');
  await page.goto(file('development/year6/fractions/lesson.html')+'?lesson=equivalence');
  await page.locator('#stage-practice').click();
  await answer(page).click();
  assert.equal(await answer(page).getAttribute('readonly'), '');
  assert.equal(await page.getByRole('button',{name:'Fraction bar',exact:true}).count(),1);
  await page.goto(file('development/year4/multiplication.html'));
  assert.equal(await page.locator('#a').getAttribute('readonly'),null,'model controls keep native input');
  await page.goto(file('development/year6/fractions/index.html'));
  await page.locator('#add-profile').click();
  assert.equal(await page.locator('#profile-name').getAttribute('readonly'),null,'profile name keeps native keyboard');
  await context.close();
}

(async () => {
  const browser = await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
  try {
    await tables(browser,'puzzles/sessions/tables.html',{width:820,height:1180},true);
    await tables(browser,'students/sessions/tables.html',{width:1180,height:820},true);
    await tables(browser,'puzzles/sessions/tables.html',{width:1280,height:800},false);
    await curriculum(browser);
    console.log('Touch-emulated portrait and landscape, both Times Tables routes, desktop hardware keys and curriculum inputs passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
