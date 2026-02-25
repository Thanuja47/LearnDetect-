# Microphone Sound Detection and AI Processing Technical Breakdown

## 1. Overview
The system uses a **Hybrid Edge-Cloud Architecture**. The initial "hearing" (Speech-to-Text) happens natively in the user's browser, while the "thinking" (AI Analysis) happens on the backend using Python.

**Data Flow:**
1.  **Microphone Input** 🎤 → Browser API
2.  **Speech-to-Text (STT)** 📝 → Transcribed String
3.  **API Transport** 🌐 → Node.js Backend
4.  **AI Analysis** 🧠 → Python Logic (spaCy/NLP)

---

## 2. Step-by-Step Technical Process

### Phase 1: Sound Detection & Transcription (Frontend)
This phase captures the user's voice and converts it to text immediately.
*   **Technology**: Web Speech API (`window.SpeechRecognition` or `webkitSpeechRecognition`).
*   **Method**:
    *   The `useSpeechRecognition` hook requests microphone access.
    *   It streams audio directly to the browser's built-in recognition engine (often powered by Google's servers for Chrome).
    *   It handles real-time `interimResults` to show users what is being heard instant-by-instant.
    *   **Output**: A raw text string (e.g., "The quick brown fox...").

### Phase 2: Orchestration (Backend Controller)
Once the recording stops, the frontend sends the `recognizedText` (what you said) and `expectedText` (what you were supposed to read) to the Node.js backend.
*   **Controller**: `backend/src/controllers/assessment.controller.js`
*   **Role**: Acts as a bridge. It receives the JSON payload and spawns a child process to run the heavy AI analysis using Python.

### Phase 3: AI & Algorithm Processing (Python Layer)
This is where the "intelligence" resides. The Node.js server executes `backend/python/analyze_text.py`.

#### Core Algorithms Used:

1.  **Word Match Logic (Levenshtein Distance)**
    *   **Algorithm**: `Levenshtein.ratio()`
    *   **Goal**: Calculates the difference between two words. It handles minor mispronunciations or spelling variants.
    *   *Example*: "Read" vs "Red" might have a high similarity score, allowing the system to determine if the mistake was close or completely off.
    *   **Logic**: Matches words based on a similarity threshold (> 80%).

2.  **Pronunciation Analysis (Sequence Matching)**
    *   **Algorithm**: `difflib.SequenceMatcher`
    *   **Goal**: Compares the entire sequence of characters.
    *   **Logic**: 
        *   60% weight on word-by-word similarity.
        *   40% weight on overall text similarity.

3.  **Fluency Detection (NLP Tokens)**
    *   **AI Library**: `spaCy` (Model: `en_core_web_sm`)
    *   **Process**:
        *   Tokenizes the input (breaks sentences into words).
        *   Detects **repetitions** (e.g., "The the cat").
        *   Detects **filler words** (e.g., "um", "uh", "like") using a predefined set.
    *   **Scoring**: Starts at 100 and deducts points for every repetition or filler word found.

4.  **Comprehension Analysis (Semantic POS Tagging)**
    *   **AI Library**: `spaCy`
    *   **Process**:
        *   Performs **Part-of-Speech (POS) Tagging**.
        *   Extracts "Content Words": `NOUN`, `VERB`, `ADJ`.
        *   Ignores "Stop Words" (like "the", "is", "at").
    *   **Logic**: If the user read the key nouns and verbs correctly, they "comprehended" the text, even if they missed filler words.

### Phase 4: Scoring and Feedback
A final weighted average calculation determines the `overallScore`:
*   Word Accuracy: 25%
*   Pronunciation: 25%
*   Reading Speed: 15%
*   Fluency: 20%
*   Comprehension: 15%

The system then generates human-readable feedback (e.g., "✓ Clear pronunciation" or "→ Slow down for better accuracy") based on conditional thresholds defined in the Python script.
