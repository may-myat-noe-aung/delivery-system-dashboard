
// import React, { useEffect, useState } from "react";
// import {
//   X,
//   Tag,
//   DollarSign,
//   Ruler,
//   FileText,
//   CheckCircle,
//   Star,
//   CalendarDays,
//   Layers,
// } from "lucide-react";

// export default function MenuDetailPopup({ menu, onClose }) {
//   const [data, setData] = useState(menu);
//   const [loading, setLoading] = useState(true);

//   // 500ms delay fetch
//   useEffect(() => {
//     if (!menu) return;

//     const timeout = setTimeout(() => {
//       setData(menu);
//       setLoading(false);
//     }, 500); // ⏳ 500ms delay

//     return () => clearTimeout(timeout);
//   }, [menu]);

//   if (!menu) return null;
//   if (loading)
//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <p className="text-neutral-900 text-lg font-medium">Loading...</p>
//       </div>
//     );

//   const getPhotoUrl = (photo, type = "menu") => {
//     if (!photo) return null;
//     return photo.startsWith("http")
//       ? photo
//       : `http://38.60.244.137:3000/${type}-uploads/${photo}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-neutral-900 rounded-2xl shadow-xl w-full max-w-5xl py-4 px-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 bg-neutral-600 p-2 rounded-full hover:bg-gray-700 transition"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-[#B476FF] mb-4">{data.name}</h2>

//         {/* Top Section: Photo + Main Details */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           {/* PHOTO */}
//           <div className="col-span-2 flex flex-col justify-center items-center gap-2">
//             {data.photo ? (
//               <img
//                 src={getPhotoUrl(data.photo)}
//                 alt={data.name}
//                 className="w-full max-w-md h-[300px] object-cover rounded-xl shadow-lg border border-neutral-700"
//               />
//             ) : (
//               <div className="w-full max-w-md h-60 flex items-center justify-center bg-neutral-700 rounded-xl shadow-inner">
//                 <p className="text-[#B476FF] text-lg">No Image</p>
//               </div>
//             )}
//           </div>

//           {/* DETAILS CARD */}
//           <div className="col-span-3 bg-[#B476FF] border border-purple-200 rounded-2xl p-4 shadow-md text-neutral-900">
//             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//               <div className="border border-neutral-900 p-2 rounded-full bg-neutral-900">
//                 <Layers className="text-[#B476FF]" size={22} />
//               </div>
//               <p>Menu Information</p>
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InfoItem icon={Tag} label="Category" value={data.category || "-"} />
//               <InfoItem icon={DollarSign} label="Price" value={`${data.prices} Ks`} />
//               <InfoItem icon={FileText} label="Description" value={data.description || "-"} />
//               <InfoItem icon={Ruler} label="Size" value={data.size || "No size"} />
//               <InfoItem icon={CheckCircle} label="Complete Orders" value={data.complete_order} />
//               <InfoItem
//                 icon={Star}
//                 label="Rating"
//                 value={`${data.rating} (${data.rating_count} reviews)`}
//               />
//               <InfoItem
//                 icon={CalendarDays}
//                 label="Available Months"
//                 value={data.get_months?.length ? data.get_months.join(", ") : "-"}
//               />
//               <InfoItem icon={CalendarDays} label="Created At" value={data.created_at} />
//             </div>
//           </div>
//         </div>

//         {/* RELATED MENU */}
//         <Section title="Related Menu" items={data.relate_menu} getPhotoUrl={getPhotoUrl} type="menu" />

//         {/* INGREDIENTS */}
//         <Section title="Ingredients" items={data.relate_ingredients} getPhotoUrl={getPhotoUrl} type="ingredients" />
//       </div>
//     </div>
//   );
// }

// // ==================
// // Helper Components
// // ==================

// const InfoItem = ({ icon: Icon, label, value }) => (
//   <div className="flex items-center gap-3">
//     <div className="border border-white p-1.5 rounded-full bg-white">
//       <Icon className="text-[#B476FF]" size={20} />
//     </div>
//     <div>
//       <p className="font-semibold">{label}</p>
//       <p className="text-sm">{value}</p>
//     </div>
//   </div>
// );

// const Section = ({ title, items, getPhotoUrl, type }) => (
//   <div className="mt-6">
//     <h3 className="text-xl font-semibold text-[#B476FF] mb-3">{title}</h3>
//     {items && items.length > 0 ? (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
//         {items.map((item, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col items-center bg-purple-50 p-4 border border-purple-200 rounded-xl shadow-sm md:flex-row md:max-w-full hover:shadow-lg transition"
//           >
//             <img
//               className="object-cover w-full rounded-xl h-40 md:h-28 mb-4 md:mb-0"
//               src={getPhotoUrl(item.photo, type)}
//               alt={item.name}
//             />
//             <div className="flex flex-col justify-between md:ml-4">
//               <h5 className="mb-2 text-xl font-bold text-[#B476FF]">{item.name}</h5>
//               {item.prices && <p className="text-gray-700 text-sm">Price: {item.prices} Ks</p>}
//               {item.size && <p className="text-gray-500 text-sm">Size: {item.size}</p>}
//               {item.category && <p className="text-gray-500 text-sm">Category: {item.category}</p>}
//             </div>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p className="text-gray-500">No {title.toLowerCase()}</p>
//     )}
//   </div>
// );
import React, { useEffect, useState } from "react";
import {
  X,
  Tag,
  DollarSign,
  Ruler,
  FileText,
  CheckCircle,
  Star,
  CalendarDays,
  Layers,
} from "lucide-react";

