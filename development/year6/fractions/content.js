/* Original Year 6 fractions teaching data. See educator notes for scope and pilot status. */
(function(root,factory){const data=factory();if(typeof module!=="undefined"&&module.exports)module.exports=data;if(root)root.MWFractionsContent=data;})(typeof window!=="undefined"?window:typeof globalThis!=="undefined"?globalThis:this,function(){return {
  "version": 1,
  "title": "Year 6 fractions",
  "scope": {
    "core": [
      "Y6-FR-01",
      "Y6-FR-02",
      "Y6-FR-03",
      "Y6-FR-04"
    ],
    "connections": [
      "Y6-FR-05"
    ],
    "later": [
      "Y6-FR-06",
      "Y6-FR-07"
    ],
    "note": "This block teaches fraction equivalence, ordering, operations and quantities, with fraction-as-division and familiar fraction–decimal–percentage connections. General decimal calculation, written decimal division and rounding remain in the separate decimals block. The accessible models are not themselves evidence of formal mastery."
  },
  "lessons": [
    {
      "id": "equivalence",
      "title": "Same amount, new pieces",
      "short": "Equivalent fractions",
      "objectiveIds": [
        "Y6-FR-01"
      ],
      "prerequisites": [
        "Y5-FR-01"
      ],
      "goal": "Keep the whole fixed and explain why splitting every part equally gives an equivalent fraction.",
      "model": {
        "type": "equivalence",
        "n": 2,
        "d": 3,
        "targetD": 12
      },
      "explorePrompt": "Make the same shaded amount with smaller equal pieces. What changes? What stays the same?",
      "exploreGoal": "Show two different names for the same amount, and explain why both the numerator and denominator change by the same factor.",
      "worked": [
        {
          "text": "Start with 3/5 of one strip. The whole strip has not changed.",
          "model": {
            "type": "equivalence",
            "n": 3,
            "d": 5,
            "targetD": 5,
            "preset": {
              "multiplier": 1
            }
          }
        },
        {
          "text": "Split each fifth into 2 equal pieces. There are now 10 equal pieces in the whole.",
          "model": {
            "type": "equivalence",
            "n": 3,
            "d": 5,
            "targetD": 10,
            "preset": {
              "multiplier": 2
            }
          }
        },
        {
          "text": "The 3 shaded fifths become 6 shaded tenths: 3/5 = 6/10.",
          "model": {
            "type": "equivalence",
            "n": 3,
            "d": 5,
            "targetD": 10,
            "preset": {
              "multiplier": 2
            }
          }
        },
        {
          "text": "Both numbers were multiplied by 2. Multiplying only one of them would change the amount.",
          "model": {
            "type": "equivalence",
            "n": 3,
            "d": 5,
            "targetD": 10,
            "preset": {
              "multiplier": 2
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "equivalence-1",
          "prompt": "1/2 = ?/8. What is the missing numerator?",
          "answer": {
            "kind": "number",
            "value": "4"
          },
          "difficulty": "start",
          "hints": [
            "How many eighths fit in one half?",
            "Each half has been split into 4 equal pieces."
          ],
          "solution": "1 × 4 = 4 and 2 × 4 = 8, so 1/2 = 4/8.",
          "model": {
            "type": "equivalence",
            "n": 1,
            "d": 2,
            "targetD": 8
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-2",
          "prompt": "2/3 = ?/12. What is the missing numerator?",
          "answer": {
            "kind": "number",
            "value": "8"
          },
          "difficulty": "start",
          "hints": [
            "How many twelfths make one third?",
            "Scale the numerator by the same factor as the denominator."
          ],
          "solution": "3 × 4 = 12, so 2 × 4 = 8. The missing numerator is 8.",
          "model": {
            "type": "equivalence",
            "n": 2,
            "d": 3,
            "targetD": 12
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-3",
          "prompt": "3/4 = 9/?. What is the missing denominator?",
          "answer": {
            "kind": "number",
            "value": "12"
          },
          "difficulty": "build",
          "hints": [
            "Find the scale factor from 3 to 9.",
            "The number of parts in the whole must scale by the same factor."
          ],
          "solution": "3 × 3 = 9, so 4 × 3 = 12. Thus 3/4 = 9/12.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-4",
          "prompt": "Which fraction covers exactly the same amount as 4/6 of the same whole?",
          "answer": {
            "kind": "choice",
            "value": "2/3"
          },
          "difficulty": "build",
          "hints": [
            "Pair up the sixths into larger equal pieces.",
            "Each pair of sixths is one third."
          ],
          "solution": "4/6 and 2/3 are equivalent: divide numerator and denominator by 2.",
          "choices": [
            {
              "value": "2/6",
              "label": "2/6"
            },
            {
              "value": "2/3",
              "label": "2/3"
            },
            {
              "value": "4/3",
              "label": "4/3"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-5",
          "prompt": "A strip is 5/8 shaded. It is repartitioned into 24 equal parts. How many parts are shaded?",
          "answer": {
            "kind": "number",
            "value": "15"
          },
          "difficulty": "build",
          "hints": [
            "How many new pieces are inside each eighth?",
            "All 5 shaded eighths split in the same way."
          ],
          "solution": "Each eighth becomes 3 twenty-fourths. Five shaded eighths become 15 shaded parts.",
          "model": {
            "type": "equivalence",
            "n": 5,
            "d": 8,
            "targetD": 24
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-6",
          "prompt": "A whole strip contains 15 equal parts. Six are shaded. How many fifths are shaded?",
          "answer": {
            "kind": "number",
            "value": "2"
          },
          "difficulty": "build",
          "hints": [
            "Group the fifteenths into fifths.",
            "A fifth contains 3 fifteenths."
          ],
          "solution": "6 fifteenths form 2 groups of 3 fifteenths, so the amount is 2 fifths.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-7",
          "prompt": "Find the missing numerator: 7/10 = ?/50.",
          "answer": {
            "kind": "number",
            "value": "35"
          },
          "difficulty": "stretch",
          "hints": [
            "The denominator was multiplied by 5.",
            "Use the same multiplier for the numerator."
          ],
          "solution": "7 × 5 = 35, so 7/10 = 35/50.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "equivalence-8",
          "prompt": "Sam says 2/5 = 3/6 because both numbers increased by 1. Is the claim true?",
          "answer": {
            "kind": "choice",
            "value": "No"
          },
          "difficulty": "stretch",
          "hints": [
            "Equivalent fractions must represent the same amount of one whole.",
            "Compare both fractions with one half, or use equal-sized parts."
          ],
          "solution": "No. 3/6 = 1/2, while 2/5 is less than 1/2. Adding the same number is not the equivalence rule.",
          "choices": [
            {
              "value": "Yes",
              "label": "Yes"
            },
            {
              "value": "No",
              "label": "No"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Can you make three equivalent fractions for 3/4? Explain why they all show the same amount.",
        "notes": "Look for a fixed whole and equal subdivisions; both numerator and denominator scale together. Ask for a counterexample to adding the same number."
      },
      "practical": {
        "materials": [
          "Two equal paper strips",
          "Pencil",
          "Scissors or folds"
        ],
        "steps": [
          "Shade 3/4 of each equal strip.",
          "Fold one strip again to make eighths and the other to make twelfths.",
          "Label each strip and explain why the shaded lengths still match."
        ]
      }
    },
    {
      "id": "simplify",
      "title": "Make the fraction simpler",
      "short": "Common factors",
      "objectiveIds": [
        "Y6-FR-01"
      ],
      "prerequisites": [
        "equivalence",
        "Y6-OP-04"
      ],
      "goal": "Use a common factor to regroup equal pieces, and recognise when no common factor greater than 1 remains.",
      "model": {
        "type": "simplify",
        "n": 8,
        "d": 12
      },
      "explorePrompt": "Regroup the shaded and unshaded parts equally. How few equal parts can you use?",
      "exploreGoal": "Produce a simpler equivalent fraction and justify why it is in simplest form.",
      "worked": [
        {
          "text": "Take 9/12 of the same whole. We can group the twelfths in threes.",
          "model": {
            "type": "simplify",
            "n": 9,
            "d": 12,
            "preset": {
              "group": 1
            }
          }
        },
        {
          "text": "9 shaded pieces make 3 groups. All 12 pieces make 4 groups.",
          "model": {
            "type": "simplify",
            "n": 9,
            "d": 12,
            "preset": {
              "group": 3
            }
          }
        },
        {
          "text": "Divide both numbers by the common factor 3: 9/12 = 3/4.",
          "model": {
            "type": "simplify",
            "n": 9,
            "d": 12,
            "preset": {
              "group": 3
            }
          }
        },
        {
          "text": "3 and 4 have no common factor greater than 1. The fraction is now in simplest form.",
          "model": {
            "type": "simplify",
            "n": 3,
            "d": 4,
            "preset": {
              "group": 1
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "simplify-1",
          "prompt": "Simplify 2/4.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Group the quarters in pairs.",
            "Divide both numbers by the same common factor."
          ],
          "solution": "2 ÷ 2 = 1 and 4 ÷ 2 = 2, so 2/4 = 1/2.",
          "model": {
            "type": "simplify",
            "n": 2,
            "d": 4
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-2",
          "prompt": "Write 6/9 in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "2/3",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Which number greater than 1 divides both 6 and 9?",
            "Groups of 3 fit exactly in both numbers."
          ],
          "solution": "Divide numerator and denominator by 3: 6/9 = 2/3.",
          "model": {
            "type": "simplify",
            "n": 6,
            "d": 9
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-3",
          "prompt": "Write 10/15 in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "2/3",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Look for a common factor of 10 and 15.",
            "Regroup both shaded pieces and the whole into groups of 5."
          ],
          "solution": "10/15 = (10 ÷ 5)/(15 ÷ 5) = 2/3.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-4",
          "prompt": "Which fraction is already in simplest form?",
          "answer": {
            "kind": "choice",
            "value": "5/8"
          },
          "difficulty": "build",
          "hints": [
            "Look for a common factor greater than 1 in each pair.",
            "If the only common factor is 1, the fraction cannot be simplified."
          ],
          "solution": "5 and 8 have only 1 as a common factor. The other two pairs share factors greater than 1.",
          "choices": [
            {
              "value": "6/8",
              "label": "6/8"
            },
            {
              "value": "5/8",
              "label": "5/8"
            },
            {
              "value": "8/12",
              "label": "8/12"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-5",
          "prompt": "A route is 18/24 complete. Write that fraction in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/4",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Both numbers can be divided by 2, but you may be able to regroup further.",
            "The highest common factor of 18 and 24 is 6."
          ],
          "solution": "Divide both by 6: 18/24 = 3/4.",
          "model": {
            "type": "simplify",
            "n": 18,
            "d": 24
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-6",
          "prompt": "Write 14/35 in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "2/5",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Think of the multiplication facts for 7.",
            "Use the same common factor in the numerator and denominator."
          ],
          "solution": "14 ÷ 7 = 2 and 35 ÷ 7 = 5, so the fraction is 2/5.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-7",
          "prompt": "Write 15/25 in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/5",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "The numerator and denominator are both multiples of 5.",
            "After regrouping, check whether the new numbers share any other factor."
          ],
          "solution": "15/25 = 3/5. The numbers 3 and 5 share no factor greater than 1.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "simplify-8",
          "prompt": "A learner changes 12/18 to 6/9 and stops. Write the fraction in its simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "2/3",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "6/9 is equivalent, but is it simplest?",
            "The numbers 6 and 9 still share a factor greater than 1."
          ],
          "solution": "12/18 = 6/9 = 2/3. Dividing both original numbers by 6 also works.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Do you always have to use the highest common factor first? Explain using 16/24.",
        "notes": "Either one step (÷8) or repeated common-factor steps reaches 2/3. The learner should explain that numerator and denominator are divided by the same factor each time."
      },
      "practical": {
        "materials": [
          "24 counters",
          "Paper rectangle"
        ],
        "steps": [
          "Arrange 24 counters as one whole set and mark 16.",
          "Regroup the whole into equal groups of 2, 4 and 8.",
          "Record the equivalent fractions and identify the simplest one."
        ]
      }
    },
    {
      "id": "mixed",
      "title": "Across one whole",
      "short": "Mixed and improper fractions",
      "objectiveIds": [
        "Y6-FR-01"
      ],
      "prerequisites": [
        "Y5-FR-02",
        "equivalence"
      ],
      "goal": "Connect mixed numbers, improper fractions and positions on a number line.",
      "model": {
        "type": "mixed",
        "n": 9,
        "d": 4
      },
      "explorePrompt": "Trade fractional pieces for whole strips. Keep the total amount unchanged.",
      "exploreGoal": "Describe the same amount using wholes and parts, then using just one fractional unit.",
      "worked": [
        {
          "text": "Look at 11/3. Each whole takes 3 thirds.",
          "model": {
            "type": "mixed",
            "n": 11,
            "d": 3,
            "preset": {
              "wholes": 0
            }
          }
        },
        {
          "text": "9 of the thirds make 3 whole strips. There are 2 thirds left.",
          "model": {
            "type": "mixed",
            "n": 11,
            "d": 3,
            "preset": {
              "wholes": 3
            }
          }
        },
        {
          "text": "So 11/3 = 3 2/3. Both names mark the same point.",
          "model": {
            "type": "mixed",
            "n": 11,
            "d": 3,
            "preset": {
              "wholes": 3
            }
          }
        },
        {
          "text": "To go back, 3 × 3 + 2 = 11 thirds. The denominator stays 3.",
          "model": {
            "type": "mixed",
            "n": 11,
            "d": 3,
            "preset": {
              "wholes": 0
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "mixed-1",
          "prompt": "How many complete wholes are in 7/3?",
          "answer": {
            "kind": "number",
            "value": "2"
          },
          "difficulty": "start",
          "hints": [
            "A whole needs 3 thirds.",
            "Group the seven thirds into complete groups of 3."
          ],
          "solution": "Two complete groups of 3 use 6 thirds. One third is left, so there are 2 complete wholes.",
          "model": {
            "type": "mixed",
            "n": 7,
            "d": 3
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-2",
          "prompt": "11/4 is 2 wholes and what fraction of another whole?",
          "answer": {
            "kind": "fraction",
            "value": "3/4"
          },
          "difficulty": "start",
          "hints": [
            "Two wholes use 8 quarters.",
            "Find how many quarters remain after those 2 wholes."
          ],
          "solution": "11/4 = 8/4 + 3/4 = 2 + 3/4.",
          "model": {
            "type": "mixed",
            "n": 11,
            "d": 4
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-3",
          "prompt": "How many fifths are in 2 1/5?",
          "answer": {
            "kind": "number",
            "value": "11"
          },
          "difficulty": "build",
          "hints": [
            "Count 5 fifths for every whole.",
            "Add the extra fifth after counting the two wholes."
          ],
          "solution": "2 × 5 + 1 = 11 fifths.",
          "model": {
            "type": "mixed",
            "n": 11,
            "d": 5
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-4",
          "prompt": "A number line point is 1 whole and 3 quarters from 0. Which fraction names it?",
          "answer": {
            "kind": "choice",
            "value": "7/4"
          },
          "difficulty": "build",
          "hints": [
            "One whole is 4 quarters.",
            "Count the whole and the extra quarters in the same unit."
          ],
          "solution": "4/4 + 3/4 = 7/4.",
          "choices": [
            {
              "value": "4/7",
              "label": "4/7"
            },
            {
              "value": "7/4",
              "label": "7/4"
            },
            {
              "value": "3/4",
              "label": "3/4"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-5",
          "prompt": "Write the missing numerator: 3 2/7 = ?/7.",
          "answer": {
            "kind": "number",
            "value": "23"
          },
          "difficulty": "build",
          "hints": [
            "Each whole contains 7 sevenths.",
            "Count all sevenths in 3 wholes, then add 2."
          ],
          "solution": "3 × 7 + 2 = 23, so 3 2/7 = 23/7.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-6",
          "prompt": "Which mixed number is equal to 13/6?",
          "answer": {
            "kind": "choice",
            "value": "2 1/6"
          },
          "difficulty": "build",
          "hints": [
            "Two wholes are 12 sixths.",
            "How much remains when 12 sixths are removed from 13 sixths?"
          ],
          "solution": "13/6 = 12/6 + 1/6 = 2 1/6.",
          "model": {
            "type": "mixed",
            "n": 13,
            "d": 6
          },
          "choices": [
            {
              "value": "1 3/6",
              "label": "1 3/6"
            },
            {
              "value": "2 1/6",
              "label": "2 1/6"
            },
            {
              "value": "2 3/6",
              "label": "2 3/6"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-7",
          "prompt": "A ribbon measures 2 3/4 m. How many quarter-metre pieces make that exact length?",
          "answer": {
            "kind": "number",
            "value": "11"
          },
          "difficulty": "stretch",
          "hints": [
            "Convert every whole metre into 4 quarter-metres.",
            "Count the extra three quarter-metres too."
          ],
          "solution": "2 × 4 + 3 = 11 quarter-metre pieces.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-8",
          "prompt": "Fill the gap: 2 ?/7 = 19/7. What is the missing numerator?",
          "answer": {
            "kind": "number",
            "value": "5"
          },
          "difficulty": "stretch",
          "hints": [
            "Express 2 wholes in sevenths.",
            "Subtract the sevenths in the wholes from 19 sevenths."
          ],
          "solution": "2 wholes are 14/7. The remainder is 5/7, so the missing numerator is 5.",
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-9",
          "prompt": "Write 17/5 as a mixed number.",
          "answer": {
            "kind": "fraction",
            "value": "17/5",
            "format": "mixed"
          },
          "difficulty": "stretch",
          "hints": [
            "Group the fifths into complete wholes.",
            "Use the remainder as fifths of one more whole."
          ],
          "solution": "17 ÷ 5 gives 3 wholes with 2 fifths left, so 17/5 = 3 2/5.",
          "model": {
            "type": "mixed",
            "n": 17,
            "d": 5
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "mixed-10",
          "prompt": "Write 2 3/8 as an improper fraction.",
          "answer": {
            "kind": "fraction",
            "value": "19/8",
            "format": "improper"
          },
          "difficulty": "stretch",
          "hints": [
            "Count eight eighths in each whole.",
            "Add the extra eighths, keeping the denominator 8."
          ],
          "solution": "2 × 8 + 3 = 19 eighths, so 2 3/8 = 19/8.",
          "model": {
            "type": "mixed",
            "n": 19,
            "d": 8
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        }
      ],
      "reasoning": {
        "prompt": "A learner says 2 1/3 = 3/3. Show and explain the mistake.",
        "notes": "The whole-number part means 2 complete wholes, not 2 thirds. Two wholes are 6 thirds; adding 1 third gives 7/3. Ask the learner to place both values on a number line."
      },
      "practical": {
        "materials": [
          "Three equal paper strips",
          "Scissors",
          "A drawn number line"
        ],
        "steps": [
          "Cut equal strips into quarters.",
          "Build 1 3/4 and 2 1/4, counting only quarters each time.",
          "Place the amounts on the number line and label both forms."
        ]
      }
    },
    {
      "id": "compare",
      "title": "Which is greater?",
      "short": "Compare and order",
      "objectiveIds": [
        "Y6-FR-01"
      ],
      "prerequisites": [
        "mixed",
        "simplify"
      ],
      "goal": "Compare and order fractions, including amounts greater than one, using equivalence or benchmarks.",
      "model": {
        "type": "compare",
        "values": [
          "3/4",
          "5/6",
          "2/3"
        ]
      },
      "explorePrompt": "Move the fraction markers. Which comparisons can you explain without calculating?",
      "exploreGoal": "Order three amounts and justify one comparison using a common whole and a useful common denominator.",
      "worked": [
        {
          "text": "Compare 5/6 and 7/9. The fractional pieces are different sizes.",
          "model": {
            "type": "compare",
            "values": [
              "5/6",
              "7/9"
            ],
            "preset": {
              "order": [
                0,
                1
              ],
              "selected": 0
            }
          }
        },
        {
          "text": "18 is a common multiple of 6 and 9. Rewrite both using eighteenths.",
          "model": {
            "type": "compare",
            "values": [
              "15/18",
              "14/18"
            ],
            "preset": {
              "order": [
                0,
                1
              ],
              "selected": 0
            }
          }
        },
        {
          "text": "5/6 = 15/18 and 7/9 = 14/18. Fifteen equal pieces exceed fourteen.",
          "model": {
            "type": "compare",
            "values": [
              "15/18",
              "14/18"
            ],
            "preset": {
              "order": [
                1,
                0
              ],
              "selected": 0
            }
          }
        },
        {
          "text": "Therefore 5/6 > 7/9. On the number line, 5/6 sits farther right.",
          "model": {
            "type": "compare",
            "values": [
              "5/6",
              "7/9"
            ],
            "preset": {
              "order": [
                1,
                0
              ],
              "selected": 0
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "compare-1",
          "prompt": "Choose the symbol: 3/8  ?  5/8.",
          "answer": {
            "kind": "choice",
            "value": "<"
          },
          "difficulty": "start",
          "hints": [
            "Compare wholes first. For fractional parts, keep the same whole.",
            "Use a common denominator or compare both amounts with a useful benchmark such as 1/2."
          ],
          "solution": "3/8 < 5/8. A common denominator is 8: 3/8 < 5/8.",
          "model": {
            "type": "compare",
            "values": [
              "3/8",
              "5/8"
            ]
          },
          "choices": [
            {
              "value": "<",
              "label": "<"
            },
            {
              "value": "=",
              "label": "="
            },
            {
              "value": ">",
              "label": ">"
            }
          ],
          "verification": {
            "op": "compare",
            "a": "3/8",
            "b": "5/8"
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-2",
          "prompt": "Choose the symbol: 2/3  ?  2/5.",
          "answer": {
            "kind": "choice",
            "value": ">"
          },
          "difficulty": "start",
          "hints": [
            "Compare wholes first. For fractional parts, keep the same whole.",
            "Use a common denominator or compare both amounts with a useful benchmark such as 1/2."
          ],
          "solution": "2/3 > 2/5. A common denominator is 15: 10/15 > 6/15.",
          "model": {
            "type": "compare",
            "values": [
              "2/3",
              "2/5"
            ]
          },
          "choices": [
            {
              "value": "<",
              "label": "<"
            },
            {
              "value": "=",
              "label": "="
            },
            {
              "value": ">",
              "label": ">"
            }
          ],
          "verification": {
            "op": "compare",
            "a": "2/3",
            "b": "2/5"
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-3",
          "prompt": "Choose the symbol: 3/4  ?  5/8.",
          "answer": {
            "kind": "choice",
            "value": ">"
          },
          "difficulty": "build",
          "hints": [
            "Compare wholes first. For fractional parts, keep the same whole.",
            "Use a common denominator or compare both amounts with a useful benchmark such as 1/2."
          ],
          "solution": "3/4 > 5/8. A common denominator is 8: 6/8 > 5/8.",
          "model": {
            "type": "compare",
            "values": [
              "3/4",
              "5/8"
            ]
          },
          "choices": [
            {
              "value": "<",
              "label": "<"
            },
            {
              "value": "=",
              "label": "="
            },
            {
              "value": ">",
              "label": ">"
            }
          ],
          "verification": {
            "op": "compare",
            "a": "3/4",
            "b": "5/8"
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-4",
          "prompt": "Choose the symbol: 4/6  ?  2/3.",
          "answer": {
            "kind": "choice",
            "value": "="
          },
          "difficulty": "build",
          "hints": [
            "Compare wholes first. For fractional parts, keep the same whole.",
            "Use a common denominator or compare both amounts with a useful benchmark such as 1/2."
          ],
          "solution": "4/6 = 2/3. Both amounts simplify to 2/3.",
          "model": {
            "type": "compare",
            "values": [
              "4/6",
              "2/3"
            ]
          },
          "choices": [
            {
              "value": "<",
              "label": "<"
            },
            {
              "value": "=",
              "label": "="
            },
            {
              "value": ">",
              "label": ">"
            }
          ],
          "verification": {
            "op": "compare",
            "a": "4/6",
            "b": "2/3"
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-5",
          "prompt": "Arrange these fractions from smallest to largest.",
          "answer": {
            "kind": "order",
            "value": [
              "1/2",
              "2/3",
              "5/6"
            ]
          },
          "difficulty": "build",
          "hints": [
            "Look at whole-number parts and benchmark values first.",
            "Use common denominators for any pair whose order is not yet clear."
          ],
          "solution": "Smallest to largest: 1/2 < 2/3 < 5/6. Using denominator 6: 3/6 < 4/6 < 5/6.",
          "model": {
            "type": "compare",
            "values": [
              "5/6",
              "1/2",
              "2/3"
            ]
          },
          "choices": [
            {
              "value": "2/3",
              "label": "2/3"
            },
            {
              "value": "5/6",
              "label": "5/6"
            },
            {
              "value": "1/2",
              "label": "1/2"
            }
          ],
          "verification": {
            "op": "order",
            "values": [
              "5/6",
              "1/2",
              "2/3"
            ]
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-6",
          "prompt": "Choose the symbol: 7/4  ?  1 5/6.",
          "answer": {
            "kind": "choice",
            "value": "<"
          },
          "difficulty": "build",
          "hints": [
            "Compare wholes first. For fractional parts, keep the same whole.",
            "Use a common denominator or compare both amounts with a useful benchmark such as 1/2."
          ],
          "solution": "7/4 < 1 5/6. A common denominator is 12: 21/12 < 22/12.",
          "model": {
            "type": "compare",
            "values": [
              "7/4",
              "1 5/6"
            ]
          },
          "choices": [
            {
              "value": "<",
              "label": "<"
            },
            {
              "value": "=",
              "label": "="
            },
            {
              "value": ">",
              "label": ">"
            }
          ],
          "verification": {
            "op": "compare",
            "a": "7/4",
            "b": "1 5/6"
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-7",
          "prompt": "Arrange these fractions from smallest to largest.",
          "answer": {
            "kind": "order",
            "value": [
              "9/8",
              "1 1/4",
              "1 1/2"
            ]
          },
          "difficulty": "stretch",
          "hints": [
            "Look at whole-number parts and benchmark values first.",
            "Use common denominators for any pair whose order is not yet clear."
          ],
          "solution": "Smallest to largest: 9/8 < 1 1/4 < 1 1/2. Using denominator 8: 9/8 < 10/8 < 12/8.",
          "model": {
            "type": "compare",
            "values": [
              "1 1/4",
              "9/8",
              "1 1/2"
            ]
          },
          "choices": [
            {
              "value": "1 1/4",
              "label": "1 1/4"
            },
            {
              "value": "1 1/2",
              "label": "1 1/2"
            },
            {
              "value": "9/8",
              "label": "9/8"
            }
          ],
          "verification": {
            "op": "order",
            "values": [
              "1 1/4",
              "9/8",
              "1 1/2"
            ]
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        },
        {
          "id": "compare-8",
          "prompt": "Arrange these fractions from smallest to largest.",
          "answer": {
            "kind": "order",
            "value": [
              "1 1/2",
              "5/3",
              "1 3/4"
            ]
          },
          "difficulty": "stretch",
          "hints": [
            "Look at whole-number parts and benchmark values first.",
            "Use common denominators for any pair whose order is not yet clear."
          ],
          "solution": "Smallest to largest: 1 1/2 < 5/3 < 1 3/4. Using denominator 12: 18/12 < 20/12 < 21/12.",
          "model": {
            "type": "compare",
            "values": [
              "5/3",
              "1 3/4",
              "1 1/2"
            ]
          },
          "choices": [
            {
              "value": "1 3/4",
              "label": "1 3/4"
            },
            {
              "value": "5/3",
              "label": "5/3"
            },
            {
              "value": "1 1/2",
              "label": "1 1/2"
            }
          ],
          "verification": {
            "op": "order",
            "values": [
              "5/3",
              "1 3/4",
              "1 1/2"
            ]
          },
          "objectiveIds": [
            "Y6-FR-01"
          ]
        }
      ],
      "reasoning": {
        "prompt": "When is comparing numerators enough? When could it mislead you? Give an example of each.",
        "notes": "With the same denominator, compare numerators. With different denominators, numerator size alone is insufficient; for example 3/4 > 4/8. Whole sizes must also match."
      },
      "practical": {
        "materials": [
          "Equal paper strips",
          "Pencil",
          "String number line"
        ],
        "steps": [
          "Make fraction cards and estimate where they go on a 0-to-2 line.",
          "Use equal fraction strips to check uncertain pairs.",
          "Choose three new fractions and challenge someone to justify their order."
        ]
      }
    },
    {
      "id": "add",
      "title": "Combine equal-sized pieces",
      "short": "Add fractions",
      "objectiveIds": [
        "Y6-FR-02"
      ],
      "prerequisites": [
        "equivalence",
        "compare"
      ],
      "goal": "Add fractions with different denominators by creating equal-sized fractional units.",
      "model": {
        "type": "add",
        "a": "1/3",
        "b": "1/4"
      },
      "explorePrompt": "Make both amounts out of the same-sized pieces before joining them.",
      "exploreGoal": "Show a common denominator in the model, then explain why only the numerators are added.",
      "worked": [
        {
          "text": "Find 2/3 + 1/6. Thirds and sixths are different-sized pieces.",
          "model": {
            "type": "add",
            "a": "2/3",
            "b": "1/6",
            "preset": {
              "commonD": 6,
              "selected": 0
            }
          }
        },
        {
          "text": "Split each third in two: 2/3 is 4/6. The second amount stays 1/6.",
          "model": {
            "type": "add",
            "a": "2/3",
            "b": "1/6",
            "preset": {
              "commonD": 6,
              "selected": 0
            }
          }
        },
        {
          "text": "Combine the sixths: 4/6 + 1/6 = 5/6.",
          "model": {
            "type": "add",
            "a": "2/3",
            "b": "1/6",
            "preset": {
              "commonD": 6,
              "selected": 5
            }
          }
        },
        {
          "text": "The whole still has 6 equal parts, so the denominator stays 6. The answer is already simplest.",
          "model": {
            "type": "add",
            "a": "2/3",
            "b": "1/6",
            "preset": {
              "commonD": 6,
              "selected": 5
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "add-1",
          "prompt": "Calculate 1/4 + 2/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/4",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "1/4 = 1/4 and 2/4 = 2/4. 1/4 + 2/4 = 3/4 = 3/4.",
          "model": {
            "type": "add",
            "a": "1/4",
            "b": "2/4"
          },
          "verification": {
            "op": "+",
            "a": "1/4",
            "b": "2/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-2",
          "prompt": "Calculate 1/2 + 1/8. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "5/8",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "1/2 = 4/8 and 1/8 = 1/8. 4/8 + 1/8 = 5/8 = 5/8.",
          "model": {
            "type": "add",
            "a": "1/2",
            "b": "1/8"
          },
          "verification": {
            "op": "+",
            "a": "1/2",
            "b": "1/8"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-3",
          "prompt": "Calculate 1/3 + 1/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "7/12",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "1/3 = 4/12 and 1/4 = 3/12. 4/12 + 3/12 = 7/12 = 7/12.",
          "model": {
            "type": "add",
            "a": "1/3",
            "b": "1/4"
          },
          "verification": {
            "op": "+",
            "a": "1/3",
            "b": "1/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-4",
          "prompt": "Calculate 3/5 + 1/10. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "7/10",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "3/5 = 6/10 and 1/10 = 1/10. 6/10 + 1/10 = 7/10 = 7/10.",
          "model": {
            "type": "add",
            "a": "3/5",
            "b": "1/10"
          },
          "verification": {
            "op": "+",
            "a": "3/5",
            "b": "1/10"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-5",
          "prompt": "Calculate 5/6 + 1/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "13/12",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "5/6 = 10/12 and 1/4 = 3/12. 10/12 + 3/12 = 13/12 = 1 1/12.",
          "model": {
            "type": "add",
            "a": "5/6",
            "b": "1/4"
          },
          "verification": {
            "op": "+",
            "a": "5/6",
            "b": "1/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-6",
          "prompt": "A trail has a 3/8 km section and then a 1/6 km section. What is their total length? Give a simplest fraction.",
          "answer": {
            "kind": "fraction",
            "value": "13/24",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "3/8 = 9/24 and 1/6 = 4/24. 9/24 + 4/24 = 13/24 = 13/24.",
          "unit": "km",
          "model": {
            "type": "add",
            "a": "3/8",
            "b": "1/6"
          },
          "verification": {
            "op": "+",
            "a": "3/8",
            "b": "1/6"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-7",
          "prompt": "A learner writes 1/3 + 1/2 = 2/5. Choose the correct sum.",
          "answer": {
            "kind": "choice",
            "value": "5/6"
          },
          "difficulty": "build",
          "hints": [
            "Do not add the denominators: thirds and halves are different units.",
            "Rewrite both fractions as sixths."
          ],
          "solution": "1/3 = 2/6 and 1/2 = 3/6, so their sum is 5/6.",
          "model": {
            "type": "add",
            "a": "1/3",
            "b": "1/2"
          },
          "choices": [
            {
              "value": "2/5",
              "label": "2/5"
            },
            {
              "value": "2/6",
              "label": "2/6"
            },
            {
              "value": "5/6",
              "label": "5/6"
            }
          ],
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "add-8",
          "prompt": "Find the missing fraction: ? + 1/4 = 11/12. Give the missing amount in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "2/3",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "The missing part and 1/4 together make 11/12.",
            "Work backwards by removing 1/4 from 11/12, using twelfths."
          ],
          "solution": "11/12 − 1/4 = 11/12 − 3/12 = 8/12 = 2/3.",
          "model": {
            "type": "subtract",
            "a": "11/12",
            "b": "1/4"
          },
          "verification": {
            "op": "−",
            "a": "11/12",
            "b": "1/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Why is 1/3 + 1/2 not 2/5? Explain with a drawing and a check on the size of the answer.",
        "notes": "A sum of positive amounts is greater than either amount. 2/5 is less than 1/2, so it cannot be the sum. Draw sixths and keep the original whole fixed."
      },
      "practical": {
        "materials": [
          "Equal paper strips",
          "Two pencils or colours"
        ],
        "steps": [
          "Mark 1/2 on one strip and 1/3 on another.",
          "Fold both into sixths and count the combined shaded amount.",
          "Try 3/4 + 2/3, allowing more than one whole."
        ]
      }
    },
    {
      "id": "subtract",
      "title": "Take away and find the gap",
      "short": "Subtract fractions",
      "objectiveIds": [
        "Y6-FR-02"
      ],
      "prerequisites": [
        "add",
        "compare"
      ],
      "goal": "Subtract unlike fractions using a shared unit, and interpret subtraction as removal or a difference.",
      "model": {
        "type": "subtract",
        "a": "5/6",
        "b": "1/4"
      },
      "explorePrompt": "Change both partitions to the same unit. Show what remains after taking away.",
      "exploreGoal": "Represent a subtraction and explain why subtracting the denominators changes the whole incorrectly.",
      "worked": [
        {
          "text": "Find 7/8 − 1/3. Choose equal-sized parts of the same whole.",
          "model": {
            "type": "subtract",
            "a": "7/8",
            "b": "1/3",
            "preset": {
              "commonD": 8,
              "selected": 0
            }
          }
        },
        {
          "text": "24 is a common denominator: 7/8 = 21/24 and 1/3 = 8/24.",
          "model": {
            "type": "subtract",
            "a": "7/8",
            "b": "1/3",
            "preset": {
              "commonD": 24,
              "selected": 0
            }
          }
        },
        {
          "text": "Take away 8 twenty-fourths from 21 twenty-fourths. Thirteen twenty-fourths remain.",
          "model": {
            "type": "subtract",
            "a": "7/8",
            "b": "1/3",
            "preset": {
              "commonD": 24,
              "selected": 13
            }
          }
        },
        {
          "text": "7/8 − 1/3 = 13/24. Adding 1/3 back gives 7/8, which checks the result.",
          "model": {
            "type": "subtract",
            "a": "7/8",
            "b": "1/3",
            "preset": {
              "commonD": 24,
              "selected": 13
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "subtract-1",
          "prompt": "Calculate 5/8 − 1/8. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "5/8 = 5/8 and 1/8 = 1/8. 5/8 − 1/8 = 4/8 = 1/2.",
          "model": {
            "type": "subtract",
            "a": "5/8",
            "b": "1/8"
          },
          "verification": {
            "op": "−",
            "a": "5/8",
            "b": "1/8"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-2",
          "prompt": "Calculate 3/4 − 1/2. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/4",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "3/4 = 3/4 and 1/2 = 2/4. 3/4 − 2/4 = 1/4 = 1/4.",
          "model": {
            "type": "subtract",
            "a": "3/4",
            "b": "1/2"
          },
          "verification": {
            "op": "−",
            "a": "3/4",
            "b": "1/2"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-3",
          "prompt": "Calculate 5/6 − 1/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "7/12",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "5/6 = 10/12 and 1/4 = 3/12. 10/12 − 3/12 = 7/12 = 7/12.",
          "model": {
            "type": "subtract",
            "a": "5/6",
            "b": "1/4"
          },
          "verification": {
            "op": "−",
            "a": "5/6",
            "b": "1/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-4",
          "prompt": "Calculate 7/10 − 2/5. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/10",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "7/10 = 7/10 and 2/5 = 4/10. 7/10 − 4/10 = 3/10 = 3/10.",
          "model": {
            "type": "subtract",
            "a": "7/10",
            "b": "2/5"
          },
          "verification": {
            "op": "−",
            "a": "7/10",
            "b": "2/5"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-5",
          "prompt": "Calculate 11/12 − 3/8. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "13/24",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "11/12 = 22/24 and 3/8 = 9/24. 22/24 − 9/24 = 13/24 = 13/24.",
          "model": {
            "type": "subtract",
            "a": "11/12",
            "b": "3/8"
          },
          "verification": {
            "op": "−",
            "a": "11/12",
            "b": "3/8"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-6",
          "prompt": "A bottle holds 4/5 litre. You pour out 1/3 litre. How much remains? Give a simplest fraction.",
          "answer": {
            "kind": "fraction",
            "value": "7/15",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "4/5 = 12/15 and 1/3 = 5/15. 12/15 − 5/15 = 7/15 = 7/15.",
          "unit": "litres",
          "model": {
            "type": "subtract",
            "a": "4/5",
            "b": "1/3"
          },
          "verification": {
            "op": "−",
            "a": "4/5",
            "b": "1/3"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-7",
          "prompt": "What fraction must be taken from 5/6 to leave 1/2? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/3",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "The missing amount is the gap between the two fractions.",
            "Use sixths, then subtract the amount that remains."
          ],
          "solution": "5/6 − 1/2 = 5/6 − 3/6 = 2/6 = 1/3.",
          "model": {
            "type": "subtract",
            "a": "5/6",
            "b": "1/2"
          },
          "verification": {
            "op": "−",
            "a": "5/6",
            "b": "1/2"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "subtract-8",
          "prompt": "Which calculation gives the same result as 3/4 − 1/6?",
          "answer": {
            "kind": "choice",
            "value": "9/12 − 2/12"
          },
          "difficulty": "stretch",
          "hints": [
            "Both fractions must be rewritten without changing their amounts.",
            "12 is a common multiple of 4 and 6."
          ],
          "solution": "3/4 = 9/12 and 1/6 = 2/12, so 9/12 − 2/12 is the correct equivalent calculation.",
          "choices": [
            {
              "value": "2/2",
              "label": "2/2"
            },
            {
              "value": "9/12 − 2/12",
              "label": "9/12 − 2/12"
            },
            {
              "value": "3/10",
              "label": "3/10"
            }
          ],
          "objectiveIds": [
            "Y6-FR-02"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Show two meanings of 5/6 − 1/4: taking away, and measuring a gap. Why do they give the same answer?",
        "notes": "A strip can show removing 1/4 from 5/6. A number line can show the distance from 1/4 to 5/6. Both distances are 7/12 of the same whole."
      },
      "practical": {
        "materials": [
          "Paper strips",
          "A 0-to-1 number line",
          "Pencil"
        ],
        "steps": [
          "Shade 5/6 of a strip, repartition into twelfths, and remove 1/4.",
          "Show the gap from 1/4 to 5/6 on the number line.",
          "Explain the link between the two pictures."
        ]
      }
    },
    {
      "id": "mixed-operations",
      "title": "Exchange a whole",
      "short": "Add and subtract mixed numbers",
      "objectiveIds": [
        "Y6-FR-02"
      ],
      "prerequisites": [
        "mixed",
        "add",
        "subtract"
      ],
      "goal": "Add and subtract mixed numbers, including exchanging one whole into fractional pieces.",
      "model": {
        "type": "subtract",
        "a": "2 1/4",
        "b": "5/6"
      },
      "explorePrompt": "When the fractional part is too small to take from, exchange one whole for equal fractional pieces.",
      "exploreGoal": "Show the exchange without changing the total, and check a mixed-number result with the inverse operation.",
      "worked": [
        {
          "text": "Find 3 1/5 − 1 3/4. Twentieths give equal-sized pieces.",
          "model": {
            "type": "subtract",
            "a": "3 1/5",
            "b": "1 3/4",
            "preset": {
              "commonD": 20,
              "selected": 0
            }
          }
        },
        {
          "text": "3 1/5 = 3 4/20 and 1 3/4 = 1 15/20.",
          "model": {
            "type": "subtract",
            "a": "3 1/5",
            "b": "1 3/4",
            "preset": {
              "commonD": 20,
              "selected": 0
            }
          }
        },
        {
          "text": "Exchange 1 whole: 3 4/20 = 2 24/20. Now remove 1 whole and 15/20.",
          "model": {
            "type": "subtract",
            "a": "3 1/5",
            "b": "1 3/4",
            "preset": {
              "commonD": 20,
              "selected": 29
            }
          }
        },
        {
          "text": "2 24/20 − 1 15/20 = 1 9/20. Adding 1 3/4 back gives 3 1/5.",
          "model": {
            "type": "subtract",
            "a": "3 1/5",
            "b": "1 3/4",
            "preset": {
              "commonD": 20,
              "selected": 29
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "mixed-operations-1",
          "prompt": "Calculate 1 1/4 + 1 2/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "11/4",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "1 1/4 = 5/4 and 1 2/4 = 6/4. 5/4 + 6/4 = 11/4 = 2 3/4.",
          "model": {
            "type": "add",
            "a": "1 1/4",
            "b": "1 2/4"
          },
          "verification": {
            "op": "+",
            "a": "1 1/4",
            "b": "1 2/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-2",
          "prompt": "Calculate 2 1/3 + 1/6. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "5/2",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "2 1/3 = 14/6 and 1/6 = 1/6. 14/6 + 1/6 = 15/6 = 2 1/2.",
          "model": {
            "type": "add",
            "a": "2 1/3",
            "b": "1/6"
          },
          "verification": {
            "op": "+",
            "a": "2 1/3",
            "b": "1/6"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-3",
          "prompt": "Calculate 1 3/4 + 2 2/3. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "53/12",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "1 3/4 = 21/12 and 2 2/3 = 32/12. 21/12 + 32/12 = 53/12 = 4 5/12.",
          "model": {
            "type": "add",
            "a": "1 3/4",
            "b": "2 2/3"
          },
          "verification": {
            "op": "+",
            "a": "1 3/4",
            "b": "2 2/3"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-4",
          "prompt": "Calculate 3 5/6 − 1 1/3. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "5/2",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "3 5/6 = 23/6 and 1 1/3 = 8/6. 23/6 − 8/6 = 15/6 = 2 1/2.",
          "model": {
            "type": "subtract",
            "a": "3 5/6",
            "b": "1 1/3"
          },
          "verification": {
            "op": "−",
            "a": "3 5/6",
            "b": "1 1/3"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-5",
          "prompt": "Calculate 2 1/4 − 5/6. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "17/12",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "2 1/4 = 27/12 and 5/6 = 10/12. 27/12 − 10/12 = 17/12 = 1 5/12.",
          "model": {
            "type": "subtract",
            "a": "2 1/4",
            "b": "5/6"
          },
          "verification": {
            "op": "−",
            "a": "2 1/4",
            "b": "5/6"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-6",
          "prompt": "Calculate 4 1/3 − 2 3/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "19/12",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "4 1/3 = 52/12 and 2 3/4 = 33/12. 52/12 − 33/12 = 19/12 = 1 7/12.",
          "model": {
            "type": "subtract",
            "a": "4 1/3",
            "b": "2 3/4"
          },
          "verification": {
            "op": "−",
            "a": "4 1/3",
            "b": "2 3/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-7",
          "prompt": "Two pieces of rope measure 2 2/5 m and 1 3/4 m. Find the total length in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "83/20",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "2 2/5 = 48/20 and 1 3/4 = 35/20. 48/20 + 35/20 = 83/20 = 4 3/20.",
          "unit": "m",
          "model": {
            "type": "add",
            "a": "2 2/5",
            "b": "1 3/4"
          },
          "verification": {
            "op": "+",
            "a": "2 2/5",
            "b": "1 3/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-8",
          "prompt": "A walk is 3 1/2 km long. You have walked 1 5/8 km. How much farther is there to go? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "15/8",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "3 1/2 = 28/8 and 1 5/8 = 13/8. 28/8 − 13/8 = 15/8 = 1 7/8.",
          "unit": "km",
          "model": {
            "type": "subtract",
            "a": "3 1/2",
            "b": "1 5/8"
          },
          "verification": {
            "op": "−",
            "a": "3 1/2",
            "b": "1 5/8"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-9",
          "prompt": "Which exchange keeps 2 1/3 unchanged?",
          "answer": {
            "kind": "choice",
            "value": "1 4/3"
          },
          "difficulty": "build",
          "hints": [
            "One whole equals three thirds.",
            "Exchange one of the 2 wholes, then combine its thirds with the extra third."
          ],
          "solution": "2 1/3 = 1 + 3/3 + 1/3 = 1 4/3. This is a useful exchanged form, although it is not a conventional mixed number with a proper fractional part.",
          "choices": [
            {
              "value": "1 1/3",
              "label": "1 1/3"
            },
            {
              "value": "1 4/3",
              "label": "1 4/3"
            },
            {
              "value": "2 4/3",
              "label": "2 4/3"
            }
          ],
          "objectiveIds": [
            "Y6-FR-02"
          ]
        },
        {
          "id": "mixed-operations-10",
          "prompt": "Find the missing amount: ? + 1 3/4 = 4 1/6. Give a simplest fraction or mixed number.",
          "answer": {
            "kind": "fraction",
            "value": "29/12",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Use subtraction to undo the addition.",
            "Change the fractions to twelfths and exchange a whole if needed."
          ],
          "solution": "4 1/6 − 1 3/4 = 4 2/12 − 1 9/12 = 3 14/12 − 1 9/12 = 2 5/12.",
          "model": {
            "type": "subtract",
            "a": "4 1/6",
            "b": "1 3/4"
          },
          "verification": {
            "op": "−",
            "a": "4 1/6",
            "b": "1 3/4"
          },
          "objectiveIds": [
            "Y6-FR-02"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Explain why exchanging 1 whole does not change the amount. Then show two methods for 2 1/4 − 5/6.",
        "notes": "Exchange with twelfths: 2 3/12 = 1 15/12, then subtract 10/12 to get 1 5/12. Or use improper fractions: 27/12 − 10/12 = 17/12. Ask the learner to connect both records to the same model."
      },
      "practical": {
        "materials": [
          "Several equal paper strips",
          "Scissors",
          "Pencil"
        ],
        "steps": [
          "Make 2 wholes and 1/4 using paper strips.",
          "Convert the pieces into twelfths, then remove 5/6.",
          "Record the exchange and compare with an improper-fraction method."
        ]
      }
    },
    {
      "id": "multiply",
      "title": "A fraction of a fraction",
      "short": "Multiply proper fractions",
      "objectiveIds": [
        "Y6-FR-03"
      ],
      "prerequisites": [
        "simplify",
        "Y5-FR-04"
      ],
      "goal": "Use an area model to find a fraction of a fraction, then connect the overlap to multiplication.",
      "model": {
        "type": "multiply",
        "a": "2/3",
        "b": "3/4"
      },
      "explorePrompt": "Shade one fraction across and another down. Which cells belong to both?",
      "exploreGoal": "Count the overlap as part of the original whole, explain the denominator, and simplify the product.",
      "worked": [
        {
          "text": "Find 3/5 of 1/2. Start with one rectangle as the whole.",
          "model": {
            "type": "multiply",
            "a": "3/5",
            "b": "1/2",
            "preset": {
              "columns": 0,
              "rows": 0
            }
          }
        },
        {
          "text": "Split it into 5 equal columns and 2 equal rows: there are 10 equal cells.",
          "model": {
            "type": "multiply",
            "a": "3/5",
            "b": "1/2",
            "preset": {
              "columns": 0,
              "rows": 0
            }
          }
        },
        {
          "text": "The overlap covers 3 cells, so the product is 3/10 of the original whole.",
          "model": {
            "type": "multiply",
            "a": "3/5",
            "b": "1/2",
            "preset": {
              "columns": 3,
              "rows": 1
            }
          }
        },
        {
          "text": "3/5 × 1/2 = (3 × 1)/(5 × 2) = 3/10. This is smaller than either positive starting fraction.",
          "model": {
            "type": "multiply",
            "a": "3/5",
            "b": "1/2",
            "preset": {
              "columns": 3,
              "rows": 1
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "multiply-1",
          "prompt": "Calculate 1/2 × 1/3. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/6",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(1 × 1)/(2 × 3) = 1/6 = 1/6.",
          "model": {
            "type": "multiply",
            "a": "1/2",
            "b": "1/3"
          },
          "verification": {
            "op": "×",
            "a": "1/2",
            "b": "1/3"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-2",
          "prompt": "Calculate 1/4 × 2/3. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/6",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(1 × 2)/(4 × 3) = 2/12 = 1/6.",
          "model": {
            "type": "multiply",
            "a": "1/4",
            "b": "2/3"
          },
          "verification": {
            "op": "×",
            "a": "1/4",
            "b": "2/3"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-3",
          "prompt": "Calculate 2/3 × 3/4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(2 × 3)/(3 × 4) = 6/12 = 1/2.",
          "model": {
            "type": "multiply",
            "a": "2/3",
            "b": "3/4"
          },
          "verification": {
            "op": "×",
            "a": "2/3",
            "b": "3/4"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-4",
          "prompt": "Calculate 3/5 × 5/6. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(3 × 5)/(5 × 6) = 15/30 = 1/2.",
          "model": {
            "type": "multiply",
            "a": "3/5",
            "b": "5/6"
          },
          "verification": {
            "op": "×",
            "a": "3/5",
            "b": "5/6"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-5",
          "prompt": "Calculate 4/7 × 7/8. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(4 × 7)/(7 × 8) = 28/56 = 1/2.",
          "model": {
            "type": "multiply",
            "a": "4/7",
            "b": "7/8"
          },
          "verification": {
            "op": "×",
            "a": "4/7",
            "b": "7/8"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-6",
          "prompt": "A garden has flowers on 2/5 of its area. Of that flower area, 3/4 is purple. What fraction of the whole garden has purple flowers? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/10",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(3 × 2)/(4 × 5) = 6/20 = 3/10.",
          "model": {
            "type": "multiply",
            "a": "3/4",
            "b": "2/5"
          },
          "verification": {
            "op": "×",
            "a": "3/4",
            "b": "2/5"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-7",
          "prompt": "An area model has 4 columns and 3 rows. A 3/4 shading overlaps a 2/3 shading in 6 cells. What fraction of the original whole is the overlap? Give simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Count all equal cells in the original whole, not just shaded cells.",
            "The overlap is 6 of those equal cells; then simplify."
          ],
          "solution": "The whole contains 4 × 3 = 12 cells. The overlap is 6/12 = 1/2.",
          "model": {
            "type": "multiply",
            "a": "3/4",
            "b": "2/3"
          },
          "verification": {
            "op": "×",
            "a": "3/4",
            "b": "2/3"
          },
          "objectiveIds": [
            "Y6-FR-03"
          ]
        },
        {
          "id": "multiply-8",
          "prompt": "Without finding the exact product, compare 3/4 × 2/3 with 3/4.",
          "answer": {
            "kind": "choice",
            "value": "Less"
          },
          "difficulty": "stretch",
          "hints": [
            "Multiplying by 2/3 means taking two thirds of the starting amount.",
            "Are you keeping all the starting amount or only part of it?"
          ],
          "solution": "The product is less than 3/4 because only 2/3 of that positive amount is kept. Multiplication does not always make an amount larger.",
          "choices": [
            {
              "value": "Less",
              "label": "Less"
            },
            {
              "value": "Equal",
              "label": "Equal"
            },
            {
              "value": "Greater",
              "label": "Greater"
            }
          ],
          "objectiveIds": [
            "Y6-FR-03"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Why does multiplying two proper positive fractions give an answer smaller than either factor? Use your model, not only a rule.",
        "notes": "Each factor is between 0 and 1. The overlap is part of each shaded region. The denominator counts cells of the original whole; comparing the result to only one shaded region changes the whole and gives the wrong fraction."
      },
      "practical": {
        "materials": [
          "Squared paper",
          "Two pencils or transparent colours"
        ],
        "steps": [
          "Draw one rectangle and divide it into 3 columns and 4 rows.",
          "Shade 2/3 in one direction and 3/4 in the other.",
          "Count and label the overlap, then fold or regroup to simplify."
        ]
      }
    },
    {
      "id": "divide",
      "title": "Share a fractional amount",
      "short": "Divide by a whole number",
      "objectiveIds": [
        "Y6-FR-04"
      ],
      "prerequisites": [
        "equivalence",
        "simplify"
      ],
      "goal": "Share a proper fraction into equal groups while keeping the original whole as the reference.",
      "model": {
        "type": "divide",
        "a": "3/4",
        "by": 2
      },
      "explorePrompt": "Share the shaded length equally. If the numerator will not divide, split the pieces into smaller equal parts.",
      "exploreGoal": "Explain why the original whole stays the same when each share becomes smaller.",
      "worked": [
        {
          "text": "Share 2/3 of a strip equally between 4 people.",
          "model": {
            "type": "divide",
            "a": "2/3",
            "by": 4,
            "preset": {
              "cut": false,
              "rounds": 0
            }
          }
        },
        {
          "text": "Split each third into 4 equal pieces. The whole now has 12 equal pieces.",
          "model": {
            "type": "divide",
            "a": "2/3",
            "by": 4,
            "preset": {
              "cut": true,
              "rounds": 0
            }
          }
        },
        {
          "text": "The shaded 2/3 contains 8 twelfths. Sharing those among 4 people gives 2 twelfths each.",
          "model": {
            "type": "divide",
            "a": "2/3",
            "by": 4,
            "preset": {
              "cut": true,
              "rounds": 2
            }
          }
        },
        {
          "text": "2/3 ÷ 4 = 2/12 = 1/6 of the original whole for each person.",
          "model": {
            "type": "divide",
            "a": "2/3",
            "by": 4,
            "preset": {
              "cut": true,
              "rounds": 2
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "divide-1",
          "prompt": "Calculate 2/5 ÷ 2. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/5",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "2/5 ÷ 2 = 2/(5 × 2) = 1/5.",
          "model": {
            "type": "divide",
            "a": "2/5",
            "by": 2
          },
          "verification": {
            "op": "÷",
            "a": "2/5",
            "b": "2"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-2",
          "prompt": "Calculate 3/4 ÷ 3. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/4",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "3/4 ÷ 3 = 3/(4 × 3) = 1/4.",
          "model": {
            "type": "divide",
            "a": "3/4",
            "by": 3
          },
          "verification": {
            "op": "÷",
            "a": "3/4",
            "b": "3"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-3",
          "prompt": "Calculate 1/2 ÷ 3. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/6",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "1/2 ÷ 3 = 1/(2 × 3) = 1/6.",
          "model": {
            "type": "divide",
            "a": "1/2",
            "by": 3
          },
          "verification": {
            "op": "÷",
            "a": "1/2",
            "b": "3"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-4",
          "prompt": "Calculate 3/5 ÷ 2. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/10",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "3/5 ÷ 2 = 3/(5 × 2) = 3/10.",
          "model": {
            "type": "divide",
            "a": "3/5",
            "by": 2
          },
          "verification": {
            "op": "÷",
            "a": "3/5",
            "b": "2"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-5",
          "prompt": "Calculate 5/6 ÷ 4. Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "5/24",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "5/6 ÷ 4 = 5/(6 × 4) = 5/24.",
          "model": {
            "type": "divide",
            "a": "5/6",
            "by": 4
          },
          "verification": {
            "op": "÷",
            "a": "5/6",
            "b": "4"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-6",
          "prompt": "Two friends share 3/4 litre of juice equally. How much juice does each get? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/8",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "3/4 ÷ 2 = 3/(4 × 2) = 3/8.",
          "unit": "litres",
          "model": {
            "type": "divide",
            "a": "3/4",
            "by": 2
          },
          "verification": {
            "op": "÷",
            "a": "3/4",
            "b": "2"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-7",
          "prompt": "A learner says 1/3 ÷ 2 = 1/6. Which explanation is correct?",
          "answer": {
            "kind": "choice",
            "value": "Split each third into 2 equal parts"
          },
          "difficulty": "build",
          "hints": [
            "The reference whole must stay fixed.",
            "Division makes each share smaller, so each fractional unit can be split."
          ],
          "solution": "Split each third into 2 equal parts. The original whole then has 6 parts, and each share is 1/6.",
          "choices": [
            {
              "value": "Make the whole twice as large",
              "label": "Make the whole twice as large"
            },
            {
              "value": "Split each third into 2 equal parts",
              "label": "Split each third into 2 equal parts"
            },
            {
              "value": "Double the shaded amount",
              "label": "Double the shaded amount"
            }
          ],
          "objectiveIds": [
            "Y6-FR-04"
          ]
        },
        {
          "id": "divide-8",
          "prompt": "Four people each receive 1/8 litre. What total fractional amount was shared? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "stretch",
          "hints": [
            "Undo sharing by combining all four equal shares.",
            "Count four eighths, then simplify."
          ],
          "solution": "4 × 1/8 = 4/8 = 1/2 litre.",
          "unit": "litres",
          "verification": {
            "op": "×",
            "a": "4",
            "b": "1/8"
          },
          "objectiveIds": [
            "Y6-FR-04"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Does dividing the numerator by the whole number always work neatly? Compare 4/5 ÷ 2 with 1/5 ÷ 2.",
        "notes": "The first gives 2/5 directly. The second requires subdividing fifths into tenths, giving 1/10. Dividing a fraction by n can always be represented as dividing its numerator by denominator × n, then simplifying; do not divide the denominator by n."
      },
      "practical": {
        "materials": [
          "Paper strip",
          "Scissors",
          "Two or three small mats"
        ],
        "steps": [
          "Mark 3/4 of a strip. Share this shaded length between 2 mats.",
          "Cut into eighths if necessary.",
          "Write each share as a fraction of the original whole, then combine the shares to check."
        ]
      }
    },
    {
      "id": "quantity",
      "title": "Parts and the whole",
      "short": "Fractions of amounts",
      "objectiveIds": [
        "Y6-FR-01",
        "Y6-FR-03"
      ],
      "prerequisites": [
        "divide",
        "multiply"
      ],
      "goal": "Find a fractional amount and reason backwards from a known fractional part to the whole.",
      "model": {
        "type": "quantity",
        "a": "3/4",
        "whole": 20
      },
      "explorePrompt": "Arrange the whole set into equal groups. Which groups belong to the chosen fraction?",
      "exploreGoal": "Explain the unit fraction first, and use it both to find a part and to rebuild a missing whole.",
      "worked": [
        {
          "text": "3/5 of a collection is 12 counters. Find the whole collection.",
          "model": {
            "type": "quantity",
            "a": "3/5",
            "whole": 20,
            "preset": {
              "selectedGroups": 3
            }
          }
        },
        {
          "text": "The 12 counters fill 3 equal groups, so each fifth contains 12 ÷ 3 = 4 counters.",
          "model": {
            "type": "quantity",
            "a": "3/5",
            "whole": 20,
            "preset": {
              "selectedGroups": 1
            }
          }
        },
        {
          "text": "The whole contains 5 groups: 5 × 4 = 20 counters.",
          "model": {
            "type": "quantity",
            "a": "3/5",
            "whole": 20,
            "preset": {
              "selectedGroups": 5
            }
          }
        },
        {
          "text": "Check forwards: 3/5 of 20 is 12. The starting 12 was the known part, not the whole.",
          "model": {
            "type": "quantity",
            "a": "3/5",
            "whole": 20,
            "preset": {
              "selectedGroups": 3
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "quantity-1",
          "prompt": "Find 1/4 of 20.",
          "answer": {
            "kind": "number",
            "value": "5"
          },
          "difficulty": "start",
          "hints": [
            "Split the whole amount into 4 equal groups.",
            "One group is 1/4 of the whole. Use 1 of those groups."
          ],
          "solution": "20 ÷ 4 = 5; then multiply by 1 to get 5.",
          "model": {
            "type": "quantity",
            "a": "1/4",
            "whole": 20
          },
          "verification": {
            "op": "×",
            "a": "1/4",
            "b": "20"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-2",
          "prompt": "Find 2/3 of 18.",
          "answer": {
            "kind": "number",
            "value": "12"
          },
          "difficulty": "start",
          "hints": [
            "Split the whole amount into 3 equal groups.",
            "One group is 1/3 of the whole. Use 2 of those groups."
          ],
          "solution": "18 ÷ 3 = 6; then multiply by 2 to get 12.",
          "model": {
            "type": "quantity",
            "a": "2/3",
            "whole": 18
          },
          "verification": {
            "op": "×",
            "a": "2/3",
            "b": "18"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-3",
          "prompt": "Find 3/5 of 35.",
          "answer": {
            "kind": "number",
            "value": "21"
          },
          "difficulty": "build",
          "hints": [
            "Split the whole amount into 5 equal groups.",
            "One group is 1/5 of the whole. Use 3 of those groups."
          ],
          "solution": "35 ÷ 5 = 7; then multiply by 3 to get 21.",
          "model": {
            "type": "quantity",
            "a": "3/5",
            "whole": 35
          },
          "verification": {
            "op": "×",
            "a": "3/5",
            "b": "35"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-4",
          "prompt": "Find 5/8 of 48.",
          "answer": {
            "kind": "number",
            "value": "30"
          },
          "difficulty": "build",
          "hints": [
            "Split the whole amount into 8 equal groups.",
            "One group is 1/8 of the whole. Use 5 of those groups."
          ],
          "solution": "48 ÷ 8 = 6; then multiply by 5 to get 30.",
          "model": {
            "type": "quantity",
            "a": "5/8",
            "whole": 48
          },
          "verification": {
            "op": "×",
            "a": "5/8",
            "b": "48"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-5",
          "prompt": "A club has 28 members. Exactly 3/4 cycle to the meeting. How many members cycle?",
          "answer": {
            "kind": "number",
            "value": "21"
          },
          "difficulty": "build",
          "hints": [
            "Split the whole amount into 4 equal groups.",
            "One group is 1/4 of the whole. Use 3 of those groups."
          ],
          "solution": "28 ÷ 4 = 7; then multiply by 3 to get 21.",
          "unit": "members",
          "model": {
            "type": "quantity",
            "a": "3/4",
            "whole": 28
          },
          "verification": {
            "op": "×",
            "a": "3/4",
            "b": "28"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-6",
          "prompt": "3/5 of a collection is 18 counters. How many counters are in the whole collection?",
          "answer": {
            "kind": "number",
            "value": "30"
          },
          "difficulty": "stretch",
          "hints": [
            "The 18 counters are 3 equal groups, not 5.",
            "Find one fifth by dividing by 3, then rebuild all 5 fifths."
          ],
          "solution": "One fifth is 18 ÷ 3 = 6. The whole is 6 × 5 = 30 counters.",
          "unit": "counters",
          "verification": {
            "op": "÷",
            "a": "18",
            "b": "3/5"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-7",
          "prompt": "A runner has completed 2/3 of a route and has 4 km left. How long is the whole route?",
          "answer": {
            "kind": "number",
            "value": "12"
          },
          "difficulty": "stretch",
          "hints": [
            "What fraction of the route is still left?",
            "Use the remaining unit fraction to rebuild the whole route."
          ],
          "solution": "1/3 remains, so 1/3 of the route is 4 km. The whole route is 3 × 4 = 12 km.",
          "unit": "km",
          "verification": {
            "op": "÷",
            "a": "4",
            "b": "1/3"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        },
        {
          "id": "quantity-8",
          "prompt": "A learner knows 3/4 of a number is 15. Which first step finds 1/4 of the number?",
          "answer": {
            "kind": "choice",
            "value": "15 ÷ 3"
          },
          "difficulty": "stretch",
          "hints": [
            "15 represents three equal quarter-groups.",
            "To find one quarter, share 15 among those three groups."
          ],
          "solution": "15 ÷ 3 gives one quarter, which is 5. Multiplying 5 by 4 would then give the whole, 20.",
          "choices": [
            {
              "value": "15 ÷ 4",
              "label": "15 ÷ 4"
            },
            {
              "value": "15 ÷ 3",
              "label": "15 ÷ 3"
            },
            {
              "value": "15 × 4",
              "label": "15 × 4"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-03"
          ]
        }
      ],
      "reasoning": {
        "prompt": "How is finding 3/4 of 20 different from finding the whole when 3/4 is 20? Draw both situations.",
        "notes": "In the first case, 20 is the whole: 20 ÷ 4 × 3 = 15. In the second, 20 is the known three-quarter part: 20 ÷ 3 × 4 = 80/3. It is acceptable to discuss the second with lengths rather than indivisible people. The two operations answer different questions."
      },
      "practical": {
        "materials": [
          "24 counters",
          "Five paper group mats",
          "A bar sketch"
        ],
        "steps": [
          "Find 3/4 of 24 by making four equal groups.",
          "Now hide a whole collection and reveal that 2/3 of it is 10 counters.",
          "Reconstruct the whole with groups and explain which quantity was known."
        ]
      }
    },
    {
      "id": "connections",
      "title": "One amount, three names",
      "short": "Fractions, division and percentages",
      "objectiveIds": [
        "Y6-FR-05"
      ],
      "prerequisites": [
        "equivalence",
        "divide",
        "Y5-FR-07"
      ],
      "goal": "Connect a fraction to a division, and recognise familiar fraction, decimal and percentage names for the same amount.",
      "model": {
        "type": "connections",
        "a": "3/4"
      },
      "explorePrompt": "Match a shaded amount to its fraction, decimal and percentage. Keep checking against one whole.",
      "exploreGoal": "Explain one familiar equivalence using equal parts of a whole, not only a memorised fact.",
      "worked": [
        {
          "text": "Share 3 whole strips equally among 5 people. Each person receives 3/5 of a strip.",
          "model": {
            "type": "connections",
            "a": "3/5",
            "preset": {
              "numerator": 3
            }
          }
        },
        {
          "text": "The same calculation is 3 ÷ 5. Each share is 6 tenths, or 0.6.",
          "model": {
            "type": "connections",
            "a": "3/5",
            "preset": {
              "numerator": 3
            }
          }
        },
        {
          "text": "3/5 = 60/100, so it is also 60%. Percent means parts per hundred.",
          "model": {
            "type": "connections",
            "a": "3/5",
            "preset": {
              "numerator": 3
            }
          }
        },
        {
          "text": "Thus 3 ÷ 5 = 3/5 = 0.6 = 60%. These are different names for the same amount.",
          "model": {
            "type": "connections",
            "a": "3/5",
            "preset": {
              "numerator": 3
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "connections-1",
          "prompt": "Three identical pizzas are shared equally among 4 people. What fraction of one pizza does each person receive? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/4",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Each pizza could be split into 4 equal pieces.",
            "Each person receives one quarter from each of the 3 pizzas."
          ],
          "solution": "3 ÷ 4 = 3/4 of one pizza per person.",
          "model": {
            "type": "connections",
            "a": "3/4"
          },
          "verification": {
            "op": "÷",
            "a": "3",
            "b": "4"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-2",
          "prompt": "Which division is represented by 5/8?",
          "answer": {
            "kind": "choice",
            "value": "5 ÷ 8"
          },
          "difficulty": "start",
          "hints": [
            "A fraction can show the numerator shared into denominator-many groups.",
            "The numerator is the amount being divided."
          ],
          "solution": "5/8 means 5 divided by 8.",
          "choices": [
            {
              "value": "8 ÷ 5",
              "label": "8 ÷ 5"
            },
            {
              "value": "5 ÷ 8",
              "label": "5 ÷ 8"
            },
            {
              "value": "5 × 8",
              "label": "5 × 8"
            }
          ],
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-3",
          "prompt": "Write 1/4 as a decimal.",
          "answer": {
            "kind": "number",
            "value": "0.25",
            "format": "decimal"
          },
          "difficulty": "build",
          "hints": [
            "Rewrite the fraction with denominator 100.",
            "A hundredth is 0.01."
          ],
          "solution": "1/4 = 25/100 = 0.25.",
          "model": {
            "type": "connections",
            "a": "1/4"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-4",
          "prompt": "Write 3/8 as a decimal.",
          "answer": {
            "kind": "number",
            "value": "0.375",
            "format": "decimal"
          },
          "difficulty": "build",
          "hints": [
            "Think of 3 ÷ 8, or begin from 1/8 = 0.125.",
            "Three eighths are three equal copies of one eighth."
          ],
          "solution": "3 ÷ 8 = 0.375. Also 3 × 0.125 = 0.375.",
          "model": {
            "type": "connections",
            "a": "3/8"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-5",
          "prompt": "What percentage is equal to 7/10?",
          "answer": {
            "kind": "number",
            "value": "70"
          },
          "difficulty": "build",
          "hints": [
            "Percent means parts out of 100.",
            "Rewrite tenths as hundredths."
          ],
          "solution": "7/10 = 70/100 = 70%.",
          "unit": "%",
          "model": {
            "type": "connections",
            "a": "7/10"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-6",
          "prompt": "Write 0.4 as a fraction in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "2/5",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "0.4 is four tenths.",
            "Simplify that fraction by dividing both numbers by their common factor."
          ],
          "solution": "0.4 = 4/10 = 2/5.",
          "model": {
            "type": "connections",
            "a": "2/5"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-7",
          "prompt": "Write 75% as a fraction in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/4",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Write the percentage as a fraction with denominator 100.",
            "Regroup both the 75 shaded parts and all 100 parts by the same common factor."
          ],
          "solution": "75% = 75/100 = 3/4.",
          "model": {
            "type": "connections",
            "a": "3/4"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-8",
          "prompt": "A tank is 60% full. Another identical tank is 5/8 full. Which tank is fuller?",
          "answer": {
            "kind": "choice",
            "value": "The 5/8 tank"
          },
          "difficulty": "stretch",
          "hints": [
            "Compare in the same form: fractions, decimals or percentages.",
            "5/8 = 0.625, while 60% = 0.6."
          ],
          "solution": "The 5/8 tank is fuller: 0.625 > 0.6. Equivalently, 62.5% > 60%.",
          "choices": [
            {
              "value": "The 60% tank",
              "label": "The 60% tank"
            },
            {
              "value": "The 5/8 tank",
              "label": "The 5/8 tank"
            },
            {
              "value": "They are equally full",
              "label": "They are equally full"
            }
          ],
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-9",
          "prompt": "Five litres of water are shared equally between 4 containers. Write the amount in each container as a decimal.",
          "answer": {
            "kind": "number",
            "value": "1.25",
            "format": "decimal"
          },
          "difficulty": "stretch",
          "hints": [
            "Share one whole litre to each container first.",
            "The remaining litre is divided into 4 equal parts."
          ],
          "solution": "5 ÷ 4 = 5/4 = 1 1/4 = 1.25 litres per container.",
          "unit": "litres",
          "verification": {
            "op": "÷",
            "a": "5",
            "b": "4"
          },
          "objectiveIds": [
            "Y6-FR-05"
          ]
        },
        {
          "id": "connections-10",
          "prompt": "Which row contains three equal amounts?",
          "answer": {
            "kind": "choice",
            "value": "1/5 = 0.2 = 20%"
          },
          "difficulty": "stretch",
          "hints": [
            "One fifth is the same amount as two tenths.",
            "Match the decimal place value and the number of hundredths."
          ],
          "solution": "1/5 = 2/10 = 0.2 = 20/100 = 20%.",
          "choices": [
            {
              "value": "1/5 = 0.5 = 50%",
              "label": "1/5 = 0.5 = 50%"
            },
            {
              "value": "1/5 = 0.2 = 20%",
              "label": "1/5 = 0.2 = 20%"
            },
            {
              "value": "1/5 = 0.02 = 2%",
              "label": "1/5 = 0.02 = 2%"
            }
          ],
          "objectiveIds": [
            "Y6-FR-05"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Explain why 0.5, 1/2 and 50% are equal, but 0.05 is different. Use a hundred-square or a strip.",
        "notes": "0.5 is 5 tenths = 50 hundredths. One half and 50% also show 50 out of 100 equal parts. 0.05 is only 5 hundredths. Keep the whole fixed and point to place value."
      },
      "practical": {
        "materials": [
          "A hundred-square",
          "Fraction cards",
          "Blank cards"
        ],
        "steps": [
          "Shade 1/4, 1/2 and 3/4 of the hundred-square.",
          "Write matching fraction, decimal and percentage cards.",
          "Add fifths and tenths, then create one deliberately mismatched set for someone to explain."
        ]
      }
    },
    {
      "id": "problems",
      "title": "Choose a route",
      "short": "Connected fraction problems",
      "objectiveIds": [
        "Y6-FR-01",
        "Y6-FR-02",
        "Y6-FR-03",
        "Y6-FR-04",
        "Y6-FR-05"
      ],
      "prerequisites": [
        "compare",
        "mixed-operations",
        "multiply",
        "divide",
        "quantity",
        "connections"
      ],
      "goal": "Choose operations from the meaning of a problem, estimate the answer, and explain a connected solution.",
      "model": {
        "type": "subtract",
        "a": "1",
        "b": "7/12"
      },
      "explorePrompt": "Use the models to plan a route. Decide what the whole is before calculating.",
      "exploreGoal": "Explain why each operation fits the context and check that the answer is reasonable.",
      "worked": [
        {
          "text": "A bed is planted with 1/4 herbs and 2/5 flowers. What fraction is still empty?",
          "model": {
            "type": "add",
            "a": "1/4",
            "b": "2/5",
            "preset": {
              "commonD": 20,
              "selected": 0
            }
          }
        },
        {
          "text": "Find the planted part first: 1/4 + 2/5 = 5/20 + 8/20 = 13/20.",
          "model": {
            "type": "add",
            "a": "1/4",
            "b": "2/5",
            "preset": {
              "commonD": 20,
              "selected": 13
            }
          }
        },
        {
          "text": "The whole bed is 20/20. Empty space is 20/20 − 13/20 = 7/20.",
          "model": {
            "type": "subtract",
            "a": "1",
            "b": "13/20",
            "preset": {
              "commonD": 20,
              "selected": 7
            }
          }
        },
        {
          "text": "Check: planted plus empty is 13/20 + 7/20 = 1 whole bed.",
          "model": {
            "type": "subtract",
            "a": "1",
            "b": "13/20",
            "preset": {
              "commonD": 20,
              "selected": 7
            }
          }
        }
      ],
      "tasks": [
        {
          "id": "problems-1",
          "prompt": "A garden has vegetables on 1/3 and flowers on 1/4 of its area. The rest is empty. What fraction is empty? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "5/12",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "First combine the two planted parts.",
            "Subtract the planted fraction from one whole."
          ],
          "solution": "1/3 + 1/4 = 4/12 + 3/12 = 7/12 planted. Empty: 1 − 7/12 = 5/12.",
          "model": {
            "type": "add",
            "a": "1/3",
            "b": "1/4"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-2",
          "prompt": "A full recipe needs 3/4 cup of oats. You make 2/3 of the recipe. How many cups of oats are needed? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "1/2",
            "simplest": true
          },
          "difficulty": "start",
          "hints": [
            "Think of the first fraction of the second fraction of one fixed whole.",
            "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
          ],
          "solution": "(2 × 3)/(3 × 4) = 6/12 = 1/2.",
          "unit": "cups",
          "model": {
            "type": "multiply",
            "a": "2/3",
            "b": "3/4"
          },
          "verification": {
            "op": "×",
            "a": "2/3",
            "b": "3/4"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-3",
          "prompt": "A strip is 2 1/3 m long. You cut off 3/4 m. How long is the remaining strip? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "19/12",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Keep the whole the same. The pieces need equal-sized fractional units.",
            "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
          ],
          "solution": "2 1/3 = 28/12 and 3/4 = 9/12. 28/12 − 9/12 = 19/12 = 1 7/12.",
          "unit": "m",
          "model": {
            "type": "subtract",
            "a": "2 1/3",
            "b": "3/4"
          },
          "verification": {
            "op": "−",
            "a": "2 1/3",
            "b": "3/4"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-4",
          "prompt": "Four friends share 3/5 of a pizza equally. What fraction of the original whole pizza does each get? Give your answer in simplest form.",
          "answer": {
            "kind": "fraction",
            "value": "3/20",
            "simplest": true
          },
          "difficulty": "build",
          "hints": [
            "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
            "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
          ],
          "solution": "3/5 ÷ 4 = 3/(5 × 4) = 3/20.",
          "model": {
            "type": "divide",
            "a": "3/5",
            "by": 4
          },
          "verification": {
            "op": "÷",
            "a": "3/5",
            "b": "4"
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-5",
          "prompt": "A library lends 3/8 of its 40 new books on Monday, then lends a different 1/4 of the original 40 on Tuesday. None are returned. How many remain?",
          "answer": {
            "kind": "number",
            "value": "15"
          },
          "difficulty": "build",
          "hints": [
            "Both fractions refer to the original 40 books.",
            "Find the two borrowed amounts, combine them, then subtract from 40."
          ],
          "solution": "3/8 of 40 = 15 and 1/4 of 40 = 10. In total 25 are borrowed, leaving 40 − 25 = 15 books.",
          "unit": "books",
          "model": {
            "type": "quantity",
            "a": "3/8",
            "whole": 40
          },
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-6",
          "prompt": "A team has completed 75% of a task. Another team has completed 7/10 of the same task. Which team has more left to do?",
          "answer": {
            "kind": "choice",
            "value": "The 7/10 team"
          },
          "difficulty": "stretch",
          "hints": [
            "Compare the completed amounts in the same form.",
            "The team that completed less has more left."
          ],
          "solution": "75% = 3/4 = 0.75, while 7/10 = 0.7. The 7/10 team has completed less and has more left: 30% rather than 25%.",
          "choices": [
            {
              "value": "The 75% team",
              "label": "The 75% team"
            },
            {
              "value": "The 7/10 team",
              "label": "The 7/10 team"
            },
            {
              "value": "The same amount",
              "label": "The same amount"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-7",
          "prompt": "2/5 of a trail is 6 km. You walk another 1/3 of the whole trail. How many kilometres have you walked altogether?",
          "answer": {
            "kind": "number",
            "value": "11"
          },
          "difficulty": "stretch",
          "hints": [
            "Find the whole trail from the known 2/5 first.",
            "Find 1/3 of that whole, then add it to the original 6 km."
          ],
          "solution": "One fifth is 6 ÷ 2 = 3 km, so the whole is 15 km. One third is 5 km. Altogether: 6 + 5 = 11 km.",
          "unit": "km",
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        },
        {
          "id": "problems-8",
          "prompt": "Mira drinks 1/2 of a 3/4-litre bottle. Jo drinks 1/3 of a 1-litre bottle. Who drinks more?",
          "answer": {
            "kind": "choice",
            "value": "Mira"
          },
          "difficulty": "stretch",
          "hints": [
            "The bottles have different whole amounts, so compare litres rather than just 1/2 and 1/3.",
            "Find 1/2 × 3/4 litre, then compare with 1/3 litre."
          ],
          "solution": "Mira drinks 3/8 litre = 9/24 litre. Jo drinks 1/3 litre = 8/24 litre. Mira drinks more by 1/24 litre.",
          "model": {
            "type": "multiply",
            "a": "1/2",
            "b": "3/4"
          },
          "choices": [
            {
              "value": "Mira",
              "label": "Mira"
            },
            {
              "value": "Jo",
              "label": "Jo"
            },
            {
              "value": "The same amount",
              "label": "The same amount"
            }
          ],
          "objectiveIds": [
            "Y6-FR-01",
            "Y6-FR-02",
            "Y6-FR-03",
            "Y6-FR-04",
            "Y6-FR-05"
          ]
        }
      ],
      "reasoning": {
        "prompt": "Design a two-step fraction problem. State the whole, solve it, then change one number so the answer changes in a predictable way.",
        "notes": "Check the reference whole and units at every step. Ask for an estimate and a reason for each operation. Accept a diagram or oral explanation; there is no single automatic score for this task."
      },
      "practical": {
        "materials": [
          "Paper strips or counters",
          "Small containers",
          "Paper for a plan"
        ],
        "steps": [
          "Choose a recipe, route or shared collection.",
          "Make a two-step problem using fractions that can be modelled with the materials.",
          "Swap problems and explain what each quantity means before calculating."
        ]
      }
    }
  ],
  "review": [
    {
      "id": "review-1",
      "prompt": "4/7 = ?/21. Find the missing numerator.",
      "answer": {
        "kind": "number",
        "value": "12"
      },
      "difficulty": "start",
      "hints": [
        "Find the scale factor from 7 to 21.",
        "Use the same factor for the numerator."
      ],
      "solution": "7 × 3 = 21, so 4 × 3 = 12.",
      "model": {
        "type": "equivalence",
        "n": 4,
        "d": 7,
        "targetD": 21
      },
      "objectiveIds": [
        "Y6-FR-01"
      ]
    },
    {
      "id": "review-2",
      "prompt": "Write 21/28 in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "3/4",
        "simplest": true
      },
      "difficulty": "start",
      "hints": [
        "Look for a common factor of 21 and 28.",
        "Both are multiples of 7."
      ],
      "solution": "Divide both numbers by 7: 21/28 = 3/4.",
      "model": {
        "type": "simplify",
        "n": 21,
        "d": 28
      },
      "objectiveIds": [
        "Y6-FR-01"
      ]
    },
    {
      "id": "review-3",
      "prompt": "Arrange these fractions from smallest to largest.",
      "answer": {
        "kind": "order",
        "value": [
          "1 1/3",
          "11/8",
          "1 2/5"
        ]
      },
      "difficulty": "build",
      "hints": [
        "Look at whole-number parts and benchmark values first.",
        "Use common denominators for any pair whose order is not yet clear."
      ],
      "solution": "Smallest to largest: 1 1/3 < 11/8 < 1 2/5. Using denominator 120: 160/120 < 165/120 < 168/120.",
      "model": {
        "type": "compare",
        "values": [
          "1 2/5",
          "11/8",
          "1 1/3"
        ]
      },
      "choices": [
        {
          "value": "11/8",
          "label": "11/8"
        },
        {
          "value": "1 2/5",
          "label": "1 2/5"
        },
        {
          "value": "1 1/3",
          "label": "1 1/3"
        }
      ],
      "verification": {
        "op": "order",
        "values": [
          "1 2/5",
          "11/8",
          "1 1/3"
        ]
      },
      "objectiveIds": [
        "Y6-FR-01"
      ]
    },
    {
      "id": "review-4",
      "prompt": "Choose the symbol: 7/9  ?  3/4.",
      "answer": {
        "kind": "choice",
        "value": ">"
      },
      "difficulty": "build",
      "hints": [
        "Compare wholes first. For fractional parts, keep the same whole.",
        "Use a common denominator or compare both amounts with a useful benchmark such as 1/2."
      ],
      "solution": "7/9 > 3/4. A common denominator is 36: 28/36 > 27/36.",
      "model": {
        "type": "compare",
        "values": [
          "7/9",
          "3/4"
        ]
      },
      "choices": [
        {
          "value": "<",
          "label": "<"
        },
        {
          "value": "=",
          "label": "="
        },
        {
          "value": ">",
          "label": ">"
        }
      ],
      "verification": {
        "op": "compare",
        "a": "7/9",
        "b": "3/4"
      },
      "objectiveIds": [
        "Y6-FR-01"
      ]
    },
    {
      "id": "review-5",
      "prompt": "Calculate 2/5 + 1/6. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "17/30",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Keep the whole the same. The pieces need equal-sized fractional units.",
        "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
      ],
      "solution": "2/5 = 12/30 and 1/6 = 5/30. 12/30 + 5/30 = 17/30 = 17/30.",
      "model": {
        "type": "add",
        "a": "2/5",
        "b": "1/6"
      },
      "verification": {
        "op": "+",
        "a": "2/5",
        "b": "1/6"
      },
      "objectiveIds": [
        "Y6-FR-02"
      ]
    },
    {
      "id": "review-6",
      "prompt": "Calculate 5/8 − 1/6. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "11/24",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Keep the whole the same. The pieces need equal-sized fractional units.",
        "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
      ],
      "solution": "5/8 = 15/24 and 1/6 = 4/24. 15/24 − 4/24 = 11/24 = 11/24.",
      "model": {
        "type": "subtract",
        "a": "5/8",
        "b": "1/6"
      },
      "verification": {
        "op": "−",
        "a": "5/8",
        "b": "1/6"
      },
      "objectiveIds": [
        "Y6-FR-02"
      ]
    },
    {
      "id": "review-7",
      "prompt": "Calculate 1 5/6 + 2 1/4. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "49/12",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Keep the whole the same. The pieces need equal-sized fractional units.",
        "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
      ],
      "solution": "1 5/6 = 22/12 and 2 1/4 = 27/12. 22/12 + 27/12 = 49/12 = 4 1/12.",
      "model": {
        "type": "add",
        "a": "1 5/6",
        "b": "2 1/4"
      },
      "verification": {
        "op": "+",
        "a": "1 5/6",
        "b": "2 1/4"
      },
      "objectiveIds": [
        "Y6-FR-02"
      ]
    },
    {
      "id": "review-8",
      "prompt": "Calculate 3 1/6 − 1 3/4. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "17/12",
        "simplest": true
      },
      "difficulty": "stretch",
      "hints": [
        "Keep the whole the same. The pieces need equal-sized fractional units.",
        "Use a common multiple of the denominators. Rewrite both amounts before combining or removing pieces."
      ],
      "solution": "3 1/6 = 38/12 and 1 3/4 = 21/12. 38/12 − 21/12 = 17/12 = 1 5/12.",
      "model": {
        "type": "subtract",
        "a": "3 1/6",
        "b": "1 3/4"
      },
      "verification": {
        "op": "−",
        "a": "3 1/6",
        "b": "1 3/4"
      },
      "objectiveIds": [
        "Y6-FR-02"
      ]
    },
    {
      "id": "review-9",
      "prompt": "Calculate 3/7 × 7/9. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "1/3",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Think of the first fraction of the second fraction of one fixed whole.",
        "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
      ],
      "solution": "(3 × 7)/(7 × 9) = 21/63 = 1/3.",
      "model": {
        "type": "multiply",
        "a": "3/7",
        "b": "7/9"
      },
      "verification": {
        "op": "×",
        "a": "3/7",
        "b": "7/9"
      },
      "objectiveIds": [
        "Y6-FR-03"
      ]
    },
    {
      "id": "review-10",
      "prompt": "Calculate 5/8 × 4/5. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "1/2",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Think of the first fraction of the second fraction of one fixed whole.",
        "An area model has denominator × denominator equal cells. Count only the overlap, then simplify."
      ],
      "solution": "(5 × 4)/(8 × 5) = 20/40 = 1/2.",
      "model": {
        "type": "multiply",
        "a": "5/8",
        "b": "4/5"
      },
      "verification": {
        "op": "×",
        "a": "5/8",
        "b": "4/5"
      },
      "objectiveIds": [
        "Y6-FR-03"
      ]
    },
    {
      "id": "review-11",
      "prompt": "Calculate 4/5 ÷ 3. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "4/15",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
        "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
      ],
      "solution": "4/5 ÷ 3 = 4/(5 × 3) = 4/15.",
      "model": {
        "type": "divide",
        "a": "4/5",
        "by": 3
      },
      "verification": {
        "op": "÷",
        "a": "4/5",
        "b": "3"
      },
      "objectiveIds": [
        "Y6-FR-04"
      ]
    },
    {
      "id": "review-12",
      "prompt": "Calculate 1/4 ÷ 2. Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "1/8",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Share the given fraction into equal groups. Each group must be smaller than the starting amount.",
        "You can split every fractional piece into that many smaller pieces. The original whole stays the same."
      ],
      "solution": "1/4 ÷ 2 = 1/(4 × 2) = 1/8.",
      "model": {
        "type": "divide",
        "a": "1/4",
        "by": 2
      },
      "verification": {
        "op": "÷",
        "a": "1/4",
        "b": "2"
      },
      "objectiveIds": [
        "Y6-FR-04"
      ]
    },
    {
      "id": "review-13",
      "prompt": "Find 7/10 of 50.",
      "answer": {
        "kind": "number",
        "value": "35"
      },
      "difficulty": "build",
      "hints": [
        "Split the whole amount into 10 equal groups.",
        "One group is 1/10 of the whole. Use 7 of those groups."
      ],
      "solution": "50 ÷ 10 = 5; then multiply by 7 to get 35.",
      "model": {
        "type": "quantity",
        "a": "7/10",
        "whole": 50
      },
      "verification": {
        "op": "×",
        "a": "7/10",
        "b": "50"
      },
      "objectiveIds": [
        "Y6-FR-01",
        "Y6-FR-03"
      ]
    },
    {
      "id": "review-14",
      "prompt": "4/7 of a collection is 20 counters. How many counters are in the whole?",
      "answer": {
        "kind": "number",
        "value": "35"
      },
      "difficulty": "stretch",
      "hints": [
        "20 represents four equal sevenths.",
        "Find one seventh, then all seven."
      ],
      "solution": "One seventh is 20 ÷ 4 = 5. The whole is 5 × 7 = 35 counters.",
      "unit": "counters",
      "verification": {
        "op": "÷",
        "a": "20",
        "b": "4/7"
      },
      "objectiveIds": [
        "Y6-FR-01",
        "Y6-FR-03"
      ]
    },
    {
      "id": "review-15",
      "prompt": "Seven identical loaves are shared equally between 8 people. What fraction of one loaf does each get? Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "7/8",
        "simplest": true
      },
      "difficulty": "build",
      "hints": [
        "Each loaf can be cut into 8 equal pieces.",
        "Each person receives one piece from every loaf."
      ],
      "solution": "7 ÷ 8 = 7/8 of one loaf each.",
      "model": {
        "type": "connections",
        "a": "7/8"
      },
      "verification": {
        "op": "÷",
        "a": "7",
        "b": "8"
      },
      "objectiveIds": [
        "Y6-FR-05"
      ]
    },
    {
      "id": "review-16",
      "prompt": "Write 5/8 as a decimal.",
      "answer": {
        "kind": "number",
        "value": "0.625",
        "format": "decimal"
      },
      "difficulty": "build",
      "hints": [
        "Think of 5 ÷ 8 or five copies of one eighth.",
        "One eighth equals 0.125."
      ],
      "solution": "5 ÷ 8 = 0.625.",
      "model": {
        "type": "connections",
        "a": "5/8"
      },
      "objectiveIds": [
        "Y6-FR-05"
      ]
    },
    {
      "id": "review-17",
      "prompt": "What percentage is equal to 9/20?",
      "answer": {
        "kind": "number",
        "value": "45"
      },
      "difficulty": "build",
      "hints": [
        "Rewrite the fraction with denominator 100.",
        "Multiply both numbers by the factor that turns 20 into 100."
      ],
      "solution": "9/20 = 45/100 = 45%.",
      "unit": "%",
      "model": {
        "type": "connections",
        "a": "9/20"
      },
      "objectiveIds": [
        "Y6-FR-05"
      ]
    },
    {
      "id": "review-18",
      "prompt": "A wall is painted 1/5 blue and 3/8 yellow. What fraction is still unpainted? Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "17/40",
        "simplest": true
      },
      "difficulty": "stretch",
      "hints": [
        "First find the total painted fraction.",
        "Subtract that amount from one whole."
      ],
      "solution": "1/5 + 3/8 = 8/40 + 15/40 = 23/40. Unpainted: 40/40 − 23/40 = 17/40.",
      "model": {
        "type": "add",
        "a": "1/5",
        "b": "3/8"
      },
      "objectiveIds": [
        "Y6-FR-02"
      ]
    },
    {
      "id": "review-19",
      "prompt": "A learner says 2/3 × 3/5 = 6/8. Which part of the method is wrong?",
      "answer": {
        "kind": "choice",
        "value": "Adding the denominators"
      },
      "difficulty": "stretch",
      "hints": [
        "Think about the number of cells in a 3-by-5 area grid.",
        "The total number of equal cells is found with multiplication."
      ],
      "solution": "The denominators should be multiplied: 3 × 5 = 15. The product is 6/15 = 2/5.",
      "model": {
        "type": "multiply",
        "a": "2/3",
        "b": "3/5"
      },
      "choices": [
        {
          "value": "Multiplying the numerators",
          "label": "Multiplying the numerators"
        },
        {
          "value": "Adding the denominators",
          "label": "Adding the denominators"
        },
        {
          "value": "Using equal-sized parts",
          "label": "Using equal-sized parts"
        }
      ],
      "objectiveIds": [
        "Y6-FR-03"
      ]
    },
    {
      "id": "review-20",
      "prompt": "A ribbon of length 7/8 m is shared into 7 equal lengths. How long is each piece? Give your answer in simplest form.",
      "answer": {
        "kind": "fraction",
        "value": "1/8",
        "simplest": true
      },
      "difficulty": "stretch",
      "hints": [
        "Share the seven eighths into seven groups.",
        "Each group receives the same number of eighths."
      ],
      "solution": "7/8 ÷ 7 = 7/56 = 1/8 m.",
      "unit": "m",
      "model": {
        "type": "divide",
        "a": "7/8",
        "by": 7
      },
      "verification": {
        "op": "÷",
        "a": "7/8",
        "b": "7"
      },
      "objectiveIds": [
        "Y6-FR-04"
      ]
    }
  ],
  "reviewReasoning": {
    "prompt": "Choose one check-up question. Show a second method, or explain why a tempting wrong answer is wrong.",
    "notes": "Review the reference whole, units, equal-sized parts and whether the explanation transfers to a changed example. Record teacher discussion separately from automatically checked responses."
  },
  "reviewPractical": {
    "materials": [
      "Paper strips",
      "Counters",
      "Pencil"
    ],
    "steps": [
      "Choose two check-up questions that need different models.",
      "Represent each one with materials before writing a calculation.",
      "Explain what every number means and check the answer in context."
    ]
  },
  "sources": [
    {
      "title": "DfE: Mathematics programmes of study, Year 6 fractions including decimals and percentages",
      "url": "https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study",
      "retrieved": "2026-11-18"
    }
  ],
  "authorship": "Original teaching text and questions for Maths Wednesdays. Independent of White Rose Education.",
  "pilotStatus": "Built for educator and learner review; no real learner trial is claimed."
};});
