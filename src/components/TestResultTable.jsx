import PropTypes from "prop-types";

const TestResultTable = ({ tests, onViewDetail }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Test ID</th>
          <th className="border p-2">Total Score</th>
          <th className="border p-2">Level</th>
          <th className="border p-2">Submission Time</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((test) => (
          <tr key={test.test_id} className="text-center">
            <td className="border p-2">{test.test_id}</td>
            <td className="border p-2">{test.total_score}</td>
            <td className="border p-2">{test.new_level}</td>
            <td className="border p-2">
              {new Date(test.submission_time).toLocaleString()}
            </td>
            <td className="border p-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => onViewDetail(test.user_id)}>
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TestResultTable.propTypes = {
  tests: PropTypes.array.isRequired,
  onViewDetail: PropTypes.func.isRequired,
};

export default TestResultTable;
