/* Site-wide maths answer entry. Plain text, admin fields and model settings remain native. */
(() => {
  'use strict';
  if (window.MWNumericKeypad) return;
  const script = document.currentScript;
  if (!document.querySelector('link[data-mw-keypad-css]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.dataset.mwKeypadCss = '';
    css.href = new URL('../css/numeric-keypad.css', script.src).href;
    document.head.append(css);
  }
  const touch = window.matchMedia('(any-pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  const numericHint = ':is([inputmode="numeric"],[inputmode="decimal"],[type="number"])';
  const selector = ['input[data-mw-keypad]', 'input:is(.answer,#answer,[name="answer"],[data-part])' + numericHint,
    'input[type="number"][id^="guess"]', 'input#prediction[type="number"]'].join(',');
  const records = new WeakMap();
  let current = null;
  let always = null;
  const modes = {
    whole: /^[0-9]*$/, integer: /^[+\-0-9]*$/,
    decimal: /^[+\-.0-9]*$/, fraction: /^[+\-./ 0-9]*$/
  };

  function setup(input) {
    if (records.has(input)) return records.get(input);
    if (!input.matches(selector) || input.closest('[data-mw-native]')) return null;
    const hostId = input.getAttribute('data-mw-keypad-host');
    const host = hostId && document.getElementById(hostId);
    if (!host && (input.readOnly || !touch)) return null;
    const mode = input.dataset.mwKeypad || (input.inputMode === 'decimal' || input.type === 'number' ? 'decimal' : 'whole');
    if (!modes[mode]) return null;
    const record = {input, host, mode, native: false, initialReadOnly: input.readOnly, initialMode: input.getAttribute('inputmode'),
      buffer: null, selected: false, panel: null, live: null};
    records.set(input, record);
    input.readOnly = true;
    input.inputMode = 'none';
    if (host) {
      always = record;
      makePanel(record);
    }
    return record;
  }

  function closeNative(record) {
    if (!record.native) return;
    record.native = false;
    if (document.activeElement === record.input) record.input.blur();
    record.input.readOnly = true;
    record.input.inputMode = 'none';
    record.modeButton?.setAttribute('aria-pressed', 'false');
    if (record.modeButton) record.modeButton.textContent = 'Use device keyboard';
  }

  function closePanel(record) {
    closeNative(record);
    record.buffer = null;
    if (record.panel && !record.host) {
      record.panel.remove();
      record.panel = null;
    }
    if (current === record) current = null;
  }

  function focusInput(record) {
    record.input.focus({preventScroll: true});
  }

  function write(record, command, pasted = false) {
    const input = record.input;
    if (input.disabled) return;
    const raw = record.buffer === null ? input.value : record.buffer;
    const start = record.selected ? 0 : input.selectionStart ?? raw.length;
    const end = record.selected ? raw.length : input.selectionEnd ?? raw.length;
    let next, caret;
    if (!pasted && command === 'clear') { next = ''; caret = 0; }
    else if (!pasted && command === 'erase') {
      caret = start === end ? Math.max(0, start - 1) : start;
      next = raw.slice(0, caret) + raw.slice(end);
    } else if (!pasted && command === 'delete') {
      caret = start;
      next = raw.slice(0, start) + raw.slice(start === end ? end + 1 : end);
    } else {
      next = raw.slice(0, start) + command + raw.slice(end);
      caret = start + command.length;
    }
    if (!modes[record.mode].test(next) || (input.maxLength >= 0 && next.length > input.maxLength)) return;
    record.selected = false;
    input.value = next;
    // A number-type input cannot represent a partial sign or decimal point.
    record.buffer = input.value === next ? null : next;
    if (input.selectionStart !== null) input.setSelectionRange(caret, caret);
    input.dispatchEvent(new Event('input', {bubbles: true}));
    if (record.live) record.live.textContent = next ? 'Your answer: ' + next : 'Answer cleared.';
  }

  function makePanel(record) {
    if (record.panel) return;
    const panel = record.host || document.createElement('div');
    panel.classList.add('mw-number-pad');
    panel.setAttribute('role', 'group');
    panel.setAttribute('aria-label', 'Answer keypad');
    if (!record.host) {
      const anchor = record.input.closest('label') || record.input;
      anchor.after(panel);
    }
    const keys = document.createElement('div');
    keys.className = 'mw-number-keys';
    const buttons = [['1','1'],['2','2'],['3','3'],['4','4'],['5','5'],['6','6'],['7','7'],['8','8'],['9','9'],['clear','Clear'],['0','0'],['erase','⌫']];
    if (record.mode !== 'whole') buttons.push(['-','−']);
    if (record.mode === 'decimal' || record.mode === 'fraction') buttons.push(['.','.']);
    if (record.mode === 'fraction') buttons.push(['/','/'],[' ','Space']);
    for (const [key, name] of buttons) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = name;
      button.dataset.key = key;
      const accessibleNames = {clear:'Clear answer', erase:'Delete last digit or selection', '-':'Minus', '.':'Decimal point', '/':'Fraction bar', ' ':'Mixed number space'};
      if (accessibleNames[key]) button.setAttribute('aria-label', accessibleNames[key]);
      button.addEventListener('click', event => {
        if (record.input.disabled) return;
        closeNative(record);
        write(record, key);
        if (event.detail > 0) focusInput(record);
      });
      keys.append(button);
    }
    const keyboard = document.createElement('button');
    keyboard.type = 'button';
    keyboard.className = 'mw-device-keyboard';
    keyboard.setAttribute('aria-pressed', 'false');
    keyboard.textContent = 'Use device keyboard';
    keyboard.addEventListener('click', () => {
      if (record.input.disabled) return;
      if (record.native) { closeNative(record); return; }
      // A touch browser may leave the answer focused while a button is tapped.
      // Re-enter it during this explicit tap so the device can open its keyboard.
      if (document.activeElement === record.input) record.input.blur();
      record.native = true;
      record.buffer = null;
      record.input.readOnly = false;
      record.input.inputMode = record.mode === 'whole' ? 'numeric' : record.mode === 'decimal' ? 'decimal' : 'text';
      keyboard.setAttribute('aria-pressed', 'true');
      keyboard.textContent = 'Use on-screen keypad';
      focusInput(record);
    });
    const live = document.createElement('span');
    live.className = 'mw-keypad-sr';
    live.setAttribute('role','status');
    live.setAttribute('aria-live','polite');
    panel.replaceChildren(keys, keyboard, live);
    record.panel = panel;
    record.modeButton = keyboard;
    record.live = live;
  }

  function activate(input) {
    const record = setup(input);
    if (!record || input.disabled) return;
    if (current && current !== record) closePanel(current);
    current = record;
    makePanel(record);
  }

  function scan(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches?.(selector)) setup(root);
    root.querySelectorAll(selector).forEach(setup);
  }

  document.addEventListener('pointerdown', event => {
    if (event.target instanceof HTMLInputElement) activate(event.target);
  }, true);
  document.addEventListener('focusin', event => {
    if (event.target instanceof HTMLInputElement) activate(event.target);
    if (current && event.target !== current.input && !current.panel?.contains(event.target))
      closePanel(current);
  });
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return;
    const target = event.target;
    const record = records.get(target) ||
      (current?.panel?.contains(target) ? current : target === document.body ? always : null);
    if (!record || record.native || record.input.disabled) return;
    if (event.key === 'Enter') {
      if (target instanceof HTMLButtonElement) return;
      const id = record.input.getAttribute('data-mw-submit');
      const submit = id && document.getElementById(id);
      if (submit) { event.preventDefault(); submit.click(); }
      return;
    }
    if (event.key === ' ' && target instanceof HTMLButtonElement) return;
    const command = event.key === 'Backspace' ? 'erase' : event.key === 'Delete' ? 'delete' : event.key;
    if (command === 'erase' || command === 'delete' || (command.length === 1 && modes[record.mode].test(command))) {
      event.preventDefault();
      write(record, command);
    }
  });
  document.addEventListener('paste', event => {
    const record = records.get(event.target);
    if (!record || record.native || record.input.disabled) return;
    const value = event.clipboardData?.getData('text');
    if (!value) return;
    event.preventDefault();
    write(record, value.trim(), true);
  });
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') mutation.addedNodes.forEach(scan);
      else if (mutation.attributeName === 'data-mw-keypad') setup(mutation.target);
      else if (mutation.attributeName === 'data-mw-native') {
        const parent = mutation.target;
        if (!parent.hasAttribute('data-mw-native')) { scan(parent); continue; }
        for (const input of parent.matches('input') ? [parent] : parent.querySelectorAll('input')) {
          const record = records.get(input);
          if (!record) continue;
          closePanel(record);
          if (always === record) always = null;
          if (record.host) record.host.replaceChildren();
          records.delete(input);
          input.readOnly = record.initialReadOnly;
          if (record.initialMode === null) input.removeAttribute('inputmode');
          else input.inputMode = record.initialMode;
        }
      }
    }
    if (current && (!current.input.isConnected || current.input.disabled)) closePanel(current);
    if (always && !always.input.isConnected) always = null;
    if (always?.panel) {
      const disabled = always.input.disabled;
      if (always.panel.dataset.disabled !== String(disabled)) {
        always.panel.dataset.disabled = String(disabled);
        always.panel.querySelectorAll('button').forEach(button => {button.disabled = disabled;});
      }
    }
  });
  // A streaming parser can insert a field before its keypad host exists.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => scan(document), {once:true});
  document.addEventListener('submit', event => {
    for (const input of event.target.elements || []) {
      const record = records.get(input);
      if (!record || record.native || input.disabled || !input.readOnly) continue;
      // Readonly prevents OS keyboard entry but also removes native constraint checks.
      // Evaluate the original controls without focusing an editable field.
      input.readOnly = false;
      const error = input.validity.valid ? '' : input.validationMessage;
      input.readOnly = true;
      if (error) {
        event.preventDefault();
        event.stopImmediatePropagation();
        focusInput(record);
        if (record.live) {
          record.live.classList.remove('mw-keypad-sr');
          record.live.textContent = error;
        }
        return;
      }
    }
  }, true);
  scan(document);
  observer.observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['disabled','data-mw-keypad','data-mw-native']});
  window.MWNumericKeypad = {
    reset(input) {
      const record = setup(input);
      if (record) { closeNative(record); record.buffer = null; record.selected = false; }
    },
    retry(input) {
      const record = setup(input);
      if (record) record.selected = true;
      if (!input.readOnly) input.select();
    }
  };
})();
