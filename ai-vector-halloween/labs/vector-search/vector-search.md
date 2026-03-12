# Lab 4: Holmes Applies AI Vector Search to the Problem

## Introduction

This lab walks you through the steps to move beyond the limitations of keyword-based searches and harness the power of semantic analysis using Oracle's AI Vector Search. You will learn how to retrieve conceptually relevant clues-- even when they don't contain the exact words you searched for-- by leveraging vector embeddings to match on meaning, not just vocabulary.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:
* Implement Oracle AI Vector Search to enable semantic querying, allowing users to retrieve records that are conceptually similar to the search phrase, even if they do not share the same keywords.
* Compare and contrast query results between basic keyword-based SQL and AI Vector Search to highlight the advantages of semantic search in extracting meaningful insights from data.
* Showcase how text data is converted into vector embeddings with Oracle AI Autonomous Database to facilitate concept-based retrieval using advanced AI capabilities.

## Holmes's Method: The AI Vector Search Investigation

"Now then, Watson," Holmes said, settling into his chair with his pipe, "you've demonstrated the fundamental limitation of keyword search - you found scattered clues that could support multiple theories."

"Exactly my problem, Holmes!" I exclaimed. "The evidence is too ambiguous!"

"Is it, Watson? Or have you simply been searching for the wrong things?" Holmes's eyes gleamed. "Let me demonstrate the power of semantic analysis through Oracle's AI Vector Search technology. You searched for *words* - I shall search for *meanings*."

"But Holmes," I protested, "how can you search for meaning when the clues themselves are so vague?"

"Ah, but that's where vector embeddings come in, my dear fellow! Each clue has been transformed into a mathematical representation - a vector in high-dimensional space - that captures its semantic meaning. When we query using AI Vector Search, we find clues that are *conceptually similar*, even if they use entirely different vocabulary!"

"But you have the same eleven clues I do," I objected. "How will that help?"

Holmes smiled mysteriously. "Watson, tell me - in all your keyword searches, did you search for personal monograms or identity markers?"

I blinked. "Well, no... there were no names in any of the clues!"

"Precisely. Your keyword search methodology requires you to know what to search for. But what if there's a clue you didn't find because it doesn't contain your search terms?"

Holmes turned to his computer terminal. "Now, Watson, watch what happens when we perform ONE comprehensive semantic search..."



## Task 1: The Comprehensive AI Vector Search

"Watson, I'm going to construct ONE search query that searches for a complete criminal profile - someone with theatrical expertise, chemistry knowledge, hydrogen research obsession, and a family connection to Cavendish."

```sql
<copy>
-- Holmes's comprehensive semantic search
SELECT clue_id, clue_type, location_found,
       SUBSTR(clue_text, 1, 180) || '...' as clue_preview,
       VECTOR_DISTANCE(embedding,
                      VECTOR_EMBEDDING(ALL_MINILM_L12_V2 USING 'chemistry drawings family obsession stagecraft leaving personal signatures' AS data),
                      COSINE) as similarity_score
FROM mystery_clues
ORDER BY similarity_score
FETCH FIRST 5 ROWS ONLY;
</copy>
```

**Holmes's Results:**

| Rank | Evidence Type | Location | Description | Score |
|------|---------------|----------|-------------|-------|
| 11 | Physical Evidence | Inside Vault | A notebook with chemistry research on renewable energy signed "C.P." found dropped on the floor inside the vault... | 0.626 |
| 9 | Physical Evidence | Vault Entrance | Test tubes with glowing residue found near the vault entrance, suggesting chemistry expertise... | 0.63 |
| 4 | Physical Evidence | Street Outside | Luminescent paint residue was found on the cobblestones outside the museum... | 0.682 |
| 6 | Witness Report | Near Museum | Strange glowing patterns resembling chemical formulas were seen dancing in the fog outside... | 0.694 |
| 3 | Witness Report | Museum Corridor | Someone was heard discussing "family legacy" and "rightful inheritance" near the vault... | 0.712 |


*AI Vector Search similarity scores range from 0 to 1, with lower scores indicating closser distance and higher relevance.*


## Conclusion: The Solution Revealed

