import React, { useState } from "react";
import { createCard } from "../utils/cardUtils";
import { v4 as uuidv4 } from "uuid";

const CreateCards = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cardData, setCardData] = useState(null);

  const handleCreateCard = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    setCardData(null);

    // 🆕 Tạo user_id và card_id
    const user_id = uuidv4();
    const card_id = uuidv4();

    try {
      // 📌 Gửi request với cả user_id & card_id
      const data = await createCard(user_id, card_id);
      setMessage("Thẻ được tạo thành công!");
      setCardData(data);
    } catch (err) {
      setError(err.error || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-card-container">
      <h2>Tạo thẻ vật lý</h2>
      <button onClick={handleCreateCard} disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo thẻ"}
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {cardData && (
        <div className="card-info">
          <p>
            <strong>Card ID:</strong> {cardData.card.card_id}
          </p>
          <p>
            <strong>Public Key:</strong> {cardData.card.public_key}
          </p>
          <p>
            <strong>Token:</strong> {cardData.token}
          </p>{" "}
          <img src={cardData.card.qr_code} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default CreateCards;
