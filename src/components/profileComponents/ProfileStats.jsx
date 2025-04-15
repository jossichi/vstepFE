// 📁 src/components/Profile/ProfileStats.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const ProfileStats = ({ stats }) => {
  const { avg_score, new_level, tests } = stats || {};

  const chartData = (tests || []).map((t, index) => ({
    name: `Test ${index + 1}`,
    score: t.total_score || 0,
    level: t.new_level || "",
  }));

  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">📊 Thống kê</h2>

      <div className="text-gray-700 space-y-1">
        <p>
          🎯 Điểm trung bình:{" "}
          <span className="font-bold text-blue-600">{avg_score ?? "N/A"}</span>
        </p>
        <p>
          🏅 Trình độ hiện tại:{" "}
          <span className="font-bold text-green-600">
            {new_level ?? "Chưa xác định"}
          </span>
        </p>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Chưa có bài kiểm tra nào.
        </p>
      )}
    </div>
  );
};

export default ProfileStats;
