import React, { useState } from "react";
import { startQRScanner } from "../utils/qrUtils.js";
import "../assets/styles/QRScanner.css";
import axios from "axios";

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleScan = async (decodedData) => {
    try {
      console.log("Dữ liệu quét được:", decodedData);

      const { card_id, user_id, signature } = decodedData;

      if (!card_id || !user_id || !signature) {
        throw new Error(
          "QR code thiếu thông tin cần thiết: card_id, user_id, signature"
        );
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          card_id,
          user_id,
          signature,
        }
      );

      if (response.data.status === "success") {
        // ✅ Lưu vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userID", user_id);

        console.log("userID lưu:", user_id); // Lưu userID vào localStorage
        console.log("Đăng nhập thành công:", response.data);
        console.log(
          "Dữ liệu người dùng đã lưu vào localStorage:",
          response.data.user
        );

        // Có thể gọi onScan nếu muốn thực hiện hành động khác
        if (onScan) {
          onScan(response.data);
        }

        // ✅ Điều hướng sang trang thi
        setTimeout(() => {
          window.location.href = "/exam";
        }, 300);
      } else {
        alert("Thông tin không hợp lệ hoặc không tìm thấy người dùng!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Đã có lỗi xảy ra trong quá trình xác thực.");
    }
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

        <div
          id="qr-reader"
          className={`qr-reader-area ${isActive ? "active" : ""}`}></div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button
            onClick={handleStartScanner}
            disabled={loading}
            className="scan-btn">
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
