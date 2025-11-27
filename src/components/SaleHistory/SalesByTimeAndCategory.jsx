// import { useState } from "react";
// import Chart from "react-apexcharts";

// const DashboardCharts = () => {
//   const [selectedWeek, setSelectedWeek] = useState("Last Week");
//   const heatmapData = {
//     "This Week": [
//       { name: "8 AM", data: [600, 700, 1000, 1500, 3000, 2000, 800] },
//       { name: "10 AM", data: [1200, 1400, 1000, 2000, 1800, 900, 600] },
//       { name: "12 PM", data: [23000, 4900, 2800, 3000, 3400, 600, 1200] },
//       { name: "2 PM", data: [1500, 2500, 1800, 3500, 4000, 900, 800] },
//       { name: "4 PM", data: [1000, 2000, 2500, 2200, 1500, 1000, 700] },
//       { name: "6 PM", data: [700, 4100, 10000, 600, 700, 9000, 7000] },
//     ],
//     "Last Week": [
//       { name: "8 AM", data: [550, 600, 700, 15000, 7000, 3000, 4000] },
//       { name: "10 AM", data: [550, 600, 8000, 800, 12000, 3500, 6500] },
//       { name: "12 PM", data: [23000, 4900, 2800, 3000, 3400, 600, 1200] },
//       { name: "2 PM", data: [3900, 8000, 2300, 2000, 700, 1000, 7000] },
//       { name: "4 PM", data: [11000, 2600, 900, 2100, 800, 8500, 1000] },
//       { name: "6 PM", data: [700, 4100, 10000, 600, 700, 9000, 7000] },
//     ],
//   };

//   const heatmapOptions = {
//     chart: {
//       type: "heatmap",
//       toolbar: { show: false },
//     },
//     plotOptions: {
//       heatmap: {
//         enableShades: false,
//         shadeIntensity: 0,
//         colorScale: {
//           ranges: [
//             { from: 501, to: 1000, color: "#d4c7e4", name: "500K>" },
//             { from: 1001, to: 5000, color: "#a88ec9", name: "1000K>" },
//             { from: 5001, to: 100000, color: "#6e43a5", name: "5000K>" },
//           ],
//         },
//       },
//     },
//     dataLabels: { enabled: false },
//     xaxis: {
//       categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     },
//      fill: { type: "solid" }
//   };

//   const donutOptions = {
//     chart: {
//       type: "donut",
//     },
//     labels: [
//       "Drinks/Beverages",
//       "Main Dishes",
//       "Desserts/Sweets",
//       "Signature Dishes",
//       "Soups",
//       "Salads/Mixed Dishes",
//       "Breakfast",
//       "Snacks/Appetizers",
//     ],
//     colors: ["#8a17f6", "#f61717", "#fcb9ec", "#e1f439", "#f617c2", "#2efa3b", "#f67417", "#17bcf6"],
//     legend: {
//     position: "bottom",
//     horizontalAlign: "left",
//     markers: {
//       width: 12,
//       height: 12,
//     },
//     fontSize: "12px",
//     itemMargin: {
//       horizontal: 40,
//       vertical: 5,
      
//     },
//     width: 400, 
//   },
//     dataLabels: { enabled: false },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: "70%",
//         },
//       },
//     },
//   };

//   const donutSeries = [4, 14, 5, 15, 2, 2, 23, 17]; 

//   return (
//     <div className=" grid grid-cols-3 gap-4  ">
//       <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[23px] font-medium">Sales by Time</h2>
//           <select
//             className="border rounded-lg px-3 py-2 text-sm"
//             value={selectedWeek}
//             onChange={(e) => setSelectedWeek(e.target.value)}
//           >
//             <option>This Week</option>
//             <option>Last Week</option>
//           </select>
//         </div>
//         <Chart options={heatmapOptions} series={heatmapData[selectedWeek]} type="heatmap" height={400} />
//       </div>

//       <div className="bg-white p-5 rounded-xl shadow-md">
//         <h2 className="text-[23px] font-medium mb-4">Sales by Category</h2>
//         <Chart options={donutOptions} series={donutSeries} type="donut" height={350} />
//       </div>
//     </div>
//   );
// };

