

// import React from "react";
// import { ShoppingBag, List, DollarSign, Users, MapPin } from "lucide-react";

// // ✅ Import icons/images
// // import menuicon from "../../assets/images/icon/menu.svg";
// // import shop from "../../assets/images/icon/shop.svg";
// import restaurant from "../../assets/images/restaurant-photo/download.jpeg";
// import menu from "../../assets/images/menu/menu.avif";




// const summaryData = [
//   {
//     title: "Total Shop",
//     value: "320+",
//     daily: null,
//     trend: null,
//     images: [restaurant, restaurant, restaurant, restaurant], // ✅ Always array
//     icon: <ShoppingBag className="w-6 h-6 text-[#B476FF]" />,
//   },
//   {
//     title: "Total Menu",
//     value: "320+",
//     daily: null,
//     trend: null,
//     images: [menu, menu,menu,menu], // ✅ Always array
//     icon: <List className="w-6 h-6 text-[#B476FF]" />,
//   },
//   {
//     title: "Total Income",
//     value: "320000+",
//     daily: "Daily income - 300000",
//     trend: { text: "+1.45% vs last week", color: "text-green-600" },
//     images: [], // ✅ No images
//     icon: <DollarSign className="w-6 h-6 text-[#B476FF]" />,
//   },
//   {
//     title: "Total Client",
//     value: "53000+",
//     daily: "Client Activity - 53%",
//     trend: { text: "-1.45% vs last week", color: "text-red-600" },
//     images: [], // ✅ No images
//     icon: <Users className="w-6 h-6 text-[#B476FF]" />,
//   },
//   {
//     title: "Location",
//     map: true,
//     images: [], // ✅ No images
//     icon: <MapPin className="w-6 h-6 text-[#B476FF]" />,
//   },
// ];

// const SummaryCard = ({ title, value, daily, trend, images, icon, map }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between h-[200px] mb-6">
//       {/* Map card */}
//       {map ? (
//         <div className="w-full h-full rounded-xl overflow-hidden relative">
//           <iframe
//             title="map"
//             className="w-full h-full"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609969487!2d72.74109915826098!3d19.08219783956057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a23a9ac9b%3A0x1bb3cb8a93b8e1b!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1679151551309!5m2!1sen!2sin"
//             allowFullScreen=""
//             loading="lazy"
//           ></iframe>

//           {/* Map Buttons */}
//           <button className="absolute top-2 left-2 bg-white px-3 py-1 text-xs rounded-lg shadow">
//             View larger map
//           </button>
//           <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
//             <button className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold">
//               +
//             </button>
//             <button className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold">
//               −
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Top: Icon + Title */}
//           <div className="flex items-center gap-2">
//             <div className="p-2 rounded-full bg-purple-100">{icon}</div>
//             <p className="text-gray-500 text-sm">{title}</p>
//           </div>

//           {/* Middle: Value */}
//           <h3 className="text-2xl font-semibold text-gray-800 mt-2">{value}</h3>

//           {/* Bottom: Daily + Trend */}
//           {daily && <p className="text-gray-400 text-xs mt-1">{daily}</p>}
//           {trend && (
//             <p className={`text-xs mt-1 font-medium ${trend.color}`}>
//               {trend.text}
//             </p>
//           )}

//           {/* Preview images */}
//           {images.length > 0 && (
//             <div className="flex items-center mt-2">
//               {images.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt="preview"
//                   className="w-12 h-12 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover"
//                 />
//               ))}
//               <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-dashed bg-white border-gray-300 -ml-2 text-gray-400 text-xs text-center px-2">
//                 view all
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default function SummaryCards() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//       {summaryData.map((item, idx) => (
//         <SummaryCard key={idx} {...item} />
//       ))}
//     </div>
//   );
// }
import React from "react";
import { useTheme } from "../ThemeProvider"; // adjust path if needed
import { ShoppingBag, List, DollarSign, Users, MapPin } from "lucide-react";

// ✅ Import icons/images
import restaurant from "../../assets/images/restaurant-photo/download.jpeg";
import menu from "../../assets/images/menu/menu.avif";

const summaryData = [
  {
    title: "Total Shop",
    value: "320+",
    daily: null,
    trend: null,
    images: [restaurant, restaurant, restaurant, restaurant],
    icon: <ShoppingBag className="w-6 h-6 text-[#B476FF]" />,
  },
  {
    title: "Total Menu",
    value: "320+",
    daily: null,
    trend: null,
    images: [menu, menu, menu, menu],
    icon: <List className="w-6 h-6 text-[#B476FF]" />,
  },
  {
    title: "Total Income",
    value: "320000+",
    daily: "Daily income - 300000",
    trend: { text: "+1.45% vs last week", color: "text-green-600" },
    images: [],
    icon: <DollarSign className="w-6 h-6 text-[#B476FF]" />,
  },
  {
    title: "Total Client",
    value: "53000+",
    daily: "Client Activity - 53%",
    trend: { text: "-1.45% vs last week", color: "text-red-600" },
    images: [],
    icon: <Users className="w-6 h-6 text-[#B476FF]" />,
  },
  {
    title: "Location",
    map: true,
    images: [],
    icon: <MapPin className="w-6 h-6 text-[#B476FF]" />,
  },
];

const SummaryCard = ({ title, value, daily, trend, images, icon, map }) => {
  const { dark } = useTheme();

  const cardBg = dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-100";
  const iconBg = dark ? "bg-purple-900" : "bg-purple-100";
  const dailyText = dark ? "text-gray-400" : "text-gray-400";
  const valueText = dark ? "text-gray-100" : "text-gray-800";

  return (
    <div className={`rounded-2xl shadow-sm border p-4 flex flex-col justify-between h-[200px] mb-6 ${cardBg}`}>
      {map ? (
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <iframe
            title="map"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609969487!2d72.74109915826098!3d19.08219783956057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a23a9ac9b%3A0x1bb3cb8a93b8e1b!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1679151551309!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          {/* Map Buttons */}
          <button className="absolute top-2 left-2 bg-white dark:bg-gray-700 px-3 py-1 text-xs rounded-lg shadow">
            View larger map
          </button>
          <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
            <button className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold">
              +
            </button>
            <button className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold">
              −
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Top: Icon + Title */}
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
            <p className="text-sm text-gray-500">{title}</p>
          </div>

          {/* Middle: Value */}
          <h3 className={`text-2xl font-semibold mt-2 ${valueText}`}>{value}</h3>

          {/* Bottom: Daily + Trend */}
          {daily && <p className={`text-xs mt-1 ${dailyText}`}>{daily}</p>}
          {trend && <p className={`text-xs mt-1 font-medium ${trend.color}`}>{trend.text}</p>}

          {/* Preview images */}
          {images.length > 0 && (
            <div className="flex items-center mt-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-12 h-12 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover"
                />
              ))}
              <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-dashed bg-white dark:bg-gray-700 border-gray-300 -ml-2 text-gray-400 text-xs text-center px-2">
                view all
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {summaryData.map((item, idx) => (
        <SummaryCard key={idx} {...item} />
      ))}
    </div>
  );
}
