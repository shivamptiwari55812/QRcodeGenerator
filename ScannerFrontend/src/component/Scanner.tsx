import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Camera, CameraOff, CheckCircle } from 'lucide-react';
import './Scanner.css';

interface BarcodeScannerProps {
  onBack: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState('');
  const [error, setError] = useState('');

  const handleScan = (result: any) => {
    if (result && result.length > 0) {
      setScannedResult(result[0].rawValue);
      setIsScanning(false);
    }
  };

  const handleError = (error: any) => {
    console.error('Scanner error:', error);
    setError('Failed to access camera. Please ensure camera permissions are granted.');
    setIsScanning(false);
  };

  const startScanning = () => {
    setError('');
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const clearResult = () => {
    setScannedResult('');
    setError('');
  };

  return (
    <div className="barcode-app">
      <div className="container-small">
        <button 
          onClick={onBack} 
          className="btn btn-outline mb-6"
        >
          ← Back to Menu
        </button>

        <div className="card">
          <div className="card-header">
            <h1 className="title-medium">Barcode Scanner</h1>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="scanner-controls">
                <button 
                  onClick={startScanning} 
                  disabled={isScanning}
                  className="btn btn-success flex-1 btn-flex"
                >
                  <Camera className="icon" />
                  {isScanning ? 'Scanning...' : 'Start Scanner'}
                </button>
                
                <button 
                  onClick={stopScanning} 
                  disabled={!isScanning}
                  className="btn btn-outline flex-1 btn-flex"
                >
                  <CameraOff className="icon" />
                  Stop Scanner
                </button>
              </div>

              <div className="scanner-container">
                <h3 className="title-medium mb-4">Camera Scanner</h3>
                <div className="scanner-preview">
                  {isScanning ? (
                    <Scanner
                      onScan={handleScan}
                      onError={handleError}
                      allowMultiple={false}
                      scanDelay={500}
                      constraints={{
                        facingMode: 'environment'
                      }}
                      components={{
                        finder: true
                      }}
                      styles={{
                        container: { width: '100%', height: '100%' },
                        video: { width: '100%', height: '100%', objectFit: 'cover' }
                      }}
                    />
                  ) : (
                    <div className="scanner-placeholder">
                      <div className="scanner-placeholder-content">
                        <Camera className="icon-large" />
                        <p>Click "Start Scanner" to begin</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {scannedResult && (
              <div className="space-y-4">
                <div className="result-success">
                  <div className="result-header">
                    <CheckCircle className="icon" />
                    <h3 className="result-title">Barcode Detected!</h3>
                  </div>
                  <div className="result-content">
                    <p className="result-label">Scanned Code:</p>
                    <p className="result-code">
                      {scannedResult}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={clearResult}
                  className="btn btn-outline btn-full"
                >
                  Clear Result
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;