import { useEffect, useState } from "react";
import { testService } from "../services/testService";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/TestForm.scss";

const TestForm = () => {
  const [test, setTest] = useState({ test_id: "", test_type: "", level: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTest = async () => {
        try {
          setLoading(true);
          const data = await testService.getTestById(id);
          setTest(data);
          setError("");
        } catch (error) {
          console.error("Error fetching test:", error);
          setError("Failed to load test data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchTest();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      if (id) {
        await testService.updateTest(id, test);
      } else {
        await testService.createTest(test);
      }
      
      navigate("/tests");
    } catch (error) {
      console.error("Error saving test:", error);
      setError("Failed to save test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/tests");
  };

  return (
    <div className="test-form-container">
      <div className="form-wrapper">
        <h2>{id ? "Edit Test" : "Create New Test"}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="test_id">Test ID</label>
            <input
              id="test_id"
              type="text"
              placeholder="Enter unique test identifier"
              value={test.test_id}
              onChange={(e) => setTest({ ...test, test_id: e.target.value })}
              disabled={id}
              required
            />
            {id && <small>Test ID cannot be changed</small>}
          </div>
          
          <div className="input-group">
            <label htmlFor="test_type">Test Type</label>
            <select
              id="test_type"
              value={test.test_type}
              onChange={(e) => setTest({ ...test, test_type: e.target.value })}
              required
            >
              <option value="">Select Test Type</option>
              <option value="listening">Listening</option>
              <option value="reading">Reading</option>
              <option value="speaking">Speaking</option>
              <option value="writing">Writing</option>
            </select>
          </div>
          
          <div className="input-group">
            <label htmlFor="level">Level</label>
            <select
              id="level"
              value={test.level}
              onChange={(e) => setTest({ ...test, level: e.target.value })}
              required
            >
              <option value="">Select Level</option>
              <option value="A1">A1 (Beginner)</option>
              <option value="A2">A2 (Elementary)</option>
              <option value="B1">B1 (Intermediate)</option>
              <option value="B2">B2 (Upper Intermediate)</option>
              <option value="C1">C1 (Advanced)</option>
              <option value="C2">C2 (Proficiency)</option>
            </select>
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : id ? (
                "Update Test"
              ) : (
                "Create Test"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestForm;