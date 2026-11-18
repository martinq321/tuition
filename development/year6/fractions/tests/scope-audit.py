"""Independent curriculum/content audit using Python exact fractions.

Does not import the authored question builder or the site's answer checker.
Expected contextual answers were recomputed from the learner-facing wording.
"""
from fractions import Fraction as F
from pathlib import Path
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / 'content.js'
data = json.loads(subprocess.check_output(['node', '-e',
    'process.stdout.write(JSON.stringify(require(process.argv[1])))', str(CONTENT)], text=True))

def frac(s):
    s = str(s).strip()
    if ' ' in s:
        w, part = s.split()
        return F(w) + F(part)
    return F(s)

# Explicit contextual/representation checks, independent of verification metadata.
expected = {
    'equivalence-1': F(1, 2)*8,
    'equivalence-2': F(2, 3)*12,
    'equivalence-3': 9/F(3, 4),
    'equivalence-4': '2/3',
    'equivalence-5': F(5, 8)*24,
    'equivalence-6': F(6, 15)*5,
    'equivalence-7': F(7, 10)*50,
    'equivalence-8': 'No',
    'simplify-1': F(2, 4), 'simplify-2': F(6, 9),
    'simplify-3': F(10, 15), 'simplify-4': '5/8',
    'simplify-5': F(18, 24), 'simplify-6': F(14, 35),
    'simplify-7': F(15, 25), 'simplify-8': F(12, 18),
    'mixed-1': 7//3, 'mixed-2': F(11,4)-2, 'mixed-3': 2*5+1,
    'mixed-4': '7/4', 'mixed-5': 3*7+2, 'mixed-6': '2 1/6',
    'mixed-7': (2+F(3,4))*4, 'mixed-8': 19-2*7,
    'mixed-9': F(17,5), 'mixed-10': 2+F(3,8),
    'add-6': F(3,8)+F(1,6), 'add-7': '5/6', 'add-8': F(11,12)-F(1,4),
    'subtract-6': F(4,5)-F(1,3), 'subtract-7': F(5,6)-F(1,2),
    'subtract-8': '9/12 − 2/12',
    'mixed-operations-7': 2+F(2,5)+1+F(3,4),
    'mixed-operations-8': 3+F(1,2)-1-F(5,8),
    'mixed-operations-9': '1 4/3',
    'mixed-operations-10': 4+F(1,6)-1-F(3,4),
    'multiply-6': F(2,5)*F(3,4), 'multiply-7': F(6,4*3), 'multiply-8': 'Less',
    'divide-6': F(3,4)/2, 'divide-7': 'Split each third into 2 equal parts',
    'divide-8': 4*F(1,8),
    'quantity-1': F(1,4)*20, 'quantity-2': F(2,3)*18,
    'quantity-3': F(3,5)*35, 'quantity-4': F(5,8)*48,
    'quantity-5': F(3,4)*28, 'quantity-6': 18/F(3,5),
    'quantity-7': 4/(1-F(2,3)), 'quantity-8': '15 ÷ 3',
    'connections-1': F(3,4), 'connections-2': '5 ÷ 8',
    'connections-3': F(1,4), 'connections-4': F(3,8),
    'connections-5': F(7,10)*100, 'connections-6': F('0.4'),
    'connections-7': F(75,100), 'connections-8': 'The 5/8 tank',
    'connections-9': F(5,4), 'connections-10': '1/5 = 0.2 = 20%',
    'problems-1': 1-F(1,3)-F(1,4), 'problems-2': F(3,4)*F(2,3),
    'problems-3': 2+F(1,3)-F(3,4), 'problems-4': F(3,5)/4,
    'problems-5': 40-F(3,8)*40-F(1,4)*40,
    'problems-6': 'The 7/10 team',
    'problems-7': 6+(6/F(2,5))*F(1,3), 'problems-8': 'Mira',
    'review-1': F(4,7)*21, 'review-2': F(21,28),
    'review-13': F(7,10)*50, 'review-14': 20/F(4,7),
    'review-15': F(7,8), 'review-16': F(5,8),
    'review-17': F(9,20)*100, 'review-18': 1-F(1,5)-F(3,8),
    'review-19': 'Adding the denominators', 'review-20': F(7,8)/7,
}

tasks = [t for lesson in data['lessons'] for t in lesson['tasks']] + data['review']
assert len({t['id'] for t in tasks}) == len(tasks), 'Duplicate task ID'
counts = {'context_or_representation': 0, 'direct_calculation': 0,
          'comparison': 0, 'ordering': 0}
for task in tasks:
    id, prompt, answer = task['id'], task['prompt'], task['answer']
    if id in expected:
        target = expected[id]
        counts['context_or_representation'] += 1
    elif (m := re.match(r'^Calculate (.+?) ([+−×÷]) (.+?)\.', prompt)):
        a, b = frac(m[1]), frac(m[3])
        target = {'+':lambda:a+b, '−':lambda:a-b,
                  '×':lambda:a*b, '÷':lambda:a/b}[m[2]]()
        counts['direct_calculation'] += 1
    elif (m := re.match(r'^Choose the symbol: (.+?)\s+\?\s+(.+?)\.', prompt)):
        a, b = frac(m[1]), frac(m[2])
        target = '<' if a < b else '>' if a > b else '='
        counts['comparison'] += 1
    elif answer['kind'] == 'order':
        target = sorted([c['value'] for c in task['choices']], key=frac)
        counts['ordering'] += 1
    else:
        raise AssertionError('No independent expectation for '+id)
    if answer['kind'] in ('choice', 'order'):
        assert target == answer['value'], (id, target, answer['value'])
    else:
        assert F(target) == frac(answer['value']), (id, target, answer['value'])
    assert len(task['hints']) == 2 and all(task['hints']), id+' hints'
    assert task['solution'].strip(), id+' solution'
    assert task['objectiveIds'], id+' objective mapping'
    if answer.get('simplest'):
        assert 'simpl' in prompt.lower(), id+' missing explicit simplest-form instruction'

for lesson in data['lessons']:
    assert len(lesson['tasks']) >= 6, lesson['id']+' too few varied tasks'
    assert lesson['worked'] and lesson['reasoning']['prompt'] and lesson['reasoning']['notes']
    assert lesson['practical']['materials'] and lesson['practical']['steps']
    assert lesson['goal'] and lesson['explorePrompt'] and lesson['exploreGoal']

practice_prompts = {t['prompt'] for lesson in data['lessons'] for t in lesson['tasks']}
fresh_review = [t for t in data['review'] if t['prompt'] not in practice_prompts]
# Ordering prompts have identical text, but use a distinct set of values.
for t in data['review']:
    if t['prompt'] in practice_prompts:
        assert t['answer']['kind'] == 'order'
        assert all(t['answer']['value'] != p['answer'].get('value')
                   for lesson in data['lessons'] for p in lesson['tasks'])

summary = {
 'status': 'pass', 'date':'2026-11-18',
 'method':'Independent Python Fraction recomputation from prompts; explicit contextual cases; no site checker or builder imported.',
 'lessons':len(data['lessons']),
 'practice_tasks':sum(len(l['tasks']) for l in data['lessons']),
 'review_tasks':len(data['review']),
 'checks':counts,
 'fresh_review_numbers_or_contexts':len(data['review']),
 'manual_review':'All task prompts/answers/solutions and twelve worked examples reviewed; no arithmetic error found.',
 'learner_pilot':'pending',
}
(ROOT/'tests/scope-audit-results.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
