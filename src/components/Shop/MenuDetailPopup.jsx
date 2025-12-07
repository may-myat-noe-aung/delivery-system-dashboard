// import React from "react";
// import { X } from "lucide-react";

// export default function MenuDetailPopup({ menu, onClose }) {
//   if (!menu) return null;

//   const getPhotoUrl = (photo) => {
//     if (!photo) return null;
//     return photo.startsWith("http")
//       ? photo
//       : `http://38.60.244.108:3000/menu-uploads/${photo}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-1/2 max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-3xl font-bold text-[#B476FF] mb-6 ">{menu.name}</h2>

//         {/* Top Section: Photo + Main Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* PHOTO */}
//           <div className="flex justify-center items-center">
//             {menu.photo ? (
//               <img
//                 src={getPhotoUrl(menu.photo)}
//                 alt={menu.name}
//                 className="w-full max-w-md h-64 object-cover rounded-xl shadow-lg"
//               />
//             ) : (
//               <div className="w-full max-w-md h-64 bg-purple-100 flex items-center justify-center rounded-xl">
//                 <p className="text-[#B476FF] text-lg">No Image</p>
//               </div>
//             )}
//           </div>

//           {/* DETAILS */}
//           <div className="flex flex-col justify-start gap-2 text-gray-700">
//             <p>
//               <span className="font-semibold">Category:</span>{" "}
//               {menu.category || "-"}
//             </p>
//             <p>
//               <span className="font-semibold">Price:</span> {menu.prices} Ks
//             </p>
//             <p>
//               <span className="font-semibold">Size:</span>{" "}
//               {menu.size || "No size"}
//             </p>
//             <p>
//               <span className="font-semibold">Description:</span>{" "}
//               {menu.description || "-"}
//             </p>
//             <p>
//               <span className="font-semibold">Complete Orders:</span>{" "}
//               {menu.complete_order}
//             </p>
//             <p>
//               <span className="font-semibold">Rating:</span> {menu.rating} (
//               {menu.rating_count} reviews)
//             </p>
//             <p>
//               <span className="font-semibold">Available Months:</span>{" "}
//               {menu.get_months?.length ? menu.get_months.join(", ") : "-"}
//             </p>
//             <p>
//               <span className="font-semibold">Created At:</span>{" "}
//               {menu.created_at}
//             </p>
//           </div>
//         </div>

