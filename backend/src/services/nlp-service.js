const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * NLP Service - Wrapper for Python text analysis
 */
class NLPService {
    constructor() {
        this.pythonScript = path.join(__dirname, '../../python/analyze_text.py');

        // Check if virtual environment exists
        const venvPython = path.join(__dirname, '../../venv/bin/python3');
        this.pythonCommand = fs.existsSync(venvPython) ? venvPython : 'python3';
    }

    /**
     * Analyze reading text using Python NLP
     * @param {Object} data - Analysis data
     * @param {string} data.expectedText - The passage that should be read
     * @param {string} data.recognizedText - The transcribed text from speech recognition
     * @param {number} data.duration - Reading duration in seconds
     * @returns {Promise<Object>} Analysis results
     */
    async analyzeText(data) {
        return new Promise((resolve, reject) => {
            const python = spawn(this.pythonCommand, [this.pythonScript]);

            let outputData = '';
            let errorData = '';

            // Send input data to Python script
            python.stdin.write(JSON.stringify(data));
            python.stdin.end();

            // Collect output
            python.stdout.on('data', (data) => {
                outputData += data.toString();
            });

            // Collect errors
            python.stderr.on('data', (data) => {
                errorData += data.toString();
            });

            // Handle completion
            python.on('close', (code) => {
                if (code !== 0) {
                    console.error('Python script error:', errorData);
                    return reject(new Error(`Python script failed with code ${code}: ${errorData}`));
                }

                try {
                    const result = JSON.parse(outputData);

                    if (!result.success) {
                        return reject(new Error(result.error || 'Analysis failed'));
                    }

                    resolve(result);
                } catch (error) {
                    console.error('Failed to parse Python output:', outputData);
                    reject(new Error('Failed to parse analysis results'));
                }
            });

            // Handle errors
            python.on('error', (error) => {
                console.error('Failed to start Python process:', error);
                reject(new Error('Failed to start NLP analysis service'));
            });
        });
    }

    /**
     * Check if Python and required dependencies are available
     * @returns {Promise<Object>} Status check result
     */
    async checkHealth() {
        try {
            const testData = {
                expectedText: 'Hello world',
                recognizedText: 'Hello world',
                duration: 2
            };

            const result = await this.analyzeText(testData);
            return {
                status: 'ok',
                message: 'NLP service is running',
                testResult: result
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                hint: 'Make sure Python 3 is installed and run: pip install -r backend/python/requirements.txt'
            };
        }
    }
}

module.exports = new NLPService();
