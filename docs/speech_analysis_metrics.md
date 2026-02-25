# Speech Analysis Metrics for Reading Assessment

This document outlines the methodologies used to measure **Word Accuracy** and **Pronunciation Fluency** for the reading assessment module. These metrics are critical for evaluating a user's reading proficiency, specifically for detecting learning difficulties like dyslexia.

## 1. Word Accuracy

Word accuracy measures how precise the user's reading is compared to the original reference text. It identifies mistakes such as skipped words, mispronounced words, or extra words added.

### Methodology: Levenshtein Distance (Rule-Based)
We use the **Levenshtein Distance** algorithm to calculate the minimum number of single-character edits (insertions, deletions, or substitutions) required to change the spoken text into the reference text. For word-level accuracy, we operate on tokens (words) rather than characters.

### Calculation
1.  **Tokenization**: normalize both reference and spoken text (lower case, remove punctuation) and split into lists of words.
2.  **Alignment**: Use sequence matching to align the spoken words with the reference words.
3.  **Error Classification**:
    *   **Hits (H)**: Correctly read words.
    *   **Substitutions (S)**: Wrong word read in place of the correct one.
    *   **Deletions (D)**: Words skipped.
    *   **Insertions (I)**: Extra words added.

**Formula:**
$$ \text{Word Error Rate (WER)} = \frac{S + D + I}{N} $$
*Where $N$ is the total number of words in the reference text.*

$$ \text{Accuracy Percentage} = \max(0, 1 - \text{WER}) \times 100\% $$

### Implementation Approach (Python Example)
Using libraries like `Levenshtein` or `jiwer`:
```python
import jiwer

reference = "The quick brown fox jumps over the lazy dog"
hypothesis = "The quick brown fox jump over lazy dog"

wer = jiwer.wer(reference, hypothesis)
accuracy = (1 - wer) * 100
```

---

## 2. Pronunciation Fluency

Fluency measures the flow, speed, and rhythm of speech. It assesses how natural the reading sounds, considering speed and pauses.

### Key Metrics

#### A. Speech Rate (Words Per Minute - WPM)
The number of words spoken correctly per minute.
$$ \text{WPM} = \frac{\text{Total Words Spoken}}{\text{Duration in Minutes}} $$

#### B. Articulation Rate
Similar to WPM but excludes pause duration. This measures the speed of speech segments themselves.

#### C. Pause Analysis
Analyzing the frequency and duration of silence intervals.
*   **Long Pauses**: May indicate struggle with a specific word or sentence.
*   **Hesitations**: Frequent short pauses.

### Implementation Approach
1.  **Timestamp Extraction**: Most modern Speech-to-Text APIs (accessible via Python/Node.js) provide timestamps for every recognized word (start_time, end_time).
2.  **Gap Calculation**:
    ```python
    pauses = []
    for i in range(1, len(words)):
        gap = words[i].start_time - words[i-1].end_time
        if gap > threshold: # e.g., 0.5 seconds
            pauses.append(gap)
    ```
3.  **Fluency Score**: A composite score based on WPM and the inverse of the pause rate.

---

## 3. Acoustic Pronunciation (Confidence)

While "Word Accuracy" checks if the *correct* word was identified, **Pronunciation Score** checks how *well* it was said.

### Methodology
*   **ASR Confidence Scores**: Speech-to-Text engines returns a confidence score (0.0 to 1.0) for each word.
*   **Phoneme-Level Analysis**: Advanced engines allow breaking words into phonemes to check specific sound articulations (useful for deeper diagnostics).

**Scoring**:
Average the confidence scores of all correctly recognized words to get a pronunciation quality estimator.