// export default DashboardCharts;

// import { useState } from "react";
// import Chart from "react-apexcharts";

// const DashboardCharts = () => {
//   const [selectedWeek, setSelectedWeek] = useState("Last Week");

//   // Heatmap initial data
//   const initialHeatmap = {
//     "This Week": [
//       { name: "8 AM", data: [600, 700, 1000, 1500, 3000, 2000, 800] },
//       { name: "10 AM", data: [1200, 1400, 1000, 2000, 1800, 900, 600] },
//       { name: "12 PM", data: [23000, 4900, 2800, 3000, 3400, 600, 1200] },
//       { name: "2 PM", data: [1500, 2500, 1800, 3500, 4000, 900, 800] },
//       { name: "4 PM", data: [1000, 2000, 2500, 2200, 1500, 1000, 700] },
//       { name: "6 PM", data: [700, 4100, 10000, 600, 700, 9000, 7000] },
//     ],
//     "Last Week": [
//       { name: "8 AM", data: [550, 600, 700, 15000, 7000, 3000, 4000] },
//       { name: "10 AM", data: [550, 600, 8000, 800, 12000, 3500, 6500] },
//       { name: "12 PM", data: [23000, 4900, 2800, 3000, 3400, 600, 1200] },
//       { name: "2 PM", data: [3900, 8000, 2300, 2000, 700, 1000, 7000] },
//       { name: "4 PM", data: [11000, 2600, 900, 2100, 800, 8500, 1000] },
//       { name: "6 PM", data: [700, 4100, 10000, 600, 700, 9000, 7000] },
//     ],
//   };

//   const [heatmapData, setHeatmapData] = useState(initialHeatmap);

//   // Donut initial data
//   const donutLabels = [
//     "Drinks/Beverages",
//     "Main Dishes",
//     "Desserts/Sweets",
//     "Signature Dishes",
//     "Soups",
//     "Salads/Mixed Dishes",
//     "Breakfast",
//     "Snacks/Appetizers",
//   ];
//   const [donutSeries, setDonutSeries] = useState([4, 14, 5, 15, 2, 2, 23, 17]);

//   // Apex options
//   const heatmapOptions = {
//     chart: { type: "heatmap", toolbar: { show: false } },
//     plotOptions: {
//       heatmap: {
//         enableShades: false,
//         shadeIntensity: 0,
//         colorScale: {
//           ranges: [
//             { from: 501, to: 1000, color: "#d4c7e4", name: "500K>" },
//             { from: 1001, to: 5000, color: "#a88ec9", name: "1000K>" },
//             { from: 5001, to: 100000, color: "#6e43a5", name: "5000K>" },
//           ],
//         },
//       },
//     },
//     dataLabels: { enabled: false },
//     xaxis: { categories: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] },
//     fill: { type: "solid" },
//   };

//   const donutOptions = {
//     chart: { type: "donut" },
//     labels: donutLabels,
//     colors: ["#8a17f6","#f61717","#fcb9ec","#e1f439","#f617c2","#2efa3b","#f67417","#17bcf6"],
//     legend: {
//       position: "bottom",
//       horizontalAlign: "left",
//       markers: { width: 12, height: 12 },
//       fontSize: "12px",
//       itemMargin: { horizontal: 40, vertical: 5 },
//       width: 400,
//     },
//     dataLabels: { enabled: false },
//     plotOptions: { pie: { donut: { size: "70%" } } },
//   };

//   // Handle heatmap input change
//   const handleHeatmapChange = (rowIndex, colIndex, value) => {
//     setHeatmapData(prev => {
//       const updatedWeek = [...prev[selectedWeek]];
//       updatedWeek[rowIndex].data[colIndex] = Number(value);
//       return { ...prev, [selectedWeek]: updatedWeek };
//     });
//   };

//   // Handle donut input change
//   const handleDonutChange = (index, value) => {
//     setDonutSeries(prev => {
//       const updated = [...prev];
//       updated[index] = Number(value);
//       return updated;
//     });
//   };

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {/* Heatmap */}
//       <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[23px] font-medium">Sales by Time</h2>
//           <select
//             className="border rounded-lg px-3 py-2 text-sm"
//             value={selectedWeek}
//             onChange={(e) => setSelectedWeek(e.target.value)}
//           >
//             <option>This Week</option>
//             <option>Last Week</option>
//           </select>
//         </div>

