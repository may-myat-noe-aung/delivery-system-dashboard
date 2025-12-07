// import React, { useState } from "react";
// import PendingShopsFull from "./PendingShopsFull";
// import UserTable from "./tables/UserTable";
// import ShopkeeperTable from "./tables/ShopkeeperTable";
// import DeliveryTable from "./tables/DeliveryTable";

// export default function ManagementTable() {
//   const [selectedTab, setSelectedTab] = useState("User");

//   return (
//     <div>
//       <PendingShopsFull />

//       {/* Tabs */}
//       <div className="flex gap-6 mb-6">
//         {["User", "Shopkeeper", "Delivery"].map((tab) => (
//           <button
//             key={tab}
//             className={`py-2 px-6 rounded-full ${
//               selectedTab === tab
//                 ? "bg-[#B476FF] text-white"
//                 : "bg-gray-100 text-gray-600"
//             }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Table Switch */}
//       {selectedTab === "User" && <UserTable />}
//       {selectedTab === "Shopkeeper" && <ShopkeeperTable />}
//       {selectedTab === "Delivery" && <DeliveryTable />}
//     </div>
//   );
// }

import React, { useState } from "react";
import PendingShopsFull from "./PendingShopsFull";
import UserTable from "./UserTable";
import DeliveryTable from "./DeliveryTable";
import ShopkeeperTable from "./ShopkeeperTable";

export default function ManagementTable() {
  const [selectedTab, setSelectedTab] = useState("User");

  return (
    <div>
      <PendingShopsFull />

      <div className="mt-4 border border-gray-200 rounded-2xl p-6 ">
        {/* Tabs */}
        <div className="flex gap-6 ">
          {["User", "Shopkeeper", "Delivery"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-6 rounded-full ${
                selectedTab === tab
                  ? "bg-[#B476FF] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Switch */}
        <div className="">
          {selectedTab === "User" && <UserTable />}
          {selectedTab === "Shopkeeper" && <ShopkeeperTable />}
          {selectedTab === "Delivery" && <DeliveryTable />}
        </div>
      </div>
    </div>
  );
}
