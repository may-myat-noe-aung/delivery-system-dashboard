// import React from "react";
// import { ChevronDown, Edit, Play, Search, Trash2 } from "lucide-react";

// const AddMenuCard = ({ menus }) => {
//   return (
//     <section className="w-full overflow-y-auto h-full pl-8 scrollbar-hide">
//       <div className="flex items-center justify-between py-6  bg-[#F6F6F6] sticky top-0 z-20 ">
//         {/* Search Bar */}
//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 w-4 h-4 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="pl-9 pr-3 py-2 text-sm rounded-full bg-white border border-gray-200 focus:ring-0 focus:outline-none w-full shadow-sm"
//           />
//         </div>
//       </div>

//       <div className="mb-6">
//         <div className="grid grid-cols-3 justify-items-center gap-8">
//           {menus.map((menu, index) => (
//             <div
//               key={index}
//               className="bg-[#B476FF] p-4 rounded-xl shadow-md w-[320px] h-auto flex flex-col gap-4"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between">
//                 <p className="bg-white rounded-full p-2 shadow-md flex items-center gap-1">
//                   <Play className="size-4 font-bold text-[#B476FF]" />
//                   {menu.voice}
//                 </p>
//                 <p className="text-lg font-semibold text-white">{menu.shop}</p>
//                 <div className="flex items-center gap-2 bg-white py-1 px-3 rounded-md shadow-md">
//                   <Edit className="size-4 text-[#B476FF] cursor-pointer" />
//                   <div className="w-[1px] h-5 bg-[#B476FF]" />
//                   <Trash2 className="size-4 text-[#B476FF] cursor-pointer" />
//                 </div>
//               </div>

//               {/* Image + Info */}
//               <div className="flex items-center gap-4">
//                 {menu.image ? (
//                   <img
//                     src={menu.image}
//                     alt={menu.name}
//                     className="size-[80px] object-cover rounded"
//                   />
//                 ) : (
//                   <div className="size-[80px] flex items-center justify-center border-2 border-dashed text-white text-xs rounded">
//                     No Image
//                   </div>
//                 )}
//                 <div>
//                   <h4 className="font-bold text-base text-white">
//                     {menu.name}
//                   </h4>
//                   <p className="text-sm text-white">Code - {menu.itemCode}</p>
//                   <p className="text-sm text-white">
//                     Category - {menu.category}
//                   </p>
//                 </div>
//               </div>

//               {/* Combo */}
//               <div>
//                 <p className="text-base mb-1 text-white font-semibold">Combo</p>
//                 <div className="grid grid-cols-3 ">
//                   {menu.comboImages.map((image, index) => (
//                     <div key={index} className="flex flex-col items-center">
//                       {image ? (
//                         <img
//                           src={image}
//                           alt={`Combo ${index + 1}`}
//                           className="size-16 object-cover shadow-md rounded"
//                         />
//                       ) : (
//                         <div className="size-16 flex items-center justify-center border-2 border-dashed text-white text-xs rounded">
//                           No Img
//                         </div>
//                       )}
//                       {/* ✅ Show combo name */}
//                       <p className="text-xs text-white mt-1">
//                         {menu[`comboCode${index}`] || "No Code"}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <p className="text-base font-semibold text-white">
//                   Description
//                 </p>
//                 <p className="text-sm text-white">{menu.description}</p>
//               </div>

//               {/* Remark */}
//               <div>
//                 <p className="text-base font-semibold text-white">Remark</p>
//                 <p className="text-sm text-white">{menu.remark}</p>
//               </div>

//               {/* Footer */}
//               <div className="flex justify-between items-center bg-white p-2 rounded-lg text-[#B476FF]">
//                 <span className="text-xs font-semibold text-center">
//                   Price <br />
//                   <p>{menu.price}Ks</p>
//                 </span>
//                 <span className="text-xs font-semibold text-center">
//                   Discount <br />
//                   <p>{menu.discount}%</p>
//                 </span>
//                 <span className="text-xs font-semibold text-center">
//                   Quantity <br />
//                   <p>{menu.quantity} Q</p>
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddMenuCard;

import React, { useState } from "react";
import {
  ChevronDown,
  Edit,
  Play,
  Search,
  Trash2,
  Utensils,
} from "lucide-react";