//         {/* Heatmap data table */}
//         <div className="overflow-x-auto mb-4">
//           <table className="min-w-full border border-gray-200 text-xs">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1">Time</th>
//                 {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day, i) => (
//                   <th key={i} className="border px-2 py-1">{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {heatmapData[selectedWeek].map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   <td className="border px-2 py-1 font-medium">{row.name}</td>
//                   {row.data.map((val, colIndex) => (
//                     <td key={colIndex} className="border px-1 py-1">
//                       <input
//                         type="number"
//                         className="w-full text-xs border rounded px-1 py-0.5"
//                         value={val}
//                         onChange={(e) => handleHeatmapChange(rowIndex, colIndex, e.target.value)}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <Chart options={heatmapOptions} series={heatmapData[selectedWeek]} type="heatmap" height={400} />
//       </div>

//       {/* Donut */}
//       <div className="bg-white p-5 rounded-xl shadow-md">
//         <h2 className="text-[23px] font-medium mb-4">Sales by Category</h2>

//         {/* Donut data table */}
//         <div className="overflow-x-auto mb-4">
//           <table className="min-w-full border border-gray-200 text-xs">
//             <thead className="bg-gray-100">
//               <tr>
//                 {donutLabels.map((label, i) => (
//                   <th key={i} className="border px-2 py-1">{label}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 {donutSeries.map((val, i) => (
//                   <td key={i} className="border px-1 py-1">
//                     <input
//                       type="number"
//                       className="w-full text-xs border rounded px-1 py-0.5"
//                       value={val}
//                       onChange={(e) => handleDonutChange(i, e.target.value)}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <Chart options={donutOptions} series={donutSeries} type="donut" height={350} />
//       </div>
//     </div>
//   );
// };

// export default DashboardCharts;

// import { useState } from "react";
// import { Line, Bar } from "react-chartjs-2";
// import Chart from "react-apexcharts";
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

// const Dashboard = () => {
//   /*** SALES ANALYTIC CHART ***/
//   const [chartType, setChartType] = useState("Line");
//   const [metric, setMetric] = useState("Sales");
//   const [timeframe, setTimeframe] = useState("Daily");

//   const initialSalesData = {
//     Daily: Array.from({ length: 24 }, () => 0),
//     Weekly: Array.from({ length: 7 }, () => 0),
//     Monthly: Array.from({ length: 12 }, () => 0),
//   };
//   const [salesData, setSalesData] = useState({ ...initialSalesData });

//   const salesLabels = {
//     Daily: Array.from({ length: 24 }, (_, i) => `${i}:00`),
//     Weekly: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
//     Monthly: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
//   };

//   const salesColors = {
//     Sales: { borderColor: "#Ff928A", backgroundColor: "#Ff928A" },
//     Quantity: { borderColor: "#3cc3df", backgroundColor: "#3cc3df" },
//   };

//   const handleSalesChange = (index, value) => {
//     setSalesData(prev => {
//       const updated = [...prev[timeframe]];
//       updated[index] = Number(value);
//       return { ...prev, [timeframe]: updated };
//     });
//   };

//   const salesChartData = {
//     labels: salesLabels[timeframe],
//     datasets: [{ label: metric, data: salesData[timeframe], ...salesColors[metric], tension: 0 }],
//   };

//   const salesChartOptions = { maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } };

//   /*** HEATMAP ***/
//   const [selectedWeek, setSelectedWeek] = useState("Last Week");
//   const initialHeatmap = {
//     "This Week": [
//       { name: "8 AM", data: Array(7).fill(0) },
//       { name: "10 AM", data: Array(7).fill(0) },
//       { name: "12 PM", data: Array(7).fill(0) },
//       { name: "2 PM", data: Array(7).fill(0) },
//       { name: "4 PM", data: Array(7).fill(0) },
//       { name: "6 PM", data: Array(7).fill(0) },
//     ],
//     "Last Week": [
//       { name: "8 AM", data: Array(7).fill(0) },
//       { name: "10 AM", data: Array(7).fill(0) },
//       { name: "12 PM", data: Array(7).fill(0) },
//       { name: "2 PM", data: Array(7).fill(0) },
//       { name: "4 PM", data: Array(7).fill(0) },
//       { name: "6 PM", data: Array(7).fill(0) },
//     ],
//   };
//   const [heatmapData, setHeatmapData] = useState(initialHeatmap);

