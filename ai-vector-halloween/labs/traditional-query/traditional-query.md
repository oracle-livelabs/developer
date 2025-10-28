# Lab 3: Watson Attempts a Traditional Search

## Task 1: Watson's Investigation - Traditional Keyword Search

"Watson, why don't you take the first pass? I shall observe your methodology."

"Excellent idea!" I exclaimed. "I'll search through the evidence systematically using proper investigative techniques."

"Right then," I said, rolling up my sleeves. "Let's start with what we know. There were theatrical elements to this crime - lighting effects and stage equipment. Let me search for anything stage or performance."

### Search 1: Looking for Theatrical Elements

```sql
<copy>
-- Watson searches for theatrical evidence
SELECT clue_id, clue_type, location_found, clue_text
FROM mystery_clues
WHERE UPPER(clue_text) LIKE '%STAGE%'
   OR UPPER(clue_text) LIKE '%PERFORMANCE%';
</copy>
```

**Results:** 1 clue found

| clue_id | clue_type | location_found | clue_text |
|---------|-----------|----------------|-----------|
| 8 | Physical Evidence | Near Museum | Professional stage equipment found abandoned near the scene, including portable lighting rigs and theatrical props |

"Hmm," I muttered. "Only one clue about stage equipment. Could be from a nearby theatre. Or perhaps street performers? This doesn't tell us much - the equipment could have been abandoned there coincidentally."

### Search 2: Looking for Known Suspects

"Wait," I said, suddenly remembering our previous encounters. "Didn't we have that eccentric scientist Dr. Cornelius Pumpkin involved in some peculiar business a while back? The one with all those unusual interests? Let me search for him specifically!"

```sql
<copy>
-- Watson searches for Dr. Pumpkin
SELECT clue_id, clue_type, location_found, clue_text
FROM mystery_clues
WHERE UPPER(clue_text) LIKE '%PUMPKIN%'
   OR UPPER(clue_text) LIKE '%CORNELIUS%'
   OR UPPER(clue_text) LIKE '%DR. PUMPKIN%';
</copy>
```

**Results:** 0 clues found

"Nothing!" I exclaimed in frustration. "No mention of Dr. Pumpkin anywhere in the evidence. Well, I suppose that rules him out as a suspect. Unless..." I trailed off, uncertain.

Holmes raised an eyebrow but said nothing.

### Search 3: Looking for Family Connections

"Let me try a different approach," I said, determined not to give up. "Lestrade mentioned something about someone discussing 'family legacy.' Let me search for that!"

```sql
<copy>
-- Watson searches for family references
SELECT clue_id, clue_type, location_found, clue_text
FROM mystery_clues
WHERE UPPER(clue_text) LIKE '%FAMILY%'
   OR UPPER(clue_text) LIKE '%LEGACY%'
   OR UPPER(clue_text) LIKE '%INHERITANCE%';
</copy>
```

**Results:** 1 clue found

| clue_id | clue_type | location_found | clue_text |
|---------|-----------|----------------|-----------|
| 3 | Witness Report | Museum Corridor | Someone was heard discussing "family legacy" and "rightful inheritance" near the vault |

"Interesting!" I said. "Someone talking about family legacy. But Holmes, this is terribly vague! Whose family? What legacy? This could be anyone with a grievance about inheritance."


## Watson's Confusion

I sat back and reviewed my findings, frustration mounting.

"Holmes, I haven't the faintest idea what to make of this!" I confessed. "I've found clues about:
- Theatrical equipment (possibly abandoned by performers)
- Someone discussing family legacy (utterly ambiguous)
- And notably, NO evidence connecting to any known suspects like Dr. Cornelius Pumpkin

The problem is, none of these connect! I specifically searched for Dr. Pumpkin - someone we know has peculiar scientific interests that might fit this crime - but his name doesn't appear anywhere in the evidence. So either he's not involved, or... well, I don't know what the alternative would be!"

Holmes smiled enigmatically. "Watson, your methodology is sound - you've searched diligently for keywords. But you're searching for *words*, not *meaning*. You're finding trees, my friend, but missing the forest."

"But what else can I do?" I protested. "I've searched for theatrical terms, for specific suspects, for family connections. The evidence simply doesn't connect, and the one person I thought might be involved doesn't appear in any of the clues!"

"Ah, but Watson," Holmes said, his eyes twinkling, "therein lies the fundamental limitation of keyword search. You searched for the name 'Pumpkin' and found nothing - but what if the evidence describes him without using his name? What if the clues point to him through his *characteristics* rather than his identity?"

"I don't understand, Holmes."

"Tell me - if Dr. Cornelius Pumpkin were involved, what would you expect to find? Theatre expertise? Chemistry knowledge? A connection to Cavendish?"

"Well, yes, but..."

"And did you find evidence of those things?"

I paused, thinking back through my searches. "The theatrical equipment, yes. But I didn't search for chemistry because I didn't connect it to Dr. Pumpkin specifically!"

"Precisely," Holmes said. "And that, my dear Watson, is why your keyword search has led you to confusion rather than clarity. You cannot find what you don't know to search for. Now then, let me show you how vector search can reveal the connections you've been missing..."

"Holmes," I said with resignation, "I fear this case is beyond the reach of conventional methods. I cannot find suspects who aren't explicitly named in the evidence!"

"On the contrary, Watson. You've demonstrated perfectly why modern crimes require modern methods. Your keyword searches found *information*, but they couldn't find *meaning*. You searched for a name and found nothing - but the evidence about the person was there all along, just described differently. Now, let me show you what happens when we search for concepts rather than words..."