import React, { useState } from "react";
import { startQRScanner } from "../utils/qrUtils.js";
import "../assets/QRScanner.css";

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleScan = (data) => {
    console.log("QR scan result:", data);
    setScanResult(data);
    onScan(data);
    setLoading(false);
    setIsActive(false);
  };

  const handleStartScanner = () => {
    setLoading(true);
    setError(null);
    setScanResult(null);
    setIsActive(true);
    
    try {
      startQRScanner(handleScan);
    } catch (err) {
      setError("Không thể khởi động máy quét QR: " + err.message);
      setLoading(false);
      setIsActive(false);
    }
  };

  return (
    <div className="qr-scanner-container">
      <div className="scanner-wrapper">
        <h2>QR Scanner</h2>
        
        <div id="qr-reader" className={`qr-reader-area ${isActive ? 'active' : ''}`}></div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="button-group">
          <button 
            onClick={handleStartScanner}
            disabled={loading}
            className="scan-btn"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Đang xử lý...</span>
              </>
            ) : (
              "Quét QR Code"
            )}
          </button>
        </div>
        
        {scanResult && (
          <div className="scan-result">
            <h3>Kết quả quét QR:</h3>
            <div className="result-content">
              <pre>{JSON.stringify(scanResult, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;