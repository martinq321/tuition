/* Maths Wednesdays — manipulable fraction models. No task is marked by this module. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FractionModels = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));
  const gcd = (a, b) => { a=Math.abs(a); b=Math.abs(b); while(b){const t=b;b=a%b;a=t;}return a||1; };
  const lcm = (a,b) => Math.abs(a*b)/gcd(a,b);
  function frac(value, fallback='1/2') {
    const fm = typeof FMath !== 'undefined' ? FMath : null;
    if (fm) return fm.parse(String(value == null ? fallback : value)) || fm.parse(fallback);
    const s=String(value == null?fallback:value).trim();let m;
    if((m=s.match(/^(\d+)\s+(\d+)\/(\d+)$/))&&+m[3])return {n:+m[1]*+m[3]+ +m[2],d:+m[3]};
    if((m=s.match(/^(\d+)\/(\d+)$/))&&+m[2])return {n:+m[1],d:+m[2]};
    if(/^\d+(\.\d+)?$/.test(s)){const d=10**((s.split('.')[1]||'').length);return{n:Math.round(+s*d),d};}
    return frac(fallback,'1/2');
  }
  function raw(value, fallback='1/2') { // Keep authored denominators for equal-part diagrams.
    const s=String(value==null?fallback:value).trim();let m;
    if((m=s.match(/^(\d+)\s+(\d+)\/(\d+)$/))&&+m[3])return{n:+m[1]*+m[3]+ +m[2],d:+m[3]};
    if((m=s.match(/^(\d+)\/(\d+)$/))&&+m[2])return{n:+m[1],d:+m[2]};
    return frac(s,fallback);
  }
  const textFraction=(n,d)=> d===1?String(n):n+'/'+d;
  const simplified=(n,d)=> {const g=gcd(n,d);return textFraction(n/g,d/g);};
  function node(tag, text, cls) { const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e; }
  function svgNode(tag, attrs={}, text) {const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(text!=null)e.textContent=text;return e;}
  function svg(width,height,label) {const e=svgNode('svg',{viewBox:`0 0 ${width} ${height}`,role:'img','aria-label':label,class:'fm-svg'});e.append(svgNode('title',{},label));return e;}
  function bar(n,d,{colour='purple',label,group=1,maxWhole,selected,click,onClick}={}) {
    d=Math.max(1,Math.round(d));n=Math.max(0,n);const wholes=Math.max(1,maxWhole||Math.ceil(n/d));
    const wrap=node('div',null,'fm-bar-wrap');if(label)wrap.append(node('p',label,'fm-bar-label'));
    const height=wholes*47+8, view=svg(520,height,`${label||'Fraction strip'}: ${textFraction(n,d)}. Each outlined strip is one whole.`);
    for(let w=0;w<wholes;w++){
      const y=w*47+3;
      view.append(svgNode('rect',{x:2,y,width:500,height:34,rx:3,class:'fm-whole'}));
      for(let i=0;i<d;i++){
        const k=w*d+i,part=Math.max(0,Math.min(1,n-k)), x=2+i*500/d;
        if(part>0)view.append(svgNode('rect',{x,y,width:500/d*part,height:34,class:'fm-fill-'+colour}));
        if(i)view.append(svgNode('line',{x1:x,y1:y,x2:x,y2:y+34,class:'fm-part-line'}));
        if(group>1&&i%group===0)view.append(svgNode('line',{x1:x,y1:y-2,x2:x,y2:y+36,class:'fm-group-line'}));
        if(selected&&selected.has(k))view.append(svgNode('rect',{x:x+1,y:y+1,width:Math.max(0,500/d-2),height:32,class:'fm-outline-selection'}));
      }
      view.append(svgNode('text',{x:508,y:y+23,class:'fm-unit-number'},String(w+1)));
    }
    wrap.append(view);return wrap;
  }
  function mount(container, config={}, options={}) {
    const abort=new AbortController(), listeners=abort.signal;
    const type=config.type||'equivalence';
    const initial=JSON.parse(JSON.stringify(config));let dead=false, state={type}, update;const fieldRefs={};
    container.replaceChildren();container.classList.add('fm-host');
    const root=node('section',null,'fm-model');root.setAttribute('aria-label','Fraction exploration model');
    const heading=node('h3',null,'fm-title'),intro=node('p',null,'fm-intro'),controls=node('div',null,'fm-controls'),picture=node('div',null,'fm-picture'),readout=node('p',null,'fm-readout'),status=node('p',null,'fm-status');
    readout.setAttribute('aria-live','polite');status.setAttribute('role','status');
    root.append(heading,intro,controls,picture,readout,status);container.append(root);
    const on=(el,event,fn)=>el.addEventListener(event,fn,{signal:listeners});
    function changed(action){if(dead)return;update();if(typeof options.onChange==='function')options.onChange({action,state:getState()});}
    function button(label,fn,cls=''){const b=node('button',label,'fm-button '+cls);b.type='button';on(b,'click',fn);controls.append(b);return b;}
    function range(label,min,max,value,fn,step=1){const wrap=node('label',null,'fm-range-label'),words=node('span',label),line=node('span',null,'fm-range-row'),input=node('input'),out=node('output',value);input.type='range';input.min=min;input.max=max;input.step=step;input.value=value;input.setAttribute('aria-label',label);line.append(input,out);wrap.append(words,line);controls.append(wrap);on(input,'input',()=>{out.textContent=input.value;fn(Number(input.value));});fieldRefs[label]={input,out};return {input,out};}
    function select(label,values,value,fn){const wrap=node('label',null,'fm-select-label'),title=node('span',label),input=node('select');input.setAttribute('aria-label',label);values.forEach(v=>{const option=node('option',v.label==null?v.value:v.label);option.value=v.value;input.append(option);});input.value=value;wrap.append(title,input);controls.append(wrap);on(input,'change',()=>fn(Number(input.value)));fieldRefs[label]={input};return input;}
    function msg(s){status.textContent=s;}
    function getState(){return JSON.parse(JSON.stringify(state));}
    let resetState;
    if(type==='equivalence'){
      const n=Math.max(0,Math.round(config.n==null?2:config.n)), d=Math.max(1,Math.round(config.d||3));
      state={type,n,d,multiplier:1};heading.textContent='Same amount, smaller pieces';intro.textContent='Drag the slider. Each strip stays one whole long.';
      const max=Math.max(6,Math.min(12,Math.ceil((config.targetD||d)/d)));
      const slider=range('Pieces inside each original part',1,max,1,v=>{state.multiplier=v;changed('subdivide');});
      update=()=>{const m=state.multiplier;picture.replaceChildren(bar(n,d,{label:'Original: '+textFraction(n,d)}),bar(n*m,d*m,{label:'Repartitioned: '+textFraction(n*m,d*m),colour:'gold'}));readout.textContent=`${textFraction(n,d)} = ${textFraction(n*m,d*m)}. Both the number of selected pieces and the total number of pieces are multiplied by ${m}.`;msg(config.targetD?`Can you make ${config.targetD} equal parts in each whole?`:'What stays the same when the pieces get smaller?');};
      resetState=()=>{state.multiplier=1;slider.input.value=1;slider.out.textContent='1';};
    } else if(type==='simplify') {
      const n=Math.max(0,Math.round(config.n==null?6:config.n)), d=Math.max(1,Math.round(config.d||8));
      state={type,n,d,group:1};heading.textContent='Bundle equal pieces';intro.textContent='Choose a bundle size that groups both the selected parts and the whole exactly.';
      const chosen=select('Pieces in each bundle',Array.from({length:Math.min(60,d)},(_,i)=>({value:i+1})),1,v=>{state.group=v;changed('group');});
      update=()=>{const g=state.group,works=n%g===0&&d%g===0;picture.replaceChildren(bar(n,d,{group:g,label:`${n} selected pieces out of ${d} per whole`}));if(works){picture.append(bar(n/g,d/g,{colour:'gold',label:`Regrouped into bundles of ${g}`}));readout.textContent=`${textFraction(n,d)} = ${textFraction(n/g,d/g)}. Divide both numbers by ${g}.`;msg(gcd(n/g,d/g)===1?'No larger equal bundle fits both numbers. This is the simplest form.':'Can you make larger bundles without any part left over?');}else{readout.textContent=`Bundles of ${g} leave an incomplete group.`;msg(`The bundle size must divide both ${n} and ${d}. Try a common factor.`);}};
      resetState=()=>{state.group=1;chosen.value='1';};
    } else if(type==='mixed') {
      const n=Math.max(0,Math.round(config.n==null?11:config.n)),d=Math.max(1,Math.round(config.d||4));state={type,n,d,wholes:0};
      heading.textContent='Build whole units';intro.textContent=`Bundle ${d} pieces to make one whole. The amount never changes.`;
      const pack=button('Make one whole',()=>{if((n-state.wholes*d)>=d){state.wholes++;changed('bundle-whole');}}),unpack=button('Undo one bundle',()=>{if(state.wholes){state.wholes--;changed('unbundle-whole');}});
      update=()=>{const loose=n-state.wholes*d;picture.replaceChildren();if(state.wholes)picture.append(bar(state.wholes,1,{colour:'gold',label:`${state.wholes} whole ${state.wholes===1?'unit':'units'}`}));picture.append(bar(loose,d,{label:`${loose} pieces still to bundle`,maxWhole:Math.max(1,Math.ceil(loose/d))}));pack.disabled=loose<d;unpack.disabled=state.wholes===0;readout.textContent=`${textFraction(n,d)} = ${state.wholes} wholes + ${textFraction(loose,d)}.`;msg(loose<d?`${state.wholes?state.wholes+' ':''}${loose?textFraction(loose,d):state.wholes?'':'0'} is the mixed-number or whole-number form.`:`There are enough pieces to make ${Math.floor(loose/d)} more whole ${Math.floor(loose/d)===1?'unit':'units'}.`);};
      resetState=()=>{state.wholes=0;};
    } else if(type==='compare') {
      const values=(Array.isArray(config.values)?config.values:['3/4','2/3','5/6']).map(String).slice(0,6);state={type,order:values.map((_,i)=>i),selected:0};
      heading.textContent='Arrange the fractions';intro.textContent='Drag a card, or select it and use the move buttons. All strips use the same whole.';
      const previous=button('Move selected left',()=>move(-1)),next=button('Move selected right',()=>move(1)),check=button('Check this order',()=>{const f=state.order.map(i=>frac(values[i]));const okay=f.every((v,i)=>!i||f[i-1].n*v.d<=v.n*f[i-1].d);msg(okay?'The fractions are in increasing order. Explain how the equal wholes help you compare.':'There is a pair in the wrong order. Compare neighbouring strip lengths.');if(options.onChange)options.onChange({action:'check-model-order',state:getState()});});
      let drag=null;
      function move(delta){const index=state.order.indexOf(state.selected),dest=index+delta;if(dest<0||dest>=values.length)return;[state.order[index],state.order[dest]]=[state.order[dest],state.order[index]];changed('reorder');}
      update=()=>{picture.replaceChildren();const cards=node('div',null,'fm-order-cards');state.order.forEach((i,index)=>{const b=node('button',values[i],'fm-order-card');b.type='button';b.dataset.index=index;b.setAttribute('aria-label',`Fraction ${values[i]}, position ${index+1}. Select to move.`);b.setAttribute('aria-pressed',String(state.selected===i));on(b,'click',()=>{state.selected=i;changed('select-card');const selected=picture.querySelector('.fm-order-card[aria-pressed="true"]');if(selected)selected.focus({preventScroll:true});});on(b,'pointerdown',e=>{if(e.button!==0)return;drag={id:i,x:e.clientX,y:e.clientY,moved:false};b.setPointerCapture(e.pointerId);});on(b,'pointermove',e=>{if(!drag||drag.id!==i)return;if(Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)>9){drag.moved=true;b.classList.add('fm-dragging');}});on(b,'pointerup',e=>{if(!drag||drag.id!==i)return;const snapshot=drag;drag=null;if(snapshot.moved){const entries=Array.from(cards.children),dest=entries.findIndex(el=>{const r=el.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top-20&&e.clientY<=r.bottom+20;});state.selected=i;if(dest>=0){const at=state.order.indexOf(i);state.order.splice(at,1);state.order.splice(dest,0);}changed('drag-reorder');}});on(b,'pointercancel',()=>{drag=null;b.classList.remove('fm-dragging');});cards.append(b);});picture.append(cards);const max=Math.max(1,Math.ceil(Math.max(...values.map(v=>{const f=frac(v);return f.n/f.d;}))));state.order.forEach((i,k)=>{const f=raw(values[i]);picture.append(bar(f.n,f.d,{label:`${k+1}. ${values[i]}`,maxWhole:max,colour:k%2?'gold':'purple'}));});const at=state.order.indexOf(state.selected);previous.disabled=at===0;next.disabled=at===values.length-1;readout.textContent='Your order: '+state.order.map(i=>values[i]).join(', ');msg('Equal values may sit next to each other. Use Check this order when you are ready.');};
      resetState=()=>{state.order=values.map((_,i)=>i);state.selected=0;};
    } else if(type==='add'||type==='subtract') {
      const a=raw(config.a,'1/2'),b=raw(config.b,'1/3'),common=lcm(a.d,b.d);state={type,commonD:Math.max(a.d,b.d),selected:0};
      const maxWhole=Math.max(1,Math.min(8,Math.ceil(type==='add'?a.n/a.d+b.n/b.d:a.n/a.d)));
      heading.textContent=type==='add'?'Combine equal-sized parts':'Take away equal-sized parts';intro.textContent='Choose a useful partition. Build your answer in the bottom strip; the two amounts stay fixed.';
      const ds=Array.from(new Set([a.d,b.d,common,common*2])).sort((a,b)=>a-b).filter(d=>d<=240);
      const partition=select('Equal parts per whole',ds.map(d=>({value:d})),state.commonD,v=>{state.commonD=v;state.selected=0;changed('partition');});
      const minus=button('Remove a piece',()=>{if(state.selected){state.selected--;changed('remove-piece');}}),plus=button('Add a piece',()=>{if(state.selected<state.commonD*maxWhole){state.selected++;changed('add-piece');}}),clear=button('Clear result strip',()=>{state.selected=0;changed('clear-result');});
      update=()=>{const d=state.commonD,okay=d%a.d===0&&d%b.d===0;picture.replaceChildren(bar(okay?a.n*d/a.d:a.n,okay?d:a.d,{label:'First amount: '+textFraction(a.n,a.d)}),bar(okay?b.n*d/b.d:b.n,okay?d:b.d,{label:(type==='add'?'Add: ':'Subtract: ')+textFraction(b.n,b.d),colour:'gold'}));const result=bar(state.selected,d,{label:'Your result strip',maxWhole});picture.append(result);readout.textContent=`Your result: ${textFraction(state.selected,d)}. ${type==='add'?'Combine':'Subtract'} ${textFraction(a.n,a.d)} ${type==='add'?'+':'−'} ${textFraction(b.n,b.d)}.`;msg(okay?`Both amounts can be made from pieces of size 1/${d}. Use the piece buttons to build the result, then explain your calculation.`:`${d} parts does not repartition both amounts exactly. Look for a common multiple of ${a.d} and ${b.d}.`);minus.disabled=!state.selected;plus.disabled=state.selected>=d*maxWhole;clear.disabled=!state.selected;};
      resetState=()=>{state.commonD=Math.max(a.d,b.d);state.selected=0;partition.value=state.commonD;};
    } else if(type==='multiply') {
      const a=raw(config.a,'2/3'),b=raw(config.b,'3/4');state={type,columns:0,rows:0,denColumns:a.d,denRows:b.d};
      heading.textContent='A fraction of a fraction';intro.textContent=`Make ${textFraction(a.n,a.d)} of ${textFraction(b.n,b.d)}. The overlap is a part of the original whole.`;
      const xs=range('Purple columns',0,a.d,0,v=>{state.columns=v;changed('columns');}),ys=range('Yellow rows',0,b.d,0,v=>{state.rows=v;changed('rows');});
      update=()=>{const x=state.columns,y=state.rows,w=460,h=280;const view=svg(520,330,`${x} of ${a.d} columns and ${y} of ${b.d} rows. ${x*y} overlapping cells out of ${a.d*b.d}.`);view.append(svgNode('rect',{x:40,y:20,width:w,height:h,class:'fm-whole'}));if(x)view.append(svgNode('rect',{x:40,y:20,width:w*x/a.d,height:h,class:'fm-fill-purple fm-soft-fill'}));if(y)view.append(svgNode('rect',{x:40,y:20,width:w,height:h*y/b.d,class:'fm-fill-gold fm-soft-fill'}));if(x&&y)view.append(svgNode('rect',{x:40,y:20,width:w*x/a.d,height:h*y/b.d,class:'fm-fill-purple'}));for(let col=0;col<=a.d;col++)view.append(svgNode('line',{x1:40+col*w/a.d,y1:20,x2:40+col*w/a.d,y2:300,class:'fm-area-line'}));for(let row=0;row<=b.d;row++)view.append(svgNode('line',{x1:40,y1:20+row*h/b.d,x2:500,y2:20+row*h/b.d,class:'fm-area-line'}));if(x&&y)view.append(svgNode('text',{x:40+w*x/a.d/2,y:20+h*y/b.d/2+7,'text-anchor':'middle',class:'fm-overlap-count'},`${x*y}`));view.append(svgNode('text',{x:270,y:324,'text-anchor':'middle',class:'fm-axis-label'},`${a.d} equal columns × ${b.d} equal rows = ${a.d*b.d} cells`));picture.replaceChildren(view);readout.textContent=`Overlap: ${x*y}/${a.d*b.d} of the whole. Purple: ${x}/${a.d}; yellow: ${y}/${b.d}.`;msg(x===a.n&&y===b.n?'You have made the two requested fractions. Can you express the overlap in its simplest form?':'Change the shaded columns and rows to match the two fractions.');};
      resetState=()=>{state.columns=0;state.rows=0;xs.input.value=0;xs.out.textContent='0';ys.input.value=0;ys.out.textContent='0';};
    } else if(type==='divide') {
      const a=raw(config.a,'3/4'),by=Math.max(1,Math.round(config.by||3));state={type,cut:false,rounds:0,by,n:a.n,d:a.d};
      heading.textContent='Share a fraction equally';intro.textContent=`Share ${textFraction(a.n,a.d)} among ${by}. Split each original piece, then give everyone one small piece per round.`;
      const split=button('Split each piece',()=>{state.cut=true;changed('split-for-sharing');}),share=button('Share one equal round',()=>{if(state.cut&&state.rounds<a.n){state.rounds++;changed('share-round');}}),back=button('Undo a sharing round',()=>{if(state.rounds){state.rounds--;changed('unshare-round');}});
      update=()=>{const d=a.d*by;picture.replaceChildren();if(!state.cut)picture.append(bar(a.n,a.d,{label:'Starting amount: '+textFraction(a.n,a.d)}));if(state.cut){picture.append(bar((a.n-state.rounds)*by,d,{label:`Still to share: ${(a.n-state.rounds)*by} pieces, each 1/${d} of the whole`,colour:'gold'}));const people=node('div',null,'fm-recipients');for(let i=0;i<by;i++){const p=node('div',null,'fm-recipient');p.append(node('span','Person '+(i+1),'fm-recipient-name'),node('strong',textFraction(state.rounds,d)));const dots=node('div',null,'fm-mini-pieces');for(let k=0;k<state.rounds;k++)dots.append(node('span',null,'fm-mini-piece'));p.append(dots);people.append(p);}picture.append(people);}split.disabled=state.cut;share.disabled=!state.cut||state.rounds>=a.n;back.disabled=!state.rounds;readout.textContent=state.cut?`Each person has ${state.rounds}/${d} of the original whole. ${a.n-state.rounds} equal sharing rounds remain.`:`Each original part is 1/${a.d}. Split it into ${by} equal smaller pieces.`;msg(state.rounds===a.n?`All of ${textFraction(a.n,a.d)} is shared equally. Each share is ${textFraction(a.n,d)} = ${simplified(a.n,d)}.`:'The size of the original whole stays fixed throughout sharing.');};
      resetState=()=>{state.cut=false;state.rounds=0;};
    } else if(type==='quantity') {
      const a=raw(config.a,'3/4'),whole=Math.max(1,Math.round(config.whole||24));state={type,selectedGroups:0,n:a.n,d:a.d,whole};
      heading.textContent='Find a fraction of a set';intro.textContent=`The set has ${whole} counters. Make ${a.d} equal groups, then select groups for ${textFraction(a.n,a.d)}.`;
      const count=range('Selected groups',0,Math.max(a.d,a.n),0,v=>{state.selectedGroups=v;changed('select-groups');});
      update=()=>{picture.replaceChildren();const groupSize=whole/a.d,groups=node('div',null,'fm-counter-groups');for(let i=0;i<Math.max(a.d,a.n);i++){const g=node('button',null,'fm-counter-group cell');g.type='button';g.setAttribute('aria-label',`Select ${i+1} ${i?'groups':'group'}`);g.setAttribute('aria-pressed',String(i<state.selectedGroups));g.append(node('strong','Group '+(i+1)));if(Number.isInteger(groupSize)&&groupSize<=40){const dots=node('div',null,'fm-counters');for(let k=0;k<groupSize;k++){const dot=node('span',null,'fm-counter');dot.setAttribute('aria-hidden','true');dots.append(dot);}g.append(dots);}g.append(node('span',simplified(whole,a.d)+' in each group','fm-group-value'));on(g,'click',()=>{state.selectedGroups=i+1;count.input.value=state.selectedGroups;count.out.textContent=state.selectedGroups;changed('tap-group');});groups.append(g);}picture.append(groups);readout.textContent=`${state.selectedGroups} groups of ${simplified(whole,a.d)} = ${simplified(state.selectedGroups*whole,a.d)} counters.`;msg(whole%a.d?'Some groups contain a fraction of a counter. Use this model as an amount or length instead of indivisible objects.':`One group is 1/${a.d} of ${whole}. How many groups does the numerator ask for?`);};
      resetState=()=>{state.selectedGroups=0;count.input.value=0;count.out.textContent='0';};
    } else if(type==='connections') {
      const a=raw(config.a,'3/4');state={type,numerator:0,denominator:a.d};heading.textContent='One amount, three names';intro.textContent=`Build ${textFraction(a.n,a.d)}. A hundred square connects the fraction to a decimal and a percentage.`;
      const count=range('Selected fraction parts',0,Math.max(a.d,a.n),0,v=>{state.numerator=v;changed('connect-parts');});
      update=()=>{const n=state.numerator,d=state.denominator,value=n/d,wholes=Math.max(1,Math.ceil(value));picture.replaceChildren();const grids=node('div',null,'fm-hundred-grids');for(let w=0;w<Math.min(4,wholes);w++){const view=svg(240,255,`Hundred square ${w+1}; ${Math.max(0,Math.min(100,value*100-w*100))} of 100 cells shaded.`);const amount=clamp(value*100-w*100,0,100);for(let k=0;k<100;k++){const x=(k%10)*23+4,y=Math.floor(k/10)*23+4;view.append(svgNode('rect',{x,y,width:22,height:22,rx:1,class:'fm-hundred-empty'}));const filled=clamp(amount-k,0,1);if(filled)view.append(svgNode('rect',{x,y,width:22*filled,height:22,rx:1,class:k%10===9?'fm-fill-gold':'fm-fill-purple'}));}view.append(svgNode('text',{x:120,y:250,'text-anchor':'middle',class:'fm-axis-label'},'1 small square = 1/100'));grids.append(view);}picture.append(grids);const expansion=(num,den)=>{let wholePart=Math.floor(num/den),rem=num%den,digits='';for(let i=0;rem&&i<12;i++){rem*=10;digits+=Math.floor(rem/den);rem%=den;}return{text:wholePart+(digits?'.'+digits:''),exact:rem===0};};const decimal=expansion(n,d),percent=expansion(n*100,d);readout.textContent=`${textFraction(n,d)} ${decimal.exact?'=':'≈'} ${decimal.text}; ${percent.exact?'exactly':'approximately'} ${percent.text}%.`;msg(`${n} ÷ ${d} = ${textFraction(n,d)}. ${decimal.exact&&percent.exact?'The decimal and percentage shown are exact.':'The displayed repeating decimal is cut off after 12 places; the fraction is exact.'}`);};
      resetState=()=>{state.numerator=0;count.input.value=0;count.out.textContent='0';};
    } else {
      heading.textContent='Explore a fraction';intro.textContent='Use a strip of paper to make equal parts.';state={type:'fallback'};update=()=>{picture.replaceChildren(bar(1,2,{label:'One half'}));readout.textContent='One of two equal parts.';};resetState=()=>{};
    }
    function applyPreset(){
      const p=config.preset;if(!p||typeof p!=='object')return;
      const field=(label,key)=>{const ref=fieldRefs[label];if(!ref||p[key]==null)return;const input=ref.input;let v=Number(p[key]);if(!Number.isFinite(v))return;if(input.type==='range')v=Math.round(clamp(v,Number(input.min),Number(input.max)));else if(!Array.from(input.children).some(o=>Number(o.value)===v))return;state[key]=v;input.value=v;if(ref.out)ref.out.textContent=String(v);};
      if(type==='equivalence')field('Pieces inside each original part','multiplier');
      if(type==='simplify')field('Pieces in each bundle','group');
      if(type==='mixed'&&p.wholes!=null)state.wholes=Math.round(clamp(p.wholes,0,Math.floor(state.n/state.d)));
      if(type==='compare'){
        if(Array.isArray(p.order)&&p.order.length===state.order.length&&new Set(p.order).size===state.order.length&&p.order.every(v=>Number.isInteger(v)&&v>=0&&v<state.order.length))state.order=[...p.order];
        if(Number.isInteger(p.selected)&&p.selected>=0&&p.selected<state.order.length)state.selected=p.selected;
      }
      if(type==='add'||type==='subtract'){
        field('Equal parts per whole','commonD');
        if(p.selected!=null){const a=frac(config.a),b=frac(config.b,'1/3');const max=Math.max(1,Math.min(8,Math.ceil(type==='add'?a.n/a.d+b.n/b.d:a.n/a.d)));state.selected=Math.round(clamp(p.selected,0,state.commonD*max));}
      }
      if(type==='multiply'){field('Purple columns','columns');field('Yellow rows','rows');}
      if(type==='divide'){if(typeof p.cut==='boolean')state.cut=p.cut;if(p.rounds!=null)state.rounds=state.cut?Math.round(clamp(p.rounds,0,state.n)):0;}
      if(type==='quantity')field('Selected groups','selectedGroups');
      if(type==='connections')field('Selected fraction parts','numerator');
    }
    applyPreset();update();
    return {getState,reset(){if(dead)return;resetState();applyPreset();update();},destroy(){if(dead)return;dead=true;abort.abort();container.replaceChildren();container.classList.remove('fm-host');}};
  }
  return {mount};
});
