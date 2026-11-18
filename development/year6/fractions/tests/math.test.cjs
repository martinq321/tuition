'use strict';
const assert=require('node:assert/strict');
const M=require('../fraction-math.js');
let checks=0;
function same(actual,expected){assert.deepEqual(actual,expected);checks++;}
function yes(value){assert.equal(value,true);checks++;}
function no(value){assert.equal(value,false);checks++;}
same(M.parse('3/4'),{n:3,d:4});
same(M.parse('6 / 8'),{n:3,d:4});
same(M.parse('1 2/3'),{n:5,d:3});
same(M.parse('-1 2/3'),{n:-5,d:3});
same(M.parse('-0 1/2'),{n:-1,d:2});
same(M.parse('−1½'),{n:-3,d:2});
same(M.parse('⅝'),{n:5,d:8});
same(M.parse('.125'),{n:1,d:8});
same(M.parse('0.375'),{n:3,d:8});
same(M.parse('1.2500'),{n:5,d:4});
same(M.parse('2.'),{n:2,d:1});
same(M.parse('1/-2'),{n:-1,d:2});
same(M.parse('-2/-4'),{n:1,d:2});
same(M.parse('0/8'),{n:0,d:1});
same(M.parse({n:8,d:-12}),{n:-2,d:3});
for(const s of ['', ' ','.','1/0','0/0','1/2/3','1.2.3','1e3','NaN','Infinity','1 + 2','1 3/2','1 -1/2','/2','2/','1,000','3/4 cups','0.1234567891','1000000001',false,null,{},[1,2],{n:1.5,d:2}])same(M.parse(s),null);
same(M.gcd(84,30),6);same(M.gcd(-18,12),6);same(M.gcd(0,0),0);same(M.lcm(8,12),24);same(M.lcm(-6,4),12);same(M.lcm(0,6),0);
same(M.add('5/6','3/4'),{n:19,d:12});
same(M.sub('2 1/4','1 5/6'),{n:5,d:12});
same(M.mul('3/5','5/8'),{n:3,d:8});
same(M.div('3/4','3'),{n:1,d:4});
same(M.add('0.1','0.2'),{n:3,d:10});
same(M.sub('1/5','3/5'),{n:-2,d:5});
same(M.div('-2/3','-4/5'),{n:5,d:6});
same(M.format('14/6',{mixed:true}),'2 1/3');
same(M.format('-14/6',{mixed:true}),'-2 1/3');
same(M.format('12/6',{mixed:true}),'2');
same(M.format('7/8',{mixed:true}),'7/8');
same(M.compare('8/9','7/8'),1);same(M.compare('3/4','.75'),0);same(M.compare('-1/2','0'),-1);
same(M.compare('999999999/1000000000','999999998/999999999'),1);
same(M.mul('1000000000/999999937','999999937/1000000000'),{n:1,d:1});
yes(M.equal('0.125','2/16'));no(M.equal('bad','bad'));
no(M.equal('0.333333333','1/3'));
for(const op of [()=>M.div('1/2','0'),()=>M.norm(1,0),()=>M.norm(NaN,2),()=>M.norm(1.25,2),()=>M.mul('1000000000','1000000000')]){assert.throws(op);checks++;}
yes(M.check({kind:'fraction',value:'3/4'},'6/8').correct);
yes(M.check({kind:'fraction',value:'3/4'},'.75').correct);
no(M.check({kind:'fraction',value:'3/4',simplest:true},'6/8').correct);
yes(M.check({kind:'fraction',value:'3/4',simplest:true},'6/8').equivalent);
no(M.check({kind:'fraction',value:'3/4',simplest:true},'.75').correct);
yes(M.check({kind:'fraction',value:'7/4',simplest:true},'1 3/4').correct);
no(M.check({kind:'fraction',value:'7/4',simplest:true},'1 6/8').correct);
no(M.check({kind:'fraction',value:'0',simplest:true},'0/8').correct);
yes(M.check({kind:'fraction',value:'0',simplest:true},'0').correct);
yes(M.check({kind:'number',value:'.375'},'3/8').correct);
no(M.check({kind:'number',value:'.375',format:'decimal'},'3/8').correct);
yes(M.check({kind:'number',value:'.375',format:'decimal'},'.375').correct);
no(M.check({kind:'fraction',value:'7/4',format:'mixed'},'7/4').correct);
yes(M.check({kind:'fraction',value:'7/4',format:'mixed'},'1 3/4').correct);
no(M.check({kind:'fraction',value:'7/4',format:'improper'},'1 3/4').correct);
yes(M.check({kind:'fraction',value:'7/4',format:'improper'},'7/4').correct);
no(M.check({kind:'fraction',value:'3/4',format:'fraction'},'.75').correct);
no(M.check({kind:'number',value:'3'},'3 cats').valid);
yes(M.check({kind:'choice',value:'>'},'>').correct);
no(M.check({kind:'choice',value:'>'},'<').correct);
no(M.check({kind:'choice',value:'>'},'').valid);
const ordering={kind:'order',value:['1/4','2/3','1 1/2']};
yes(M.check(ordering,['2/8','4/6','3/2']).correct);
no(M.check(ordering,['2/3','1/4','1 1/2']).correct);
no(M.check(ordering,['1/4','2/3','2/3']).valid);
no(M.check(ordering,['1/4','2/3']).valid);
yes(M.check({kind:'order',value:['1/2','2/4','3/4']},['2/4','1/2','3/4']).correct);
// Independent integer identities over small values: arithmetic reduces to an exact
// cross-product identity, not an echo of a hard-coded answer table.
for(let a=-7;a<=7;a++)for(let b=1;b<=9;b++)for(let c=-5;c<=5;c++)for(let d=1;d<=7;d++){
 const x={n:a,d:b},y={n:c,d};
 let r=M.add(x,y);assert.equal(r.n*b*d,(a*d+c*b)*r.d);
 r=M.sub(x,y);assert.equal(r.n*b*d,(a*d-c*b)*r.d);
 r=M.mul(x,y);assert.equal(r.n*b*d,(a*c*r.d)||0);
 if(c){r=M.div(x,y);assert.equal((r.n*b*c)||0,(a*d*r.d)||0);}
 const cmp=Math.sign(a*d-c*b);assert.equal(M.compare(x,y),cmp);
 checks+=c?5:4;
}
console.log('Fraction math: '+checks+' checks passed.');
