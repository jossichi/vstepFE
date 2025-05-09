import { useState } from 'react';

export default function PracticeMaterialFormWeb3() {
  const initialFormState = {
    user_id: '',
    materialData: {
      material_id: '',
      level: 'B1',
      listening: [
        {
          part: 'L_PART1',
          audio_file: '',
          questions: [
            {
              question_id: '',
              question_text: '',
              options: ['', '', '', ''],
              correct_answer: ''
            }
          ]
        }
      ],
      reading: [
        {
          part: 'R_PART1',
          text: '',
          questions: [
            {
              question_id: '',
              question_text: '',
              options: ['', '', '', ''],
              correct_answer: ''
            }
          ]
        }
      ],
      writing: [
        {
          part: 'W_TASK1',
          prompt: ''
        }
      ],
      speaking: [
        {
          part: 'S_TASK1',
          prompt: ''
        }
      ],
      visibility: 'public',
      signature: '',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      attempt_count: 0
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Handle basic field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle changes for nested listening questions
  const handleListeningChange = (partIndex, questionIndex, field, value) => {
    const updatedListening = [...formData.materialData.listening];
    
    if (field === 'question_text' || field === 'question_id' || field === 'correct_answer') {
      updatedListening[partIndex].questions[questionIndex][field] = value;
    } else if (field.startsWith('option_')) {
      const optionIndex = parseInt(field.split('_')[1]);
      updatedListening[partIndex].questions[questionIndex].options[optionIndex] = value;
    } else if (field === 'audio_file') {
      updatedListening[partIndex].audio_file = value;
    } else if (field === 'part') {
      updatedListening[partIndex].part = value;
    }
    
    setFormData({
      ...formData,
      materialData: {
        ...formData.materialData,
        listening: updatedListening
      }
    });
  };

  // Handle changes for nested reading questions
  const handleReadingChange = (partIndex, questionIndex, field, value) => {
    const updatedReading = [...formData.materialData.reading];
    
    if (field === 'question_text' || field === 'question_id' || field === 'correct_answer') {
      updatedReading[partIndex].questions[questionIndex][field] = value;
    } else if (field.startsWith('option_')) {
      const optionIndex = parseInt(field.split('_')[1]);
      updatedReading[partIndex].questions[questionIndex].options[optionIndex] = value;
    } else if (field === 'text') {
      updatedReading[partIndex].text = value;
    } else if (field === 'part') {
      updatedReading[partIndex].part = value;
    }
    
    setFormData({
      ...formData,
      materialData: {
        ...formData.materialData,
        reading: updatedReading
      }
    });
  };

  // Handle changes for writing tasks
  const handleWritingChange = (index, field, value) => {
    const updatedWriting = [...formData.materialData.writing];
    
    if (field === 'prompt') {
      updatedWriting[index].prompt = value;
    } else if (field === 'part') {
      updatedWriting[index].part = value;
    }
    
    setFormData({
      ...formData,
      materialData: {
        ...formData.materialData,
        writing: updatedWriting
      }
    });
  };

  // Handle changes for speaking tasks
  const handleSpeakingChange = (index, field, value) => {
    const updatedSpeaking = [...formData.materialData.speaking];
    
    if (field === 'prompt') {
      updatedSpeaking[index].prompt = value;
    } else if (field === 'part') {
      updatedSpeaking[index].part = value;
    }
    
    setFormData({
      ...formData,
      materialData: {
        ...formData.materialData,
        speaking: updatedSpeaking
      }
    });
  };

  // Add questions
  const addQuestion = (section, partIndex) => {
    const updatedSection = [...formData.materialData[section]];
    const newQuestion = {
      question_id: '',
      question_text: '',
      options: ['', '', '', ''],
      correct_answer: ''
    };
    
    updatedSection[partIndex].questions.push(newQuestion);
    
    setFormData({
      ...formData,
      materialData: {
        ...formData.materialData,
        [section]: updatedSection
      }
    });
  };

  // Add part
  const addPart = (section) => {
    const updatedSection = [...formData.materialData[section]];
    
    let newPart = {};
    if (section === 'listening') {
      newPart = {
        part: `L_PART${updatedSection.length + 1}`,
        audio_file: '',
        questions: [
          {
            question_id: '',
            question_text: '',
            options: ['', '', '', ''],
            correct_answer: ''
          }
        ]
      };
    } else if (section === 'reading') {
      newPart = {
        part: `R_PART${updatedSection.length + 1}`,
        text: '',
        questions: [
          {
            question_id: '',
            question_text: '',
            options: ['', '', '', ''],
            correct_answer: ''
          }
        ]
      };
    } else if (section === 'writing') {
      newPart = {
        part: `W_TASK${updatedSection.length + 1}`,
        prompt: ''
      };
    } else if (section === 'speaking') {
      newPart = {
        part: `S_TASK${updatedSection.length + 1}`,
        prompt: ''
      };
    }
    
    updatedSection.push(newPart);
    
    setFormData({
      ...formData,
      materialData: {
        ...formData.materialData,
        [section]: updatedSection
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:10000/api/practice-materials/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setMessage('Practice material submitted successfully!');
        setMessageType('success');
        setFormData(initialFormState);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to submit material'}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Practice Material Form Web3</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('basic')}
          className={`py-2 px-4 ${activeTab === 'basic' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Basic Info
        </button>
        <button 
          onClick={() => setActiveTab('listening')}
          className={`py-2 px-4 ${activeTab === 'listening' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Listening
        </button>
        <button 
          onClick={() => setActiveTab('reading')}
          className={`py-2 px-4 ${activeTab === 'reading' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Reading
        </button>
        <button 
          onClick={() => setActiveTab('writing')}
          className={`py-2 px-4 ${activeTab === 'writing' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Writing
        </button>
        <button 
          onClick={() => setActiveTab('speaking')}
          className={`py-2 px-4 ${activeTab === 'speaking' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Speaking
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`py-2 px-4 ${activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Preview
        </button>
      </div>
      
      {/* Tab Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material ID
              </label>
              <input
                type="text"
                name="materialData.material_id"
                value={formData.materialData.material_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                name="materialData.level"
                value={formData.materialData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <select
                name="materialData.visibility"
                value={formData.materialData.visibility}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="materialData.status"
                value={formData.materialData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature
              </label>
              <input
                type="text"
                name="materialData.signature"
                value={formData.materialData.signature}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        
        {/* Listening Tab */}
        {activeTab === 'listening' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Listening Sections</h2>
            {formData.materialData.listening.map((part, partIndex) => (
              <div key={partIndex} className="mb-6 p-4 border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Part Name
                    </label>
                    <input
                      type="text"
                      value={part.part}
                      onChange={(e) => handleListeningChange(partIndex, null, 'part', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Audio File URL
                    </label>
                    <input
                      type="text"
                      value={part.audio_file}
                      onChange={(e) => handleListeningChange(partIndex, null, 'audio_file', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <h3 className="text-md font-medium mb-2">Questions</h3>
                {part.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4 p-4 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question ID
                        </label>
                        <input
                          type="text"
                          value={question.question_id}
                          onChange={(e) => handleListeningChange(partIndex, questionIndex, 'question_id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question Text
                        </label>
                        <input
                          type="text"
                          value={question.question_text}
                          onChange={(e) => handleListeningChange(partIndex, questionIndex, 'question_text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options
                        </label>
                        {question.options.map((option, optionIndex) => (
                          <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleListeningChange(partIndex, questionIndex, `option_${optionIndex}`, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        ))}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correct Answer
                        </label>
                        <input
                          type="text"
                          value={question.correct_answer}
                          onChange={(e) => handleListeningChange(partIndex, questionIndex, 'correct_answer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addQuestion('listening', partIndex)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPart('listening')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Listening Part
            </button>
          </div>
        )}
        
        {/* Reading Tab */}
        {activeTab === 'reading' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Reading Sections</h2>
            {formData.materialData.reading.map((part, partIndex) => (
              <div key={partIndex} className="mb-6 p-4 border rounded-md">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Part Name
                    </label>
                    <input
                      type="text"
                      value={part.part}
                      onChange={(e) => handleReadingChange(partIndex, null, 'part', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reading Text
                    </label>
                    <textarea
                      value={part.text}
                      onChange={(e) => handleReadingChange(partIndex, null, 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="6"
                    />
                  </div>
                </div>
                
                <h3 className="text-md font-medium mb-2">Questions</h3>
                {part.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4 p-4 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question ID
                        </label>
                        <input
                          type="text"
                          value={question.question_id}
                          onChange={(e) => handleReadingChange(partIndex, questionIndex, 'question_id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question Text
                        </label>
                        <input
                          type="text"
                          value={question.question_text}
                          onChange={(e) => handleReadingChange(partIndex, questionIndex, 'question_text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options
                        </label>
                        {question.options.map((option, optionIndex) => (
                          <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleReadingChange(partIndex, questionIndex, `option_${optionIndex}`, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        ))}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correct Answer
                        </label>
                        <input
                          type="text"
                          value={question.correct_answer}
                          onChange={(e) => handleReadingChange(partIndex, questionIndex, 'correct_answer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addQuestion('reading', partIndex)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPart('reading')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Reading Part
            </button>
          </div>
        )}
        
        {/* Writing Tab */}
        {activeTab === 'writing' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Writing Tasks</h2>
            {formData.materialData.writing.map((task, index) => (
              <div key={index} className="mb-6 p-4 border rounded-md">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Name
                    </label>
                    <input
                      type="text"
                      value={task.part}
                      onChange={(e) => handleWritingChange(index, 'part', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prompt
                    </label>
                    <textarea
                      value={task.prompt}
                      onChange={(e) => handleWritingChange(index, 'prompt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="6"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPart('writing')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Writing Task
            </button>
          </div>
        )}
        
        {/* Speaking Tab */}
        {activeTab === 'speaking' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Speaking Tasks</h2>
            {formData.materialData.speaking.map((task, index) => (
              <div key={index} className="mb-6 p-4 border rounded-md">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Name
                    </label>
                    <input
                      type="text"
                      value={task.part}
                      onChange={(e) => handleSpeakingChange(index, 'part', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prompt
                    </label>
                    <textarea
                      value={task.prompt}
                      onChange={(e) => handleSpeakingChange(index, 'prompt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="6"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPart('speaking')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Speaking Task
            </button>
          </div>
        )}
        
        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Submit Button */}
        <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit Practice Material'}
          </button>
        </div>
      </form>
    </div>
  );
}