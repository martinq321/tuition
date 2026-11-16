"""Deterministic question families. Answers are exact Fractions, never model guesses."""
from fractions import Fraction
from math import gcd
import random
TEMPLATES=[
 {'id':'addition','title':'Addition & exchange','stage':'KS2','theme':'Number & patterns','materials':'Place-value counters or paper labelled ones, tens, hundreds and thousands.','parent':'Ask what each digit represents. Exchange ten counters for one in the next column; ask why the total stays unchanged.'},
 {'id':'subtraction','title':'Subtraction & exchange','stage':'KS2','theme':'Number & patterns','materials':'Place-value counters and a place-value grid.','parent':'Ask whether there are enough counters to remove in each column. Exchange one larger unit for ten smaller units; do not describe it as changing the value.'},
 {'id':'difference','title':'Totals and differences','stage':'KS2','theme':'Number & patterns','materials':'Two strips of paper or a bar diagram.','parent':'Try removing the extra part before sharing the remainder equally. Compare with sharing equally first and transferring half the difference.'},
 {'id':'remainder','title':'Parts and the whole','stage':'KS2','theme':'Number & patterns','materials':'Three paper bars arranged to make a total.','parent':'Identify the whole and the known parts. Add the known parts, then find what is missing. Categories are explicitly separate.'},
 {'id':'multiplication','title':'Equal groups & multiplication','stage':'KS2','theme':'Number & patterns','materials':'Counters, buttons or squared paper.','parent':'Ask for an array or equal groups. Accept a different efficient method and ask the learner to explain it.'},
 {'id':'division','title':'Division and leftovers','stage':'KS2','theme':'Number & patterns','materials':'Counters and small bowls.','parent':'Make equal groups. Count full groups and inspect what remains. Connect the remainder to the context.'},
 {'id':'fractions','title':'Fractions of quantities','stage':'KS2','theme':'Number & patterns','materials':'Counters or a strip divided into equal parts.','parent':'Find one equal part first, then take the required number of parts.'},
 {'id':'percent','title':'Percentages','stage':'KS2 / KS3','theme':'Number & patterns','materials':'A hundred-square or bar model.','parent':'Connect percentage to out of one hundred. Look for useful benchmarks such as 10%, 25% or 50%.'},
 {'id':'ratio','title':'Sharing in a ratio','stage':'KS3','theme':'Number & patterns','materials':'Equal-size paper blocks in two colours.','parent':'Count the total number of equal parts. Find one part, then build each share. Check both total and ratio.'},
 {'id':'equation','title':'Balancing equations','stage':'KS3','theme':'Algebra & proof','materials':'A drawn balance or identical boxes and counters.','parent':'Ask which operation will undo the last step. Whatever is done to one side must be done to the other.'},
 {'id':'area','title':'Area and perimeter','stage':'KS2','theme':'Shape & construction','materials':'Squared paper and string.','parent':'Distinguish covering the inside from measuring the boundary. Ask which units belong to each.'},
 {'id':'coordinates','title':'Coordinate journeys','stage':'KS2 / KS3','theme':'Curves & motion','materials':'Squared paper and a small counter.','parent':'Read across before up. A horizontal move changes x; a vertical move changes y. Plot both points.'},
 {'id':'time','title':'Elapsed time','stage':'KS2','theme':'Everyday mathematics','materials':'A clock face or number line.','parent':'Bridge to the next hour, then continue. Remember that an hour contains 60 minutes, not 100.'},
 {'id':'mean','title':'Mean from data','stage':'KS2 / KS3','theme':'Data & chance','materials':'Counters grouped into four piles.','parent':'Redistribute the piles evenly, keeping the total unchanged. Connect this to adding and dividing.'}
]
BY_ID={t['id']:t for t in TEMPLATES}
def exchanges(a,b,op,digits):
 carry=0;events=[]
 for col in range(digits):
  x=a//10**col%10;y=b//10**col%10
  raw=x+y+carry if op=='addition' else x-y-carry
  carry=int(raw>=10 if op=='addition' else raw<0)
  if carry:events.append(col)
 return events

