(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const data = window.MW_CURRICULUM_MAP;
  const arr = (value) => Array.isArray(value) ? value : [];
  const text = (value) => value == null ? '' : String(value);
  const esc = (value) => text(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const human = (value) => text(value).replace(/[_-]+/g, ' ').replace(/^./, c => c.toUpperCase());
  const describe = (value) => {
    if (value == null) return '';
    if (typeof value !== 'object') return text(value);
    if (Array.isArray(value)) return value.map(describe).filter(Boolean).join('; ');
    return Object.entries(value).map(([key, item]) => human(key) + ': ' + describe(item)).join('; ');
  };
  const href = (path) => {
    const p = text(path).trim();
    return p && !/^(?:[a-z]+:|\/\/)/i.test(p) ? '../../' + p.replace(/^\/+/, '') : '';
  };
  const sourceUrl = (source) => {
    const url = text(source && (source.url || source.href));
    return /^https?:\/\//i.test(url) ? url : '';
  };
  const slug = (value) => text(value).replace(/[^a-z0-9_-]/gi, '-');
  if (!data || !Array.isArray(data.stages) || !Array.isArray(data.activities)) {
    $('map-data-error').hidden = false;
    $('curriculum-panel').hidden = true;
    $('audit-panel').hidden = true;
    $('filter-summary').textContent = 'The curriculum data is not available.';
    document.querySelectorAll('.map-filters input,.map-filters select,.map-filters button,.map-tabs button').forEach(el => { el.disabled = true; });
    return;
  }
  const stages = data.stages;
  const activities = data.activities;
  const sources = arr(data.sources);
  const sourceById = new Map(sources.map(s => [s.id, s]));
  const activityById = new Map(activities.map(a => [a.id, a]));
  const objectiveById = new Map();
  stages.forEach(stage => arr(stage.domains).forEach(domain => arr(domain.objectives).forEach(objective => objectiveById.set(objective.id, {objective, stage, domain}))));
  let view = new URLSearchParams(location.search).get('view') === 'audit' ? 'audit' : 'curriculum';
  let stageId = new URLSearchParams(location.search).get('stage') || 'all';
  if (!stages.some(stage => stage.id === stageId)) stageId = 'all';
  let query = '', status = 'all';
  $('stage-filter').innerHTML = '<option value="all">All stages</option>' + stages.map(stage => `<option value="${esc(stage.id)}">${esc(stage.title)}</option>`).join('');
  $('stage-filter').value = stageId;
  function badge(value, objective = false) {
    const name = objective ? ({partial:'Partly supported',planned:'Planned'}[value] || 'Coverage not recorded') : human(value || 'Not recorded');
    return `<span class="map-badge ${value === 'partial' || value === 'planned' ? value : ''}">${esc(name)}</span>`;
  }
  function sourceReference(reference) {
    if (!reference || !reference.source_id) return '';
    const source = sourceById.get(reference.source_id);
    const label = source ? (source.title || source.name || source.id) : reference.source_id;
    const section = reference.section ? ' · ' + describe(reference.section) : '';
    return `<p class="map-ref">Reference: <a class="map-inline-link" href="#source-${slug(reference.source_id)}">${esc(label)}</a>${esc(section)}</p>`;
  }
  function list(items, ordered = false) {
    const values = arr(items).filter(v => v != null && describe(v));
    if (!values.length) return '';
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}>${values.map(v => `<li>${esc(describe(v))}</li>`).join('')}</${tag}>`;
  }
  function prerequisites(items) {
    if (!arr(items).length) return '<p>No prerequisites recorded yet.</p>';
    return '<ul>' + items.map(item => {
      const key = typeof item === 'object' ? item.id : item;
      const linked = objectiveById.get(key);
      return linked ? `<li><a class="map-inline-link" href="?stage=${encodeURIComponent(linked.stage.id)}#goal-${slug(key)}">${esc(linked.objective.title)}</a> <span class="map-ref">(${esc(linked.stage.title)})</span></li>` : `<li>${esc(describe(item))}</li>`;
    }).join('') + '</ul>';
  }
  function objectiveMarkup(objective, stage, domain) {
    const linked = arr(objective.activity_ids).map(id => activityById.get(id)).filter(Boolean);
    const resources = [...new Set(arr(objective.resource_paths))].filter(path => href(path));
    const resourceEvidence = describe(objective.resource_evidence);
    const linkedLabel = [linked.length ? `${linked.length} linked activit${linked.length === 1 ? 'y' : 'ies'}` : '', resources.length ? `${resources.length} existing workshop${resources.length === 1 ? '' : 's'}` : ''].filter(Boolean).join(' · ');
    const accessibility = list(objective.accessibility);
    const evidence = list(objective.evidence);
    const steps = list(objective.small_steps, true);
    const gap = describe(objective.gap);
    return `<article class="map-card" id="goal-${slug(objective.id)}">
      <div class="map-card-top">${badge(objective.status,true)}${objective.tier ? `<span class="map-ref">${esc(objective.tier)}</span>` : ''}</div>
      <h4>${esc(objective.title)}</h4>
      ${objective.accessible_entry ? `<p class="map-entry">${esc(describe(objective.accessible_entry))}</p>` : ''}
      <p class="map-linked-count">${linkedLabel || 'No linked activity yet'}</p>
      <details><summary>Steps, activities & evidence</summary>
        ${objective.formal_goal ? `<h5>Formal goal</h5><p>${esc(describe(objective.formal_goal))}</p>` : ''}
        <h5>Small steps</h5>${steps || '<p>The teaching sequence is still to be planned.</p>'}
        <h5>Before this</h5>${prerequisites(objective.prerequisites)}
        <h5>Activities to explore</h5>${linked.length || resources.length ? `<ul class="map-activity-links">${linked.map(a => href(a.path) ? `<li><a href="${esc(href(a.path))}">${esc(a.title)}</a></li>` : `<li>${esc(a.title)} · link not recorded</li>`).join('')}${resources.map(path => `<li><a href="${esc(href(path))}">Existing workshop <span class="map-resource-file">${esc(text(path).split('/').pop())}</span></a></li>`).join('')}</ul>` : '<p>An activity still needs to be added for this goal.</p>'}
        ${objective.activity_relationship ? `<p class="map-ref">${esc(describe(objective.activity_relationship))}</p>` : ''}
        ${resourceEvidence ? `<h5>Workshop evidence</h5><p>${esc(resourceEvidence)}</p>` : ''}
        ${accessibility ? `<h5>Ways to make it accessible</h5>${accessibility}` : ''}
        <h5>Look for evidence</h5>${evidence || '<p>Evidence prompts still need to be developed.</p>'}
        ${gap ? `<h5>What is missing?</h5><p class="map-gap">${esc(gap)}</p>` : ''}
        ${sourceReference(objective.official_reference)}
      </details>
    </article>`;
  }
  function matches(value) { return !query || JSON.stringify(value).toLowerCase().includes(query); }
  function selectedStages() { return stageId === 'all' ? stages : stages.filter(stage => stage.id === stageId); }
  function renderCurriculum() {
    let found = 0, planned = 0, partial = 0;
    const markup = selectedStages().map(stage => {
      const domains = arr(stage.domains).map(domain => {
        const goals = arr(domain.objectives).filter(goal => (status === 'all' || goal.status === status) && matches({stage:stage.title,domain:domain.title,goal}));
        if (!goals.length) return '';
        found += goals.length; planned += goals.filter(g => g.status === 'planned').length; partial += goals.filter(g => g.status === 'partial').length;
        return `<section class="map-domain" aria-labelledby="domain-${slug(stage.id)}-${slug(domain.id)}"><div class="map-domain-head"><h3 id="domain-${slug(stage.id)}-${slug(domain.id)}">${esc(domain.title)}</h3><span class="map-domain-count">${goals.length} goal${goals.length === 1 ? '' : 's'}</span></div><div class="map-objectives">${goals.map(goal => objectiveMarkup(goal, stage, domain)).join('')}</div></section>`;
      }).join('');
      if (!domains) return '';
      return `<section class="map-stage" aria-labelledby="stage-${slug(stage.id)}"><h2 class="map-stage-title" id="stage-${slug(stage.id)}">${esc(stage.title)}</h2>${stage.scope_note ? `<p class="map-scope">${esc(describe(stage.scope_note))}</p>` : ''}${domains}</section>`;
    }).join('');
    $('curriculum-content').innerHTML = markup;
    $('coverage-counts').innerHTML = [[found,'Matching goals'],[partial,'Partly supported'],[planned,'Planned']].map(([n,label]) => `<div class="map-measure"><strong>${n}</strong><span>${label}</span></div>`).join('');
    $('map-empty').hidden = found > 0;
    $('filter-summary').textContent = `${found} curriculum goal${found === 1 ? '' : 's'} shown${stageId === 'all' ? ' across all stages' : ' in ' + selectedStages()[0].title}.`;
  }
  function activityMarkup(activity) {
    const evidence = activity.evidence || {};
    const checks = list(evidence.source_checks);
    const runtime = describe(evidence.runtime);
    const access = list(activity.accessibility);
    const gaps = list(activity.gaps);
    const paths = arr(evidence.source_paths);
    const domains = arr(activity.curriculum_domains);
    return `<article class="map-audit-card" id="activity-${slug(activity.id)}">
      <div class="map-card-top"><span class="map-audit-category">${esc(activity.category || 'Activity')}</span>${badge(activity.status)}</div>
      <h3>${esc(activity.title)}</h3><p class="map-entry">${esc(describe(activity.interaction_summary))}</p>
      <div class="map-audit-links">${href(activity.path) ? `<a href="${esc(href(activity.path))}">Open activity</a>` : ''}${href(activity.student_path) && activity.student_path !== activity.path ? `<a href="${esc(href(activity.student_path))}">Student version</a>` : ''}</div>
      <details><summary>Teaching possibilities</summary>
        <h4>Accessible entry</h4><p>${esc(describe(activity.accessible_entry) || 'Not recorded yet.')}</p>
        <h4>Formal extension</h4><p>${esc(describe(activity.formal_extension) || 'Not recorded yet.')}</p>
        <h4>Before this</h4>${prerequisites(activity.prerequisites)}
        ${domains.length ? `<h4>Curriculum connections</h4>${list(domains)}` : ''}
        ${access ? `<h4>Access and support</h4>${access}` : ''}
      </details>
      <details><summary>Checks & work still needed</summary>
        <h4>Source checks</h4>${checks || '<p>No source checks recorded.</p>'}
        <h4>Runtime and device testing</h4><p>${esc(runtime || 'No runtime test recorded. This does not establish that the activity works on every device.')}</p>
        ${paths.length ? `<h4>Files inspected</h4><ul>${paths.map(path => `<li><code>${esc(describe(path))}</code></li>`).join('')}</ul>` : ''}
        <h4>Work still needed</h4>${gaps || '<p>No specific gaps recorded. This is not a claim of complete coverage or testing.</p>'}
      </details>
    </article>`;
  }
  function renderAudit() {
    const ids = new Set(selectedStages().flatMap(s => arr(s.domains).flatMap(d => arr(d.objectives).flatMap(o => arr(o.activity_ids)))));
    const eligible = stageId === 'all' ? activities : activities.filter(a => ids.has(a.id));
    const found = eligible.filter(activity => (status === 'all' || (activity.status || 'not-recorded') === status) && matches(activity));
    $('audit-content').innerHTML = `<div class="map-audit-grid">${found.map(activityMarkup).join('')}</div>`;
    $('map-empty').hidden = found.length > 0;
    $('filter-summary').textContent = `${found.length} of ${eligible.length} activit${eligible.length === 1 ? 'y' : 'ies'} shown${stageId === 'all' ? '' : ' linked to ' + selectedStages()[0].title}.`;
  }
  function updateUrl() {
    try {
      const url = new URL(location.href);
      stageId === 'all' ? url.searchParams.delete('stage') : url.searchParams.set('stage',stageId);
      view === 'curriculum' ? url.searchParams.delete('view') : url.searchParams.set('view',view);
      history.replaceState(null,'',url);
    } catch (_) { /* Some file browsers do not allow replaceState. Filtering still works. */ }
  }
  function render() { view === 'curriculum' ? renderCurriculum() : renderAudit(); updateUrl(); }
  function setView(next, focus = false) {
    view = next; status = 'all';
    document.querySelectorAll('[data-view]').forEach(button => {const active = button.dataset.view === view;button.setAttribute('aria-selected',String(active));button.tabIndex = active ? 0 : -1; if(active && focus) button.focus();});
    $('curriculum-panel').hidden = view !== 'curriculum';$('audit-panel').hidden = view !== 'audit';
    $('status-label').textContent = view === 'curriculum' ? 'Coverage' : 'Audit status';
    const choices = view === 'curriculum' ? [['partial','Partly supported'],['planned','Planned']] : [...new Set(activities.map(a => a.status || 'not-recorded'))].sort().map(s => [s,human(s)]);
    $('status-filter').innerHTML = `<option value="all">${view === 'curriculum' ? 'All coverage' : 'All statuses'}</option>` + choices.map(([value,label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
    render();
  }
  function clearFilters() {stageId='all';query='';status='all';$('stage-filter').value='all';$('map-search').value='';$('status-filter').value='all';render();}
  $('stage-filter').addEventListener('change',event => {stageId=event.target.value;render();});
  $('status-filter').addEventListener('change',event => {status=event.target.value;render();});
  $('map-search').addEventListener('input',event => {query=event.target.value.trim().toLowerCase();render();});
  $('clear-filters').addEventListener('click',clearFilters);$('empty-clear').addEventListener('click',clearFilters);
  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click',() => setView(button.dataset.view));
    button.addEventListener('keydown',event => {if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setView(event.key==='Home'?'curriculum':event.key==='End'?'audit':view==='curriculum'?'audit':'curriculum',true);}});
  });
  $('source-list').innerHTML = sources.length ? '<ol class="map-source-list">' + sources.map(source => `<li id="source-${slug(source.id)}">${sourceUrl(source) ? `<a class="map-inline-link" href="${esc(sourceUrl(source))}" target="_blank" rel="noopener">${esc(source.title || source.name || source.id)}<span class="sr-only"> (opens in a new tab)</span></a>` : esc(source.title || source.name || source.id)}${source.publisher ? `<small>${esc(source.publisher)}</small>` : ''}${source.notes || source.note || source.scope ? `<small>${esc(describe(source.notes || source.note || source.scope))}</small>` : ''}${source.retrieved ? `<small>Retrieved: ${esc(describe(source.retrieved))}</small>` : ''}</li>`).join('') + '</ol>' : '<p>No source list recorded.</p>';
  const meta = data.meta || {};
  const date = meta.updated || meta.updated_at || meta.generated || meta.generated_at || meta.date;
  $('map-meta').textContent = [date ? 'Map updated: '+text(date) : '',meta.note ? describe(meta.note) : '',meta.version ? 'Version '+meta.version : ''].filter(Boolean).join(' · ');
  document.addEventListener('click',event => {const link=event.target.closest('a[href^="#source-"]');if(link){const details=document.querySelector('.map-sources');details.open=true;}});
  setView(view);
  if(location.hash.startsWith('#goal-')) {
    const goal=document.getElementById(location.hash.slice(1));
    if(goal){const details=goal.querySelector('details');if(details)details.open=true;goal.scrollIntoView({block:'start'});}
  }
})();
