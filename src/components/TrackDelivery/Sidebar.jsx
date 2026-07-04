import React from "react";
import { Search, Truck, Phone } from "lucide-react";

export default function DriverList({
  drivers,
  selected,
  onSelect,
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div>

      {/* HEADER */}
      <h2 className="text-purple-400 font-semibold mb-3">
        Delivery Men
      </h2>

      {/* SEARCH */}
      <div className="relative mb-3">
        <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or phone..."
          className="w-full pl-7 py-2 text-sm bg-slate-900 border border-slate-700 rounded-xl"
        />
      </div>

      {/* FILTER */}
      <div className="flex gap-2 mb-4 text-xs">
        {["all", "online", "offline"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-1 rounded-lg border ${
              filter === f
                ? "bg-purple-500 text-white border-purple-500"
                : "border-slate-600 text-gray-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">

        {drivers.map((d) => {
          const isOnline = d.is_online === 1;
          const isActive = selected?.id === d.id;

          return (
            <div
              key={d.id}
              onClick={() => onSelect(d)}
              className={`p-3 rounded-xl cursor-pointer border transition ${
                isActive
                  ? "bg-slate-800 border-purple-500"
                  : "border-slate-700 hover:bg-slate-800/40"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold text-white">{d.name}</span>

                <span
                  className={`text-xs ${
                    isOnline ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                <Phone size={12} /> {d.phone}
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-2">
                <Truck size={12} /> {d.assign_order} orders
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}