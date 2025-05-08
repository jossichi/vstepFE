import React from "react";

function SpeakingSection({ speakingTasks, setSpeakingTasks, maxParts }) {
  const addSpeakingTask = () => {
    if (speakingTasks.length < maxParts) {
      setSpeakingTasks([
        ...speakingTasks,
        {
          part: `S_TASK${speakingTasks.length + 1}`, // Giữ nguyên part dưới dạng chuỗi
          prompt: "",
          sample_answer: "",
        },
      ]);
    }
  };

  const updateSpeakingTask = (index, field, value) => {
    const updatedTasks = [...speakingTasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setSpeakingTasks(updatedTasks);
  };

  // Khôi phục chức năng xóa phần
  const removeSpeakingTask = (index) => {
    setSpeakingTasks(speakingTasks.filter((_, i) => i !== index));
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
        <h3>Speaking Tasks</h3>
        <button
          type="button"
          className="btn btn-outline"
          onClick={addSpeakingTask}
          disabled={speakingTasks.length >= maxParts}
        >
          + Add Task
        </button>
      </div>

      {speakingTasks.length === 0 ? (
        <div className="empty-state">
          <p>No speaking tasks added yet. Click "Add Task" to begin.</p>
        </div>
      ) : (
        <div className="accordion">
          {speakingTasks.map((task, taskIndex) => (
            <div key={taskIndex} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(`speaking-task-${taskIndex}`)}
              >
                <span>
                  Task {taskIndex + 1}: {task.part}
                </span>
              </div>
              <div id={`speaking-task-${taskIndex}`} className="accordion-content">
                <div className="form-group">
                  <label>Task ID</label>
                  <input
                    type="text" // Đổi lại thành text, cho phép chỉnh sửa
                    value={task.part}
                    onChange={(e) => updateSpeakingTask(taskIndex, "part", e.target.value)}
                    style={{ marginBottom: "15px" }}
                  />
                </div>

                <div className="form-group">
                  <label>Speaking Prompt</label>
                  <textarea
                    value={task.prompt}
                    onChange={(e) => updateSpeakingTask(taskIndex, "prompt", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label>Sample Answer</label>
                  <textarea
                    value={task.sample_answer}
                    onChange={(e) => updateSpeakingTask(taskIndex, "sample_answer", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => removeSpeakingTask(taskIndex)}
                  >
                    Remove Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpeakingSection;