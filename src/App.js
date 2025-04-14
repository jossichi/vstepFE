import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

import TestForm from "./pages/TestForm";
import ExamPage from "./pages/ExamPage";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Logout from "./pages/logout";
import CreateCards from "./components/CreateCards";
import ProfilePage from "./pages/ProfilePage";
import CreateTestForm from "./pages/CreateTestForm";
const App = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="content">
            <Routes>
              {/* Nếu đã đăng nhập, cho phép route /logout */}
              {isLoggedIn ? (
                <>
                  <Route path="/logout" element={<Logout />} />
                </>
              ) : (
                // Nếu chưa đăng nhập, điều hướng về login
                <Route path="/" element={<CreateCards />} />
              )}{" "}
              <Route path="/create-test" element={<CreateTestForm />} />
              <Route path="/create-card" element={<CreateCards />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test-form" element={<TestForm />} />
              <Route path="/exam" element={<ExamPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
