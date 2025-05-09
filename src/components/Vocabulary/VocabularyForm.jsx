import { useState } from "react";
import "../../assets/styles/VocabularyForm.css"; // Thêm import CSS

const emptyWordEntry = {
  word: "",
  partOfSpeech: "",
  translation: "",
  exampleSentences: [""],
};

const partOfSpeechOptions = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
];

function VocabularyForm() {
  const [formData, setFormData] = useState({
    word: [{ ...emptyWordEntry }],
    family_word: [],
    synonyms: [],
    antonyms: [],
  });

  const [expandedSections, setExpandedSections] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    let hasErrors = false;

    if (formData.word.length === 0) {
      newErrors.word = "At least one main word is required";
      hasErrors = true;
    } else {
      formData.word.forEach((entry, index) => {
        if (!entry.word.trim()) {
          newErrors[`word_${index}`] = "Word cannot be empty";
          hasErrors = true;
        }
      });
    }

    ["family_word", "synonyms", "antonyms"].forEach((arrayName) => {
      formData[arrayName].forEach((entry, index) => {
        if (!entry.word.trim()) {
          newErrors[`${arrayName}_${index}`] = "Word cannot be empty";
          hasErrors = true;
        }
      });
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    const allTouched = {};
    formData.word.forEach((_, index) => {
      allTouched[`word_${index}`] = true;
    });
    ["family_word", "synonyms", "antonyms"].forEach(arrayName => {
      formData[arrayName].forEach((_, index) => {
        allTouched[`${arrayName}_${index}`] = true;
      });
    });
    setTouched(allTouched);
    
    if (!validate()) {
      setSubmitError("Please fill in all required fields");
      showMessage("Please check the form for errors", "error");
      return;
    }

    setSubmitError(null);

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const apiUrl = `${process.env.REACT_APP_API_URL}/api/vocab/save`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-ID": userId,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = `Error: ${response.status}`;
        if (response.status === 401) {
          localStorage.clear();
          errorMessage = "Session expired. Please log in again.";
        } else if (response.status === 404) {
          errorMessage = "Could not save vocabulary. Please contact support.";
        } else {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
          }
        }
        throw new Error(errorMessage);
      }

      await response.json();
      showMessage("Vocabulary saved successfully!", "success");
    } catch (error) {
      setSubmitError(error.message || "Could not save vocabulary. Please try again.");
      showMessage(error.message || "Could not save vocabulary. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const updateWordArray = (arrayName, index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];

      if (field === "exampleSentences" && typeof value === "object") {
        const sentenceIndex = value.index;
        const sentenceValue = value.value;

        newArray[index] = {
          ...newArray[index],
          exampleSentences: newArray[index].exampleSentences.map((sentence, i) =>
            i === sentenceIndex ? sentenceValue : sentence
          ),
        };
      } else {
        newArray[index] = {
          ...newArray[index],
          [field]: value,
        };
      }

      return {
        ...prev,
        [arrayName]: newArray,
      };
    });

    if (field === "word") {
      setTouched(prev => ({
        ...prev,
        [`${arrayName}_${index}`]: true
      }));
      
      if (formSubmitted) {
        setTimeout(() => validate(), 0);
      }
    }
  };

  const handleBlur = (arrayName, index) => {
    setTouched(prev => ({
      ...prev,
      [`${arrayName}_${index}`]: true
    }));
    
    validate();
  };

  const addEntry = (arrayName, mainWordIndex = null) => {
    if (arrayName === "word") {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: [...prev[arrayName], { ...emptyWordEntry }],
      }));
      return;
    }

    const newEntry = { ...emptyWordEntry };

    if (mainWordIndex !== null && formData.word[mainWordIndex]) {
      const mainWord = formData.word[mainWordIndex];
      newEntry.partOfSpeech = mainWord.partOfSpeech;
    }

    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newEntry],
    }));

    const sectionId = `${arrayName}_${mainWordIndex}`;
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: true,
    }));
  };

  const removeEntry = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`${arrayName}_${index}`];
      return newErrors;
    });
    
    setTouched(prev => {
      const newTouched = { ...prev };
      delete newTouched[`${arrayName}_${index}`];
      return newTouched;
    });
    
    setTimeout(() => validate(), 0);
  };

  const addExampleSentence = (arrayName, index) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = {
        ...newArray[index],
        exampleSentences: [...newArray[index].exampleSentences, ""],
      };

      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  const removeExampleSentence = (arrayName, wordIndex, sentenceIndex) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[wordIndex] = {
        ...newArray[wordIndex],
        exampleSentences: newArray[wordIndex].exampleSentences.filter((_, i) => i !== sentenceIndex),
      };

      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const isSectionExpanded = (sectionId) => {
    return !!expandedSections[sectionId];
  };

  const getRelatedWords = (arrayName) => {
    return formData[arrayName];
  };

  const renderRelatedWordForm = (arrayName, entry, index) => {
    const wordTypeLabels = {
      family_word: "Family Word",
      synonyms: "Synonym",
      antonyms: "Antonym",
    };

    const isFieldTouched = touched[`${arrayName}_${index}`];
    const hasError = errors[`${arrayName}_${index}`];
    const showError = isFieldTouched || formSubmitted;

    return (
      <div className={`related-word-entry ${arrayName}-entry`} key={`${arrayName}-${index}`}>
        <div className="related-word-header">
          <h4 className="related-title">
            {wordTypeLabels[arrayName]} #{index + 1}
          </h4>
          <button
            type="button"
            className="icon-button"
            onClick={() => removeEntry(arrayName, index)}
            aria-label="Delete entry"
          >
            <span className="trash-icon">🗑️</span>
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor={`${arrayName}-${index}-word`} className="form-label">
              Word *
            </label>
            <input
              id={`${arrayName}-${index}-word`}
              type="text"
              value={entry.word}
              onChange={(e) => updateWordArray(arrayName, index, "word", e.target.value)}
              onBlur={() => handleBlur(arrayName, index)}
              placeholder="Enter word"
              className={`form-input ${showError && hasError ? "input-error" : ""}`}
            />
            {showError && hasError && (
              <div className="error-message">{hasError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={`${arrayName}-${index}-pos`} className="form-label">
              Part of Speech
            </label>
            <select
              id={`${arrayName}-${index}-pos`}
              value={entry.partOfSpeech}
              onChange={(e) => updateWordArray(arrayName, index, "partOfSpeech", e.target.value)}
              className="form-select"
            >
              <option value="">Select part of speech</option>
              {partOfSpeechOptions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`${arrayName}-${index}-translation`} className="form-label">
            Translation
          </label>
          <input
            id={`${arrayName}-${index}-translation`}
            type="text"
            value={entry.translation}
            onChange={(e) => updateWordArray(arrayName, index, "translation", e.target.value)}
            placeholder="Enter translation"
            className="form-input translation-input"
          />
        </div>

        <div className="form-group">
          <div className="example-header">
            <label className="form-label">Example Sentences</label>
            <button
              type="button"
              className="action-button add-sentence-button"
              onClick={() => addExampleSentence(arrayName, index)}
            >
              <span className="plus-icon">+</span> Add Example Sentence
            </button>
          </div>

          {entry.exampleSentences.map((sentence, sentenceIndex) => (
            <div key={`${arrayName}-${index}-sentence-${sentenceIndex}`} className="example-sentence">
              <input
                type="text"
                value={sentence}
                onChange={(e) =>
                  updateWordArray(arrayName, index, "exampleSentences", {
                    index: sentenceIndex,
                    value: e.target.value,
                  })
                }
                placeholder="Enter example sentence"
                className="form-input"
              />
              {entry.exampleSentences.length > 1 && (
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => removeExampleSentence(arrayName, index, sentenceIndex)}
                >
                  <span className="trash-icon">🗑️</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCollapsibleSection = (arrayName, mainWordIndex) => {
    const sectionId = `${arrayName}_${mainWordIndex}`;
    const isExpanded = isSectionExpanded(sectionId);

    const sectionTitles = {
      family_word: "Family Words",
      synonyms: "Synonyms",
      antonyms: "Antonyms",
    };

    const sectionClasses = {
      family_word: "family-words-section",
      synonyms: "synonyms-section",
      antonyms: "antonyms-section",
    };

    const relatedWords = getRelatedWords(arrayName);

    return (
      <div className={`collapsible-section ${sectionClasses[arrayName]}`}>
        <button
          type="button"
          className={`collapsible-button ${isExpanded ? "expanded" : ""}`}
          onClick={() => toggleSection(sectionId)}
        >
          <span className="collapsible-icon">{isExpanded ? "−" : "+"}</span>
          {sectionTitles[arrayName]}
          {relatedWords.length > 0 && <span className="count-badge">{relatedWords.length}</span>}
        </button>

        {isExpanded && (
          <div className="collapsible-content">
            {relatedWords.length > 0 ? (
              <div className="related-words-list">
                {relatedWords.map((entry, index) =>
                  renderRelatedWordForm(arrayName, entry, index)
                )}
              </div>
            ) : (
              <div className="empty-message">No {sectionTitles[arrayName].toLowerCase()} added yet.</div>
            )}

            <button
              type="button"
              className={`add-related-button ${arrayName}-button`}
              onClick={() => addEntry(arrayName, mainWordIndex)}
            >
              <span className="plus-icon">+</span> Add {sectionTitles[arrayName].slice(0, -1)}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderMainWordForm = (entry, index) => {
    const isFieldTouched = touched[`word_${index}`];
    const hasError = errors[`word_${index}`];
    const showError = isFieldTouched || formSubmitted;

    return (
      <div className="main-word-card" key={`word-${index}`}>
        <div className="card-header">
          <h3 className="card-title">Main Word #{index + 1}</h3>
          {formData.word.length > 1 && (
            <button
              type="button"
              className="icon-button"
              onClick={() => removeEntry("word", index)}
              aria-label="Delete entry"
            >
              <span className="trash-icon">🗑️</span>
            </button>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor={`word-${index}-word`} className="form-label">
              Word *
            </label>
            <input
              id={`word-${index}-word`}
              type="text"
              value={entry.word}
              onChange={(e) => updateWordArray("word", index, "word", e.target.value)}
              onBlur={() => handleBlur("word", index)}
              placeholder="Enter word"
              required
              className={`form-input ${showError && hasError ? "input-error" : ""}`}
            />
            {showError && hasError && (
              <div className="error-message">{hasError}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={`word-${index}-pos`} className="form-label">
              Part of Speech
            </label>
            <select
              id={`word-${index}-pos`}
              value={entry.partOfSpeech}
              onChange={(e) => updateWordArray("word", index, "partOfSpeech", e.target.value)}
              className="form-select"
            >
              <option value="">Select part of speech</option>
              {partOfSpeechOptions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`word-${index}-translation`} className="form-label">
            Translation
          </label>
          <input
            id={`word-${index}-translation`}
            type="text"
            value={entry.translation}
            onChange={(e) => updateWordArray("word", index, "translation", e.target.value)}
            placeholder="Enter translation"
            className="form-input translation-input"
          />
        </div>

        <div className="form-group">
          <div className="example-header">
            <label className="form-label">Example Sentences</label>
            <button
              type="button"
              className="action-button add-sentence-button"
              onClick={() => addExampleSentence("word", index)}
            >
              <span className="plus-icon">+</span> Add Example Sentence
            </button>
          </div>

          {entry.exampleSentences.map((sentence, sentenceIndex) => (
            <div key={`word-${index}-sentence-${sentenceIndex}`} className="example-sentence">
              <input
                type="text"
                value={sentence}
                onChange={(e) =>
                  updateWordArray("word", index, "exampleSentences", {
                    index: sentenceIndex,
                    value: e.target.value,
                  })
                }
                placeholder="Enter example sentence"
                className="form-input"
              />
              {entry.exampleSentences.length > 1 && (
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => removeExampleSentence("word", index, sentenceIndex)}
                >
                  <span className="trash-icon">🗑️</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="related-words-container">
          {renderCollapsibleSection("family_word", index)}
          {renderCollapsibleSection("synonyms", index)}
          {renderCollapsibleSection("antonyms", index)}
        </div>
      </div>
    );
  };

  return (
    <div className="vocabulary-form-container">
      <form onSubmit={handleSubmit} className="vocabulary-form">
        <h1 className="form-title">Add New Vocabulary</h1> {/* Thêm form-title */}
        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        {submitError && (
          <div className="message error">
            <h3>Error!</h3>
            <p>{submitError}</p>
          </div>
        )}

        <div className="main-section">
          <div className="section-header main-section-header">
            <h2 className="section-title">Vocabulary</h2>
          </div>

          {formData.word.map((entry, index) => renderMainWordForm(entry, index))}

          <button type="button" className="add-word-button" onClick={() => addEntry("word")}>
            <span className="plus-icon">+</span> Add New Word
          </button>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>
              <span className="spinner"></span> Saving...
            </span>
          ) : (
            "Save Vocabulary"
          )}
        </button>
      </form>
    </div>
  );
}

export default VocabularyForm;