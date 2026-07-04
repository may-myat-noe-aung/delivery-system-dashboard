
import React from "react";

function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}

export default function UserDetailModal({
  modalOpen,
  activeUser,
  onClose,
}) {
  if (!modalOpen || !activeUser) return null;
  const getPhotoUrl = (photo) => {
  if (!photo) return null;
  return `https://api.pwezayshops.com/uploads/${photo}`;
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

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
              ["Phone", activeUser.phone],
              ["Email", activeUser.email],
              ["Status", activeUser.status],
              ["Special User", activeUser.special === 1 ? "Yes" : "No"],
              ["Created At", formatDateShort(activeUser.created_at)],
            //   ["Location", activeUser.location || "No location provided"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium mt-1">{value}</p>
              </div>
            ))}
          </div>

          {/* FOOTER INFO (NO MAP since no coords) */}
          {/* <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
            <p className="text-sm text-gray-400 mb-2">Location Info</p>

            <p className="text-gray-300 text-sm">
              {activeUser.location
                ? activeUser.location
                : "This user has not provided location data."}
            </p>
          </div> */}
<div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
  <p className="text-sm text-gray-400 mb-3">Location Info</p>

  {Array.isArray(activeUser.location) && activeUser.location.length > 0 ? (
    <div className="grid md:grid-cols-3 gap-3">
      {activeUser.location.map((loc, i) => {
        const [lat, lng] = loc.location.split(",").map((v) => v.trim());

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

            {/* Link */}
            {/* <div className="p-2 text-center">
              <a
                href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:underline"
              >
                Open in full map
              </a>
            </div> */}
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