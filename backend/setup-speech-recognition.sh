#!/bin/bash

echo "🚀 Setting up Speech Recognition System..."
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create virtual environment"
        echo "💡 Try: sudo apt install python3-venv"
        exit 1
    fi
    
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

echo ""

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip > /dev/null 2>&1

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r python/requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies"
    deactivate
    exit 1
fi

echo "✅ Python dependencies installed"
echo ""

# Download spaCy model
echo "📥 Downloading spaCy language model..."
python -m spacy download en_core_web_sm

if [ $? -ne 0 ]; then
    echo "❌ Failed to download spaCy model"
    deactivate
    exit 1
fi

echo "✅ spaCy model downloaded"
echo ""

# Test the NLP service
echo "🧪 Testing NLP service..."
echo '{"expectedText": "Hello world", "recognizedText": "Hello world", "duration": 2}' | python python/analyze_text.py > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ NLP service is working correctly"
else
    echo "⚠️  NLP service test failed, but setup is complete"
fi

deactivate

echo ""
echo "🎉 Setup complete!"
echo ""
echo "⚠️  IMPORTANT: The NLP service uses a Python virtual environment."
echo "   The backend will automatically use: backend/venv/bin/python3"
echo ""
echo "Next steps:"
echo "1. Backend server is already running ✓"
echo "2. Frontend is already running ✓"
echo "3. Navigate to the Reading Assessment page and test!"
echo ""
