import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfileStats from "./ProfileStats.jsx";
import ProfileCardInfo from "./ProfileCardInfo.jsx";
import { getUserProfile } from "../services/userService";
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile(); // gọi API có token
      if (data) setUserData(data);
    };
    fetchProfile();
  }, []);

  if (!userData) return <div className="p-6 text-center">Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <ProfileHeader user={userData} />
      <ProfileStats stats={userData.stats} />
      <ProfileCardInfo card={userData.card} />
    </div>
  );
};

export default ProfilePage;
