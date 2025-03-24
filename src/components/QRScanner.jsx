import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScan }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => console.log("QR Scan Error:", error)
    );

    return () => scanner.clear();
  }, [onScan]);

  return <div id="qr-reader" ref={scannerRef}></div>;
};

export default QRScanner;
