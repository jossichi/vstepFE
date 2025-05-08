import React, { useState } from "react";
import "../../assets/styles/PracticeMaterialFormWeb2.css";
import ListeningSection from "../Section/ListeningSection";
import ReadingSection from "../Section/ReadingSection";
import WritingSection from "../Section/WritingSection";
import SpeakingSection from "../Section/SpeakingSection";

// Định nghĩa BASE_URL
const BASE_URL = process.env.REACT_APP_API_URL + "/api";

function PracticeMaterialFormWeb2({
  level,
  setLevel,
  listeningParts,
  setListeningParts,
  readingParts,
  setReadingParts,
  writingTasks,
  setWritingTasks,
  speakingTasks,
  setSpeakingTasks,
}) {
  const [activeTab, setActiveTab] = useState("listening");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const MAX_LISTENING_PARTS = 3;
  const MAX_READING_PARTS = 4;
  const MAX_WRITING_PARTS = 2;
  const MAX_SPEAKING_PARTS = 3;

  // Kiểm tra số lượng phần trước khi submit
  const validateParts = () => {
    const errors = [];

    if (listeningParts.length !== MAX_LISTENING_PARTS) {
      errors.push(
        `Listening must have exactly ${MAX_LISTENING_PARTS} parts. Currently: ${listeningParts.length} parts.`
      );
    }
    if (readingParts.length !== MAX_READING_PARTS) {
      errors.push(
        `Reading must have exactly ${MAX_READING_PARTS} parts. Currently: ${readingParts.length} parts.`
      );
    }
    if (writingTasks.length !== MAX_WRITING_PARTS) {
      errors.push(
        `Writing must have exactly ${MAX_WRITING_PARTS} parts. Currently: ${writingTasks.length} parts.`
      );
    }
    if (speakingTasks.length !== MAX_SPEAKING_PARTS) {
      errors.push(
        `Speaking must have exactly ${MAX_SPEAKING_PARTS} parts. Currently: ${speakingTasks.length} parts.`
      );
    }

    if (errors.length === 0) {
      return null;
    }
    if (errors.length === 1) {
      return errors[0];
    }
    return "One or more sections do not have the required number of parts.";
  };

  // Kiểm tra dữ liệu bắt buộc
  const validateData = () => {
    const errors = [];

    // Kiểm tra Listening
    listeningParts.forEach((part, index) => {
      if (!part.audio_url) {
        errors.push(`Listening Part ${index + 1}: Audio URL or file is required.`);
      }
      if (!part.questions || part.questions.length === 0) {
        errors.push(`Listening Part ${index + 1}: At least one question is required.`);
      }
      part.questions?.forEach((question, qIndex) => {
        if (!question.question_text) {
          errors.push(`Listening Part ${index + 1}, Question ${qIndex + 1}: Question text is required.`);
        }
        if (!question.correct_answer) {
          errors.push(`Listening Part ${index + 1}, Question ${qIndex + 1}: Correct answer is required.`);
        }
        if (!question.options || question.options.some((opt) => !opt)) {
          errors.push(`Listening Part ${index + 1}, Question ${qIndex + 1}: All options must be filled.`);
        }
      });
    });

    // Kiểm tra Reading
    readingParts.forEach((part, index) => {
      if (!part.text) {
        errors.push(`Reading Part ${index + 1}: Passage text is required.`);
      }
      if (!part.questions || part.questions.length === 0) {
        errors.push(`Reading Part ${index + 1}: At least one question is required.`);
      }
      part.questions?.forEach((question, qIndex) => {
        if (!question.question_text) {
          errors.push(`Reading Part ${index + 1}, Question ${qIndex + 1}: Question text is required.`);
        }
        if (!question.correct_answer) {
          errors.push(`Reading Part ${index + 1}, Question ${qIndex + 1}: Correct answer is required.`);
        }
        if (!question.options || question.options.some((opt) => !opt)) {
          errors.push(`Reading Part ${index + 1}, Question ${qIndex + 1}: All options must be filled.`);
        }
      });
    });

    // Kiểm tra Writing
    writingTasks.forEach((task, index) => {
      if (!task.prompt) {
        errors.push(`Writing Task ${index + 1}: Prompt is required.`);
      }
      if (!task.sample_answer) {
        errors.push(`Writing Task ${index + 1}: Sample answer is required.`);
      }
    });

    // Kiểm tra Speaking
    speakingTasks.forEach((task, index) => {
      if (!task.prompt) {
        errors.push(`Speaking Task ${index + 1}: Prompt is required.`);
      }
      if (!task.sample_answer) {
        errors.push(`Speaking Task ${index + 1}: Sample answer is required.`);
      }
    });

    if (errors.length === 0) {
      return null;
    }
    if (errors.length === 1) {
      return errors[0];
    }
    return "Please fill in all required fields.";
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Kiểm tra số lượng phần
    const partsError = validateParts();
    if (partsError) {
      setSubmitError(partsError);
      setIsSubmitting(false);
      return;
    }

    // Kiểm tra dữ liệu bắt buộc
    const dataError = validateData();
    if (dataError) {
      setSubmitError(dataError);
      setIsSubmitting(false);
      return;
    }

    const materialData = {
      level,
      listening: listeningParts,
      reading: readingParts,
      writing: writingTasks,
      speaking: speakingTasks,
      attempt_count: 0,
    };

    console.log("BASE_URL:", BASE_URL);
    console.log("Token:", sessionStorage.getItem("token"));
    console.log("Material Data:", materialData);

    try {
      const response = await fetch(`${BASE_URL}/practice-materials/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(materialData),
      });

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.log("Response Status:", response.status);
        console.log("Response Text:", text);
        throw new Error(
          `Expected JSON, but received ${contentType || "unknown content type"}. Status: ${response.status}. Response: ${text.slice(0, 100)}...`
        );
      }

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || `Error: ${response.status}`);
      }

      setSubmitSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      setSubmitError(error.message || "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="practice-form-container">
      <div className="form-header">
        <h1>Practice Material Form Web2</h1>
        <p>Submit your language practice materials</p>
      </div>

      {submitSuccess ? (
        <div className="success-message">
          <h3>Success!</h3>
          <p>Your practice materials have been submitted successfully.</p>
          <button className="btn btn-success" onClick={() => setSubmitSuccess(false)}>
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {submitError && (
            <div className="error-message">
              <h3>Error!</h3>
              <p>{submitError}</p>
            </div>
          )}

          <div className="form-card">
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} required>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>

            <div className="tabs-container">
              <div className="tabs">
                <button
                  type="button"
                  className={activeTab === "listening" ? "active" : ""}
                  onClick={() => setActiveTab("listening")}
                >
                  Listening
                </button>
                <button
                  type="button"
                  className={activeTab === "reading" ? "active" : ""}
                  onClick={() => setActiveTab("reading")}
                >
                  Reading
                </button>
                <button
                  type="button"
                  className={activeTab === "writing" ? "active" : ""}
                  onClick={() => setActiveTab("writing")}
                >
                  Writing
                </button>
                <button
                  type="button"
                  className={activeTab === "speaking" ? "active" : ""}
                  onClick={() => setActiveTab("speaking")}
                >
                  Speaking
                </button>
              </div>

              <div className="tab-content">
                {/* Listening Section */}
                <div className={`tab-pane ${activeTab === "listening" ? "active" : ""}`}>
                  <ListeningSection
                    listeningParts={listeningParts}
                    setListeningParts={setListeningParts}
                    maxParts={MAX_LISTENING_PARTS}
                  />
                </div>

                {/* Reading Section */}
                <div className={`tab-pane ${activeTab === "reading" ? "active" : ""}`}>
                  <ReadingSection
                    readingParts={readingParts}
                    setReadingParts={setReadingParts}
                    maxParts={MAX_READING_PARTS}
                  />
                </div>

                {/* Writing Section */}
                <div className={`tab-pane ${activeTab === "writing" ? "active" : ""}`}>
                  <WritingSection
                    writingTasks={writingTasks}
                    setWritingTasks={setWritingTasks}
                    maxParts={MAX_WRITING_PARTS}
                  />
                </div>

                {/* Speaking Section */}
                <div className={`tab-pane ${activeTab === "speaking" ? "active" : ""}`}>
                  <SpeakingSection
                    speakingTasks={speakingTasks}
                    setSpeakingTasks={setSpeakingTasks}
                    maxParts={MAX_SPEAKING_PARTS}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Practice Material"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default PracticeMaterialFormWeb2;