//   const heatmapOptions = {
//     chart: { type: "heatmap", toolbar: { show: false } },
//     plotOptions: { heatmap: { enableShades: false, shadeIntensity: 0, colorScale: { ranges: [{ from: 1, to: 1000, color: "#d4c7e4" }, { from: 1001, to: 5000, color: "#a88ec9" }, { from: 5001, to: 100000, color: "#6e43a5" }] } } },
//     dataLabels: { enabled: false },
//     xaxis: { categories: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] },
//     fill: { type: "solid" },
//   };

//   const handleHeatmapChange = (rowIndex, colIndex, value) => {
//     setHeatmapData(prev => {
//       const updatedWeek = [...prev[selectedWeek]];
//       updatedWeek[rowIndex].data[colIndex] = Number(value);
//       return { ...prev, [selectedWeek]: updatedWeek };
//     });
//   };

//   /*** DONUT CHART ***/
//   const [donutLabels, setDonutLabels] = useState([
//     "Drinks/Beverages","Main Dishes","Desserts/Sweets","Signature Dishes","Soups","Salads/Mixed Dishes","Breakfast","Snacks/Appetizers",
//   ]);
//   const [donutSeries, setDonutSeries] = useState([4,14,5,15,2,2,23,17]);

//   const donutOptions = {
//     chart: { type: "donut" },
//     labels: donutLabels,
//     colors: ["#8a17f6","#f61717","#fcb9ec","#e1f439","#f617c2","#2efa3b","#f67417","#17bcf6"],
//     legend: { position: "bottom", horizontalAlign: "left", markers: { width: 12, height: 12 }, fontSize: "12px", itemMargin: { horizontal: 40, vertical: 5 }, width: 400 },
//     dataLabels: { enabled: false },
//     plotOptions: { pie: { donut: { size: "70%" } } },
//   };

//   const handleDonutChange = (index, value) => {
//     setDonutSeries(prev => { const updated = [...prev]; updated[index] = Number(value); return updated; });
//   };

//   /*** RENDER ***/
//   return (
//     <div className="space-y-10 p-5">
//       {/* SALES ANALYTICS */}
//       <section className="bg-white p-5 rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-3">
//           <p className="text-xl font-medium">Sales Analytics</p>
//           <div className="flex gap-3">
//             <div className="flex bg-[#dfc2fe] rounded-full">
//               {[{ type:"Line",label:"Line",icon:<FaChartLine className="w-4 h-4"/> },{ type:"Bar",label:"Bar",icon:<BsBarChartFill className="w-4 h-4"/> }].map(btn=>(
//                 <button key={btn.type} onClick={()=>setChartType(btn.type)} className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${chartType===btn.type?"bg-white text-black":"text-black"}`}>
//                   {btn.icon}{btn.label}
//                 </button>
//               ))}
//             </div>
//             <div className="flex bg-[#dfc2fe] rounded-full">
//               {["Sales","Quantity"].map(m=>(
//                 <button key={m} onClick={()=>setMetric(m)} className={`px-2 py-1 text-xs font-medium rounded-full ${metric===m?"bg-white text-black":"text-black"}`}>{m}</button>
//               ))}
//             </div>
//             <div className="flex bg-[#dfc2fe] rounded-full">
//               {["Daily","Weekly","Monthly"].map(opt=>(
//                 <button key={opt} onClick={()=>setTimeframe(opt)} className={`px-2 py-1 text-xs font-medium rounded-full ${timeframe===opt?"bg-white text-black shadow":"text-black"}`}>{opt}</button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Sales Table */}
//         <div className="overflow-x-auto mb-5">
//           <table className="min-w-full border border-gray-200 text-xs">
//             <thead className="bg-gray-100">
//               <tr>{salesLabels[timeframe].map((label,i)=><th key={i} className="border px-2 py-1">{label}</th>)}</tr>
//             </thead>
//             <tbody>
//               <tr>{salesData[timeframe].map((val,i)=>
//                 <td key={i} className="border px-1 py-1">
//                   <input type="number" className="w-full text-xs border rounded px-1 py-0.5" value={val} onChange={e=>handleSalesChange(i,e.target.value)} />
//                 </td>
//               )}</tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="h-[400px] w-full">
//           {chartType==="Line"?<Line data={salesChartData} options={salesChartOptions}/>:<Bar data={salesChartData} options={salesChartOptions}/>}
//         </div>
//       </section>

