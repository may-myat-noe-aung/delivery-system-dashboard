import React from "react";
import { Users, AlertTriangle, Truck, Store, Plus } from "lucide-react";

const TopCards = () => {
  const cards = [
    {
      id: 1,
      title: "Users",
      value: "2,485",
      change: "+12%",
      changeType: "positive",
      icon: <Users className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 2,
      title: "System Failures",
      value: "48",
      change: "-5%",
      changeType: "negative",
      icon: <AlertTriangle className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 3,
      title: "Deliveries",
      value: "1,756",
      change: "+8%",
      changeType: "positive",
      icon: <Truck className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 4,
      title: "Shops",
      value: "324",
      change: "+3%",
      changeType: "positive",
      icon: <Store className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 5,
      title: "Add New Widgets",
      value: "",
      change: "",
      changeType: "",
      icon: <Plus className="w-8 h-8 text-gray-700" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center text-center"
        >
          <div className="mb-2">{card.icon}</div>
          <h2 className="text-xl font-semibold">{card.value}</h2>
          <p className="text-gray-600">{card.title}</p>
          {card.change && (
            <span
              className={`mt-2 text-sm font-medium ${
                card.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {card.change}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopCards;
