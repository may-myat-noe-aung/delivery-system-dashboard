
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
//         <p className="text-white text-lg">Loading...</p>
//       </div>
//     );

//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return photo.startsWith("http")
//       ? photo
//       : `http://38.60.244.108:3000/menu-uploads/${photo}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-1/2 max-w-5xl py-4 px-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-[#B476FF] mb-4 ">{data.name}</h2>

//         {/* Top Section: Photo + Main Details */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           {/* PHOTO */}
//           <div className="col-span-2 flex flex-col justify-center items-center gap-2">
//             {/* IMAGE */}
//             {data.photo ? (
//               <img
//                 src={getPhotoUrl(data.photo)}
//                 alt={data.name}
//                 className="w-full max-w-md h-[300px] object-cover rounded-xl shadow-lg border border-gray-200"
//               />
//             ) : (
//               <div className="w-full max-w-md h-full bg-purple-100 flex items-center justify-center rounded-xl shadow-inner">
//                 <p className="text-[#B476FF] text-lg">No Image</p>
//               </div>
//             )}

           
//           </div>

//           {/* DETAILS CARD */}
//           <div className=" col-span-3 bg-[#B476FF] border border-purple-200 rounded-2xl p-4 shadow-md">
//             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//         <div className="border border-white p-2 rounded-full bg-white">
//               <Layers className="text-[#B476FF] " size={22} />  </div>   
//              <p> Menu Information</p>
//           </h3>

//             <div className="grid gird-cols-1 md:grid-cols-2 gap-2 text-white bg-[#B476FF]">
//               <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <Tag className="text-[#B476FF]" size={20} />
//                 </div>
//                 <div>
//                   <p className="font-semibold">Category</p>
//                   <p className="text-sm">{menu.category || "-"}</p>
//                 </div>
//               </div>
//                 <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <DollarSign className="text-[#B476FF] " size={20} />
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold">Price</p>
//                  <p className="text-sm">{menu.prices} Ks</p>
//                 </div>
//               </div>

//                   <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <FileText className="text-[#B476FF]   " size={20} />
//                 </div>{" "}
//                 <div>
//                   <p className="text-white font-semibold">Description</p>
//       <p className="text-sm">
//                     {menu.description || "-"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <Ruler className="text-[#B476FF]" size={20} />
//                 </div>{" "}
//                 <div>
//                   <p className="font-semibold">Size</p>
//                   <p className="text-sm">{menu.size || "No size"}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <CheckCircle className="text-[#B476FF]" size={20} />
//                 </div>{" "}
//                 <div>
//                   <p className="font-semibold">Complete Orders</p>
//                   <p className="text-sm">{menu.complete_order}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <Star className="text-[#B476FF]" size={20} />
//                 </div>{" "}
//                 <div>
//                   <p className="font-semibold">Rating</p>
//                   <p className="text-sm">
//                     {menu.rating} ({menu.rating_count} reviews)
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <CalendarDays className="text-[#B476FF]" size={20} />
//                 </div>{" "}
//                 <div>
//                   <p className="font-semibold">Available Months</p>
//                   <p className="text-sm">
//                     {menu.get_months?.length ? menu.get_months.join(", ") : "-"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="border border-white p-1.5 rounded-full bg-white">
//                   <CalendarDays className="text-[#B476FF]" size={20} />
//                 </div>
//                 <div>
//                   <p className="font-semibold">Created At</p>
//                   <p className="text-sm">{menu.created_at}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RELATED MENU */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-[#B476FF] mb-3">
//             Related Menu
//           </h3>
//           {data.relate_menu && data.relate_menu.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
//               {data.relate_menu.map((item, idx) => (
//                 <a
//                   key={idx}
//                   href="#"
//                   className="flex flex-col items-center bg-purple-50 p-4 border border-purple-200 rounded-xl shadow-sm md:flex-row md:max-w-full hover:shadow-lg transition"
//                 >
//                   {/* Image */}
//                   <img
//                     className="object-cover w-full rounded-xl h-40 md:size-28 mb-4 md:mb-0"
//                     src={getPhotoUrl(item.photo)}
//                     alt={item.name}
//                   />

//                   {/* Content */}
//                   <div className="flex flex-col justify-between md:ml-4">
//                     <h5 className="mb-2 text-xl font-bold text-[#B476FF]">
//                       {item.name}
//                     </h5>
//                     <p className="text-gray-700 ">Price: {item.prices} Ks</p>
//                     <p className="text-gray-500 ">
//                       Size: {item.size || "No size"}
//                     </p>
//                     <p className="text-gray-500 ">
//                       category: {item.category || "No category"}
//                     </p>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No related menus</p>
//           )}
//         </div>

