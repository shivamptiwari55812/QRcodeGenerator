import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import "./App.css"
function QRGenerator() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (inputText.trim()) {
      setGeneratedText(inputText.trim());
    }
  };

  const fetchID=async()=>{
    const response = await fetch('http://localhost:5050/api/products',{
      method:"GET",
      headers:{}
    })
  }
  const handleDownload = async () => {
    if (!qrRef.current || !generatedText) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="generator-container">
      <div className="generator-card">
        <h2 className="card-title">QR Code Generator</h2>
        
        <div className="input-section">
          <label htmlFor="qr-input" className="input-label">
            Enter text, URL, or product code:
          </label>
          <div className="input-group">
            <input
              id="qr-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type something to generate QR code..."
              className="text-input"
            />
            <button
              onClick={handleGenerate}
              disabled={!inputText.trim()}
              className="generate-button"
            >
              Generate
            </button>
          </div>
        </div>

        {generatedText && (
          <div className="qr-section">
            <div className="qr-container" ref={qrRef}>
              <QRCode
                value={generatedText}
                size={200}
                level="M"
                // includeMargin={true}
              />
            </div>
            
            <div className="qr-info">
              <p className="qr-text">Generated for: "{generatedText}"</p>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="download-button"
              >
                {isDownloading ? 'Downloading...' : 'Download PNG'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRGenerator;