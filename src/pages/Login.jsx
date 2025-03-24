import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { userService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../assets/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email validation regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleLogin = async () => {
    // Validate email before proceeding
    setTouched(true);
    const emailError = validateEmail(email);
    
    if (emailError) {
      setError(emailError);
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const userData = await userService.login(email);
      setUser(userData);
      navigate("/exam");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2>Welcome Back</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form noValidate>
          <div className={`input-group ${error && touched ? "has-error" : ""}`}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) {
                  setError(validateEmail(e.target.value));
                }
              }}
              onBlur={handleBlur}
              aria-invalid={error ? "true" : "false"}
              required
            />
            {/*error && touched && (
              <div className="validation-message">{error}</div>
            )*/}
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              className="submit-btn"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;