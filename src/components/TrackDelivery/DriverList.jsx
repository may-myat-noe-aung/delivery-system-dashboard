// import React from "react";
// import { Truck, Phone, Package, MapPin } from "lucide-react";

// export default function DriverList({ drivers, selected, onSelect }) {
//   return (
//     <div>
//       <h2 className="text-purple-400 font-semibold mb-4">
//         Delivery Men
//       </h2>

//       <div className="space-y-2">
//         {drivers.map((d) => {
//           const isOnline = d.is_online === 1;
//           const isActive = selected?.id === d.id;

//           return (
//             <div
//               key={d.id}
//               onClick={() => onSelect(d)}
//               className={`
//                 p-3 rounded-2xl cursor-pointer transition
//                 border border-slate-700
//                 hover:bg-slate-800/50
//                 ${isActive ? "bg-slate-800" : ""}
//               `}
//             >
//               <div className="flex justify-between items-center">

//                 <div className="flex items-center gap-2">
//                   <Truck size={18} className="text-purple-400" />
//                   <span className="font-semibold">{d.name}</span>
//                 </div>

//                 <span
//                   className={`text-xs px-2 py-1 rounded-full ${
//                     isOnline
//                       ? "bg-green-500/20 text-green-400"
//                       : "bg-gray-500/20 text-gray-400"
//                   }`}
//                 >
//                   {isOnline ? "Online" : "Offline"}
//                 </span>
//               </div>

//               <div className="mt-2 text-xs text-gray-400 space-y-1">

//                 <div className="flex items-center gap-2">
//                   <Phone size={14} />
//                   {d.phone}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Package size={14} />
//                   Orders: {d.assign_order}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <MapPin size={14} />
//                   {d.location}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Truck, Phone, Package, MapPin, Search } from "lucide-react";

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
      <h2 className="text-purple-400 font-semibold mb-4">Delivery Men</h2>

      {/*  SEARCH + FILTER BAR */}
      <div className="space-y-2 mb-4 ">
        <div className="mb-3 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or phone..."
            className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
          />
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full border ${
              filter === "all"
                ? "bg-purple-500/20 text-purple-400 border-purple-500"
                : "border-slate-600 text-gray-400"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("online")}
            className={`px-3 py-1 rounded-full border ${
              filter === "online"
                ? "bg-green-500/20 text-green-400 border-green-500"
                : "border-slate-600 text-gray-400"
            }`}
          >
            Online
          </button>

          <button
            onClick={() => setFilter("offline")}
            className={`px-3 py-1 rounded-full border ${
              filter === "offline"
                ? "bg-gray-500/20 text-gray-300 border-gray-500"
                : "border-slate-600 text-gray-400"
            }`}
          >
            Offline
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-2 h-[530px] overflow-y-auto">
        {drivers.length === 0 ? (
          <p className="text-xs text-gray-500">No drivers found</p>
        ) : (
          drivers.map((d) => {
            const isOnline = d.is_online === 1;
            const isActive = selected?.id === d.id;

            return (
              <div
                key={d.id}
                onClick={() => onSelect(d)}
                className={`
                  p-3 rounded-2xl cursor-pointer transition
                  border border-slate-700
                  hover:bg-slate-800/50
                  ${isActive ? "bg-slate-800" : ""}
                `}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-purple-400" />
                    <span className="font-semibold text-white">{d.name}</span>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isOnline
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {d.phone}
                  </div>

                  <div className="flex items-center gap-2">
                    <Package size={14} />
                    Orders: {d.assign_order}
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {d.location}
                  </div> */}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
