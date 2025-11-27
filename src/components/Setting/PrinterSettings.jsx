import React, { useState } from "react";
import { FaFilePdf, FaTrash } from "react-icons/fa";

const PrinterSettings = () => {
  const [downloads, setDownloads] = useState([
    { id: 1, name: "Blabla-new.pdf", size: "60 KB of 120 KB", status: "downloading" },
    { id: 2, name: "Blabla-new.pdf", size: "40 KB of 120 KB", status: "downloading" },
    { id: 3, name: "Blabla-new.pdf", size: "90 KB of 120 KB", status: "downloading" },
    { id: 4, name: "Blabla-new.pdf", size: "120 KB of 120 KB", status: "complete" },
  ]);

  const handleCancel = (id) => {
    setDownloads((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
        {/* ================= PRINTER OPTIONS ================= */}
        <h2 className="text-lg font-semibold mb-4">Printer Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select className="p-3 rounded-lg bg-purple-100 w-full outline-none">
            <option>Save as PDF</option>
          </select>
          <select className="p-3 rounded-lg bg-purple-100 w-full outline-none">
            <option>All</option>
          </select>
          <select className="p-3 rounded-lg bg-purple-100 w-full outline-none">
            <option>Portrait</option>
            <option>Landscape</option>
          </select>
        </div>

        {/* ================= PREVIEW ================= */}
        <div className="flex gap-4 mb-8">
          <div className="w-32 h-44 border-2 border-purple-300 rounded-md flex items-center justify-center">
            <p className="text-gray-500 text-xs">(1)</p>
          </div>
          <div className="w-32 h-44 border-2 border-purple-300 rounded-md flex items-center justify-center">
            <p className="text-gray-500 text-xs">(2)</p>
          </div>
        </div>

        {/* ================= DOWNLOAD LIST ================= */}
        <div className="space-y-3 mb-8">
          {downloads.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <FaFilePdf className="text-purple-500 w-6 h-6" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>

              {file.status === "downloading" ? (
                <button
                  onClick={() => handleCancel(file.id)}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  cancel download ✕
                </button>
              ) : (
                <button
                  onClick={() => handleCancel(file.id)}
                  className="flex items-center text-sm text-gray-500 hover:text-red-500 gap-1"
                >
                  delete <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* ================= MORE SETTINGS ================= */}
        <h3 className="text-md font-semibold mb-4">More settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select className="p-3 rounded-lg bg-purple-100 outline-none">
            <option>Letter</option>
          </select>
          <select className="p-3 rounded-lg bg-purple-100 outline-none">
            <option>1</option>
          </select>
          <select className="p-3 rounded-lg bg-purple-100 outline-none">
            <option>Default</option>
          </select>
          <select className="p-3 rounded-lg bg-purple-100 outline-none">
            <option>Default</option>
          </select>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm">Header & footers</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm">Background</span>
          </label>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600">
            Save & download
          </button>
          <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
            Cancel saving
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrinterSettings;

// import React, { useState } from "react";
// import { FaFilePdf, FaTrash } from "react-icons/fa";

// // Import your local images
// import dark from "../../assets/images/theme/dark.png";
// import white from "../../assets/images/theme/white.png";
// // import menu from "../../assets/images/menu/menu.avif";


// const PrinterSettings = () => {
//   const [downloads, setDownloads] = useState([
//     { id: 1, name: "Blabla-new.pdf", size: "60 KB of 120 KB", status: "downloading" },
//     { id: 2, name: "Blabla-new.pdf", size: "40 KB of 120 KB", status: "downloading" },
//     { id: 3, name: "Blabla-new.pdf", size: "90 KB of 120 KB", status: "downloading" },
//     { id: 4, name: "Blabla-new.pdf", size: "120 KB of 120 KB", status: "complete" },
//   ]);

//   const handleCancel = (id) => {
//     setDownloads((prev) => prev.filter((file) => file.id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
//         {/* ================= PRINTER OPTIONS ================= */}
//         <h2 className="text-lg font-semibold mb-4">Printer Settings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <select className="p-3 rounded-lg bg-purple-100 w-full outline-none">
//             <option>Save as PDF</option>
//           </select>
//           <select className="p-3 rounded-lg bg-purple-100 w-full outline-none">
//             <option>All</option>
//           </select>
//           <select className="p-3 rounded-lg bg-purple-100 w-full outline-none">
//             <option>Portrait</option>
//             <option>Landscape</option>
//           </select>
//         </div>

//         {/* ================= PREVIEW ================= */}
//         <div className="flex gap-4 mb-8">
//           <div className="w-32 h-44 border-2 border-purple-300 rounded-md overflow-hidden">
//             <img
//               src={dark}
//               alt="Preview 1"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="w-32 h-44 border-2 border-purple-300 rounded-md overflow-hidden">
//             <img
//               src={white}
//               alt="Preview 2"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* ================= DOWNLOAD LIST ================= */}
//         <div className="space-y-3 mb-8">
//           {downloads.map((file) => (
//             <div
//               key={file.id}
//               className="flex items-center justify-between border rounded-lg p-3"
//             >
//               <div className="flex items-center gap-3">
//                 <FaFilePdf className="text-purple-500 w-6 h-6" />
//                 <div>
//                   <p className="text-sm font-medium">{file.name}</p>
//                   <p className="text-xs text-gray-500">{file.size}</p>
//                 </div>
//               </div>

//               {file.status === "downloading" ? (
//                 <button
//                   onClick={() => handleCancel(file.id)}
//                   className="text-sm text-gray-500 hover:text-red-500"
//                 >
//                   cancel download ✕
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleCancel(file.id)}
//                   className="flex items-center text-sm text-gray-500 hover:text-red-500 gap-1"
//                 >
//                   delete <FaTrash />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ================= MORE SETTINGS ================= */}
//         <h3 className="text-md font-semibold mb-4">More settings</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <select className="p-3 rounded-lg bg-purple-100 outline-none">
//             <option>Letter</option>
//           </select>
//           <select className="p-3 rounded-lg bg-purple-100 outline-none">
//             <option>1</option>
//           </select>
//           <select className="p-3 rounded-lg bg-purple-100 outline-none">
//             <option>Default</option>
//           </select>
//           <select className="p-3 rounded-lg bg-purple-100 outline-none">
//             <option>Default</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-6 mb-6">
//           <label className="flex items-center gap-2">
//             <input type="checkbox" defaultChecked className="w-4 h-4" />
//             <span className="text-sm">Header & footers</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="checkbox" className="w-4 h-4" />
//             <span className="text-sm">Background</span>
//           </label>
//         </div>

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="flex gap-4">
//           <button className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600">
//             Save & download
//           </button>
//           <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
//             Cancel saving
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrinterSettings;
