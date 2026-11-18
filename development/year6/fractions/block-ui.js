(function () {
 'use strict';
 const Store=window.MWFractionProgress, Data=window.MWFractionsContent;
 const $=id=>document.getElementById(id);
 const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function icon(index=0){let shapes='';for(let row=0;row<3;row++){const d=[4,6,8][row],n=[2+(index%2),3+(index%3),4+(index%4)][row];for(let j=0;j<d;j++){shapes+=`<rect x="${8+j*124/d}" y="${8+row*27}" width="${124/d-2}" height="22" rx="3" fill="${j<n?(row===1?'var(--mw-number-yellow)':'var(--mw-number-primary)'):'var(--mw-number-soft)'}"/>`;}}return `<svg viewBox="0 0 140 90" aria-hidden="true">${shapes}</svg>`;}
 function lesson(id){return id==='review'?{id:'review',title:'Mix it up',short:'Choose a method',goal:'Try a fresh mix. Use a model or hint whenever it helps.',tasks:Data.review,review:true,reasoning:Data.reviewReasoning,practical:Data.reviewPractical}:Data.lessons.find(l=>l.id===id);}
 function lessonRecords(id){return Object.values(Store.getProfile().records).filter(r=>r.lessonId===id);}
 function summaryFor(id){const records={};lessonRecords(id).forEach((r,i)=>records[i]=r);return Store.summary({records,reflections:{}});}
 function download(name,body,type='application/json'){const url=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function storageNotice(){const s=Store.storageStatus(),el=$('storage-notice');const foot=document.querySelector('.fb-footer span');if(foot)foot.textContent=s.persistent?'Saved on this device · no login':'Temporary records · download before leaving';if(el){el.replaceChildren();el.hidden=s.persistent;if(!s.persistent){const text=document.createElement('span');text.textContent=s.message+' Download your work here before changing pages or closing this tab. ';const b=document.createElement('button');b.type='button';b.textContent='Download my work';b.onclick=()=>download('year6-fractions-records.json',Store.exportJSON());el.append(text,b);}}}
 function refreshProfiles(){const state=Store.getState();$('profile').replaceChildren(...state.profiles.map(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.name;return o;}));$('profile').value=state.activeProfileId;storageNotice();}
 refreshProfiles();
 $('profile').addEventListener('change',()=>{Store.selectProfile($('profile').value);document.dispatchEvent(new CustomEvent('fb-profile-change'));storageNotice();});
 $('add-profile').onclick=()=>{$('profile-name').value='';$('profile-error').textContent='';$('profile-dialog').showModal();$('profile-name').focus();};
 $('cancel-profile').onclick=()=>{$('profile-dialog').close();};
 $('profile-form').onsubmit=e=>{e.preventDefault();try{const p=Store.createProfile($('profile-name').value.trim());Store.selectProfile(p.id);refreshProfiles();$('profile-dialog').close();document.dispatchEvent(new CustomEvent('fb-profile-change'));}catch(error){$('profile-error').textContent=error.message;}};
 window.FractionUI={$,esc,icon,lesson,lessonRecords,summaryFor,download,storageNotice,refreshProfiles};
})();
