// router.js
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ExamPage from "../pages/ExamPage";
import UoploadTest from "../pages/UploadTest.jsx";
import CreateCards from "../components/CreateCards";
import ProfilePage from "../pages/ProfilePage";
import CreateTestForm from "../pages/CreateTestForm";
const RouterComponent = () => {
  return (
    <Routes>
      {/* Nếu đã đăng nhập, cho phép route /logout */}

      <Route path="/" element={<CreateCards />} />
      <Route path="/create-test" element={<CreateTestForm />} />
      <Route path="/create-card" element={<CreateCards />} />
      <Route path="/login" element={<Login />} />
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/upload-test" element={<UoploadTest />} />
    </Routes>
  );
};

export default RouterComponent; // Đảm bảo xuất mặc định