export default function MenuDetailPopup({ menu, onClose }) {
  const [data, setData] = useState(menu);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // 🌙 Detect system dark mode
  useEffect(() => {
    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkModeMq.matches);
    const handler = (e) => setIsDark(e.matches);
    darkModeMq.addEventListener("change", handler);
    return () => darkModeMq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const timeout = setTimeout(() => {
      setData(menu);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [menu]);

  if (!menu) return null;
  if (loading)
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <p className={`${isDark ? "text-white" : "text-neutral-900"} text-lg font-medium`}>
          Loading...
        </p>
      </div>
    );

  const getPhotoUrl = (photo, type = "menu") => {
    if (!photo) return null;
    return photo.startsWith("http")
      ? photo
      : `http://38.60.244.137:3000/${type}-uploads/${photo}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-2xl shadow-xl w-full max-w-5xl py-4 px-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide
        ${isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition
          ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#B476FF] mb-4">{data.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* PHOTO */}
          <div className="col-span-2 flex flex-col justify-center items-center gap-2">
            {data.photo ? (
              <img
                src={getPhotoUrl(data.photo)}
                alt={data.name}
                className={`w-full max-w-md h-[300px] object-cover rounded-xl shadow-lg
                ${isDark ? "border border-gray-700" : "border border-gray-200"}`}
              />
            ) : (
              <div
                className={`w-full max-w-md h-60 flex items-center justify-center rounded-xl shadow-inner
                ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
              >
                <p className="text-[#B476FF] text-lg">No Image</p>
              </div>
            )}
          </div>

          {/* DETAILS CARD */}
          <div
            className={`col-span-3 border rounded-2xl p-4 shadow-md
            ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-purple-50 border-purple-200 text-gray-900"}`}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div
                className={`p-2 rounded-full
                ${isDark ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"}`}
              >
                <Layers className="text-[#B476FF]" size={22} />
              </div>
              <p>Menu Information</p>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={Tag} label="Category" value={data.category || "-"} isDark={isDark} />
              <InfoItem icon={DollarSign} label="Price" value={`${data.prices} Ks`} isDark={isDark} />
              <InfoItem icon={FileText} label="Description" value={data.description || "-"} isDark={isDark} />
              <InfoItem icon={Ruler} label="Size" value={data.size || "No size"} isDark={isDark} />
              <InfoItem icon={CheckCircle} label="Complete Orders" value={data.complete_order} isDark={isDark} />
              <InfoItem icon={Star} label="Rating" value={`${data.rating} (${data.rating_count} reviews)`} isDark={isDark} />
              <InfoItem icon={CalendarDays} label="Available Months" value={data.get_months?.length ? data.get_months.join(", ") : "-"} isDark={isDark} />
              <InfoItem icon={CalendarDays} label="Created At" value={data.created_at} isDark={isDark} />
            </div>
          </div>
        </div>

        <Section title="Related Menu" items={data.relate_menu} getPhotoUrl={getPhotoUrl} type="menu" isDark={isDark} />
        <Section title="Ingredients" items={data.relate_ingredients} getPhotoUrl={getPhotoUrl} type="ingredients" isDark={isDark} />
      </div>
    </div>
  );
}

/* Helper Components */

const InfoItem = ({ icon: Icon, label, value, isDark }) => (
  <div className="flex items-center gap-3">
    <div className={`${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} border p-1.5 rounded-full`}>
      <Icon className="text-[#B476FF]" size={20} />
    </div>
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm opacity-80">{value}</p>
    </div>
  </div>
);

const Section = ({ title, items, getPhotoUrl, type, isDark }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-[#B476FF] mb-3">{title}</h3>
    {items && items.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center p-4 rounded-xl shadow-sm md:flex-row md:max-w-full transition
            ${isDark ? "bg-gray-800 border border-gray-700 hover:shadow-lg" : "bg-purple-50 border border-purple-200 hover:shadow-lg"}`}
          >
            <img
              className="object-cover w-full rounded-xl h-40 md:h-28 mb-4 md:mb-0"
              src={getPhotoUrl(item.photo, type)}
              alt={item.name}
            />
            <div className="flex flex-col justify-between md:ml-4">
              <h5 className="mb-2 text-xl font-bold text-[#B476FF]">{item.name}</h5>
              {item.prices && <p className="text-sm opacity-80">Price: {item.prices} Ks</p>}
              {item.size && <p className="text-sm opacity-70">Size: {item.size}</p>}
              {item.category && <p className="text-sm opacity-70">Category: {item.category}</p>}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="opacity-60">No {title.toLowerCase()}</p>
    )}
  </div>
);