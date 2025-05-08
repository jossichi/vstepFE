function ListeningSection({ listeningParts, setListeningParts, maxParts }) {
  const addListeningPart = () => {
    if (listeningParts.length < maxParts) {
      setListeningParts([
        ...listeningParts,
        {
          part: `L_PART${listeningParts.length + 1}`,
          audio_file: "",
          questions: [],
        },
      ])
    }
  }

  const updateListeningPart = (index, field, value) => {
    const updatedParts = [...listeningParts]
    updatedParts[index] = { ...updatedParts[index], [field]: value }
    setListeningParts(updatedParts)
  }

  const removeListeningPart = (index) => {
    setListeningParts(listeningParts.filter((_, i) => i !== index))
  }

  const addListeningQuestion = (partIndex) => {
    const updatedParts = [...listeningParts]
    const part = updatedParts[partIndex]

    updatedParts[partIndex] = {
      ...part,
      questions: [
        ...part.questions,
        {
          question_id: `L${partIndex + 1}_Q${String(part.questions.length + 1).padStart(3, "0")}`,
          question_text: "",
          options: ["", "", "", ""],
          correct_answer: "",
        },
      ],
    }

    setListeningParts(updatedParts)
  }

  const updateListeningQuestion = (partIndex, questionIndex, field, value) => {
    const updatedParts = [...listeningParts]
    const part = updatedParts[partIndex]
    const questions = [...part.questions]

    questions[questionIndex] = { ...questions[questionIndex], [field]: value }
    updatedParts[partIndex] = { ...part, questions }

    setListeningParts(updatedParts)
  }

  const updateListeningOption = (partIndex, questionIndex, optionIndex, value) => {
    const updatedParts = [...listeningParts]
    const part = updatedParts[partIndex]
    const questions = [...part.questions]
    const question = questions[questionIndex]
    const options = [...question.options]

    options[optionIndex] = value
    questions[questionIndex] = { ...question, options }
    updatedParts[partIndex] = { ...part, questions }

    setListeningParts(updatedParts)
  }

  const removeListeningQuestion = (partIndex, questionIndex) => {
    const updatedParts = [...listeningParts]
    const part = updatedParts[partIndex]

    updatedParts[partIndex] = {
      ...part,
      questions: part.questions.filter((_, i) => i !== questionIndex),
    }

    setListeningParts(updatedParts)
  }

  // Toggle accordion
  const toggleAccordion = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.classList.toggle("active")
    }
  }

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
              <div className="accordion-header" onClick={() => toggleAccordion(`listening-part-${partIndex}`)}>
                <span>
                  Part {partIndex + 1}: {part.part}
                </span>
                <span className="question-count">{part.questions.length} questions</span>
              </div>
              <div id={`listening-part-${partIndex}`} className="accordion-content">
                <div className="form-group">
                  <label>Part ID</label>
                  <input
                    type="text"
                    value={part.part}
                    onChange={(e) => updateListeningPart(partIndex, "part", e.target.value)}
                    style={{ marginBottom: '15px' }}
                  />
                </div>
                <div className="form-group">
                  <label>Audio File URL</label>
                  <input
                    type="text"
                    value={part.audio_file}
                    onChange={(e) => updateListeningPart(partIndex, "audio_file", e.target.value)}
                    placeholder="https://drive.google.com/file/..."
                    style={{ marginBottom: '15px' }}
                  />
                </div>

                <div className="questions-section">
                  <div className="section-header">
                    <h4>Questions</h4>
                    <div className="button-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => addListeningQuestion(partIndex)}
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
                            </div>
                          ))}
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
                              <option key={optionIndex} value={`${String.fromCharCode(65 + optionIndex)}. ${option}`}>
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
  )
}

export default ListeningSection