//       {/* HEATMAP AND DONUT */}
//       <div className="grid grid-cols-3 gap-4">
//         {/* Heatmap */}
//         <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-[23px] font-medium">Sales by Time</h2>
//             <select className="border rounded-lg px-3 py-2 text-sm" value={selectedWeek} onChange={e=>setSelectedWeek(e.target.value)}>
//               <option>This Week</option>
//               <option>Last Week</option>
//             </select>
//           </div>

//           {/* Heatmap table */}
//           <div className="overflow-x-auto mb-4">
//             <table className="min-w-full border border-gray-200 text-xs">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-2 py-1">Time</th>
//                   {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day,i)=><th key={i} className="border px-2 py-1">{day}</th>)}
//                 </tr>
//               </thead>
//               <tbody>
//                 {heatmapData[selectedWeek].map((row,rowIndex)=>(
//                   <tr key={rowIndex}>
//                     <td className="border px-2 py-1 font-medium">{row.name}</td>
//                     {row.data.map((val,colIndex)=>(
//                       <td key={colIndex} className="border px-1 py-1">
//                         <input type="number" className="w-full text-xs border rounded px-1 py-0.5" value={val} onChange={e=>handleHeatmapChange(rowIndex,colIndex,e.target.value)}/>
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <Chart options={heatmapOptions} series={heatmapData[selectedWeek]} type="heatmap" height={400}/>
//         </div>

//         {/* Donut */}
//         <div className="bg-white p-5 rounded-xl shadow-md">
//           <h2 className="text-[23px] font-medium mb-4">Sales by Category</h2>

//           <div className="overflow-x-auto mb-4">
//             <table className="min-w-full border border-gray-200 text-xs">
//               <thead className="bg-gray-100">
//                 <tr>{donutLabels.map((_,i)=><th key={i} className="border px-2 py-1">Category</th>)}</tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {donutLabels.map((label,i)=>(
//                     <td key={i} className="border px-1 py-1 flex flex-col gap-1">
//                       <input type="text" className="w-full text-xs border rounded px-1 py-0.5" value={donutLabels[i]} onChange={e=>{ const newLabels=[...donutLabels]; newLabels[i]=e.target.value; setDonutLabels(newLabels);}}/>
//                       <input type="number" className="w-full text-xs border rounded px-1 py-0.5" value={donutSeries[i]} onChange={e=>handleDonutChange(i,e.target.value)}/>
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <Chart options={donutOptions} series={donutSeries} type="donut" height={350}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState } from "react";
import Chart from "react-apexcharts";