const AddMenuCard = ({ menus }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name"); // default search by food name

  const filteredMenus = menus.filter((menu) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    switch (filterBy) {
      case "name":
        return menu.name?.toLowerCase().includes(term);
      case "category":
        return menu.category?.toLowerCase().includes(term);
      case "shop":
        return menu.shop?.toLowerCase().includes(term);
      default:
        return true;
    }
  });

  return (
    <section className="w-full overflow-y-auto h-full pl-8 scrollbar-hide">
      {/* Search + Filter */}
      <div className="flex items-center justify-between py-6 bg-[#F6F6F6] sticky top-0 z-20">
        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={`Search by ${filterBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm rounded-full bg-white border border-gray-200 focus:ring-0 focus:outline-none w-full shadow-sm"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="ml-4 border border-[#B476FF] text-[#B476FF] rounded-full px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#B476FF] focus:outline-none cursor-pointer"
        >
          <option value="name">Food Name</option>
          <option value="category">Category</option>
          <option value="shop">Shop</option>
        </select>
      </div>

      <div className="mb-6">
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-3 justify-items-center gap-8">
            {filteredMenus.map((menu, index) => (
              <div
                key={index}
                className="bg-[#B476FF] p-4 rounded-xl shadow-md w-[320px] h-auto flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <p className="bg-white rounded-full p-2 shadow-md flex items-center gap-1">
                    <Play className="size-4 font-bold text-[#B476FF]" />
                    {menu.voice}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {menu.shop}
                  </p>
                  <div className="flex items-center gap-2 bg-white py-1 px-3 rounded-md shadow-md">
                    <Edit className="size-4 text-[#B476FF] cursor-pointer" />
                    <div className="w-[1px] h-5 bg-[#B476FF]" />
                    <Trash2 className="size-4 text-[#B476FF] cursor-pointer" />
                  </div>
                </div>

                {/* Image + Info */}
                <div className="flex items-center gap-4">
                  {menu.image ? (
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="size-[80px] object-cover rounded"
                    />
                  ) : (
                    <div className="size-[80px] flex items-center justify-center border-2 border-dashed text-white text-xs rounded">
                      No Image
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-base text-white">
                      {menu.name}
                    </h4>
                    <p className="text-sm text-white">Code - {menu.itemCode}</p>
                    <p className="text-sm text-white">
                      Category - {menu.category}
                    </p>
                  </div>
                </div>

                {/* Combo */}
                <div>
                  <p className="text-base mb-1 text-white font-semibold">
                    Combo
                  </p>
                  <div className="grid grid-cols-3 ">
                    {menu.comboImages.map((image, index) => (
                      <div key={index} className="flex flex-col items-center">
                        {image ? (
                          <img
                            src={image}
                            alt={`Combo ${index + 1}`}
                            className="size-16 object-cover shadow-md rounded"
                          />
                        ) : (
                          <div className="size-16 flex items-center justify-center border-2 border-dashed text-white text-xs rounded">
                            No Img
                          </div>
                        )}
                        <p className="text-xs text-white mt-1">
                          {menu[`comboCode${index}`] || "No Code"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-base font-semibold text-white">
                    Description
                  </p>
                  <p className="text-sm text-white">{menu.description}</p>
                </div>

                {/* Remark */}
                <div>
                  <p className="text-base font-semibold text-white">Remark</p>
                  <p className="text-sm text-white">{menu.remark}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center bg-white p-2 rounded-lg text-[#B476FF]">
                  <span className="text-xs font-semibold text-center">
                    Price <br />
                    <p>{menu.price}Ks</p>
                  </span>
                  <span className="text-xs font-semibold text-center">
                    Discount <br />
                    <p>{menu.discount}%</p>
                  </span>
                  <span className="text-xs font-semibold text-center">
                    Quantity <br />
                    <p>{menu.quantity} Q</p>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="container mx-auto">
            <div className="w-full flex flex-col items-center justify-center py-8 px-6">
              <div className="relative mb-8">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#B476FF]/10 rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#B476FF]/20 rounded-full animate-pulse delay-300" />
                <div className="relative bg-gradient-to-br from-[#B476FF]/5 to-[#B476FF]/5 rounded-3xl p-12 border border-[#B476FF]/10">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="relative">
                      <Utensils
                        className="w-16 h-16 text-[#B476FF]/60"
                        strokeWidth={1.5}
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#B476FF] rounded-full flex items-center justify-center">
                        <Search className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="w-12 h-2 bg-muted rounded-full animate-pulse" />
                      <div className="w-8 h-2 bg-muted rounded-full animate-pulse delay-150" />
                      <div className="w-10 h-2 bg-muted rounded-full animate-pulse delay-300" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center max-w-md space-y-4">
                <h3 className="text-2xl font-bold text-[#B476FF]">
                  No menus found
                </h3>
                <p className="text-muted-foreground text-md leading-relaxed">
                  We couldn’t find any menus matching your search. Try changing
                  your search or filter options.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AddMenuCard;
