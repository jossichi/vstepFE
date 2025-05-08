import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ExamPage from "../pages/ExamPage";
import UploadTest from "../pages/UploadTest.jsx";
import CreateCards from "../components/CreateCards";
import ProfilePage from "../pages/ProfilePage";
import CreateTestForm from "../pages/CreateTestForm";
import CheckboxComponent from "../components/material/CheckboxComponent";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateCards />} />
      <Route path="/create-test" element={<CreateTestForm />} />
      <Route path="/create-card" element={<CreateCards />} />
      <Route path="/login" element={<Login />} />
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/upload-test" element={<UploadTest />} />
      <Route path="/checkbox-component" element={<CheckboxComponent />} />
    </Routes>
  );
};

export default RouterComponent;