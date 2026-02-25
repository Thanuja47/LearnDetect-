# Reading Assessment Workflow

The core functionality of LearnDetect is the AI-powered reading assessment. This document outlines the technical and user workflow for this feature.

## 1. User Workflow

1.  **Initiation**:
    *   Student logs in and navigates to the "New Assessment" or "Reading Test" section.
    *   Student (or Teacher) selects a reading passage appropriate for their grade level.

2.  **Reading & Recording**:
    *   The browser invokes the `useSpeechRecognition` hook to access the microphone.
    *   **User Action**: Clicks "Start Reading".
    *   **System Action**: Starts capturing audio input.
    *   Student reads the displayed text aloud.
    *   **User Action**: Clicks "Stop" or "Submit" when finished.

3.  **Processing**:
    *   The frontend uses the Web Speech API (or sends audio to backend) to transcribe the speech to text.
    *   The audio/transcript is submitted to the backend API.

4.  **Feedback**:
    *   The system analyzes the reading and returns immediate feedback.
    *   Results displayed: Accuracy score, Speed (WPM), and highlighted "trouble words".

## 2. Technical Architecture

### Frontend Layer
*   **Hook**: `hooks/use-speech-recognition.ts`
    *   Manages the `window.SpeechRecognition` (or `webkitSpeechRecognition`) instance.
    *   Handles microphone permissions and states (listening, processing, error).
    *   Returns the live transcript string.
*   **Component**: `ReadingAssessment.tsx`
    *   Displays the target text.
    *   Visualizes the recording status.
    *   Submits the final transcript to the backend.

### Backend Analysis Layer
*   **API Endpoint**: `/api/assessments/analyze` (or similar)
*   **Logic**:
    1.  Receives `original_text` and `spoken_text` (transcript).
    2.  **Comparison Algorithm**:
        *   Uses NLP techniques (e.g., Levenshtein distance, Diff-Match-Patch) to align the two texts.
        *   Identifies:
            *   **Omissions**: Words in original but not spoken.
            *   **Insertions**: Extra words spoken.
            *   **Substitutions**: Mispronounced words.
    3.  **Metric Calculation**:
        *   `Accuracy = (Correct Words / Total Words) * 100` (Weighted).
        *   `Fluency`: Derived from pauses and speed.
    4.  **Database**: Stores the result in the `Assessment` table linked to the Student.

### AI Integration
*   The system may utilize Python-based microservices (using `spaCy` or `NLTK`) for more advanced phoneme-level analysis if configured (linked via `MIC_AND_AI_PROCESS.md`).
