import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import TestList from "./pages/TestList";
import TestForm from "./pages/TestForm";
import ExamPage from "./pages/ExamPage"; 
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header /> 
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/tests" element={<TestList />} />
              <Route path="/test-form" element={<TestForm />} />
              <Route path="/exam" element={<ExamPage />} /> 
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;