def question(topic,r,digits=3,mode='one',level='intro'):
 def q(prompt,answer,method,hint,**meta):return dict(prompt=prompt,answer=str(Fraction(answer)),method=method,hint=hint,**meta)
 n=12 if level=='intro' else 30
 if topic in ('addition','subtraction'):
  lo=10**(digits-1);hi=10**digits-1
  for _ in range(20000):
   a=r.randint(lo,hi);b=r.randint(lo,hi)
   if topic=='subtraction' and b>a:a,b=b,a
   events=exchanges(a,b,topic,digits)
   if (mode=='none' and len(events)==0) or (mode=='one' and len(events)==1) or (mode=='multiple' and len(events)>=2):break
  else:raise ValueError('Could not generate the requested exchange pattern.')
  ans=a+b if topic=='addition' else a-b;op='+' if topic=='addition' else '−'
  steps=[];carry=0
  places=['ones','tens','hundreds','thousands','ten-thousands']
  for col in range(digits):
   x=a//10**col%10;y=b//10**col%10;old=carry
   raw=x+y+old if topic=='addition' else x-y-old
   carry=int(raw>=10 if topic=='addition' else raw<0);out=raw%10
   if topic=='addition':steps.append(f'{places[col].capitalize()}: {x} + {y}'+(f' + {old} carried' if old else '')+f' = {raw}. Write {out}'+('; exchange 10 for 1 in the next column.' if carry else '.'))
   else:steps.append(f'{places[col].capitalize()}: {x}'+(' less the 1 exchanged to the previous column' if old else '')+(f'; exchange 1 from the next column to add 10 here' if carry else '')+f'. Subtract {y}; write {out}.')
  if topic=='addition' and carry:steps.append('Write the final carried 1 in a new left-hand column.')
  check=f'Check: {ans} − {b} = {a}.' if topic=='addition' else f'Check: {ans} + {b} = {a}.'
  return q(f'{a:,} {op} {b:,} = ?',ans,steps+[check],'Start with the ones. Say what each exchange represents.',a=a,b=b,operation=topic,exchange_columns=events,digits=digits)
 if topic=='difference':
  small=2*r.randint(5,50);diff=2*r.randint(1,15);large=small+diff;total=small+large
  return q(f'Ada and Ben have {total}p altogether. Ada has {diff}p more than Ben. How many pence does Ben have?',small,[f'Remove the extra {diff}p: {total} − {diff} = {2*small}.',f'Share equally: {2*small} ÷ 2 = {small}p.',f'Alternative: half the total is {Fraction(total,2)}p. Transfer half the difference ({diff//2}p) from Ben to Ada.'],'Draw two bars with one extra piece.',diagram={'type':'parts','labels':['Ben','Ben','extra'],'values':[small,small,diff]})
 if topic=='remainder':
  parts=[r.randint(2,20)*10 for _ in range(3)];total=sum(parts)
  return q(f'A box contains {total} counters: {parts[0]} red, {parts[1]} blue, and the rest yellow. Every counter has exactly one colour. How many are yellow?',parts[2],[f'Known parts: {parts[0]} + {parts[1]} = {parts[0]+parts[1]}.',f'Missing part: {total} − {parts[0]+parts[1]} = {parts[2]}.'],'Add the known parts before subtracting from the whole.',diagram={'type':'parts','labels':['red','blue','yellow'],'values':parts})
 if topic=='multiplication':
  a=r.randint(2,n);b=r.randint(2,12)
  return q(f'{a} rows each contain {b} counters. How many counters altogether?',a*b,[f'{a} equal groups of {b}: {a} × {b} = {a*b}.',f'Check: {a*b} ÷ {b} = {a}.'],'Make an array, or split one factor into easier parts.',a=a,b=b)
 if topic=='division':
  b=r.randint(2,9);count=r.randint(2,n);rem=r.randint(1,b-1);a=b*count+rem
  return q(f'{a} counters are put into groups of {b}. How many counters are LEFT OVER after making all the full groups?',rem,[f'{count} full groups use {count} × {b} = {a-rem} counters.',f'{a} − {a-rem} = {rem} left over.'],'Find the largest multiple of the group size that fits.')
 if topic=='fractions':
  den=r.randint(3,10);num=r.randint(1,den-1);unit=r.randint(2,n);total=den*unit
  return q(f'What is {num}/{den} of {total}?',num*unit,[f'One part: {total} ÷ {den} = {unit}.',f'{num} parts: {unit} × {num} = {unit*num}.'],'Divide into equal parts first.')
 if topic=='percent':
  pct=r.choice([10,20,25,50,75]);a=20*r.randint(2,20);ans=Fraction(pct*a,100)
  return q(f'What is {pct}% of {a}?',ans,[f'{pct}% means {pct}/100.',f'{a} × {pct}/100 = {ans}.'],'Find a familiar fraction or percentage first.')
 if topic=='ratio':
  a=r.randint(1,5);b=r.randint(1,5);unit=r.randint(2,12);total=(a+b)*unit
  return q(f'{total} counters are shared between A and B in the ratio {a}:{b}. How many does A receive?',a*unit,[f'Total parts: {a} + {b} = {a+b}.',f'One part: {total} ÷ {a+b} = {unit}.',f'A receives {a} × {unit} = {a*unit}.'],'Count all the equal parts, not just A’s parts.')
 if topic=='equation':
  a=r.randint(2,9);x=r.randint(1,n);b=r.randint(1,20);v=a*x+b
  return q(f'Solve {a}x + {b} = {v}. What is x?',x,[f'Subtract {b} from both sides: {a}x = {v-b}.',f'Divide both sides by {a}: x = {x}.',f'Check: {a} × {x} + {b} = {v}.'],'Undo the addition before undoing the multiplication.')
 if topic=='area':
  a=r.randint(2,n);b=r.randint(2,n);area=r.choice([True,False])
  return q(f'A rectangle is {a} cm by {b} cm. Find its '+('area in square centimetres.' if area else 'perimeter in centimetres.'),a*b if area else 2*(a+b),[f'Area = {a} × {b} = {a*b} cm².'] if area else [f'Perimeter = {a} + {b} + {a} + {b} = {2*(a+b)} cm.'],'Are you covering the inside or measuring around the edge?',diagram={'type':'rectangle','width':a,'height':b})
 if topic=='coordinates':
  x=r.randint(0,6);y=r.randint(0,6);d=r.randint(1,4)
  return q(f'A point at ({x}, {y}) moves {d} units to the right. What is its NEW x-coordinate?',x+d,[f'Moving right adds {d} to x: {x} + {d} = {x+d}.',f'The new point is ({x+d}, {y}); y is unchanged.'],'Only the horizontal coordinate changes.')
 if topic=='time':
  start=r.randint(8*60,16*60);elapsed=r.randint(15,150);end=start+elapsed
  stamp=lambda x:f'{x//60:02}:{x%60:02}'
  return q(f'A session starts at {stamp(start)} and ends at {stamp(end)} on the same day. How many minutes does it last?',elapsed,[f'Start: {start//60} × 60 + {start%60} = {start} minutes after midnight.',f'End: {end//60} × 60 + {end%60} = {end}.',f'Difference: {end} − {start} = {elapsed} minutes.'],'Count to the next hour, then continue to the end time.')
 if topic=='mean':
  a=[r.randint(1,n) for _ in range(4)];ans=Fraction(sum(a),4)
  return q('Find the mean of '+', '.join(map(str,a))+'.',ans,[f'Total: {" + ".join(map(str,a))} = {sum(a)}.',f'Mean = {sum(a)} ÷ 4 = {ans}.'],'Share the total equally across the four values.')
 raise ValueError('Unknown topic.')
