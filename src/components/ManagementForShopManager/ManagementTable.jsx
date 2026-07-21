import React, { useState } from "react";
import PendingShopsFull from "./PendingShopsFull";
import ShopkeeperTable from "./ShopkeeperTable";

export default function ManagementTable() {
  const [selectedTab, setSelectedTab] = useState("User");

  return (
    <div className="text-white">
      <PendingShopsFull />

      {/* Table Switch */}
      <div className=" mb-10">
        <ShopkeeperTable />
      </div>
    </div>
  );
}
