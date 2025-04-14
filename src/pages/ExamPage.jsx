import React, { useEffect, useState } from "react";
import { testService } from "../services/testService";
import ReadingTest from "../components/loadingTest/ReadingExam";
import ListeningTest from "../components/loadingTest/ListeningExam";

const ExamPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSelectTest = async () => {
      try {
        const result = await testService.getAllTests();

        const tests = result.tests || result; // fallback nếu response không có `tests` field

        const validTests = tests.filter((test) => {
          if (test.test_type === "reading") {
            return (
              test.passages &&
              test.passages.reduce((sum, p) => sum + p.questions.length, 0) >=
                10
            );
          } else if (test.test_type === "listening") {
            return test.questions && test.questions.length >= 10;
          }
          return false;
        });

        if (validTests.length === 0) throw new Error("Không có đề phù hợp");

        const randomTest =
          validTests[Math.floor(Math.random() * validTests.length)];

        setSelectedTest(randomTest);
      } catch (err) {
        console.error("Lỗi lấy test:", err);
        setError(err.message || "Lỗi tải đề thi");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSelectTest();
  }, []);

  const handleSubmit = () => {
    console.log("Đáp án:", userAnswers);
    alert("Đã nộp bài!");
  };

  if (loading) return <p className="text-center">Đang tải đề...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!selectedTest)
    return <p className="text-center">Không có đề để hiển thị.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Đề Thi Ngẫu Nhiên</h1>
      <h2 className="text-lg text-center text-gray-600 mb-6">
        Đang thi phần:{" "}
        <span className="font-semibold text-blue-600">
          {selectedTest.test_type === "reading" ? "Bài Đọc" : "Bài Nghe"}
        </span>
      </h2>
      {selectedTest.test_type === "reading" ? (
        <ReadingTest
          data={selectedTest}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
      ) : (
        <ListeningTest
          data={selectedTest}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
      )}

      <div className="text-center mt-8">
        <button onClick={handleSubmit} className="submit-button">
          Nộp bài
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
