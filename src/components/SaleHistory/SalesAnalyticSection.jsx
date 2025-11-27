// import { useState } from "react";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { IoPricetagOutline } from "react-icons/io5";
// import { CiShop } from "react-icons/ci";
// import { FaChartLine } from "react-icons/fa6";
// import { BsBarChartFill } from "react-icons/bs";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesAnalyticSection = () => {
//   const [chartType, setChartType] = useState("Line");
//   const [metric, setMetric] = useState("sales");
//   const [timeframe, setTimeframe] = useState("Daily");

//   const dataMap = {
//     Daily: {
//       labels: ["July-24","July-25","July-26","July-27","July-28","July-29","July-30","July-31","Aug-1","Aug-2","Aug-3","Aug-4"],
//       datasets: [
//         { label: "Dataset 1", data: [50,15,18,25,77,10,75,95,58,67,69,42], borderColor: "#Ff928A", backgroundColor: "#Ff928A", tension: 0 },
//         { label: "Dataset 2", data: [80,40,65,80,49,60,45,23,85,87,86,18], borderColor: "#8979ff", backgroundColor: "#8979ff", tension: 0 },
//         { label: "Dataset 3", data: [78,82,98,79,33,55,67,72,61,70,68,99], borderColor: "#3cc3df", backgroundColor: "#3cc3df", tension: 0 },
//       ],
//     },
//     Weekly: {
//       labels: ["Week 1","Week 2","Week 3","Week 4"],
//       datasets: [
//         { label: "Dataset 1", data: [150,200,180,220], borderColor: "#Ff928A", backgroundColor: "#Ff928A", tension: 0 },
//         { label: "Dataset 2", data: [180,160,200,170], borderColor: "#8979ff", backgroundColor: "#8979ff", tension: 0 },
//         { label: "Dataset 3", data: [130,180,150,200], borderColor: "#3cc3df", backgroundColor: "#3cc3df", tension: 0 },
//       ],
//     },
//     Monthly: {
//       labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
//       datasets: [
//         { label: "Dataset 1", data: [500,600,550,700,650,600,750,800], borderColor: "#Ff928A", backgroundColor: "#Ff928A", tension: 0 },
//         { label: "Dataset 2", data: [450,550,500,600,580,590,620,650], borderColor: "#8979ff", backgroundColor: "#8979ff", tension: 0 },
//         { label: "Dataset 3", data: [400,500,450,580,600,620,650,700], borderColor: "#3cc3df", backgroundColor: "#3cc3df", tension: 0 },
//       ],
//     },
//   };

//   const options = {
//     maintainAspectRatio: false,
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <section className="mb-10">
//       <div className="flex flex-wrap justify-between items-center mb-3">
//         <p className="text-xl font-medium">Sales Analytics</p>
//         <div className="flex gap-3 items-center">
//           <div className="flex bg-[#dfc2fe] rounded-full">
//             {[
//               { type: "Line", label: "Line", icon: <FaChartLine className="w-4 h-4" /> },
//               { type: "Bar", label: "Bar", icon: <BsBarChartFill className="w-4 h-4" /> },
//             ].map((btn) => (
//               <button
//                 key={btn.type}
//                 onClick={() => setChartType(btn.type)}
//                 className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
//                   chartType === btn.type ? "bg-white text-black" : "text-black"
//                 }`}
//               >
//                 {btn.icon}
//                 {btn.label}
//               </button>
//             ))}
//           </div>

//           <div className="flex bg-[#dfc2fe] rounded-full">
//             {["sales", "quantity"].map((m) => (
//               <button
//                 key={m}
//                 onClick={() => setMetric(m)}
//                 className={`px-2 py-1 text-xs font-medium rounded-full ${
//                   metric === m ? "bg-white text-black" : "text-black"
//                 }`}
//               >
//                 {m.charAt(0).toUpperCase() + m.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="flex bg-[#dfc2fe] rounded-full">
//             {["Daily", "Weekly", "Monthly"].map((option) => (
//               <button
//                 key={option}
//                 onClick={() => setTimeframe(option)}
//                 className={`px-2 py-1 text-xs font-medium rounded-full transition ${
//                   timeframe === option ? "bg-white text-black shadow" : "text-black"
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-2 mb-5">
//         <IoPricetagOutline className="text-2xl" />
//         <select className="text-xs border-gray-300 rounded-[10px] w-40 h-10 shadow-[2px_6px_4px_0px_rgba(128,128,128,0.5)]">
//           <option>All Categories</option>
//           <option>Food</option>
//           <option>Drink</option>
//           <option>Raw</option>
//         </select>

