// 📁 src/components/Profile/ProfileCardInfo.jsx
import React from "react";

const ProfileCardInfo = ({ card }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">💳 Thông tin thẻ</h2>
      {/* <p>
        <strong>Public Key:</strong> {card.public_key}
      </p> */}
      <p>{/* <strong>Card ID:</strong> {card.card_id}{" "} */}</p>
      {/* <img src={card.qr_code} alt="QR Code" className="w-32 h-32 mt-2" /> */}
      {/* <p className="mt-2 text-sm text-gray-500">
        Tạo lúc: {new Date(card.created_at).toLocaleString()}
      </p> */}
    </div>
  );
};

export default ProfileCardInfo;
