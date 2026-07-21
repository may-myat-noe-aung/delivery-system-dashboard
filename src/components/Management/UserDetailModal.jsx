import React from "react";

function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}

export default function UserDetailModal({ modalOpen, activeUser, onClose }) {
  if (!modalOpen || !activeUser) return null;
  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    return `https://api.pwezayshops.com/uploads/${photo}`;
  };

  const statusColor =
  activeUser.status === "active"
    ? "bg-green-500/20 text-green-400 border-green-500/30"
    : activeUser.status === "warning"
    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    : "bg-red-500/20 text-red-400 border-red-500/30";

const specialColor =
  activeUser.special === 1
    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
    : "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
          <h2 className="text-2xl font-bold tracking-wide">
            User Details
            <span className="text-[#B476FF] ml-2">#{activeUser.id}</span>
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT CARD */}
          <div className="bg-[#1e2235] rounded-2xl p-5 flex flex-col items-center">
            {activeUser.photo ? (
              <img
                src={getPhotoUrl(activeUser.photo)}
                alt={activeUser.name}
                className="w-48 h-48 object-cover rounded-2xl border border-[#2c2f44]"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B476FF]/30 to-purple-600/20 border border-[#B476FF]/40 flex items-center justify-center text-5xl font-bold">
                {activeUser.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{activeUser.name}</p>
              <p className="text-sm text-gray-400">{activeUser.email}</p>
            </div>
          </div>

        {/* DETAILS */}
<div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">

  {[
    ["Status", activeUser.status],
    ["Special User", activeUser.special === 1 ? "Yes" : "No"],
    ["Phone", activeUser.phone],
    ["Email", activeUser.email],
    ["Created At", formatDateShort(activeUser.created_at)],
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
      ) : label === "Special User" ? (
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${specialColor}`}
        >
          {value}
        </span>
      ) : (
        <p className="text-md font-medium mt-1 break-words">
          {value || "-"}
        </p>
      )}

    </div>
  ))}

</div>

          <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
            <p className="text-sm text-gray-400 mb-3">Location Info</p>

            {Array.isArray(activeUser.location) &&
            activeUser.location.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-3">
                {activeUser.location.map((loc, i) => {
                  const [lat, lng] = loc.location
                    .split(",")
                    .map((v) => v.trim());

                  return (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden border border-[#2c2f44] bg-[#121526]"
                    >
                      {/* Title */}
                      <div className="px-3 py-2 text-xs text-purple-300 font-semibold border-b border-[#2c2f44]">
                        {loc.name}
                      </div>

                      {/* OpenStreetMap iframe */}
                      <iframe
                        title={loc.name}
                        width="100%"
                        height="180"
                        frameBorder="0"
                        scrolling="no"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                          parseFloat(lng) - 0.005
                        },${parseFloat(lat) - 0.005},${
                          parseFloat(lng) + 0.005
                        },${parseFloat(lat) + 0.005}&layer=mapnik&marker=${lat},${lng}`}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                This user has not provided location data.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