const DashboardCharts = () => {
  const [selectedWeek, setSelectedWeek] = useState("Last Week");

  // Heatmap initial data
  const initialHeatmap = {
    "This Week": [
      { name: "8 AM", data: [600, 700, 1000, 1500, 3000, 2000, 800] },
      { name: "10 AM", data: [1200, 1400, 1000, 2000, 1800, 900, 600] },
      { name: "12 PM", data: [23000, 4900, 2800, 3000, 3400, 600, 1200] },
      { name: "2 PM", data: [1500, 2500, 1800, 3500, 4000, 900, 800] },
      { name: "4 PM", data: [1000, 2000, 2500, 2200, 1500, 1000, 700] },
      { name: "6 PM", data: [700, 4100, 10000, 600, 700, 9000, 7000] },
    ],
    "Last Week": [
      { name: "8 AM", data: [550, 600, 700, 15000, 7000, 3000, 4000] },
      { name: "10 AM", data: [550, 600, 8000, 800, 12000, 3500, 6500] },
      { name: "12 PM", data: [23000, 4900, 2800, 3000, 3400, 600, 1200] },
      { name: "2 PM", data: [3900, 8000, 2300, 2000, 700, 1000, 7000] },
      { name: "4 PM", data: [11000, 2600, 900, 2100, 800, 8500, 1000] },
      { name: "6 PM", data: [700, 4100, 10000, 600, 700, 9000, 7000] },
    ],
  };
  const [heatmapData, setHeatmapData] = useState(initialHeatmap);

  // Donut initial data
  const [donutLabels, setDonutLabels] = useState([
    "Drinks/Beverages",
    "Main Dishes",
    "Desserts/Sweets",
    "Signature Dishes",
    "Soups",
    "Salads/Mixed Dishes",
    "Breakfast",
    "Snacks/Appetizers",
  ]);
  const [donutSeries, setDonutSeries] = useState([4, 14, 5, 15, 2, 2, 23, 17]);

  // Apex options
  const heatmapOptions = {
    chart: { type: "heatmap", toolbar: { show: false } },
    plotOptions: {
      heatmap: {
        enableShades: false,
        shadeIntensity: 0,
        colorScale: {
          ranges: [
            { from: 501, to: 1000, color: "#d4c7e4", name: "500K>" },
            { from: 1001, to: 5000, color: "#a88ec9", name: "1000K>" },
            { from: 5001, to: 100000, color: "#6e43a5", name: "5000K>" },
          ],
        },
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] },
    fill: { type: "solid" },
  };

  const donutOptions = {
    chart: { type: "donut" },
    labels: donutLabels,
    colors: ["#8a17f6","#f61717","#fcb9ec","#e1f439","#f617c2","#2efa3b","#f67417","#17bcf6"],
    legend: {
      position: "bottom",
      horizontalAlign: "left",
      markers: { width: 12, height: 12 },
      fontSize: "12px",
      itemMargin: { horizontal: 40, vertical: 5 },
      width: 400,
    },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: "70%" } } },
  };

  // Heatmap input change
  const handleHeatmapChange = (rowIndex, colIndex, value) => {
    setHeatmapData(prev => {
      const updatedWeek = [...prev[selectedWeek]];
      updatedWeek[rowIndex].data[colIndex] = Number(value);
      return { ...prev, [selectedWeek]: updatedWeek };
    });
  };

  // Donut value change
  const handleDonutValueChange = (index, value) => {
    setDonutSeries(prev => {
      const updated = [...prev];
      updated[index] = Number(value);
      return updated;
    });
  };

  // Donut label change
  const handleDonutLabelChange = (index, value) => {
    setDonutLabels(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Heatmap */}
      <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[23px] font-medium">Sales by Time</h2>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            <option>This Week</option>
            <option>Last Week</option>
          </select>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-200 text-xs">
            <tbody>
              {heatmapData[selectedWeek].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border px-2 py-1 font-medium">{row.name}</td>
                  {row.data.map((val, colIndex) => (
                    <td key={colIndex} className="border px-1 py-1">
                      <input
                        type="number"
                        className="w-full text-xs border rounded px-1 py-0.5"
                        value={val}
                        onChange={(e) => handleHeatmapChange(rowIndex, colIndex, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Chart options={heatmapOptions} series={heatmapData[selectedWeek]} type="heatmap" height={400} />
      </div>

      {/* Donut */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-[23px] font-medium mb-4">Sales by Category</h2>

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border border-gray-200 text-xs">
            <tbody>
              {donutLabels.map((label, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-full text-xs border rounded px-1 py-0.5"
                      value={donutLabels[i]}
                      onChange={(e) => handleDonutLabelChange(i, e.target.value)}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      className="w-full text-xs border rounded px-1 py-0.5"
                      value={donutSeries[i]}
                      onChange={(e) => handleDonutValueChange(i, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Chart options={donutOptions} series={donutSeries} type="donut" height={350} />
      </div>
    </div>
  );
};

export default DashboardCharts;


