import React, { useState } from "react";
import { startQRScanner } from "../utils/qrUtils.js";

const QRScanner = () => {
  const [userData, setUserData] = useState(null);

  const handleScan = (data) => {
    setUserData(data);
  };

  return (
    <div>
      <div id="qr-reader"></div>
      <button onClick={() => startQRScanner(handleScan)}>Quét QR Code</button>
      {userData && (
        <div>
          <h2>Thông tin người dùng:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QRScanner;