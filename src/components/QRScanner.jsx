import React, { useState } from "react";
import { startQRScanner, uploadQRImage } from "../utils/qrUtils.js";

const QRScanner = ({ onScan }) => {
  const [, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const [, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setLoading(true); // Hiển thị loading khi upload
      uploadQRImage(
        file,
        (data) => {
          onScan(data);
          setLoading(false);
        },
        (errorMessage) => {
          setError(errorMessage);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div>
      <div id="qr-reader"></div>
      <button onClick={() => startQRScanner(onScan)}>Quét QR Code</button>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default QRScanner;
