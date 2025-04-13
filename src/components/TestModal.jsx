import { useState, useEffect } from "react";
import "../assets/styles/TestModal.scss";
const TestModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [test, setTest] = useState({
    test_id: "",
    test_type: "",
    level: "",
  });

  useEffect(() => {
    if (initialData) {
      setTest(initialData);
    } else {
      setTest({ test_id: "", test_type: "", level: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(test);
  };

  if (!isOpen) return null;

  return (
    <div className="testModal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modalContent bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Test" : "Add Test"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="test_id"
            placeholder="Test ID"
            value={test.test_id}
            onChange={handleChange}
            className="p-2 border rounded"
            required
            disabled={!!initialData} // Không cho phép chỉnh sửa test_id khi edit
          />
          <select
            name="test_type"
            value={test.test_type}
            onChange={handleChange}
            className="p-2 border rounded"
            required>
            <option value="">Select Type</option>
            <option value="listening">Listening</option>
            <option value="reading">Reading</option>
          </select>
          <select
            name="level"
            value={test.level}
            onChange={handleChange}
            className="p-2 border rounded"
            required>
            <option value="">Select Level</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
          <div className="buttonGroup flex justify-end space-x-2">
            <button
              type="button"
              className="cancelButton bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="saveButton bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestModal;