//         {/* INGREDIENTS */}
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-[#B476FF] mb-3">
//             Ingredients
//           </h3>
//           {data.relate_ingredients && data.relate_ingredients.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
//               {data.relate_ingredients.map((item, idx) => (
//                 <a
//                   key={idx}
//                   href="#"
//                   className="flex flex-col items-center bg-purple-50 p-4 border border-purple-200 rounded-xl shadow-sm md:flex-row md:max-w-full hover:shadow-lg transition"
//                 >
//                   <img
//                     className="object-cover w-full rounded-xl h-40 md:size-28 mb-4 md:mb-0"
//                     src={
//                       item.photo
//                         ? item.photo.startsWith("http")
//                           ? item.photo
//                           : `http://38.60.244.108:3000/ingredients-uploads/${item.photo}`
//                         : null
//                     }
//                     alt={item.name}
//                   />

//                   <div className="flex flex-col justify-between md:ml-4">
//                     <h5 className="mb-2 text-xl font-bold text-[#B476FF]">
//                       {item.name}
//                     </h5>
//                     <p className="text-gray-700 text-sm ">
//                       Price: {item.prices} Ks
//                     </p>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No ingredients</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
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

  // 500ms delay fetch
  useEffect(() => {
    if (!menu) return;

    const timeout = setTimeout(() => {
      setData(menu);
      setLoading(false);
    }, 500); // ⏳ 500ms delay

    return () => clearTimeout(timeout);
  }, [menu]);

  if (!menu) return null;
  if (loading)
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    );

  const getPhotoUrl = (photo, type = "menu") => {
    if (!photo) return null;
    return photo.startsWith("http")
      ? photo
      : `http://38.60.244.108:3000/${type}-uploads/${photo}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl py-4 px-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#B476FF] mb-4">{data.name}</h2>

        {/* Top Section: Photo + Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* PHOTO */}
          <div className="col-span-2 flex flex-col justify-center items-center gap-2">
            {data.photo ? (
              <img
                src={getPhotoUrl(data.photo)}
                alt={data.name}
                className="w-full max-w-md h-[300px] object-cover rounded-xl shadow-lg border border-gray-200"
              />
            ) : (
              <div className="w-full max-w-md h-60 flex items-center justify-center bg-purple-100 rounded-xl shadow-inner">
                <p className="text-[#B476FF] text-lg">No Image</p>
              </div>
            )}
          </div>

          {/* DETAILS CARD */}
          <div className="col-span-3 bg-[#B476FF] border border-purple-200 rounded-2xl p-4 shadow-md text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="border border-white p-2 rounded-full bg-white">
                <Layers className="text-[#B476FF]" size={22} />
              </div>
              <p>Menu Information</p>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={Tag} label="Category" value={data.category || "-"} />
              <InfoItem icon={DollarSign} label="Price" value={`${data.prices} Ks`} />
              <InfoItem icon={FileText} label="Description" value={data.description || "-"} />
              <InfoItem icon={Ruler} label="Size" value={data.size || "No size"} />
              <InfoItem icon={CheckCircle} label="Complete Orders" value={data.complete_order} />
              <InfoItem
                icon={Star}
                label="Rating"
                value={`${data.rating} (${data.rating_count} reviews)`}
              />
              <InfoItem
                icon={CalendarDays}
                label="Available Months"
                value={data.get_months?.length ? data.get_months.join(", ") : "-"}
              />
              <InfoItem icon={CalendarDays} label="Created At" value={data.created_at} />
            </div>
          </div>
        </div>

        {/* RELATED MENU */}
        <Section title="Related Menu" items={data.relate_menu} getPhotoUrl={getPhotoUrl} type="menu" />

        {/* INGREDIENTS */}
        <Section title="Ingredients" items={data.relate_ingredients} getPhotoUrl={getPhotoUrl} type="ingredients" />
      </div>
    </div>
  );
}

// ==================
// Helper Components
// ==================

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="border border-white p-1.5 rounded-full bg-white">
      <Icon className="text-[#B476FF]" size={20} />
    </div>
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);

const Section = ({ title, items, getPhotoUrl, type }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-[#B476FF] mb-3">{title}</h3>
    {items && items.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-purple-50 p-4 border border-purple-200 rounded-xl shadow-sm md:flex-row md:max-w-full hover:shadow-lg transition"
          >
            <img
              className="object-cover w-full rounded-xl h-40 md:h-28 mb-4 md:mb-0"
              src={getPhotoUrl(item.photo, type)}
              alt={item.name}
            />
            <div className="flex flex-col justify-between md:ml-4">
              <h5 className="mb-2 text-xl font-bold text-[#B476FF]">{item.name}</h5>
              {item.prices && <p className="text-gray-700 text-sm">Price: {item.prices} Ks</p>}
              {item.size && <p className="text-gray-500 text-sm">Size: {item.size}</p>}
              {item.category && <p className="text-gray-500 text-sm">Category: {item.category}</p>}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No {title.toLowerCase()}</p>
    )}
  </div>
);