//         <CiShop className="text-2xl" />
//         <select className="text-xs border-gray-300 rounded-[10px] w-40 h-10 shadow-[2px_6px_4px_0px_rgba(128,128,128,0.5)]">
//           <option>All Shops</option>
//           <option>Food</option>
//           <option>Drink</option>
//           <option>Raw</option>
//         </select>
//       </div>

//       <div className="h-[400px] w-full  bg-white py-8 px-4">
//         {chartType === "Line" ? (
//           <Line data={dataMap[timeframe]} options={options} />
//         ) : (
//           <Bar data={dataMap[timeframe]} options={options} />
//         )}
//       </div>
//     </section>
//   );
// };

// export default SalesAnalyticSection;



// import { useState } from "react";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { IoPricetagOutline } from "react-icons/io5";
// import { CiShop } from "react-icons/ci";
// import { FaChartLine } from "react-icons/fa6";
// import { BsBarChartFill } from "react-icons/bs";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesAnalyticSection = () => {
//   const [chartType, setChartType] = useState("Line");
//   const [metric, setMetric] = useState("Sales"); // Sales or Quantity
//   const [timeframe, setTimeframe] = useState("Daily");

//   // Generate random data
//   const generateData = (length, max = 100) =>
//     Array.from({ length }, () => Math.floor(Math.random() * max));

//   const colors = {
//     Sales: { borderColor: "#Ff928A", backgroundColor: "#Ff928A" },
//     Quantity: { borderColor: "#3cc3df", backgroundColor: "#3cc3df" },
//   };

//   // Chart labels
//   const labelsMap = {
//     Daily: Array.from({ length: 24 }, (_, i) => `${i}:00`),
//     Weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     Monthly: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
//   };

//   const chartData = {
//     labels: labelsMap[timeframe],
//     datasets: [
//       {
//         label: metric,
//         data: generateData(labelsMap[timeframe].length, metric === "Sales" ? 500 : 200),
//         ...colors[metric],
//         tension: 0,
//       },
//     ],
//   };

//   const options = {
//     maintainAspectRatio: false,
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//   };

//   return (
//     <section className="mb-10">
//       {/* Header */}
//       <div className="flex flex-wrap justify-between items-center mb-3">
//         <p className="text-xl font-medium">Sales Analytics</p>
//         <div className="flex gap-3 items-center">
//           {/* Chart Type */}
//           <div className="flex bg-[#dfc2fe] rounded-full">
//             {[{ type: "Line", label: "Line", icon: <FaChartLine className="w-4 h-4" /> },
//               { type: "Bar", label: "Bar", icon: <BsBarChartFill className="w-4 h-4" /> }].map(btn => (
//               <button
//                 key={btn.type}
//                 onClick={() => setChartType(btn.type)}
//                 className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
//                   chartType === btn.type ? "bg-white text-black" : "text-black"
//                 }`}
//               >
//                 {btn.icon} {btn.label}
//               </button>
//             ))}
//           </div>

//           {/* Metric Selector */}
//           <div className="flex bg-[#dfc2fe] rounded-full">
//             {["Sales", "Quantity"].map(m => (
//               <button
//                 key={m}
//                 onClick={() => setMetric(m)}
//                 className={`px-2 py-1 text-xs font-medium rounded-full ${
//                   metric === m ? "bg-white text-black" : "text-black"
//                 }`}
//               >
//                 {m}
//               </button>
//             ))}
//           </div>

//           {/* Timeframe Selector */}
//           <div className="flex bg-[#dfc2fe] rounded-full">
//             {["Daily", "Weekly", "Monthly"].map(option => (
//               <button
//                 key={option}
//                 onClick={() => setTimeframe(option)}
//                 className={`px-2 py-1 text-xs font-medium rounded-full transition ${
//                   timeframe === option ? "bg-white text-black shadow" : "text-black"
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex items-center gap-2 mb-5">
//         <IoPricetagOutline className="text-2xl" />
//         <select className="text-xs border-gray-300 rounded-[10px] w-40 h-10 shadow-[2px_6px_4px_0px_rgba(128,128,128,0.5)]">
//           <option>All Categories</option>
//           <option>Food</option>
//           <option>Drink</option>
//           <option>Raw</option>
//         </select>

