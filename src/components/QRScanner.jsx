import React, { useState } from "react";
import { startQRScanner, uploadQRImage } from "../utils/qrUtils.js";

const QRScanner = ({ onScan }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // 📌 Xử lý khi chọn ảnh từ máy tính
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      uploadQRImage(file, onScan);
    }
  };

  return (
    <div>
      <div id="qr-reader"></div>
      <button onClick={() => startQRScanner(onScan)}>Quét QR Code</button>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default QRScanner;
