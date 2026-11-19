#!/usr/bin/env python3
"""Audit public learner HTML and its generated numeric inputs. No third-party packages."""
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
EXCLUDE = {'.git', 'Platform-pilot', 'Handoff', 'node_modules'}
# These are model settings, dimensions, solver positions and configuration values.
# A new numeric control must be recognised as a response, marked data-mw-native,
# or classified here so a future answer cannot silently open the device keyboard.
SETTINGS = set('''size start divisor a b truckLoad axleSpacing diameter thickness kfactor xCoord yCoord
zCoord n length age depth height traceindex target number0 number1 number2 number customR customC
placeX placeY x total max width placeRow placeColumn shift'''.split()) | {'${id}exact'}
MODES = {'whole', 'integer', 'decimal', 'fraction'}
FOCUS = re.compile(r'''(?:getElementById|\$)\(\s*["']([\w-]+)["']\s*\)\.focus\(''')
INPUT = re.compile(r'<input\b[^>]*>', re.I)
counts = Counter()
problems = []


class Controls(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inputs = []
        self.scripts = []

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'input':
            self.inputs.append(attrs)
        if tag == 'script' and attrs.get('src'):
            self.scripts.append(urlsplit(attrs['src']).path)


def classify(a, path, focused):
    ident = a.get('id', '')
    mode = a.get('inputmode', '')
    explicit = a.get('data-mw-keypad')
    numeric = mode in {'numeric', 'decimal'} or a.get('type') == 'number'
    if explicit is not None and explicit not in MODES:
        problems.append(f'{path}: unrecognised keypad mode {explicit!r}')
    if explicit or (numeric and (ident in {'answer', 'prediction'} or ident.startswith('guess') or
            a.get('name') == 'answer' or 'answer' in a.get('class', '').split() or 'data-part' in a)):
        result = 'answer controls'
    elif path.parent.as_posix() == 'development/year5/units' and ident == 'answer':
        # One shared renderer configures written answers after finding the unit's response type.
        result = 'Year 5 adaptive fields'
    elif numeric and ('data-mw-native' in a or ident in SETTINGS or 'data-count' in a):
        result = 'model and configuration controls'
    elif numeric:
        problems.append(f'{path}: classify numeric input {ident or a.get("name")!r}')
        return False
    else:
        return False
    counts[result] += 1
    if ('autofocus' in a or ident and ident in focused) and result == 'model and configuration controls':
        problems.append(f'{path}: programmatically focused editable numeric setting {ident!r}')
    if 'autofocus' in a and 'readonly' not in a:
        problems.append(f'{path}: remove editable native autofocus on {ident!r}')
    return result != 'model and configuration controls'


def main():
    site = [p.relative_to(ROOT) for p in ROOT.rglob('*')
            if not EXCLUDE.intersection(p.relative_to(ROOT).parts) and p.is_file()]
    generated = set()
    source = {}
    for path in sorted(p for p in site if p.suffix == '.js'):
        src = (ROOT / path).read_text()
        source[path] = src
        if '.focus(' in src:
            counts['JS files with programmatic focus'] += 1
        if '<input' not in src.lower():
            continue
        controls = Controls()
        controls.feed(''.join(INPUT.findall(src)))
        if any([classify(a, path, set(FOCUS.findall(src))) for a in controls.inputs]):
            generated.add(path)
    for path in sorted(p for p in site if p.suffix == '.html'):
        parsed = Controls()
        parsed.feed((ROOT / path).read_text())
        scripts = {(path.parent / s if not s.startswith('/') else Path(s[1:])) for s in parsed.scripts}
        scripts = {(ROOT / s).resolve().relative_to(ROOT) for s in scripts
                   if (ROOT / s).resolve().is_relative_to(ROOT)}
        focus = {i for s in scripts for i in FOCUS.findall(source.get(s, ''))}
        guarded = bool(scripts & {Path('mw-design/themes.js'), Path('assets/js/numeric-keypad.js')})
        counts['public pages'] += 1
        counts['pages with shared input loader'] += guarded
        answers = any([classify(a, path, focus) for a in parsed.inputs]) or bool(scripts & generated)
        if answers:
            counts['pages with static or generated response controls'] += 1
            if not guarded:
                problems.append(f'{path}: needs the shared input loader')
    workshop = source[Path('development/year5/units/workshop.js')]
    if "dataset.mwKeypad='fraction'" not in workshop or 'numeric-keypad.js' not in source[Path('mw-design/themes.js')]:
        problems.append('Year 5 adaptive answer fields and the site shell must initialise the shared component.')
    for path in ['puzzles/sessions/tables.html', 'students/sessions/tables.html']:
        page = Controls()
        page.feed((ROOT / path).read_text())
        answer = next((a for a in page.inputs if a.get('id') == 'answer'), {})
        if 'readonly' not in answer or answer.get('inputmode') != 'none' or answer.get('data-mw-keypad-host') != 'keys':
            problems.append(f'{path}: the initial Times Tables field must be keyboard-safe even while scripts load')
    for name, count in sorted(counts.items()):
        print(f'{count:3} {name}')
    if problems:
        raise SystemExit('\n'.join(problems))


if __name__ == '__main__':
    main()