//         <CiShop className="text-2xl" />
//         <select className="text-xs border-gray-300 rounded-[10px] w-40 h-10 shadow-[2px_6px_4px_0px_rgba(128,128,128,0.5)]">
//           <option>All Shops</option>
//           <option>Food</option>
//           <option>Drink</option>
//           <option>Raw</option>
//         </select>
//       </div>

//       {/* Chart */}
//       <div className="h-[400px] w-full bg-white py-8 px-4">
//         {chartType === "Line" ? (
//           <Line data={chartData} options={options} />
//         ) : (
//           <Bar data={chartData} options={options} />
//         )}
//       </div>
//     </section>
//   );
// };

// export default SalesAnalyticSection;

import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IoPricetagOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { FaChartLine } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesAnalyticSection = () => {
  const [chartType, setChartType] = useState("Line");
  const [metric, setMetric] = useState("Sales"); // Sales or Quantity
  const [timeframe, setTimeframe] = useState("Daily");

  // Initialize data for each timeframe
  const initialData = {
    Daily: Array.from({ length: 24 }, () => 0),
    Weekly: Array.from({ length: 7 }, () => 0),
    Monthly: Array.from({ length: 12 }, () => 0),
  };

  const [chartValues, setChartValues] = useState({ ...initialData });

  const colors = {
    Sales: { borderColor: "#Ff928A", backgroundColor: "#Ff928A" },
    Quantity: { borderColor: "#3cc3df", backgroundColor: "#3cc3df" },
  };

  const labelsMap = {
    Daily: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    Weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    Monthly: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  };

  // Chart data based on current metric/timeframe
  const chartData = {
    labels: labelsMap[timeframe],
    datasets: [
      {
        label: metric,
        data: chartValues[timeframe],
        ...colors[metric],
        tension: 0,
      },
    ],
  };

  // Handle input change in table
  const handleInputChange = (index, value) => {
    setChartValues(prev => {
      const updated = [...prev[timeframe]];
      updated[index] = Number(value);
      return { ...prev, [timeframe]: updated };
    });
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-3">
        <p className="text-xl font-medium">Sales Analytics</p>
        <div className="flex gap-3 items-center">
          {/* Chart Type */}
          <div className="flex bg-[#dfc2fe] rounded-full">
            {[{ type: "Line", label: "Line", icon: <FaChartLine className="w-4 h-4" /> },
              { type: "Bar", label: "Bar", icon: <BsBarChartFill className="w-4 h-4" /> }].map(btn => (
              <button
                key={btn.type}
                onClick={() => setChartType(btn.type)}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                  chartType === btn.type ? "bg-white text-black" : "text-black"
                }`}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <div className="flex bg-[#dfc2fe] rounded-full">
            {["Sales", "Quantity"].map(m => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  metric === m ? "bg-white text-black" : "text-black"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-[#dfc2fe] rounded-full">
            {["Daily", "Weekly", "Monthly"].map(option => (
              <button
                key={option}
                onClick={() => setTimeframe(option)}
                className={`px-2 py-1 text-xs font-medium rounded-full transition ${
                  timeframe === option ? "bg-white text-black shadow" : "text-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-5">
        <IoPricetagOutline className="text-2xl" />
        <select className="text-xs border-gray-300 rounded-[10px] w-40 h-10 shadow-[2px_6px_4px_0px_rgba(128,128,128,0.5)]">
          <option>All Categories</option>
          <option>Food</option>
          <option>Drink</option>
          <option>Raw</option>
        </select>

        <CiShop className="text-2xl" />
        <select className="text-xs border-gray-300 rounded-[10px] w-40 h-10 shadow-[2px_6px_4px_0px_rgba(128,128,128,0.5)]">
          <option>All Shops</option>
          <option>Food</option>
          <option>Drink</option>
          <option>Raw</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto mb-5">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {labelsMap[timeframe].map((label, i) => (
                <th key={i} className="border px-2 py-1 text-xs">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {chartValues[timeframe].map((value, i) => (
                <td key={i} className="border px-2 py-1">
                  <input
                    type="number"
                    className="w-full text-xs border rounded px-1 py-0.5"
                    value={value}
                    onChange={e => handleInputChange(i, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full bg-white py-8 px-4">
        {chartType === "Line" ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </section>
  );
};

export default SalesAnalyticSection;




