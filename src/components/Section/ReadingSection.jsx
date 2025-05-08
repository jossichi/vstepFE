import React from "react";

function ReadingSection({ readingParts, setReadingParts, maxParts }) {
  const addReadingPart = () => {
    if (readingParts.length < maxParts) {
      setReadingParts([
        ...readingParts,
        {
          part: `R_PART${readingParts.length + 1}`, // Giữ nguyên part dưới dạng chuỗi
          passage_id: "",
          text: "",
          questions: [],
        },
      ]);
    }
  };

  const updateReadingPart = (index, field, value) => {
    const updatedParts = [...readingParts];
    updatedParts[index] = { ...updatedParts[index], [field]: value };
    setReadingParts(updatedParts);
  };

  // Khôi phục chức năng xóa phần
  const removeReadingPart = (index) => {
    setReadingParts(readingParts.filter((_, i) => i !== index));
  };

  const addReadingQuestion = (partIndex) => {
    const updatedParts = [...readingParts];
    const part = updatedParts[partIndex];

    updatedParts[partIndex] = {
      ...part,
      questions: [
        ...part.questions,
        {
          question_id: `R${partIndex + 1}_Q${String(part.questions.length + 1).padStart(3, "0")}`,
          question_text: "",
          options: ["", "", ""], // Mặc định 3 lựa chọn
          correct_answer: "",
        },
      ],
    };

    setReadingParts(updatedParts);
  };

  const updateReadingQuestion = (partIndex, questionIndex, field, value) => {
    const updatedParts = [...readingParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];

    questions[questionIndex] = { ...questions[questionIndex], [field]: value };
    updatedParts[partIndex] = { ...part, questions };

    setReadingParts(updatedParts);
  };

  const addReadingOption = (partIndex, questionIndex) => {
    const updatedParts = [...readingParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];
    const question = questions[questionIndex];
    const options = [...question.options];

    if (options.length < 5) {
      options.push("");
      questions[questionIndex] = { ...question, options };
      updatedParts[partIndex] = { ...part, questions };
      setReadingParts(updatedParts);
    }
  };

  const removeReadingOption = (partIndex, questionIndex, optionIndex) => {
    const updatedParts = [...readingParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];
    const question = questions[questionIndex];
    const options = [...question.options];

    if (options.length > 3) {
      options.splice(optionIndex, 1);
      questions[questionIndex] = { ...question, options };
      updatedParts[partIndex] = { ...part, questions };
      setReadingParts(updatedParts);
    }
  };

  const updateReadingOption = (partIndex, questionIndex, optionIndex, value) => {
    const updatedParts = [...readingParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];
    const question = questions[questionIndex];
    const options = [...question.options];

    options[optionIndex] = value;
    questions[questionIndex] = { ...question, options };
    updatedParts[partIndex] = { ...part, questions };

    setReadingParts(updatedParts);
  };

  const removeReadingQuestion = (partIndex, questionIndex) => {
    const updatedParts = [...readingParts];
    const part = updatedParts[partIndex];

    updatedParts[partIndex] = {
      ...part,
      questions: part.questions.filter((_, i) => i !== questionIndex),
    };

    setReadingParts(updatedParts);
  };

  // Toggle accordion
  const toggleAccordion = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle("active");
    }
  };

  return (
    <div>
      <div className="section-header">
        <h3>Reading Sections</h3>
        <button
          type="button"
          className="btn btn-outline"
          onClick={addReadingPart}
          disabled={readingParts.length >= maxParts}
        >
          + Add Part
        </button>
      </div>

      {readingParts.length === 0 ? (
        <div className="empty-state">
          <p>No reading parts added yet. Click "Add Part" to begin.</p>
        </div>
      ) : (
        <div className="accordion">
          {readingParts.map((part, partIndex) => (
            <div key={partIndex} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(`reading-part-${partIndex}`)}
              >
                <span>
                  Part {partIndex + 1}: {part.part}
                </span>
                <span className="question-count">{part.questions.length} questions</span>
              </div>
              <div id={`reading-part-${partIndex}`} className="accordion-content">
                <div className="form-group">
                  <label>Part ID</label>
                  <input
                    type="text" // Đổi lại thành text, cho phép chỉnh sửa
                    value={part.part}
                    onChange={(e) => updateReadingPart(partIndex, "part", e.target.value)}
                    style={{ marginBottom: "15px" }}
                  />
                </div>
                <div className="form-group">
                  <label>Passage ID</label>
                  <input
                    type="text"
                    value={part.passage_id}
                    onChange={(e) => updateReadingPart(partIndex, "passage_id", e.target.value)}
                    style={{ marginBottom: "15px" }}
                  />
                </div>
                <div className="form-group">
                  <label>Reading Text</label>
                  <textarea
                    value={part.text}
                    onChange={(e) => updateReadingPart(partIndex, "text", e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="questions-section">
                  <div className="section-header">
                    <h4>Questions</h4>
                    <div className="button-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => addReadingQuestion(partIndex)}
                        disabled={part.questions.length >= 15}
                      >
                        + Add Question
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeReadingPart(partIndex)}
                      >
                        Remove Part
                      </button>
                    </div>
                  </div>

                  {part.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question-card">
                      <div className="question-header">
                        <span>
                          Question {questionIndex + 1}: {question.question_id}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removeReadingQuestion(partIndex, questionIndex)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="question-content">
                        <div className="form-group">
                          <label>Question Text</label>
                          <textarea
                            value={question.question_text}
                            onChange={(e) =>
                              updateReadingQuestion(partIndex, questionIndex, "question_text", e.target.value)
                            }
                            rows={2}
                          />
                        </div>

                        <div className="form-group">
                          <label>Options</label>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="option-row">
                              <span className="option-label">{String.fromCharCode(65 + optionIndex)}.</span>
                              <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                  updateReadingOption(partIndex, questionIndex, optionIndex, e.target.value)
                                }
                              />
                              {question.options.length > 3 && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() => removeReadingOption(partIndex, questionIndex, optionIndex)}
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}
                          {question.options.length < 5 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline"
                              onClick={() => addReadingOption(partIndex, questionIndex)}
                            >
                              + Add Option
                            </button>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Correct Answer</label>
                          <select
                            value={question.correct_answer}
                            onChange={(e) =>
                              updateReadingQuestion(partIndex, questionIndex, "correct_answer", e.target.value)
                            }
                          >
                            <option value="">Select correct answer</option>
                            {question.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {part.questions.length === 0 && (
                    <div className="empty-state">
                      <p>No questions added yet. Click "Add Question" to begin.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadingSection;