// 📁 src/components/Profile/ProfileHeader.jsx
import React from "react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-2">👤 Hồ sơ người dùng</h1>
      <p>
        <strong>User ID:</strong> {user.user_id}
      </p>
      <p>
        <strong>Card ID:</strong> {user.card_id}
      </p>
    </div>
  );
};

export default ProfileHeader;
