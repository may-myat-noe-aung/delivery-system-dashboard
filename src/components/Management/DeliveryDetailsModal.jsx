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
                src={`http://38.60.244.137:3000/deliverymen-uploads/${user.photo}`}
                className="w-44 h-44 rounded-2xl object-cover border border-[#2c2f44]"
                alt={user.name}
              />
            ) : (
              <div className="w-44 h-44 rounded-2xl bg-purple-500/20 flex items-center justify-center text-4xl font-bold">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-400">
                {user.work_type || "No Work Type"}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-4 text-sm">

            {[
              ["Email", user.email],
              ["Phone", user.phone],
              ["Status", user.status],
              ["Work Type", user.work_type],
              ["Rating", user.rating],
              ["Finished Orders", user.finished_order_count],
              ["Assigned Orders", user.assign_order],
              ["Created At", formatDateShort(user.created_at)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium mt-1 break-words">
                  {value ?? "-"}
                </p>
              </div>
            ))}

          </div>

          {/* LOCATION (Shop-style map footer) */}
          <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44] hover:border-purple-500/30 transition mt-2">

            <p className="text-sm text-gray-400 mb-2">Location</p>

            {!lat || !lon ? (
              <p className="text-gray-300">{label}</p>
            ) : (
              <>
                <div className="overflow-hidden rounded-xl border border-[#2c2f44]">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      lon - 0.01
                    }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`}
                    className="w-full h-72"
                    title="map"
                    loading="lazy"
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-gray-400">{label}</span>

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Open Map →
                  </a>
                </div>
              </>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-[#2c2f44] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}