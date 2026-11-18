/* Local evidence for the Year 6 fractions block. This is not an account system. */
(function (root, factory) {
  'use strict';
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MWFractionProgress = api;
}(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this), function (root) {
  'use strict';
  var KEY = 'mw-y6-fractions-v1';
  var MAX_BYTES = 2 * 1024 * 1024;
  var MAX_PROFILES = 30;
  var FORBIDDEN = ['__proto__', 'prototype', 'constructor'];
  var has = function (obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); };
  var copy = function (value) { return value === undefined ? undefined : JSON.parse(JSON.stringify(value)); };
  var bytes = function (text) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(text).length;
    return unescape(encodeURIComponent(text)).length;
  };
  function fail(message) { throw new Error(message); }
  function object(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(label + ' must be an object.');
    return value;
  }
  function keys(value, allowed, label) {
    object(value, label);
    Object.keys(value).forEach(function (key) {
      if (FORBIDDEN.indexOf(key) !== -1 || allowed.indexOf(key) === -1) fail('Unsupported field in ' + label + ': ' + key + '.');
    });
  }
  function text(value, max, label, empty) {
    if (typeof value !== 'string' || value.length > max || (!empty && !value.trim())) fail(label + ' must be text of at most ' + max + ' characters.');
    return value;
  }
  function identity(value, label) {
    if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/.test(value) || FORBIDDEN.indexOf(value) !== -1) fail(label + ' is not a supported identifier.');
    return value;
  }
  function count(value, max, label) {
    if (!Number.isInteger(value) || value < 0 || value > max) fail(label + ' is outside its allowed range.');
    return value;
  }
  function boolean(value, label) {
    if (typeof value !== 'boolean') fail(label + ' must be true or false.');
    return value;
  }
  function date(value, label) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) fail(label + ' is not a valid timestamp.');
    return value;
  }
  function response(value) {
    if (Array.isArray(value)) {
      if (value.length > 32) fail('An ordered answer has too many entries.');
      return value.map(function (v) { return text(v, 200, 'Answer entry', true); });
    }
    return text(value, 2000, 'Answer', true);
  }
  function makeProfile(id, name) {
    return {id:id, name:name, records:{}, reflections:{}, visits:{}};
  }
  function initial() {
    return {schemaVersion:1, contentVersion:1, activeProfileId:'default', profiles:[makeProfile('default', 'My learning')]};
  }
  function normalAttempt(value) {
    keys(value, ['id','time','response','correct','valid','message','hintsAtAttempt','exampleAtAttempt','solutionAtAttempt','modelAtAttempt'], 'attempt');
    var a = {
      id:identity(value.id, 'Attempt ID'), time:date(value.time, 'Attempt time'), response:response(value.response),
      correct:boolean(value.correct, 'Correct flag'), valid:boolean(value.valid, 'Valid flag'),
      message:text(value.message, 2000, 'Feedback', true), hintsAtAttempt:count(value.hintsAtAttempt, 100, 'Hints at attempt'),
      exampleAtAttempt:boolean(value.exampleAtAttempt, 'Example flag'), solutionAtAttempt:boolean(value.solutionAtAttempt, 'Solution flag'), modelAtAttempt:boolean(value.modelAtAttempt, 'Model flag')
    };
    if (a.correct && !a.valid) fail('An invalid answer cannot be marked correct.');
    return a;
  }
  function normalRecord(value, key) {
    keys(value, ['lessonId','taskId','prompt','startedAt','completedAt','attempts','hints','exampleViewed','solutionViewed','modelUsed'], 'task record');
    var r = {
      lessonId:identity(value.lessonId, 'Lesson ID'), taskId:identity(value.taskId, 'Task ID'),
      prompt:text(value.prompt, 4000, 'Task prompt', true), startedAt:date(value.startedAt, 'Start time'), completedAt:null,
      attempts:[], hints:count(value.hints, 100, 'Hint count'), exampleViewed:boolean(value.exampleViewed, 'Example flag'),
      solutionViewed:boolean(value.solutionViewed, 'Solution flag'), modelUsed:boolean(value.modelUsed, 'Model flag')
    };
    if (key !== r.lessonId + '/' + r.taskId) fail('A task key does not match its lesson and task IDs.');
    if (!Array.isArray(value.attempts) || value.attempts.length > 200) fail('A task can contain at most 200 attempts.');
    var seen = new Set();
    r.attempts = value.attempts.map(function (v) {
      var a = normalAttempt(v);
      if (seen.has(a.id)) fail('Duplicate attempt ID within a task.');
      if (a.time < r.startedAt) fail('An attempt occurs before its task was started.');
      seen.add(a.id); return a;
    });
    // Event order is retained in a single file; a merge orders events by timestamp.
    var solved = r.attempts.find(function (a) { return a.correct; });
    if (value.completedAt !== null) {
      r.completedAt = date(value.completedAt, 'Completion time');
      if (!solved || r.completedAt !== solved.time) fail('Completion time must match the first successful attempt.');
    } else if (solved) fail('A successful record is missing its completion time.');
    r.attempts.forEach(function (a) {
      if (a.hintsAtAttempt > r.hints || (a.exampleAtAttempt && !r.exampleViewed) || (a.solutionAtAttempt && !r.solutionViewed) || (a.modelAtAttempt && !r.modelUsed)) fail('Task support totals contradict an attempt.');
    });
    return r;
  }
  function normalState(value) {
    keys(value, ['schemaVersion','contentVersion','activeProfileId','profiles'], 'file');
    if (value.schemaVersion !== 1 || value.contentVersion !== 1) fail('This file uses an unsupported fractions-record version.');
    if (!Array.isArray(value.profiles) || !value.profiles.length || value.profiles.length > MAX_PROFILES) fail('A file must contain 1–30 local profiles.');
    var ids = new Set();
    var profiles = value.profiles.map(function (v) {
      keys(v, ['id','name','records','reflections','visits'], 'profile');
      var id = identity(v.id, 'Profile ID');
      if (ids.has(id)) fail('Duplicate profile ID.');
      ids.add(id);
      var p = makeProfile(id, text(v.name, 40, 'Profile name', false).trim());
      object(v.records, 'Records');
      if (Object.keys(v.records).length > 2000) fail('A profile can contain at most 2,000 task records.');
      Object.keys(v.records).forEach(function (key) { p.records[key] = normalRecord(v.records[key], key); });
      object(v.reflections, 'Reflections');
      if (Object.keys(v.reflections).length > 200) fail('Too many reflections.');
      Object.keys(v.reflections).forEach(function (key) {
        identity(key, 'Reflection lesson ID');
        var entry = v.reflections[key]; keys(entry, ['text','updatedAt'], 'reflection');
        p.reflections[key] = {text:text(entry.text, 4000, 'Reflection', true), updatedAt:date(entry.updatedAt, 'Reflection time')};
      });
      object(v.visits, 'Visits');
      if (Object.keys(v.visits).length > 200) fail('Too many lesson visit records.');
      Object.keys(v.visits).forEach(function (key) {
        identity(key, 'Visited lesson ID');
        var vj = v.visits[key]; keys(vj, ['count','firstAt','lastAt'], 'visit');
        var visit = {count:count(vj.count, 1000000, 'Visit count'), firstAt:date(vj.firstAt, 'First visit'), lastAt:date(vj.lastAt, 'Last visit')};
        if (!visit.count || visit.lastAt < visit.firstAt) fail('Invalid visit interval.');
        p.visits[key] = visit;
      });
      return p;
    });
    var activeId = identity(value.activeProfileId, 'Active profile ID');
    if (!ids.has(activeId)) fail('The active profile is missing.');
    return {schemaVersion:1,contentVersion:1,activeProfileId:activeId,profiles:profiles};
  }
  function mergeRecord(old, incoming) {
    var r = copy(old), attempts = new Map();
    old.attempts.concat(incoming.attempts).forEach(function (a) {
      if (attempts.has(a.id) && JSON.stringify(attempts.get(a.id)) !== JSON.stringify(a)) fail('Import has conflicting versions of an attempt.');
      attempts.set(a.id, a);
    });
    if (attempts.size > 200) fail('Merged task would contain more than 200 attempts.');
    r.attempts = Array.from(attempts.values()).sort(function (a,b) { return a.time.localeCompare(b.time); });
    r.startedAt = old.startedAt < incoming.startedAt ? old.startedAt : incoming.startedAt;
    r.hints = Math.max(old.hints,incoming.hints);
    r.exampleViewed = old.exampleViewed || incoming.exampleViewed;
    r.solutionViewed = old.solutionViewed || incoming.solutionViewed;
    r.modelUsed = old.modelUsed || incoming.modelUsed;
    var firstCorrect = r.attempts.find(function (a) { return a.correct; });
    r.completedAt = firstCorrect ? firstCorrect.time : null;
    if (!r.prompt) r.prompt = incoming.prompt;
    return r;
  }
  function mergeStates(current, incoming) {
    var next = copy(current);
    incoming.profiles.forEach(function (ip) {
      var p = next.profiles.find(function (entry) { return entry.id === ip.id; });
      if (!p) { next.profiles.push(copy(ip)); return; }
      Object.keys(ip.records).forEach(function (key) { p.records[key] = has(p.records,key) ? mergeRecord(p.records[key],ip.records[key]) : copy(ip.records[key]); });
      Object.keys(ip.reflections).forEach(function (key) {
        if (!has(p.reflections,key) || ip.reflections[key].updatedAt > p.reflections[key].updatedAt) p.reflections[key] = copy(ip.reflections[key]);
      });
      Object.keys(ip.visits).forEach(function (key) {
        var v = ip.visits[key], old = has(p.visits,key) ? p.visits[key] : null;
        // These are aggregate snapshots, so max avoids adding the same export twice.
        p.visits[key] = old ? {count:Math.max(old.count,v.count),firstAt:old.firstAt<v.firstAt?old.firstAt:v.firstAt,lastAt:old.lastAt>v.lastAt?old.lastAt:v.lastAt} : copy(v);
      });
    });
    return normalState(next);
  }
  function createStore(storage, options) {
    options = options || {};
    var clock = options.now || function () { return new Date().toISOString(); };
    var sequence = 0;
    var uid = options.makeId || function (kind) {
      sequence += 1;
      var random = root && root.crypto && typeof root.crypto.randomUUID === 'function' ? root.crypto.randomUUID() : Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)+'-'+sequence;
      return kind + '-' + random;
    };
    var state = initial(), persistent = false, readOnly = false, statusMessage = 'Records are kept only while this page is open. Export them before leaving.';
    if (storage === undefined) {
      try { storage = root && root.localStorage; } catch (_) { storage = null; }
    }
    if (storage && typeof storage.getItem === 'function' && typeof storage.setItem === 'function') {
      try {
        var raw = storage.getItem(KEY);
        if (raw !== null && raw !== undefined) {
          if (bytes(raw) > MAX_BYTES) fail('Saved record is too large.');
          state = normalState(JSON.parse(raw));
        }
        persistent = true;
        statusMessage = 'Saved in this browser only. Export a backup to keep or move these records.';
      } catch (_) {
        persistent = false; readOnly = true;
        statusMessage = 'Existing browser records could not be read and have not been changed. This session is temporary; export it before leaving.';
      }
    } else storage = null;
    function save(raw) {
      if (!storage || readOnly) return;
      try { storage.setItem(KEY,raw); persistent = true; }
      catch (_) {
        persistent = false; readOnly = true;
        statusMessage = 'The browser could not save these records. Your current work is still here; export it before leaving.';
      }
    }
    function change(fn) {
      var next = copy(state), result = fn(next), raw = JSON.stringify(next);
      if (bytes(raw) > MAX_BYTES) fail('These records have reached the 2 MB limit. Export a backup and clear an old local profile before continuing.');
      state = next; save(raw); return copy(result);
    }
    function profile(s, id) {
      var p = s.profiles.find(function (entry) { return entry.id === (id || s.activeProfileId); });
      if (!p) fail('That local profile does not exist.');
      return p;
    }
    function task(p, lessonId, taskId, prompt) {
      identity(lessonId,'Lesson ID'); identity(taskId,'Task ID');
      var key = lessonId+'/'+taskId;
      if (!has(p.records,key)) {
        if (Object.keys(p.records).length >= 2000) fail('This profile has reached its task-record limit. Export a backup before clearing it.');
        p.records[key] = {lessonId:lessonId,taskId:taskId,prompt:text(prompt || '',4000,'Task prompt',true),startedAt:date(clock(),'Current time'),completedAt:null,attempts:[],hints:0,exampleViewed:false,solutionViewed:false,modelUsed:false};
      } else if (!p.records[key].prompt && prompt) p.records[key].prompt = text(prompt,4000,'Task prompt',true);
      return p.records[key];
    }
    var api = {
      key:KEY,
      getState:function () { return copy(state); },
      getProfile:function () { return copy(profile(state)); },
      selectProfile:function (id) { identity(id,'Profile ID'); return change(function (s) { var p=profile(s,id);s.activeProfileId=id;return p; }); },
      createProfile:function (name) {
        name=text(name,40,'Profile name',false).trim();
        return change(function (s) {
          if (s.profiles.length >= MAX_PROFILES) fail('You can keep up to 30 local profiles.');
          var id=identity(uid('profile'),'Profile ID');
          if (s.profiles.some(function (p) { return p.id === id; })) fail('Could not create a unique profile ID. Try again.');
          var p=makeProfile(id,name);s.profiles.push(p);s.activeProfileId=id;return p;
        });
      },
      beginTask:function (lessonId,taskId,prompt) { return change(function (s) { return task(profile(s),lessonId,taskId,prompt); }); },
      updateTask:function (lessonId,taskId,patch) {
        keys(patch,['hints','exampleViewed','solutionViewed','modelUsed'],'task update');
        return change(function (s) {
          var r=task(profile(s),lessonId,taskId,'');
          if (has(patch,'hints')) r.hints=Math.max(r.hints,count(patch.hints,100,'Hint count'));
          ['exampleViewed','solutionViewed','modelUsed'].forEach(function (key) { if (has(patch,key)) {var value=boolean(patch[key],key);r[key]=r[key] || value;} });
          return r;
        });
      },
      submit:function (lessonId,taskId,result) {
        keys(result,['response','correct','valid','message'],'answer result');
        var res=response(result.response), correct=boolean(result.correct,'Correct flag'),valid=boolean(result.valid,'Valid flag'),message=text(result.message || '',2000,'Feedback',true);
        if (correct && !valid) fail('An invalid answer cannot be marked correct.');
        return change(function (s) {
          var r=task(profile(s),lessonId,taskId,'');
          if (r.attempts.length >= 200) fail('This task has reached its attempt-record limit. Export your records before clearing this profile.');
          var id=identity(uid('attempt'),'Attempt ID');
          if (r.attempts.some(function (a) { return a.id === id; })) fail('Could not create a unique attempt ID. Try again.');
          var now=date(clock(),'Current time');
          if (now < r.startedAt) now=r.startedAt;
          if(r.attempts.length && now < r.attempts[r.attempts.length-1].time) now=r.attempts[r.attempts.length-1].time;
          var a={id:id,time:now,response:copy(res),correct:correct,valid:valid,message:message,hintsAtAttempt:r.hints,exampleAtAttempt:r.exampleViewed,solutionAtAttempt:r.solutionViewed,modelAtAttempt:r.modelUsed};
          r.attempts.push(a);if(correct && !r.completedAt)r.completedAt=now;return r;
        });
      },
      saveReflection:function (lessonId,value) {
        identity(lessonId,'Lesson ID');value=text(value,4000,'Reflection',true);
        return change(function (s) { var p=profile(s); if(!has(p.reflections,lessonId) && Object.keys(p.reflections).length>=200)fail('Too many saved reflections.');p.reflections[lessonId]={text:value,updatedAt:date(clock(),'Current time')};return p.reflections[lessonId]; });
      },
      visit:function (lessonId) {
        identity(lessonId,'Lesson ID');
        return change(function (s) {var p=profile(s),now=date(clock(),'Current time'),v=has(p.visits,lessonId)?p.visits[lessonId]:null;if(!v && Object.keys(p.visits).length>=200)fail('Too many lesson visit records.');p.visits[lessonId]=v?{count:Math.min(1000000,v.count+1),firstAt:v.firstAt,lastAt:now<v.lastAt?v.lastAt:now}:{count:1,firstAt:now,lastAt:now};return p.visits[lessonId];});
      },
      summary:function (provided) {
        var p=provided || profile(state), values=Object.values(p.records || {}), result={started:values.length,solved:0,unfinished:0,firstTryIndependent:0,supported:0,attempts:0,reflections:0};
        values.forEach(function (r) {
          result.attempts+=r.attempts.length;
          var first=r.attempts.find(function (a) {return a.valid;});
          if(r.completedAt){result.solved+=1;if(first && first.correct && !first.hintsAtAttempt && !first.exampleAtAttempt && !first.solutionAtAttempt)result.firstTryIndependent+=1;else result.supported+=1;}else result.unfinished+=1;
        });
        result.reflections=Object.values(p.reflections || {}).filter(function (r) {return !!r.text.trim();}).length;
        return result;
      },
      exportJSON:function () {var pretty=JSON.stringify(state,null,2);return bytes(pretty)<=MAX_BYTES?pretty:JSON.stringify(state);},
      importJSON:function (raw, opts) {
        if(typeof raw!=='string' || bytes(raw)>MAX_BYTES)fail('Choose a fractions-record JSON file smaller than 2 MB.');
        var parsed;try{parsed=JSON.parse(raw);}catch(_){fail('This is not a valid JSON file.');}
        var incoming=normalState(parsed),mode=opts && opts.mode || 'merge';
        if(mode!=='merge' && mode!=='replace')fail('Choose merge or replace for this import.');
        var next=mode==='replace'?incoming:mergeStates(state,incoming),serialized=JSON.stringify(next);
        if(bytes(serialized)>MAX_BYTES)fail('The combined records would exceed 2 MB. Import into a separate browser or export and clear an old profile first.');
        state=next;save(serialized);return copy(state);
      },
      resetProfile:function (id) {identity(id,'Profile ID');return change(function (s) {var p=profile(s,id);p.records={};p.reflections={};p.visits={};return p;});},
      storageStatus:function () {return {persistent:persistent,message:statusMessage};}
    };
    return api;
  }
  var api=createStore();
  api.createStore=createStore;
  return api;
}));
