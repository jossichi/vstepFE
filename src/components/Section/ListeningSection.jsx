import React from "react";

function ListeningSection({ listeningParts, setListeningParts, maxParts }) {
  const addListeningPart = () => {
    if (listeningParts.length < maxParts) {
      setListeningParts([
        ...listeningParts,
        {
          part: `L_PART${listeningParts.length + 1}`,
          audio_url: "",
          questions: [],
        },
      ]);
    }
  };

  const updateListeningPart = (index, field, value) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[index];
    part[field] = value;
    updatedParts[index] = part;
    setListeningParts(updatedParts);
  };

  const removeListeningPart = (index) => {
    setListeningParts(listeningParts.filter((_, i) => i !== index));
  };

  const addListeningQuestion = (partIndex) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];

    updatedParts[partIndex] = {
      ...part,
      questions: [
        ...part.questions,
        {
          question_id: `L${partIndex + 1}_Q${String(part.questions.length + 1).padStart(3, "0")}`,
          question_text: "",
          options: ["", "", ""], // Mặc định 3 lựa chọn
          correct_answer: "",
        },
      ],
    };

    setListeningParts(updatedParts);
  };

  const updateListeningQuestion = (partIndex, questionIndex, field, value) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];

    questions[questionIndex] = { ...questions[questionIndex], [field]: value };
    updatedParts[partIndex] = { ...part, questions };

    setListeningParts(updatedParts);
  };

  const addListeningOption = (partIndex, questionIndex) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];
    const question = questions[questionIndex];
    const options = [...question.options];

    if (options.length < 5) {
      options.push("");
      questions[questionIndex] = { ...question, options };
      updatedParts[partIndex] = { ...part, questions };
      setListeningParts(updatedParts);
    }
  };

  const removeListeningOption = (partIndex, questionIndex, optionIndex) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];
    const question = questions[questionIndex];
    const options = [...question.options];

    if (options.length > 3) {
      options.splice(optionIndex, 1);
      questions[questionIndex] = { ...question, options };
      updatedParts[partIndex] = { ...part, questions };
      setListeningParts(updatedParts);
    }
  };

  const updateListeningOption = (partIndex, questionIndex, optionIndex, value) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];
    const questions = [...part.questions];
    const question = questions[questionIndex];
    const options = [...question.options];

    options[optionIndex] = value;
    questions[questionIndex] = { ...question, options };
    updatedParts[partIndex] = { ...part, questions };

    setListeningParts(updatedParts);
  };

  const removeListeningQuestion = (partIndex, questionIndex) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];

    updatedParts[partIndex] = {
      ...part,
      questions: part.questions.filter((_, i) => i !== questionIndex),
    };

    setListeningParts(updatedParts);
  };

  // Xử lý upload file âm thanh thành Base64
  const handleAudioUpload = (partIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedParts = [...listeningParts];
        const part = updatedParts[partIndex];
        part.audio_url = reader.result; // Lưu Base64
        updatedParts[partIndex] = part;
        setListeningParts(updatedParts);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xóa audio_url (URL hoặc Base64)
  const clearAudio = (partIndex) => {
    const updatedParts = [...listeningParts];
    updatedParts[partIndex].audio_url = "";
    setListeningParts(updatedParts);
  };

  // Kiểm tra định dạng URL
  const isValidUrl = (url) => {
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  // Xử lý khi người dùng nhập Audio URL
  const handleAudioUrlChange = (partIndex, value) => {
    const updatedParts = [...listeningParts];
    const part = updatedParts[partIndex];

    // Nếu giá trị rỗng, cho phép cập nhật
    if (!value) {
      part.audio_url = value;
      updatedParts[partIndex] = part;
      setListeningParts(updatedParts);
      return;
    }

    // Kiểm tra định dạng: Base64 hoặc URL hợp lệ
    const isBase64 = value.startsWith("data:audio");
    const isUrl = isValidUrl(value);

    if (isBase64 || isUrl) {
      part.audio_url = value;
    } else {
      part.audio_url = value; // Vẫn lưu giá trị nhưng sẽ hiển thị lỗi
      part.error = "Audio URL must be a valid URL (starting with http:// or https://) or a Base64 string.";
    }

    if (part.error && (isBase64 || isUrl)) {
      delete part.error; // Xóa lỗi nếu giá trị hợp lệ
    }

    updatedParts[partIndex] = part;
    setListeningParts(updatedParts);
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
        <h3>Listening Sections</h3>
        <button
          type="button"
          className="btn btn-outline"
          onClick={addListeningPart}
          disabled={listeningParts.length >= maxParts}
        >
          + Add Part
        </button>
      </div>

      {listeningParts.length === 0 ? (
        <div className="empty-state">
          <p>No listening parts added yet. Click "Add Part" to begin.</p>
        </div>
      ) : (
        <div className="accordion">
          {listeningParts.map((part, partIndex) => (
            <div key={partIndex} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(`listening-part-${partIndex}`)}
              >
                <span>
                  Part {partIndex + 1}: {part.part}
                </span>
                <span className="question-count">{part.questions.length} questions</span>
              </div>
              <div id={`listening-part-${partIndex}`} className="accordion-content">
                <div className="form-group">
                  <label>Part ID</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                    <input
                      type="text"
                      value={part.part}
                      onChange={(e) => updateListeningPart(partIndex, "part", e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => updateListeningPart(partIndex, "part", "")}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  {/* Audio URL */}
                  {(!part.audio_url || !part.audio_url.startsWith("data:")) && (
                    <>
                      <label>Audio URL</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                        <input
                          type="text"
                          value={part.audio_url || ""}
                          onChange={(e) => handleAudioUrlChange(partIndex, e.target.value)}
                          placeholder="https://drive.google.com/file/..."
                          style={{ flex: 1 }}
                        />
                        {part.audio_url && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => clearAudio(partIndex)}
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {part.error && (
                        <div className="error-message" style={{ color: "red", fontSize: "12px" }}>
                          {part.error}
                        </div>
                      )}
                    </>
                  )}

                  {/* Or Upload Audio File */}
                  {(!part.audio_url || part.audio_url.startsWith("data:")) && (
                    <>
                      <label>Or Upload Audio File</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleAudioUpload(partIndex, e)}
                        />
                        {part.audio_url && part.audio_url.startsWith("data:") && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => clearAudio(partIndex)}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="questions-section">
                  <div className="section-header">
                    <h4>Questions</h4>
                    <div className="button-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => addListeningQuestion(partIndex)}
                        disabled={part.questions.length >= 15}
                      >
                        + Add Question
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeListeningPart(partIndex)}
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
                          onClick={() => removeListeningQuestion(partIndex, questionIndex)}
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
                              updateListeningQuestion(partIndex, questionIndex, "question_text", e.target.value)
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
                                  updateListeningOption(partIndex, questionIndex, optionIndex, e.target.value)
                                }
                              />
                              {question.options.length > 3 && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() => removeListeningOption(partIndex, questionIndex, optionIndex)}
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
                              onClick={() => addListeningOption(partIndex, questionIndex)}
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
                              updateListeningQuestion(partIndex, questionIndex, "correct_answer", e.target.value)
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

export default ListeningSection;