import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/profileComponents/ProfileHeader.jsx";
import ProfileStats from "../components/profileComponents/ProfileStats.jsx";
import ProfileCardInfo from "../components/profileComponents/ProfileCardInfo.jsx";
import { getUserProfile } from "../services/userService";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile(); // Gọi API có token
      if (data) {
        const { card_data, tests, practice_summary, ...rest } = data;

        // Định dạng lại dữ liệu cho từng component
        setUserData({
          user: rest,
          card: card_data,
          stats: {
            avg_score: practice_summary?.avg_score,
            new_level: practice_summary?.new_level,
            tests: tests || [],
          },
        });
      }
    };
    fetchProfile();
  }, []);

  if (!userData) return <div className="p-6 text-center">Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <ProfileHeader user={userData.user} />
      <ProfileStats stats={userData.stats} />{" "}
      {/* ✅ Gọi component đã có biểu đồ */}
      <ProfileCardInfo card={userData.card} />
    </div>
  );
};

export default ProfilePage;