//         {/* RELATED MENU */}
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold text-[#B476FF] mb-3">
//             Related Menu
//           </h3>
//           {menu.relate_menu && menu.relate_menu.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {menu.relate_menu.map((item) => (
//                 <div
//                   key={item.id}
//                   className="border rounded-xl p-3 shadow hover:shadow-lg transition bg-white"
//                 >
//                   {item.photo ? (
//                     <img
//                       src={`http://38.60.244.108:3000/menu-uploads/${item.photo}`}
//                       alt={item.name}
//                       className="w-full h-32 object-cover rounded-lg mb-2"
//                     />
//                   ) : (
//                     <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
//                       <p className="text-gray-500 text-sm">No Image</p>
//                     </div>
//                   )}
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-600">{item.prices} Ks</p>
//                   <p className="text-sm text-gray-600">
//                     {item.size || "No size"}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {item.category || "-"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No related menus</p>
//           )}
//         </div>

//         {/* INGREDIENTS */}
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold text-[#B476FF] mb-3">
//             Ingredients
//           </h3>
//           {menu.relate_ingredients && menu.relate_ingredients.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {menu.relate_ingredients.map((item) => (
//                 <div
//                   key={item.id}
//                   className="border rounded-xl p-3 shadow hover:shadow-lg transition bg-white"
//                 >
//                   {item.photo ? (
//                     <img
//                       src={`http://38.60.244.108:3000/menu-uploads/${item.photo}`}
//                       alt={item.name}
//                       className="w-full h-32 object-cover rounded-lg mb-2"
//                     />
//                   ) : (
//                     <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
//                       <p className="text-gray-500 text-sm">No Image</p>
//                     </div>
//                   )}
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-sm text-gray-600">{item.prices} Ks</p>
//                   <p className="text-sm text-gray-600">
//                     {item.size || "No size"}
//                   </p>
//                 </div>
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

import React from "react";
import { X } from "lucide-react";

export default function MenuDetailPopup({ menu, onClose }) {
  if (!menu) return null;

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    return photo.startsWith("http")
      ? photo
      : `http://38.60.244.108:3000/menu-uploads/${photo}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-1/2 max-w-5xl p-6 relative overflow-y-auto max-h-[90vh] scrollbar-hide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#B476FF] mb-6 ">{menu.name}</h2>

        {/* Top Section: Photo + Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PHOTO */}
          <div className="flex justify-center items-center">
            {menu.photo ? (
              <img
                src={getPhotoUrl(menu.photo)}
                alt={menu.name}
                className="w-full max-w-md h-64 object-cover rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-full max-w-md h-64 bg-purple-100 flex items-center justify-center rounded-xl">
                <p className="text-[#B476FF] text-lg">No Image</p>
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-start gap-2 text-gray-700">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {menu.category || "-"}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {menu.prices} Ks
            </p>
            <p>
              <span className="font-semibold">Size:</span>{" "}
              {menu.size || "No size"}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {menu.description || "-"}
            </p>
            <p>
              <span className="font-semibold">Complete Orders:</span>{" "}
              {menu.complete_order}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {menu.rating} (
              {menu.rating_count} reviews)
            </p>
            <p>
              <span className="font-semibold">Available Months:</span>{" "}
              {menu.get_months?.length ? menu.get_months.join(", ") : "-"}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {menu.created_at}
            </p>
          </div>
        </div>

        {/* RELATED MENU */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#B476FF] mb-3">
            Related Menu
          </h3>
          {menu.relate_menu && menu.relate_menu.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {menu.relate_menu.map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex flex-col items-center bg-purple-50 p-4 border border-purple-200 rounded-xl shadow-sm md:flex-row md:max-w-full hover:shadow-lg transition"
                >
                  {/* Image */}
                  <img
                    className="object-cover w-full rounded-xl h-40 md:size-28 mb-4 md:mb-0"
                    src={getPhotoUrl(item.photo)}
                    alt={item.name}
                  />

                  {/* Content */}
                  <div className="flex flex-col justify-between md:ml-4">
                    <h5 className="mb-2 text-xl font-bold text-[#B476FF]">
                      {item.name}
                    </h5>
                    <p className="text-gray-700 ">
                      Price: {item.prices} Ks
                    </p>
                    <p className="text-gray-500 ">
                      Size: {item.size || "No size"}
                    </p>
                    <p className="text-gray-500 ">
                      category: {item.category || "No category"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No related menus</p>
          )}
        </div>

   {/* INGREDIENTS */}
<div className="mt-8">
  <h3 className="text-xl font-semibold text-[#B476FF] mb-3">
    Ingredients
  </h3>
  {menu.relate_ingredients && menu.relate_ingredients.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {menu.relate_ingredients.map((item, idx) => (
        <a
          key={idx}
          href="#"
          className="flex flex-col items-center bg-purple-50 p-4 border border-purple-200 rounded-xl shadow-sm md:flex-row md:max-w-full hover:shadow-lg transition"
        >
          {/* Image */}
          <img
            className="object-cover w-full rounded-xl h-40 md:size-28 mb-4 md:mb-0"
            src={
              item.photo
                ? item.photo.startsWith("http")
                  ? item.photo
                  : `http://38.60.244.108:3000/ingredients-uploads/${item.photo}`
                : null
            }
            alt={item.name}
          />

          {/* Content */}
          <div className="flex flex-col justify-between md:ml-4">
            <h5 className="mb-2 text-xl font-bold text-[#B476FF]">
              {item.name}
            </h5>
            <p className="text-gray-700 text-sm ">
              Price: {item.prices} Ks
            </p>
          </div>
        </a>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No ingredients</p>
  )}
</div>

      </div>
    </div>
  );
}
