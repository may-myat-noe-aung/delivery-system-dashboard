import React from "react";
import { Clock, Users, Package, Truck } from "lucide-react";

const StatusCards = () => {
  const appUsage = [
    { id: 1, label: "Registered but not buy", value: 10, icon: <Clock className="w-5 h-5 text-gray-500" /> },
    { id: 2, label: "Loyal Customers", value: 100, icon: <Users className="w-5 h-5 text-gray-500" /> },
    { id: 3, label: "Dormant Users", value: 20, icon: <Clock className="w-5 h-5 text-gray-500" /> },
    { id: 4, label: "One-time Purchasers", value: 25, icon: <Users className="w-5 h-5 text-gray-500" /> },
  ];

  const shippingStatus = [
    { id: 1, label: "Awaiting Pickup", value: 10, icon: <Package className="w-5 h-5 text-gray-500" /> },
    { id: 2, label: "Delivery Delay", value: 20, icon: <Truck className="w-5 h-5 text-gray-500" /> },
    { id: 3, label: "Failed Delivery", value: 30, icon: <Truck className="w-5 h-5 text-gray-500" /> },
    { id: 4, label: "Delivery Success Rate", value: "2%", icon: <Package className="w-5 h-5 text-gray-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* App Usage Status */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">App Usage Status</h2>
        <div className="grid grid-cols-2 gap-4">
          {appUsage.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center"
            >
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.value}</h3>
              <p className="text-sm text-gray-600 text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Status Summary */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Status Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          {shippingStatus.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center"
            >
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.value}</h3>
              <p className="text-sm text-gray-600 text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