def generate(topic,seed,count=6,digits=3,mode='one',level='intro'):
 if topic not in BY_ID or not 1<=count<=12 or digits not in (2,3,4) or mode not in ('none','one','multiple') or level not in ('intro','stretch'):raise ValueError('Invalid generation settings.')
 if topic=='subtraction' and digits==2 and mode=='multiple':raise ValueError('Two-digit positive subtraction cannot require two exchanges. Choose three or four digits.')
 r=random.Random(seed);example=question(topic,r,digits,mode,level);questions=[];seen={example['prompt']}
 for _ in range(2000):
  q=question(topic,r,digits,mode,level)
  if q['prompt'] not in seen:questions.append(q);seen.add(q['prompt'])
  if len(questions)==count:break
 if len(questions)!=count:raise ValueError('Not enough distinct questions for these settings.')
 return {'version':1,'topic':topic,'seed':seed,'example':example,'questions':questions,'settings':dict(count=count,digits=digits,mode=mode,level=level)}
def mark(answer,expected):
 s=str(answer).strip().replace(',','')
 if not s or len(s)>40:raise ValueError('Enter a number or fraction, such as 3/4.')
 try:return Fraction(s)==Fraction(expected)
 except (ValueError,ZeroDivisionError):raise ValueError('Enter a number or fraction, such as 3/4.')
def public_set(payload,solutions=False):
 out=dict(payload);out['questions']=[dict(q) for q in payload['questions']]
 if not solutions:
  for q in out['questions']:
   for key in ('answer','method','exchange_columns'):q.pop(key,None)
   if q.get('diagram',{}).get('type')=='parts':q['diagram']={'type':'parts','labels':q['diagram']['labels']}
 # Example is deliberately a separate fully worked problem.
 return out
