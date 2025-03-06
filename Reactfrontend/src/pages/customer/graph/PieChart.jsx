import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// PieChart component accepting dynamic props
const PieChart = ({ purchases, revenue, refunds }) => {
  // Data for the pie chart, using props or fallback to 0
  const data = {
    labels: ["Purchases", "Revenue", "Refunds"],
    datasets: [
      {
        data: [purchases || 0, revenue || 0, refunds || 0],
        backgroundColor: ["#3B82F6", "#10B981", "#EF4444"], // Blue, Green, Red
        borderColor: ["#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  // Chart options for better UI
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows better resizing
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif", // Modern font, ensure it's available
          },
          color: "#374151", // Gray-700 for readability
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="w-full h-80">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;