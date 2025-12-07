// import React from "react";
// import { User, CheckCircle, Package, Truck } from "lucide-react";

// export default function DeliverySummary({ deliverymen }) {
//   // Calculations
//   const totalDeliverymen = deliverymen.length;
//   const activeDeliverymen = deliverymen.filter(d => d.status === "active").length;
//   const totalOrders = deliverymen.reduce((sum, d) => sum + (d.total_order || 0), 0);
//   const assignedOrders = deliverymen.reduce((sum, d) => sum + (d.assign_order || 0), 0);

//   const cards = [
//     { title: "Total Deliverymen", value: totalDeliverymen, bg: "bg-purple-100", icon: <User size={28} className="text-purple-600" /> },
//     { title: "Active Deliverymen", value: activeDeliverymen, bg: "bg-green-100", icon: <CheckCircle size={28} className="text-green-600" /> },
//     { title: "Total Orders", value: totalOrders, bg: "bg-blue-100", icon: <Package size={28} className="text-blue-600" /> },
//     { title: "Orders Assigned", value: assignedOrders, bg: "bg-orange-100", icon: <Truck size={28} className="text-orange-600" /> },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//       {cards.map((card, idx) => (
//         <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">{card.title}</p>
//             <p className="text-xl font-bold">{card.value}</p>
//           </div>
//           <div className="p-3 rounded-full bg-opacity-30">
//             {card.icon}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";
import { User, CheckCircle, Package, Truck } from "lucide-react";

export default function DeliverySummary() {
  // Hardcoded data for deliverymen
  const deliverymen = [
    { id: "D001", name: "John Doe", status: "active", total_order: 10, assign_order: 5 },
    { id: "D002", name: "Jane Smith", status: "inactive", total_order: 8, assign_order: 3 },
    { id: "D003", name: "Bob Johnson", status: "active", total_order: 15, assign_order: 12 },
    { id: "D004", name: "Alice Brown", status: "active", total_order: 20, assign_order: 18 },
  ];

  // Calculations
  const totalDeliverymen = deliverymen.length;
  const activeDeliverymen = deliverymen.filter(d => d.status === "active").length;
  const totalOrders = deliverymen.reduce((sum, d) => sum + (d.total_order || 0), 0);
  const assignedOrders = deliverymen.reduce((sum, d) => sum + (d.assign_order || 0), 0);

  const cards = [
    { title: "Total Deliverymen", value: totalDeliverymen, bg: "bg-purple-100", icon: <User size={28} className="text-white" /> },
    { title: "Active Deliverymen", value: activeDeliverymen, bg: "bg-green-100", icon: <CheckCircle size={28} className="text-green-700" /> },
    { title: "Total Orders", value: totalOrders, bg: "bg-blue-100", icon: <Package size={28} className="text-blue-700" /> },
    { title: "Orders Assigned", value: assignedOrders, bg: "bg-orange-100", icon: <Truck size={28} className="text-orange-700" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-[#B476FF] rounded-xl shadow p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white mb-2">{card.title}</p>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
          <div className="p-3 rounded-full bg-opacity-30">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
