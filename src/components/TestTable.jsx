import "../assets/styles/TestTable.scss";

const TestTable = ({ tests, onDelete, onEdit }) => {
  return (
    <div className="tableWrapper">
      <table className="testTable">
        <thead>
          <tr>
            <th>Test ID</th>
            <th>Type</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.test_id}>
              <td>{test.test_id}</td>
              <td>{test.test_type}</td>
              <td>
                <span
                  className={`level-badge level-${test.level.toLowerCase()}`}>
                  {test.level}
                </span>
              </td>
              <td className="actionColumn">
                <button
                  className="editButton"
                  onClick={() => onEdit(test)} // Thay đổi từ navigate sang onEdit
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="deleteButton"
                  onClick={() => onDelete(test.test_id)}>
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tests.length === 0 && (
        <div className="noTestsMessage">
          <p>No tests found. Click "Add New Test" to create one.</p>
        </div>
      )}
    </div>
  );
};

export default TestTable;
