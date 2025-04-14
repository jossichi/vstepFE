import React, { useState } from "react";
import { createCard } from "../utils/cardUtils"; // ⚠️ Ensure this hits correct server route
import { v4 as uuidv4 } from "uuid";
import "../assets/styles/CreateCards.css"; // Assuming you will add styles in a separate CSS file
import { useNavigate } from "react-router-dom";

const CreateCards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();
  const handleCreateCard = async () => {
    setLoading(true);
    setError("");
    setQrCode("");

    const user_id = uuidv4();
    const studentID = prompt("Nhập studentID (chỉ dùng 1 lần để mã hóa):");

    if (!studentID) {
      setLoading(false);
      return setError("Bạn cần nhập studentID để tạo thẻ.");
    }

    try {
      const response = await createCard(user_id, studentID);
      const qr = response.card.qr_code;
      setQrCode(qr);

      // ✅ Tự động tải ảnh QR Code
      const a = document.createElement("a");
      a.href = qr;
      a.download = `qr_card_${user_id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err?.error || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-card-container">
      <h2 className="title">Tạo thẻ vật lý</h2>
      <button
        onClick={handleCreateCard}
        disabled={loading}
        className="create-button">
        {loading ? "Đang tạo..." : "Tạo thẻ"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {qrCode && (
        <div className="qr-preview">
          <img src={qrCode} alt="QR Code" className="qr-image" />
          <p className="qr-description">Mã QR đã được tải xuống tự động.</p>
        </div>
      )}
    </div>
  );
};

export default CreateCards;
