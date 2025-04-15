import React, { useEffect, useState } from "react";
import { testService, userTestService } from "../services/testService";
import ReadingTest from "../components/loadingTest/ReadingExam";
import ListeningTest from "../components/loadingTest/ListeningExam";
import Swal from "sweetalert2";
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
  // const handleSubmit = async () => {
  //   try {
  //     const user_id = localStorage.getItem("user_id"); // Lấy user_id từ LocalStorage
  //     if (!user_id) {
  //       throw new Error("User ID không tồn tại. Vui lòng đăng nhập lại.");
  //     }
  //     const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
  //     if (!token) {
  //       throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  //     }
  //     const submission_time = new Date().toISOString();

  //     const formattedAnswers = Object.entries(userAnswers).map(
  //       ([question_id, user_answer]) => ({
  //         question_id,
  //         user_answer,
  //       })
  //     );
  //     console.log("Payload gửi lên server:", {
  //       user_id,
  //       test_id: selectedTest.test_id,
  //       user_answers: formattedAnswers,
  //       submission_time,
  //       post_test_actions: ["practice"], // Hoặc hành động khác
  //       token: token,
  //     });
  //     const response = await userTestService.evaluateTest({
  //       user_id,
  //       test_id: selectedTest.test_id,
  //       user_answers: formattedAnswers,
  //       submission_time,
  //       post_test_actions: ["practice"], // Hoặc hành động khác
  //       token: token,
  //     });
  //     console.log("Payload gửi lên server:", {
  //       user_id,
  //       test_id: selectedTest.test_id,
  //       user_answers: formattedAnswers,
  //       submission_time,
  //       post_test_actions: ["practice"], // Hoặc hành động khác
  //       token: token,
  //     });

  //     Swal.fire({
  //       title: "🎉 Kết quả bài thi",
  //       html: `
  //       <p><strong>Điểm:</strong> ${response.avg_score.toFixed(2)} / 10</p>
  //       <p><strong>Trình độ mới:</strong> ${response.new_level}</p>
  //     `,
  //       icon: "success",
  //       confirmButtonText: "Tiếp tục",
  //     });
  //   } catch (err) {
  //     console.error("Lỗi gửi bài:", err);
  //     Swal.fire({
  //       title: "Lỗi",
  //       text: err.message || "Không thể gửi bài",
  //       icon: "error",
  //     });
  //   }
  // };
  const handleSubmit = async () => {
    try {
      const user_id = localStorage.getItem("user_id"); // Lấy user_id từ LocalStorage
      if (!user_id) {
        throw new Error("User ID không tồn tại. Vui lòng đăng nhập lại.");
      }
      const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
      if (!token) {
        throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
      }
      const submission_time = new Date().toISOString();

      const formattedAnswers = Object.entries(userAnswers).map(
        ([question_id, user_answer]) => ({
          question_id,
          user_answer,
        })
      );

      // Gửi yêu cầu lên server để chấm điểm
      const response = await userTestService.evaluateTest({
        user_id,
        test_id: selectedTest.test_id,
        user_answers: formattedAnswers,
        submission_time,
        post_test_actions: ["practice"], // Hoặc hành động khác
        token: token,
      });

      // Hiển thị SweetAlert với thông tin từ phản hồi
      Swal.fire({
        title: "🎉 Kết quả bài thi",
        html: `
      
        <p><strong>Điểm trung bình:</strong> ${response.avg_score} / 10</p>
        <p><strong>Trình độ bạn sẽ ôn tập:</strong> ${response.new_level}</p>
      `,
        icon: "success",
        confirmButtonText: "Tiếp tục",
      });
    } catch (err) {
      console.error("Lỗi gửi bài:", err);
      Swal.fire({
        title: "Lỗi",
        text: err.message || "Không thể gửi bài",
        icon: "error",
      });
    }
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
