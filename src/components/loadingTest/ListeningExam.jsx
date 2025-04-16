import React from "react";
import "../../assets/styles/ListeningTest.css";
const ListeningTest = ({ data, userAnswers, setUserAnswers }) => {
  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div>
      <h2 className="section-title">🎧 Nghe</h2>
      {data.instructions && (
        <p className="section-instructions mb-4">{data.instructions}</p>
      )}

      {data.url_audio && (
        <audio
          controls
          src={data.url_audio}
          className="w-full rounded-lg border border-gray-300 shadow-sm"
        />
      )}

      {data.questions.map((question, index) => {
        const uniqueId = `${question.question_id}-${index}`;
        return (
          <div
            key={uniqueId}
            className="question-block mb-6 p-4 border rounded-md shadow-sm">
            <p className="font-medium mb-2">
              <span>{index + 1}.</span> {question.question_text}
            </p>

            {question.options.map((option, oIndex) => {
              const inputId = `${uniqueId}-option-${oIndex}`;
              return (
                <div key={inputId} className="flex items-center mb-1">
                  <input
                    type="radio"
                    id={inputId}
                    name={uniqueId} // phải dùng unique name để tránh conflict
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
  );
};

export default ListeningTest;
