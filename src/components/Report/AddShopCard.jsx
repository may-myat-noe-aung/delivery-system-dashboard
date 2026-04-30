import React, { useState } from "react";
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

const AddShopCard = ({ shops, onDetail, onViewShopDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("shop_name");

  // Filter function
  const filteredShops = shops.filter((shop) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return shop[filterBy]?.toLowerCase().includes(term);
  });

 return (
  <section className="w-full overflow-y-auto h-full pl-8 scrollbar-hide bg-gray-900">
    {/* Search + Filter */}
  

    {/* Cards */}
    <div className="my-6">
      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md w-full max-w-xs flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-[#B476FF]">
                  {shop.shop_name}
                </p>
              </div>

              {/* Shop Info */}
              <div className="flex items-center gap-4">
                {shop.photo ? (
                  <img
                    src={`http://38.60.244.137:3000/shop-uploads/${shop.photo}`}
                    alt={shop.shop_name}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-600 rounded text-gray-400 text-xs">
                    No Image
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="font-medium text-md text-gray-100 mb-1 flex items-center gap-1">
                    <User size={16} /> {shop.shopkeeper_name}
                  </h4>
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    <Package size={15} /> Items: {shop.items}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    <Phone size={15} /> {shop.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="text-xs text-gray-300">
                <p className="font-semibold text-gray-200">Email</p>
                <p>{shop.email}</p>
              </div>

              {/* Address */}
              <div className="text-xs text-gray-300">
                <p className="font-semibold text-gray-200">Address</p>
                <p>{shop.address}</p>
              </div>
              {/* Buttons */}
              <div className="flex items-center justify-end ">
             

                <button
                  onClick={() => onDetail(shop.id)}
                  className="bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#9c5bcc] transition-colors"
                >
                  {/* <Eye size={16} />  */}
                  View All Reports
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-6">No shops found.</p>
      )}
    </div>
  </section>
);
};

export default AddShopCard;

