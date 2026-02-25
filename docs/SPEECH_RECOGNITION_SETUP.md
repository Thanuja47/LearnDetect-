# Speech Recognition Setup Guide

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Modern browser (Chrome, Firefox, or Safari)

## Backend Setup

### 1. Install Python Dependencies

```bash
cd backend/python
pip install -r requirements.txt
```

### 2. Download spaCy Language Model

```bash
python -m spacy download en_core_web_sm
```

### 3. Test Python NLP Service

```bash
# Test the analysis script
echo '{"expectedText": "Hello world", "recognizedText": "Hello world", "duration": 2}' | python analyze_text.py
```

Expected output should show analysis results with metrics.

## Frontend Setup

No additional setup required. The Web Speech API is built into modern browsers.

## Usage

### For Students

1. Navigate to the Reading Assessment page
2. Click "Start Recording"
3. Grant microphone permissions when prompted
4. Read the passage aloud clearly
5. Click "Stop Recording" when finished
6. View your detailed analysis results

### API Endpoint

**POST** `/api/assessments/analyze`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "expectedText": "The passage that should be read",
  "recognizedText": "The transcribed text from speech recognition",
  "duration": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Analysis completed successfully",
  "data": {
    "wordAccuracy": 85.5,
    "pronunciation": 78.2,
    "readingSpeed": 82.0,
    "fluency": 81.5,
    "comprehension": 90.0,
    "overallScore": 83.4,
    "recognizedText": "...",
    "feedback": ["✓ Clear pronunciation", "→ Work on reading speed"],
    "suggestions": ["Practice daily reading"]
  }
}
```

## Troubleshooting

### Python Errors

**Error:** `ModuleNotFoundError: No module named 'spacy'`
**Solution:** Run `pip install -r backend/python/requirements.txt`

**Error:** `OSError: [E050] Can't find model 'en_core_web_sm'`
**Solution:** Run `python -m spacy download en_core_web_sm`

### Browser Errors

**Error:** "Speech recognition is not supported"
**Solution:** Use Chrome, Firefox, or Safari. Edge may have limited support.

**Error:** "Microphone access denied"
**Solution:** Check browser permissions and allow microphone access.

### Backend Errors

**Error:** "Failed to start NLP analysis service"
**Solution:** Ensure Python 3 is installed and accessible via `python3` command.

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Best support |
| Firefox | ✅ Full | Good support |
| Safari  | ✅ Full | Good support |
| Edge    | ⚠️ Partial | May have issues |

## Performance Notes

- Analysis typically takes 1-3 seconds
- Longer passages may take slightly longer
- Network latency affects response time
- Python script runs synchronously for each request
