import React, { useState } from "react";
import "../../assets/styles/PracticeMaterialFormWeb2.css";
import ListeningSection from "../Section/ListeningSection";
import ReadingSection from "../Section/ReadingSection";
import WritingSection from "../Section/WritingSection";
import SpeakingSection from "../Section/SpeakingSection";

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

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const materialData = {
      level,
      listening: listeningParts,
      reading: readingParts,
      writing: writingTasks,
      speaking: speakingTasks,
      visibility: "public",
      signature: "",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      attempt_count: 0,
    };

    try {
      const response = await fetch("http://localhost:10000/api/practice-materials/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(materialData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
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