import React from "react";
import "../../assets/styles/ReadingTest.css"; // Đảm bảo đường dẫn đúng
const ReadingTest = ({ data, userAnswers, setUserAnswers }) => {
  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div>
      <h2 className="section-title">📖 Đọc</h2>
      {data.instructions && (
        <p className="section-instructions mb-4">{data.instructions}</p>
      )}

      {data.passages.map((passage, index) => (
        <div key={passage.passage_id} className="mb-8">
          <div className="passage-container p-4 bg-gray-50 rounded shadow-sm mb-6">
            <h3 className="font-semibold mb-2">Đoạn văn {index + 1}</h3>
            <div className="text-justify whitespace-pre-line">
              {passage.question_text}
            </div>
          </div>

          {passage.questions.map((question, qIndex) => {
            const uniqueId = `${question.question_id}-${index}-${qIndex}`;

            return (
              <div
                key={uniqueId}
                className="question-block mb-6 p-4 border rounded-md shadow-sm">
                <p className="font-medium mb-2">
                  <span>{qIndex + 1}.</span> {question.question_text}
                </p>

                {question.question_type === "multiple_choice" &&
                  question.options.map((option, oIndex) => {
                    const inputId = `${uniqueId}-option-${oIndex}`;

                    return (
                      <div key={inputId} className="flex items-center mb-1">
                        <input
                          type="radio"
                          id={inputId}
                          name={uniqueId}
                          value={option}
                          checked={userAnswers[uniqueId] === option}
                          onChange={() => handleAnswerChange(uniqueId, option)}
                          className="mr-2"
                        />
                        <label htmlFor={inputId}>
                          <strong>{String.fromCharCode(65 + oIndex)}.</strong>{" "}
                          {option}
                        </label>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ReadingTest;
