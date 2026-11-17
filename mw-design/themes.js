/* Apply before first paint; store only this display preference, separately from notebooks. */
(function(){
  'use strict';
  var key='maths-wednesdays-theme-v1',allowed=['dark','graph','sketch'];
  function apply(value){document.documentElement.dataset.theme=allowed.indexOf(value)>=0?value:'dark';}
  try{apply(localStorage.getItem(key));}catch(error){apply('dark');}
  document.addEventListener('DOMContentLoaded',function(){
    var picker=document.getElementById('theme-choice');
    if(!picker)return;
    picker.value=document.documentElement.dataset.theme;
    function updateMeta(){var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content={dark:'#12191b',graph:'#ffffff',sketch:'#f5f1e8'}[picker.value];}
    updateMeta();
    picker.addEventListener('change',function(){apply(picker.value);updateMeta();try{localStorage.setItem(key,picker.value);}catch(error){/* Selection remains usable for this visit. */}});
    window.addEventListener('storage',function(event){if(event.key===key){apply(event.newValue);picker.value=document.documentElement.dataset.theme;updateMeta();}});
  });
})();
