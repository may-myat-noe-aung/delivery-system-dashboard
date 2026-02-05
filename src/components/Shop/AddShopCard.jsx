

// // export default AddShopCard;
// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   User,
//   Package,
//   Phone,
//   Eye,
//   CheckCircle,
//   ShieldCheck,
//   CalendarDays,
// } from "lucide-react";
// import axios from "axios";

// const AddShopCard = ({ onDetail }) => {
//   const [shops, setShops] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterBy, setFilterBy] = useState("shop_name");

//   // ==========================
//   // 🔥 LIVE FETCH EVERY 500ms
//   // ==========================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios
//         .get("http://38.60.244.108:3000/shops")
//         .then((res) => setShops(res.data))
//         .catch((err) => console.error("API Error:", err));
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const filteredShops = shops.filter((shop) => {
//     if (!searchTerm) return true;
//     const term = searchTerm.toLowerCase();
//     return shop[filterBy]?.toLowerCase().includes(term);
//   });

//   return (
//     <section className="w-full overflow-y-auto h-full pl-8 scrollbar-hide">
//       {/* Search + Filter */}
//       <div className="flex flex-col sm:flex-row items-center justify-between py-6 bg-[#F6F6F6] sticky top-0 z-20 gap-4 sm:gap-0">
//         <div className="relative flex items-center w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
//           <input
//             type="text"
//             placeholder={`Search by ${filterBy}`}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
//           />
//         </div>

//         <select
//           value={filterBy}
//           onChange={(e) => setFilterBy(e.target.value)}
//           className="border border-[#B476FF] text-[#B476FF] rounded-full px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#B476FF]"
//         >
//           <option value="shop_name">Shop Name</option>
//           <option value="id">ID</option>
//           <option value="shopkeeper_name">Shopkeeper</option>
//           <option value="email">Email</option>
//         </select>
//       </div>

//       {/* Cards */}
//       <div className="mb-6">
//         {filteredShops.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-6">
//             {filteredShops.map((shop) => (
//               <div
//                 key={shop.id}
//                 className="bg-[#B476FF] p-4 rounded-xl shadow-md w-full max-w-xs flex flex-col gap-4"
//               >
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                   <p className="text-lg font-semibold text-white">
//                     {shop.shop_name}
//                   </p>
//                 </div>

//                 {/* Shop Info */}
//                 <div className="flex items-center gap-4">
//                   {shop.photo ? (
//                     <img
//                       src={`http://38.60.244.108:3000/shop-uploads/${shop.photo}`}
//                       alt={shop.shop_name}
//                       className="w-24 h-24 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded text-white text-xs">
//                       No Image
//                     </div>
//                   )}

//                   <div className="flex-1">
//                     <h4 className="font-medium text-md text-white mb-1 flex items-center gap-1">
//                       <User size={16} /> {shop.shopkeeper_name}
//                     </h4>

//                     <p className="text-sm text-white flex items-center gap-1">
//                       <Package size={15} /> Items: {shop.items}
//                     </p>

//                     <p className="text-sm text-white flex items-center gap-1">
//                       <Phone size={15} /> {shop.phone}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="text-xs text-white">
//                   <p className="font-semibold">Email</p>
//                   <p>{shop.email}</p>
//                 </div>

//                 {/* Address */}
//                 <div className="text-xs text-white">
//                   <p className="font-semibold">Address</p>
//                   <p>{shop.address}</p>
//                 </div>

//                 {/* Status */}
//                 <div className="text-xs text-white flex items-center gap-1">
//                   <CheckCircle size={14} /> Status: {shop.status}
//                 </div>

//                 {/* Permission */}
//                 <div className="text-xs text-white flex items-center gap-1">
//                   <ShieldCheck size={14} /> Permission: {shop.permission}
//                 </div>

//                 {/* Created */}
//                 <div className="text-xs text-white flex items-center gap-1">
//                   <CalendarDays size={14} /> Created: {shop.created_at}
//                 </div>

//                 {/* View Menu Button */}
//                 <button
//                   onClick={() => onDetail(shop.id)}
//                   className="bg-white text-[#B476FF] px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
//                 >
//                   <Eye size={16} /> View Menus
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : null}
//       </div>
//     </section>
//   );
// };

// export default AddShopCard;
import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  Package,
  Phone,
  Eye,
  CheckCircle,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
import axios from "axios";

const AddShopCard = ({ onDetail }) => {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("shop_name");

  // ==========================
  // 🔥 LIVE FETCH EVERY 500ms
  // ==========================
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.108:3000/shops")
        .then((res) => setShops(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const filteredShops = shops.filter((shop) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return shop[filterBy]?.toLowerCase().includes(term);
  });

  return (
    <section className="w-full overflow-y-auto h-full pl-8 scrollbar-hide">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-6 bg-[#F6F6F6] sticky top-0 z-20 gap-4 sm:gap-0">
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
          <input
            type="text"
            placeholder={`Search by ${filterBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] text-sm shadow-sm"
          />
        </div>

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border border-[#B476FF] text-[#B476FF] rounded-full px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#B476FF]"
        >
          <option value="shop_name">Shop Name</option>
          <option value="id">ID</option>
          <option value="shopkeeper_name">Shopkeeper</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Cards */}
      <div className="mb-6">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-6">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-[#B476FF] p-4 rounded-xl shadow-md w-full max-w-xs flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">
                    {shop.shop_name}
                  </p>
                </div>

                {/* Shop Info */}
                <div className="flex items-center gap-4">
                  {shop.photo ? (
                    <img
                      src={`http://38.60.244.108:3000/shop-uploads/${shop.photo}`}
                      alt={shop.shop_name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded text-white text-xs">
                      No Image
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="font-medium text-md text-white mb-1 flex items-center gap-1">
                      <User size={16} /> {shop.shopkeeper_name}
                    </h4>

                    <p className="text-sm text-white flex items-center gap-1">
                      <Package size={15} /> Items: {shop.items}
                    </p>

                    <p className="text-sm text-white flex items-center gap-1">
                      <Phone size={15} /> {shop.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="text-xs text-white">
                  <p className="font-semibold">Email</p>
                  <p>{shop.email}</p>
                </div>

                {/* Address */}
                <div className="text-xs text-white">
                  <p className="font-semibold">Address</p>
                  <p>{shop.address}</p>
                </div>

                {/* Status */}
                <div className="text-xs text-white flex items-center gap-1">
                  <CheckCircle size={14} /> Status: {shop.status}
                </div>

                {/* Permission */}
                <div className="text-xs text-white flex items-center gap-1">
                  <ShieldCheck size={14} /> Permission: {shop.permission}
                </div>

                {/* Created */}
                <div className="text-xs text-white flex items-center gap-1">
                  <CalendarDays size={14} /> Created: {shop.created_at}
                </div>

                {/* View Menu Button */}
                <button
                  onClick={() => onDetail(shop.id)}
                  className="bg-white text-[#B476FF] px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <Eye size={16} /> View Menus
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No shops found.</p>
        )}
      </div>
    </section>
  );
};

export default AddShopCard;
