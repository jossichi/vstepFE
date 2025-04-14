import { useEffect, useState } from "react";
import { testService } from "../services/testService";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/TestForm.scss";

const TestForm = () => {
  const [test, setTest] = useState({
    test_id: "",
    test_type: "",
    level: "",
    url_audio: null,
    instructions: "",
    questions: [],
    passages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch test data if an ID is provided (Edit Mode)
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

  // Handle form submission (Create or Update test)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("test_id", test.test_id);
    formData.append("test_type", test.test_type);
    formData.append("level", test.level);

    // Add audio for listening type tests
    if (test.test_type === "listening" && test.url_audio) {
      formData.append("url_audio", test.url_audio); // Ensure this is the correct file format
    }

    // Add questions and passages for reading type tests
    if (test.test_type === "reading") {
      formData.append("instructions", test.instructions);
      test.passages.forEach((passage, idx) => {
        formData.append(`passages[${idx}].text`, passage.text);
        passage.questions.forEach((question, qIdx) => {
          formData.append(
            `passages[${idx}].questions[${qIdx}]`,
            JSON.stringify(question)
          );
        });
      });
    }

    try {
      setLoading(true);
      setError("");

      if (id) {
        // Update test
        await testService.updateTest(id, formData);
      } else {
        // Create new test
        await testService.createTest(formData);
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

  const handleFileChange = (e) => {
    setTest({ ...test, url_audio: e.target.files[0] }); // Handle file selection
  };

  const handleQuestionChange = (passageIndex, index, field, value) => {
    const updatedPassages = [...test.passages];
    updatedPassages[passageIndex].questions[index][field] = value;
    setTest({ ...test, passages: updatedPassages });
  };

  const handleAddQuestion = (passageIndex) => {
    const newQuestion = {
      question_text: "",
      question_type: "multiple_choice",
      options: ["", "", "", ""], // Ensure 4 options are available
      correct_answer: "",
    };
    const updatedPassages = [...test.passages];
    updatedPassages[passageIndex].questions.push(newQuestion);
    setTest({ ...test, passages: updatedPassages });
  };

  const handlePassageChange = (index, field, value) => {
    const updatedPassages = [...test.passages];
    updatedPassages[index][field] = value;
    setTest({ ...test, passages: updatedPassages });
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
              required>
              <option value="">Select Test Type</option>
              <option value="listening">Listening</option>
              <option value="reading">Reading</option>
            </select>
          </div>

          {test.test_type === "listening" && (
            <div className="input-group">
              <label htmlFor="url_audio">Audio File</label>
              <input
                id="url_audio"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                required
              />
            </div>
          )}

          {test.test_type === "reading" && (
            <div className="input-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                value={test.instructions}
                onChange={(e) =>
                  setTest({ ...test, instructions: e.target.value })
                }
                required
              />
            </div>
          )}

          {test.test_type === "reading" &&
            test.passages.map((passage, passageIndex) => (
              <div key={passageIndex} className="input-group">
                <label>Passage {passageIndex + 1}</label>
                <textarea
                  value={passage.text}
                  onChange={(e) =>
                    handlePassageChange(passageIndex, "text", e.target.value)
                  }
                  placeholder="Enter passage text"
                  required
                />
                {passage.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="question">
                    <label>Question {questionIndex + 1}</label>
                    <textarea
                      value={question.question_text}
                      onChange={(e) =>
                        handleQuestionChange(
                          passageIndex,
                          questionIndex,
                          "question_text",
                          e.target.value
                        )
                      }
                      required
                    />
                    <div>
                      <label>Options</label>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleQuestionChange(
                              passageIndex,
                              questionIndex,
                              "options",
                              e.target.value,
                              optionIndex
                            )
                          }
                        />
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Correct answer"
                      value={question.correct_answer}
                      onChange={(e) =>
                        handleQuestionChange(
                          passageIndex,
                          questionIndex,
                          "correct_answer",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddQuestion(passageIndex)}>
                  Add Question
                </button>
              </div>
            ))}

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
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
