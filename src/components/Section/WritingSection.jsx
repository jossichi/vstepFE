function WritingSection({ writingTasks, setWritingTasks, maxParts }) {
  const addWritingTask = () => {
    if (writingTasks.length < maxParts) {
      setWritingTasks([
        ...writingTasks,
        {
          part: `W_TASK${writingTasks.length + 1}`,
          prompt: "",
        },
      ])
    }
  }

  const updateWritingTask = (index, field, value) => {
    const updatedTasks = [...writingTasks]
    updatedTasks[index] = { ...updatedTasks[index], [field]: value }
    setWritingTasks(updatedTasks)
  }

  const removeWritingTask = (index) => {
    setWritingTasks(writingTasks.filter((_, i) => i !== index))
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
        <h3>Writing Tasks</h3>
        <button 
          type="button" 
          className="btn btn-outline" 
          onClick={addWritingTask}
          disabled={writingTasks.length >= maxParts}
        >
          + Add Task
        </button>
      </div>

      {writingTasks.length === 0 ? (
        <div className="empty-state">
          <p>No writing tasks added yet. Click "Add Task" to begin.</p>
        </div>
      ) : (
        <div className="accordion">
          {writingTasks.map((task, taskIndex) => (
            <div key={taskIndex} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleAccordion(`writing-task-${taskIndex}`)}>
                <span>
                  Task {taskIndex + 1}: {task.part}
                </span>
              </div>
              <div id={`writing-task-${taskIndex}`} className="accordion-content">
                <div className="form-group">
                  <label>Task ID</label>
                  <input
                    type="text"
                    value={task.part}
                    onChange={(e) => updateWritingTask(taskIndex, "part", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Writing Prompt</label>
                  <textarea
                    value={task.prompt}
                    onChange={(e) => updateWritingTask(taskIndex, "prompt", e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => removeWritingTask(taskIndex)}>
                    Remove Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WritingSection