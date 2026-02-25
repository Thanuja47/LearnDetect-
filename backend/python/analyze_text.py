#!/usr/bin/env python3
"""
Text Analysis Service for Reading Assessment
Uses spaCy and NLTK for NLP analysis
"""

import sys
import json
import re
from difflib import SequenceMatcher
from Levenshtein import ratio

try:
    import spacy
    import nltk
    from nltk.tokenize import word_tokenize
except ImportError as e:
    print(json.dumps({"error": f"Missing dependency: {str(e)}"}))
    sys.exit(1)


class TextAnalyzer:
    def __init__(self):
        """Initialize NLP models"""
        try:
            # Load spaCy English model (small version for speed)
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            # If model not found, return error
            print(json.dumps({"error": "spaCy model 'en_core_web_sm' not found. Run: python -m spacy download en_core_web_sm"}))
            sys.exit(1)
        
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt', quiet=True)
        
        try:
            nltk.data.find('corpora/cmudict')
        except LookupError:
            nltk.download('cmudict', quiet=True)

    def preprocess_text(self, text):
        """Normalize and clean text"""
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def calculate_word_accuracy(self, expected, recognized):
        """
        Calculate word-level accuracy using Levenshtein distance
        Returns percentage of correctly recognized words
        """
        expected_words = self.preprocess_text(expected).split()
        recognized_words = self.preprocess_text(recognized).split()
        
        if not expected_words:
            return 0.0
        
        # Match words using fuzzy matching
        matches = 0
        matched_indices = set()
        
        for exp_word in expected_words:
            best_match_score = 0
            best_match_idx = -1
            
            for idx, rec_word in enumerate(recognized_words):
                if idx in matched_indices:
                    continue
                    
                # Calculate similarity ratio
                similarity = ratio(exp_word, rec_word)
                
                if similarity > best_match_score:
                    best_match_score = similarity
                    best_match_idx = idx
            
            # Consider it a match if similarity > 80%
            if best_match_score > 0.8:
                matches += 1
                if best_match_idx >= 0:
                    matched_indices.add(best_match_idx)
        
        accuracy = (matches / len(expected_words)) * 100
        return round(accuracy, 2)

    def analyze_pronunciation(self, expected, recognized):
        """
        Analyze pronunciation quality
        Uses character-level and phoneme-level similarity
        """
        expected_clean = self.preprocess_text(expected)
        recognized_clean = self.preprocess_text(recognized)
        
        # Overall text similarity
        text_similarity = SequenceMatcher(None, expected_clean, recognized_clean).ratio()
        
        # Word-level pronunciation check
        expected_words = expected_clean.split()
        recognized_words = recognized_clean.split()
        
        pronunciation_scores = []
        
        for exp_word in expected_words:
            if not recognized_words:
                pronunciation_scores.append(0)
                continue
                
            # Find best matching word
            best_match = max(recognized_words, key=lambda w: ratio(exp_word, w))
            score = ratio(exp_word, best_match)
            pronunciation_scores.append(score)
        
        avg_pronunciation = sum(pronunciation_scores) / len(pronunciation_scores) if pronunciation_scores else 0
        
        # Combine text similarity and word-level scores
        final_score = (text_similarity * 0.4 + avg_pronunciation * 0.6) * 100
        
        return round(final_score, 2)

    def calculate_reading_speed(self, text, duration_seconds):
        """
        Calculate reading speed in words per minute (WPM)
        """
        if duration_seconds <= 0:
            return 0.0
        
        words = self.preprocess_text(text).split()
        word_count = len(words)
        
        # Calculate WPM
        wpm = (word_count / duration_seconds) * 60
        
        # Normalize to 0-100 scale
        # Average reading speed for children: 80-150 WPM
        # We'll use 120 WPM as the target (100%)
        target_wpm = 120
        score = min((wpm / target_wpm) * 100, 100)
        
        return round(score, 2)

    def analyze_fluency(self, recognized_text):
        """
        Analyze reading fluency
        Looks for hesitations, repetitions, and natural flow
        """
        doc = self.nlp(recognized_text.lower())
        
        words = [token.text for token in doc if token.is_alpha]
        
        if not words:
            return 0.0
        
        # Check for repetitions (indicates hesitation)
        repetitions = 0
        for i in range(len(words) - 1):
            if words[i] == words[i + 1]:
                repetitions += 1
        
        repetition_penalty = (repetitions / len(words)) * 100 if words else 0
        
        # Check for filler words
        filler_words = {'um', 'uh', 'er', 'ah', 'like', 'you know'}
        filler_count = sum(1 for word in words if word in filler_words)
        filler_penalty = (filler_count / len(words)) * 100 if words else 0
        
        # Base fluency score
        base_score = 100
        
        # Apply penalties
        fluency_score = base_score - (repetition_penalty * 20) - (filler_penalty * 15)
        fluency_score = max(0, min(100, fluency_score))
        
        return round(fluency_score, 2)

    def analyze_comprehension(self, expected, recognized):
        """
        Basic comprehension analysis
        Checks if key content words are present
        """
        expected_doc = self.nlp(expected.lower())
        recognized_doc = self.nlp(recognized.lower())
        
        # Extract content words (nouns, verbs, adjectives)
        expected_content = [token.lemma_ for token in expected_doc 
                          if token.pos_ in ['NOUN', 'VERB', 'ADJ'] and not token.is_stop]
        
        recognized_content = [token.lemma_ for token in recognized_doc 
                            if token.pos_ in ['NOUN', 'VERB', 'ADJ'] and not token.is_stop]
        
        if not expected_content:
            return 100.0
        
        # Calculate how many key words were captured
        matches = sum(1 for word in expected_content if word in recognized_content)
        
        comprehension_score = (matches / len(expected_content)) * 100
        
        return round(comprehension_score, 2)

    def generate_feedback(self, metrics):
        """Generate human-readable feedback based on metrics"""
        feedback = []
        suggestions = []
        
        # Word Accuracy feedback
        if metrics['wordAccuracy'] >= 90:
            feedback.append("✓ Excellent word recognition")
        elif metrics['wordAccuracy'] >= 75:
            feedback.append("✓ Good word recognition")
        else:
            feedback.append("→ Work on word accuracy")
            suggestions.append("Practice reading the passage slowly, focusing on each word")
        
        # Pronunciation feedback
        if metrics['pronunciation'] >= 85:
            feedback.append("✓ Clear pronunciation")
        elif metrics['pronunciation'] >= 70:
            feedback.append("✓ Good pronunciation on most words")
        else:
            feedback.append("→ Pronunciation needs improvement")
            suggestions.append("Practice difficult words separately before reading")
        
        # Reading Speed feedback
        if 70 <= metrics['readingSpeed'] <= 100:
            feedback.append("✓ Good reading pace")
        elif metrics['readingSpeed'] < 70:
            feedback.append("→ Try to read a bit faster")
            suggestions.append("Practice reading aloud daily to build confidence and speed")
        else:
            feedback.append("→ Slow down for better accuracy")
            suggestions.append("Focus on accuracy over speed")
        
        # Fluency feedback
        if metrics['fluency'] >= 85:
            feedback.append("✓ Smooth and fluent reading")
        elif metrics['fluency'] >= 70:
            feedback.append("✓ Generally fluent reading")
        else:
            feedback.append("→ Work on reading fluency")
            suggestions.append("Reduce hesitations by practicing familiar texts")
        
        # Comprehension feedback
        if metrics['comprehension'] >= 85:
            feedback.append("✓ Strong comprehension of content")
        elif metrics['comprehension'] >= 70:
            feedback.append("✓ Good understanding of key concepts")
        else:
            feedback.append("→ Focus on understanding the content")
            suggestions.append("Read the passage silently first to understand the meaning")
        
        return feedback, suggestions

    def analyze(self, expected_text, recognized_text, duration_seconds):
        """
        Main analysis function
        Returns comprehensive reading assessment metrics
        """
        try:
            # Calculate individual metrics
            word_accuracy = self.calculate_word_accuracy(expected_text, recognized_text)
            pronunciation = self.analyze_pronunciation(expected_text, recognized_text)
            reading_speed = self.calculate_reading_speed(recognized_text, duration_seconds)
            fluency = self.analyze_fluency(recognized_text)
            comprehension = self.analyze_comprehension(expected_text, recognized_text)
            
            # Calculate overall score (weighted average)
            overall_score = (
                word_accuracy * 0.25 +
                pronunciation * 0.25 +
                reading_speed * 0.15 +
                fluency * 0.20 +
                comprehension * 0.15
            )
            
            metrics = {
                'wordAccuracy': word_accuracy,
                'pronunciation': pronunciation,
                'readingSpeed': reading_speed,
                'fluency': fluency,
                'comprehension': comprehension,
                'overallScore': round(overall_score, 2)
            }
            
            # Generate feedback
            feedback, suggestions = self.generate_feedback(metrics)
            
            return {
                'success': True,
                'metrics': metrics,
                'feedback': feedback,
                'suggestions': suggestions,
                'recognizedText': recognized_text
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }


def main():
    """Main entry point for CLI usage"""
    try:
        # Read input from stdin
        input_data = json.loads(sys.stdin.read())
        
        expected_text = input_data.get('expectedText', '')
        recognized_text = input_data.get('recognizedText', '')
        duration = input_data.get('duration', 0)
        
        if not expected_text or not recognized_text:
            print(json.dumps({
                'success': False,
                'error': 'Missing required fields: expectedText and recognizedText'
            }))
            sys.exit(1)
        
        # Initialize analyzer and run analysis
        analyzer = TextAnalyzer()
        result = analyzer.analyze(expected_text, recognized_text, duration)
        
        # Output JSON result
        print(json.dumps(result))
        
    except json.JSONDecodeError:
        print(json.dumps({
            'success': False,
            'error': 'Invalid JSON input'
        }))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }))
        sys.exit(1)


if __name__ == '__main__':
    main()
