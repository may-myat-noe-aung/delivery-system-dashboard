    import React, { useState } from "react";
import { Search, Edit, Trash2, Store, SearchCheckIcon, SearchCode } from "lucide-react";

const AddShopCard = ({ shops }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("shopName"); // default filter

  const filteredShops = shops.filter((shop) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    switch (filterBy) {
      case "shopName":
        return shop.shopName.toLowerCase().includes(term);
      case "code":
        return shop.code?.toLowerCase().includes(term);
      case "shopType":
        return shop.shopType?.toLowerCase().includes(term);
      case "shopkeeperName":
        return shop.shopkeeperName?.toLowerCase().includes(term);
      case "email":
        return shop.email?.toLowerCase().includes(term);
      default:
        return true;
    }
  });

  return (
    <section className="w-full overflow-y-auto h-full pl-8 scrollbar-hide">
      <div className="flex items-center justify-between py-6 bg-[#F6F6F6] sticky top-0 z-20">
        {/* Search Box */}
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B476FF]" />
          <input
            type="text"
            placeholder={`Search by ${filterBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[#B476FF] focus:ring-2 focus:ring-[#B476FF] focus:outline-none text-sm shadow-sm"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border border-[#B476FF] text-[#B476FF] rounded-full px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#B476FF] focus:outline-none cursor-pointer"
        >
          <option value="shopName">Shop Name</option>
          <option value="code">Code</option>
          <option value="shopType">Shop Type</option>
          <option value="shopkeeperName">Shopkeeper Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div className="mb-6">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-3 justify-items-center gap-6">
            {filteredShops.map((shop, index) => (
              <div
                key={index}
                className="bg-[#B476FF] p-4 rounded-xl shadow-md w-[320px] h-auto flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">
                    {shop.shopName}
                  </p>
                  <div className="flex items-center gap-2 bg-white shadow-sm py-1 px-3 rounded-md">
                    <Edit className="w-4 h-4 text-[#B476FF] cursor-pointer" />
                    <div className="w-[1px] h-5 bg-[#B476FF]" />
                    <Trash2 className="w-4 h-4 text-[#B476FF] cursor-pointer" />
                  </div>
                </div>

                {/* Shop Info */}
                <div className="flex items-center gap-4">
                  {shop.image ? (
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded text-white text-xs">
                      No Image
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-sm text-white mb-1">
                      Shopkeeper - {shop.name}
                    </h4>
                    <p className="text-xs text-white">Code: {shop.code}</p>
                    <p className="text-xs text-white">
                      Shop Type: {shop.shopType}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center justify-between text-xs text-white">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{shop.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p>{shop.contact}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="text-xs text-white">
                  <p className="font-semibold">Address</p>
                  <p>{shop.address}</p>
                </div>

                {/* Location */}
                <div className="text-xs text-white">
                  <p className="font-semibold">Location</p>
                  <p>{shop.mapLocation}</p>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center justify-center py-8 px-6">
      {/* Animated illustration container */}
      <div className="relative mb-8">
        {/* Background decorative elements */}
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#B476FF]/10 rounded-full animate-pulse" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#B476FF]/20 rounded-full animate-pulse delay-300" />

        {/* Main illustration */}
        <div className="relative bg-gradient-to-br from-[#B476FF]/5 to-[#B476FF]/5 rounded-3xl p-12 border border-[#B476FF]/10">
          <div className="flex items-center justify-center space-x-4">
            <div className="relative">
              <Store className="w-16 h-16 text-[#B476FF]/60" strokeWidth={1.5} />
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

      {/* Content */}
      <div className="text-center max-w-md space-y-4">
        <h3 className="text-2xl font-bold text-foreground text-balance text-[#B476FF]">No shops found in this area</h3>
        <p className="text-muted-foreground text-md leading-relaxed text-pretty">
          We couldn't find any shops matching your search. Try expanding your search area or exploring different
          categories.
        </p>
      </div>

    </div>
      </div>
        ) : null}
      </div>
    </section>
  );
};

export default AddShopCard;


