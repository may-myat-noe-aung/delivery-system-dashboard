import React from "react";

function formatDateShort(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString();
}

const parseLocation = (loc) => {
  if (!loc) return { lat: null, lon: null, label: "-" };

  const lower = loc.toLowerCase();

  if (!lower.includes("lat") && !lower.includes("lag")) {
    return { lat: null, lon: null, label: loc };
  }

  const latMatch = loc.match(/(Lat|Lag)\s*([0-9.\-]+)/i);
  const lonMatch = loc.match(/(Lon|Log)\s*([0-9.\-]+)/i);

  if (latMatch && lonMatch) {
    const lat = Number(latMatch[2]);
    const lon = Number(lonMatch[2]);

    return {
      lat,
      lon,
      label: `📍 ${lat}, ${lon}`,
    };
  }

  return { lat: null, lon: null, label: loc };
};



export default function DeliveryDetailsModal({
  open,
  user,
  onClose,
}) {
  if (!open || !user) return null;

    const statusColor =
    user.status === "active"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : user.status === "warning"
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";


  const onlineColor =
    user.is_online
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-gray-500/20 text-gray-300 border-gray-500/30";

  const { lat, lon, label } = parseLocation(user.location);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-4xl bg-[#141826] border border-[#2c2f44] rounded-3xl shadow-2xl text-white overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
          <h2 className="text-xl font-bold">
            Delivery Details
            <span className="text-purple-400 ml-2">#{user.id}</span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT PROFILE */}
          <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center border border-[#2c2f44]">

            {user.photo ? (
              <img
                src={`https://api.pwezayshops.com/deliverymen-uploads/${user.photo}`}
                className="w-44 h-44 rounded-2xl object-cover border border-[#2c2f44]"
                alt={user.name}
              />
            ) : (
              <div className="w-44 h-44 rounded-2xl bg-purple-500/20 flex items-center justify-center text-4xl font-bold">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-xl font-semibold text-purple-400">{user.name}</p>
            </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p>{user.phone}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="break-all">{user.email}</p>
                </div>
              </div>
          </div>

{/* DETAILS */}
<div className="md:col-span-2 grid sm:grid-cols-2 gap-4 text-sm">

  {[
    ["Status", user.status],
    ["Online", user.is_online ? "Online" : "Offline"],
    ["Work Type", user.work_type || "System"],
    ["Rating", user.rating],
    ["Finished Orders", user.finished_order_count],
    ["Assigned Orders", user.assign_order],
    ["Created At", formatDateShort(user.created_at)],
  ].map(([label, value]) => (
    <div
      key={label}
      className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
    >
      <p className="text-sm text-gray-400">
        {label}
      </p>

      {label === "Status" ? (
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${statusColor}`}
        >
          {value}
        </span>
      ) : label === "Online" ? (
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${onlineColor}`}
        >
          {value}
        </span>
      ) : (
        <p className="text-md font-medium mt-1 break-words">
          {value ?? "-"}
        </p>
      )}
    </div>
  ))}

</div>
        </div>

      </div>
    </div>
  );
}