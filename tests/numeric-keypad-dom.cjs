// Offline event-level regression test. Requires jsdom 26 or later.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM, ResourceLoader, VirtualConsole} = require('jsdom');
const root = path.resolve(__dirname, '..');
class LocalAssets extends ResourceLoader {
  fetch(url) {
    const address = new URL(url);
    const file = path.resolve(root, '.' + decodeURIComponent(address.pathname));
    if (address.origin !== 'https://maths.example' || !file.startsWith(root + path.sep) || !fs.existsSync(file))
      return null;
    return Promise.resolve(fs.readFileSync(file));
  }
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function open(entry, touch = true) {
  const virtualConsole = new VirtualConsole();
  const errors = [];
  virtualConsole.on('jsdomError', error => {
    if (error.type === 'unhandled exception') errors.push(String(error.detail || error));
  });
  const dom = new JSDOM(fs.readFileSync(path.join(root, entry.split('?')[0]),'utf8'), {
    url:'https://maths.example/' + entry, resources:new LocalAssets(), runScripts:'dangerously',
    pretendToBeVisual:true, virtualConsole,
    beforeParse(win) {
      win.requestAnimationFrame = callback => win.setTimeout(() => callback(win.performance.now()),16);
      win.cancelAnimationFrame = timer => win.clearTimeout(timer);
      win.matchMedia = () => ({matches:false, addEventListener() {}, addListener() {}});
      Object.defineProperty(win.navigator, 'maxTouchPoints', {value:touch ? 5 : 0});
      win.HTMLElement.prototype.scrollIntoView = function(options) { this.lastScrollOptions = options; };
    }
  });
  const w = dom.window, d = w.document;
  await new Promise(resolve => w.addEventListener('load',resolve,{once:true}));
  await delay(0);
  assert.deepEqual(errors, [], entry);
  assert.ok(w.MWNumericKeypad, entry + ' loaded shared input component');
  const press = (input,key) => input.dispatchEvent(new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  return {w,d,press,errors,close:() => w.close()};
}
async function tables(entry,touch) {
  const {w,d,press,errors,close} = await open(entry,touch);
  try {
    const q = id => d.getElementById(id), input = q('answer');
    assert.equal(d.activeElement,d.body);
    assert.equal(input.readOnly,true);
    assert.equal(input.inputMode,'none');
    const tap = key => q('keys').querySelector('[data-key="'+key+'"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true,detail:1}));
    press(d.body,'0');
    assert.equal(input.value,'0');
    const settings = q('round-settings');
    assert.equal(settings.open,false);
    for (const setting of ['tables','operation','length','clock','advance'])
      assert.ok(settings.contains(q(setting)),setting + ' is available under Round settings');
    assert.equal(q('question').lastScrollOptions,undefined);
    settings.open = true;
    q('clock').value = '60';
    q('start').click();
    assert.equal(settings.open,false);
    assert.equal(q('round-clock').hidden,false);
    assert.match(q('round-clock').textContent,/seconds left/);
    assert.equal(d.activeElement,input);
    assert.equal(input.readOnly,true);
    assert.equal(input.inputMode,'none');
    assert.equal(q('question').lastScrollOptions.block,'start');
    for (const key of ['1','0','Backspace','0']) press(input,key);
    assert.equal(input.value,'10');
    tap('clear'); tap('0'); tap('erase');
    assert.equal(input.value,'');
    const result = () => {
      const m=q('question').textContent.match(/(\d+)\s*([×÷])\s*(\d+)/);
      return String(m[2]==='×'?Number(m[1])*Number(m[3]):Number(m[1])/Number(m[3]));
    };
    '999'.split('').forEach(key => press(input,key));
    press(input,'Enter');
    assert.match(q('status').textContent,/Not yet/);
    const correct = result();
    for (const digit of correct) press(input,digit);
    assert.equal(input.value,correct);
    press(input,'Enter');
    assert.match(q('status').textContent,/Correct/);
    for (let i=0; i<60 && input.value; i++) await delay(50);
    assert.equal(input.value,'');
    assert.equal(input.readOnly,true);
    q('keys').querySelector('.mw-device-keyboard').click();
    assert.equal(input.readOnly,false);
    assert.equal(d.activeElement,input);
    input.value=result();
    q('check').click();
    for (let i=0; i<60 && input.value; i++) await delay(50);
    assert.equal(input.readOnly,true);
    assert.equal(input.value,'');
    assert.deepEqual(errors,[]);
  } finally { close(); }
}
async function lessons() {
  for (const [entry,selector,keys,expected] of [
    ['development/year4/block-workshop.html','#answer',['2'],'2'],
    ['development/year5/units/fractions-a.html','#answer',['1',' ','1','/','2'],'1 1/2'],
    ['development/year6/fractions/lesson.html?lesson=equivalence&phase=practice','#answer',['2','/','3'],'2/3'],
    ['puzzles/sessions/factor-tree.html','#a',['2'],'2'],
    ['puzzles/sessions/magic-money-plant.html','#guess2',['2'],'2']
  ]) {
    const {w,d,close} = await open(entry);
    try {
      const input=d.querySelector(selector);
      assert.ok(input,entry);
      input.focus();
      assert.equal(input.readOnly,true,entry);
      for (const key of keys) d.querySelector('.mw-number-pad button[data-key="'+key+'"]').click();
      assert.equal(input.value,expected,entry);
      const controls=d.createElement('div');
      controls.innerHTML='<input name="answer" inputmode="decimal"><input name="name"><input type="number" id="setting">';
      d.body.append(controls);
      await delay(0);
      const [dynamic,name,setting]=controls.querySelectorAll('input');
      dynamic.focus();
      assert.equal(dynamic.readOnly,true);
      assert.equal(name.readOnly,false);
      assert.equal(setting.readOnly,false);
      controls.dataset.mwNative='';
      await delay(0);
      assert.equal(dynamic.readOnly,false);
      assert.equal(dynamic.inputMode,'decimal');
      assert.equal(typeof w.MWNumericKeypad.reset,'function');
    } finally { close(); }
  }
}
(async () => {
  await tables('puzzles/sessions/tables.html',true);
  await tables('students/sessions/tables.html',true);
  await tables('puzzles/sessions/tables.html',false);
  await lessons();
  console.log('Offline DOM tests passed for both Times Tables routes, touch and hardware entry, automatic advance, explicit device keyboard, Years 4–6, factor responses, predictions, dynamic controls and native exceptions.');
})().catch(error => {console.error(error);process.exitCode=1;});