"Watson, my dear fellow, observe how the evidence clusters around a singular perpetrator. The test tubes with their glowing residue at the vault entrance - similarity score 0.63 - together with that notebook bearing the signature 'C.P.' and detailing chemistry research on renewable energy, found within the vault itself at 0.626. Already we see a pattern emerging."

He gestures enthusiastically with his pipe before adding, "Then consider the chemistry expertise markers: luminescent paint residue upon the cobblestones, those glowing patterns resembling chemical formulas dancing through the fog like some theatrical performance - 0.682 and 0.694 similarity. And importantly, that discussion of 'family legacy' and 'rightful inheritance' near the vault scene registers at 0.712."

He leans forward with evident delight. "My AI Vector Search comprehends semantic meaning rather than mere word-matching. It connected that 'C.P.' signed notebook directly to the pattern of chemistry, stagecraft, personal signatures, and family obsession. It revealed that all the highest-ranked clues point to one individual possessing both chemistry expertise and family grievances... Dr. Cornelius Pumpkin."

He chuckles warmly, "Two methods, two perspectives - but yours helped me appreciate why AI Vector Search proves so remarkably efficient for this sort of puzzle." He sat back with a note of satisfaction, "Elementary, my dear Watson. Elementary."

## Epilogue: The Phosphorus and the Lost Secret


Weeks later, Inspector Lestrade returned to 221B Baker Street, his face grave.

"Gentlemen, I bring news of Dr. Cornelius Pumpkin."

"Let me guess," Holmes said, not looking up from his chemistry set. "He attempted to escape to the Americas?"

Lestrade blinked. "How did you... yes. The Phosphorus out of Southampton. But there's been a tragedy. A terrible storm struck in mid-Atlantic. Witnesses from another ship report the Phosphorus caught fire and sank with all hands. The flames had an unusual greenish glow. Dr. Pumpkin and the stolen hydrogen papers were lost to the depths."

I set down my newspaper. "Good Lord! The poor man!"

"A man obsessed with creating light, meeting his end in the darkest depths," Holmes observed. "Consider, Watson: Dr. Pumpkin spent his life trying to reclaim his family's legacy. Yet in stealing it, he ensured both he and the papers would be lost to history entirely. Had he simply published legitimate research, he might have made genuine contributions to science."

"Speaking of connections," I interjected, "wasn't the ship called the Phosphorus? The very chemical he used in his glowing effects."

"One might say he went down with his signature element. The universe does enjoy its ironies."

"Though there's something fitting about a man named Pumpkin meeting his end near All Hallow's Eve," I added. "Thematically speaking."

Lestrade nodded glumly. "Had Scotland Yard employed Oracle's AI Vector Search from the start, we might have identified him before he fled."

"That, Lestrade, is precisely the lesson. You look for what's explicitly stated. I look for what's implicitly connected." Holmes raised an eyebrow. "Besides, hydrogen is one of the most abundant elements in the universe. Other scientists will rediscover these principles. The real tragedy is what Dr. Pumpkin could have been."

After Lestrade departed, Holmes knocked out his pipe. "I'll be remembered for teaching one stubborn inspector that 'meaning' matters more than 'matching.'" Holmes smiled. "Now then - you promised Mrs. Hudson you'd chronicle this case. Do emphasize methodology over melodrama. Educational value, Watson."

"Of course, Holmes. Though the glowing horses are too good to leave out."

"Watson," Holmes sighed, "you're incorrigible."

"Yes, Holmes. But you'd be bored without me."

"Indubitably."

---

**The End**

*As chronicled by John H. Watson, M.D., with technical annotations on Oracle AI Vector Search methodology. "The case may be closed, but the lesson remains: In an age of information, those who can find meaning in chaos will always stay one step ahead of those who can only find words." - Sherlock Holmes, 1887*

## Learn More

* [Oracle Autonomous Database 23ai Documentation](https://docs.oracle.com/en/cloud/paas/autonomous-database/index.html)
* [AI Vector Search in Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)


## Acknowledgements
* **Author** - Pat Shepherd, Senior Principal Database Product Manager
* **Last Updated By/Date** - Pat Shepherd, October 2025