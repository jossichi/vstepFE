import React, { useState, useEffect } from "react";
import "../assets/styles/ExamPage.css";
// Import dữ liệu mẫu
import mockQuizData from "../utils/mockQuizData"; // Điều chỉnh đường dẫn nếu cần

const ExamPage = () => {
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({
    reading: {},
  });

  // Lấy userID từ localStorage
  const userID = localStorage.getItem("user_id"); // Giả sử userID đã được lưu vào localStorage khi đăng nhập

  useEffect(() => {
    // Giả lập việc tải dữ liệu để kiểm tra loading state
    const loadMockData = () => {
      setTimeout(() => {
        setQuizData(mockQuizData);
        setLoading(false);
      }, 1000); // Giả lập delay 1 giây
    };

    loadMockData();
  }, []);

  const getSectionTitle = (key) => {
    return (
      {
        reading: "📖 Đọc",
      }[key] || "Bài thi"
    );
  };

  // Handle answer selection
  const handleAnswerChange = (section, questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: value,
      },
    }));
  };

  // Submit answers
  const submitAnswers = () => {
    console.log("Đáp án người dùng:", userAnswers);
    alert("Bài làm đã được nộp!");
  };

  // Render reading section
  const renderReadingSection = (section) => {
    return (
      <div className="section-content">
        {section.passages.map((passage, index) => (
          <div key={passage.passage_id} className="mb-8">
            {/* Passage Container */}
            <div className="passage-container">
              <h3 className="passage-number">Đoạn văn {index + 1}:</h3>
              <div className="passage-text">{passage.text}</div>
            </div>

            {/* Questions Container */}
            <div className="questions-wrapper">
              {passage.questions.map((question, qIndex) => (
                <div key={question.question_id} className="question-block">
                  <p className="question-text">
                    <span className="question-number">{qIndex + 1}.</span>
                    {question.text}
                  </p>

                  {/* Multiple choice questions */}
                  {question.question_type === "multiple_choice" && (
                    <div className="options-grid">
                      {question.options.map((option, oIndex) => (
                        <label key={oIndex} className="option-label">
                          <div className="option-container">
                            <input
                              type="radio"
                              name={`reading-${question.question_id}`}
                              value={option}
                              checked={
                                userAnswers.reading[question.question_id] ===
                                option
                              }
                              onChange={() =>
                                handleAnswerChange(
                                  "reading",
                                  question.question_id,
                                  option
                                )
                              }
                              className="option-input"
                            />
                            <span className="option-letter">
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            <span className="option-text">{option}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Short answer questions */}
                  {question.question_type === "short_answer" && (
                    <div className="short-answer-container">
                      <input
                        type="text"
                        value={userAnswers.reading[question.question_id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            "reading",
                            question.question_id,
                            e.target.value
                          )
                        }
                        className="short-answer-input"
                        placeholder="Nhập câu trả lời của bạn..."
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Chào Mừng User */}
      {userID && (
        <header className="welcome-header text-center mb-8">
          <h2>
            Chào mừng bạn, <span className="user-id">{userID}</span>!
          </h2>
          <p>Hãy bắt đầu bài test nhanh VSTEP!</p>
        </header>
      )}
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        {quizData?.title}
      </h1>
      <p className="text-gray-500 text-center mb-8 text-xl">
        Cấp độ: {quizData?.level}
      </p>

      {loading ? (
        <div className="text-center text-lg font-semibold text-blue-600">
          <div className="loader"></div>
          Đang tải dữ liệu...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg font-semibold">
          Lỗi: {error}
        </div>
      ) : (
        quizData && (
          <>
            {quizData.sections.reading && (
              <div key="reading" className="section-container">
                <h2 className="section-title">{getSectionTitle("reading")}</h2>
                <p className="section-instructions">
                  {quizData.sections.reading.instructions}
                </p>
                {renderReadingSection(quizData.sections.reading)}
              </div>
            )}{" "}
            {/* Submit Button */}
            <button onClick={submitAnswers} className="submit-button">
              Nộp bài
            </button>
          </>
        )
      )}
    </div>
  );
};

export default ExamPage;
