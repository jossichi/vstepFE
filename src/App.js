// App.js
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import RouterComponent from "../src/routers/index.js"; // Import RouterComponent

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="content">
            <RouterComponent />{" "}
            {/* Gọi RouterComponent thay vì định nghĩa routes ở đây */}
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
