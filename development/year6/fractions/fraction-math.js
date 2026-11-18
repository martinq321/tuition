/* Exact, bounded fraction arithmetic. No network, evaluation or browser dependency. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FMath = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LIMIT = 1000000000n;
  const vulgar = {'½':'1/2','⅓':'1/3','⅔':'2/3','¼':'1/4','¾':'3/4','⅕':'1/5','⅖':'2/5','⅗':'3/5','⅘':'4/5','⅙':'1/6','⅚':'5/6','⅛':'1/8','⅜':'3/8','⅝':'5/8','⅞':'7/8'};
  const abs = (n) => n < 0n ? -n : n;
  function gcdBig(a, b) {
    a = abs(a); b = abs(b);
    while (b) { const r = a % b; a = b; b = r; }
    return a;
  }
  function integer(value) {
    if (typeof value === 'bigint') return value;
    if (typeof value !== 'number' || !Number.isSafeInteger(value)) throw new RangeError('Use safe whole numbers.');
    return BigInt(value);
  }
  function normBig(n, d) {
    if (d === 0n) throw new RangeError('A denominator cannot be zero.');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcdBig(n, d); n /= g; d /= g;
    if (abs(n) > LIMIT || d > LIMIT) throw new RangeError('This value is outside the activity range.');
    return {n:Number(n), d:Number(d)};
  }
  function norm(n, d) { return normBig(integer(n), integer(d === undefined ? 1 : d)); }
  function gcd(a, b) {
    const g = gcdBig(integer(a), integer(b));
    if (g > BigInt(Number.MAX_SAFE_INTEGER)) throw new RangeError('Greatest common factor is too large.');
    return Number(g);
  }
  function lcm(a, b) {
    a = integer(a); b = integer(b);
    if (a === 0n || b === 0n) return 0;
    const result = abs((a / gcdBig(a, b)) * b);
    if (result > BigInt(Number.MAX_SAFE_INTEGER)) throw new RangeError('Common multiple is too large.');
    return Number(result);
  }
  function inputText(input) {
    if (typeof input !== 'string' && typeof input !== 'number') return null;
    if (typeof input === 'number' && !Number.isFinite(input)) return null;
    let s = String(input).trim();
    if (!s || s.length > 80) return null;
    s = s.replace(/−/g, '-').replace(/⁄/g, '/');
    s = s.replace(/([0-9])([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])/g, '$1 $2');
    s = s.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, c => vulgar[c]);
    return s.replace(/\s+/g, ' ');
  }
  function parsed(input) {
    try {
      if (input && typeof input === 'object' && !Array.isArray(input)) {
        if (!Object.prototype.hasOwnProperty.call(input, 'n') || !Object.prototype.hasOwnProperty.call(input, 'd')) return null;
        const n = integer(input.n), d = integer(input.d);
        if (abs(n) > LIMIT || abs(d) > LIMIT) return null;
        return {value:normBig(n,d), form:'object', rawN:n, rawD:d};
      }
      const s = inputText(input);
      if (!s) return null;
      let m = s.match(/^([+-]?)(\d{1,10}) +(\d{1,10})\s*\/\s*(\d{1,10})$/);
      if (m) {
        const whole = BigInt(m[2]), n = BigInt(m[3]), d = BigInt(m[4]);
        if (whole > LIMIT || n > LIMIT || d > LIMIT || d === 0n || n >= d) return null;
        return {value:normBig((m[1] === '-' ? -1n : 1n) * (whole*d+n),d),form:'mixed',rawN:n,rawD:d};
      }
      m = s.match(/^([+-]?\d{1,10})\s*\/\s*([+-]?\d{1,10})$/);
      if (m) {
        const n = BigInt(m[1]), d = BigInt(m[2]);
        if (abs(n) > LIMIT || abs(d) > LIMIT || d === 0n) return null;
        return {value:normBig(n,d),form:'fraction',rawN:n,rawD:d};
      }
      m = s.match(/^([+-]?)(\d{1,10})(?:\.(\d{0,9}))?$/) || s.match(/^([+-]?)()\.(\d{1,9})$/);
      if (!m) return null;
      const decimal = m[3] !== undefined;
      const places = m[3] || '';
      const d = 10n ** BigInt(places.length);
      const n = BigInt((m[2] || '0') + places) * (m[1] === '-' ? -1n : 1n);
      return {value:normBig(n,d),form:decimal ? 'decimal' : 'integer',rawN:n,rawD:d};
    } catch (_) { return null; }
  }
  function parse(input) { const p = parsed(input); return p ? p.value : null; }
  function need(value) {
    const result = parse(value);
    if (!result) throw new TypeError('Enter a valid fraction or number.');
    return result;
  }
  function add(a,b) { a=need(a); b=need(b); return normBig(BigInt(a.n)*BigInt(b.d)+BigInt(b.n)*BigInt(a.d),BigInt(a.d)*BigInt(b.d)); }
  function sub(a,b) { a=need(a); b=need(b); return normBig(BigInt(a.n)*BigInt(b.d)-BigInt(b.n)*BigInt(a.d),BigInt(a.d)*BigInt(b.d)); }
  function mul(a,b) { a=need(a); b=need(b); return normBig(BigInt(a.n)*BigInt(b.n),BigInt(a.d)*BigInt(b.d)); }
  function div(a,b) { a=need(a); b=need(b); if (b.n===0) throw new RangeError('Cannot divide by zero.'); return normBig(BigInt(a.n)*BigInt(b.d),BigInt(a.d)*BigInt(b.n)); }
  function compare(a,b) {
    a=need(a); b=need(b);
    const difference=BigInt(a.n)*BigInt(b.d)-BigInt(b.n)*BigInt(a.d);
    return difference<0n ? -1 : difference>0n ? 1 : 0;
  }
  function equal(a,b) { const x=parse(a), y=parse(b); return !!x && !!y && x.n===y.n && x.d===y.d; }
  function format(value, options) {
    const a=need(value);
    if (a.d===1) return String(a.n);
    if (options && options.mixed && Math.abs(a.n)>a.d) {
      const n=Math.abs(a.n), whole=Math.floor(n/a.d), remainder=n%a.d;
      return (a.n<0?'-':'')+whole+' '+remainder+'/'+a.d;
    }
    return a.n+'/'+a.d;
  }
  function result(correct, valid, message, extra) { return Object.assign({correct,valid,message},extra || {}); }
  function check(spec, response) {
    if (!spec || !['fraction','number','choice','order'].includes(spec.kind)) return result(false,false,'This question needs an answer-checking specification.');
    if (spec.kind === 'choice') {
      if (typeof spec.value !== 'string' && typeof spec.value !== 'number') return result(false,false,'This question needs an answer-checking specification.');
      if (typeof response !== 'string' && typeof response !== 'number') return result(false,false,'Choose an answer first.');
      const v=String(response).trim();
      if (!v) return result(false,false,'Choose an answer first.');
      return v===String(spec.value).trim() ? result(true,true,'Yes. Your choice is correct.') : result(false,true,'Not yet. Try the model or ask for a hint.');
    }
    if (spec.kind === 'order') {
      if (!Array.isArray(spec.value) || !spec.value.length || !spec.value.every(v=>parse(v))) return result(false,false,'This ordering question needs checking.');
      if (!Array.isArray(response) || response.length!==spec.value.length) return result(false,false,'Use every card once.');
      const actual=response.map(parse), expected=spec.value.map(parse);
      if (actual.some(v=>!v)) return result(false,false,'Each card must contain a valid fraction.');
      const keys=xs=>xs.map(x=>x.n+'/'+x.d).sort();
      if (JSON.stringify(keys(actual))!==JSON.stringify(keys(expected))) return result(false,false,'Use each of the original cards once; do not repeat or replace a card.');
      const correct=actual.every((v,i)=>equal(v,expected[i]));
      return correct ? result(true,true,'Yes. Every card is in the correct order.') : result(false,true,'Not yet. Compare neighbouring cards using the same whole or a common denominator.');
    }
    const expected=parse(spec.value);
    if (!expected) return result(false,false,'This question needs an answer check.');
    const actual=parsed(response);
    if (!actual) return result(false,false,'Enter a number, a fraction such as 3/4, or a mixed number such as 1 1/2. The denominator cannot be zero.');
    if (!equal(actual.value,expected)) return result(false,true,'Not yet. Check the size of the whole and the equal parts.');
    if (spec.format) {
      const whole=actual.value.d===1;
      const formats={
        decimal:actual.form==='decimal'||actual.form==='integer',
        fraction:actual.form==='fraction'||(whole&&actual.form==='integer'),
        mixed:actual.form==='mixed'||(whole&&actual.form==='integer')||(Math.abs(actual.value.n)<actual.value.d&&actual.form==='fraction'),
        improper:actual.form==='fraction'&&abs(actual.rawN)>=abs(actual.rawD)
      };
      if (!Object.prototype.hasOwnProperty.call(formats,spec.format)) return result(false,false,'This question needs an answer-format check.');
      if (!formats[spec.format]) {
        const names={decimal:'a decimal',fraction:'a fraction',mixed:'a mixed number',improper:'an improper fraction'};
        return result(false,true,'That is the same amount. Write it as '+names[spec.format]+'.',{equivalent:true});
      }
    }
    if (spec.simplest) {
      if (actual.form==='decimal' && actual.value.d!==1) return result(false,true,'That is the same amount. Write it as a fraction in simplest form.',{equivalent:true});
      if (gcdBig(actual.rawN,actual.rawD)!==1n) return result(false,true,'That is an equivalent amount. Divide the numerator and denominator by a common factor to simplify it.',{equivalent:true});
    }
    return result(true,true,'Yes. Your answer represents the correct amount.');
  }
  return Object.freeze({gcd,lcm,parse,norm,add,sub,mul,div,compare,equal,format,check,limit:Number(LIMIT)});
}));
