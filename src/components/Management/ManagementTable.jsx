
import React, { useState } from "react";
import PendingShopsFull from "./PendingShopsFull";
import UserTable from "./UserTable";
import DeliveryTable from "./DeliveryTable";
import ShopkeeperTable from "./ShopkeeperTable";
import SpecialUser from "./SpecialUser";

export default function ManagementTable() {
  const [selectedTab, setSelectedTab] = useState("User");

  return (
    <div className="text-white">
      <PendingShopsFull />

      <div className="mt-4 bg-[#1a1f2b] border border-[#2c2f44] rounded-2xl p-6 shadow-2xl">
        {/* Tabs */}
        <div className="flex gap-6 ">
          {["User", "Special User", "Shopkeeper", "Delivery"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTab === tab
                  ? " bg-[#B476FF] to-purple-600 text-white shadow-lg"
                  : "bg-[#2c2f44] text-gray-300 hover:bg-[#3a3f5c]"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Switch */}
        <div className=" mb-10">
          {selectedTab === "User" && <UserTable />}
          {selectedTab === "Special User" && <SpecialUser />}
          {selectedTab === "Shopkeeper" && <ShopkeeperTable />}
          {selectedTab === "Delivery" && <DeliveryTable />}
        </div>
      </div>
    </div>
  );
}