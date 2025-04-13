import { useEffect, useState } from "react";
import { testService } from "../services/testService";
import TestTable from "../components/TestTable";
import { useNavigate } from "react-router-dom";
import "../assets/styles/TestList.scss";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await testService.getAllTests();
      setTests(data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      await testService.deleteTest(id);
      fetchTests();
    }
  };

  return (
    <div className="testListContainer">
      <h2>Test Management</h2>
      <button className="addTestButton" onClick={() => navigate("/tests/new")}>
        Add New Test
      </button>

      <div className="testTableContainer">
        <TestTable tests={tests} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TestList;
