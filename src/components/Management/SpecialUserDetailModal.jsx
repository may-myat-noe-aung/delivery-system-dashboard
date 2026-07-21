import React from "react";

function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}

export default function SpecialUserDetailModal({
  modalOpen,
  activeUser,
  onClose,
}) {
  if (!modalOpen || !activeUser) return null;
  const BASE_URL = "https://api.pwezayshops.com/uploads/";
  const getOsmMap = (coords) => {
    if (!coords) return null;

    const [lat, lng] = coords.split(",");

    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng},${lat},${lng},${lat}&layer=mapnik&marker=${lat},${lng}`;
  };

  const getPhotoUrl = (photo) =>
    photo ? `${BASE_URL}${photo}` : "https://via.placeholder.com/200";
  const statusColor =
    activeUser.status === "active"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : activeUser.status === "pending"
        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        : "bg-red-500/20 text-red-400 border-red-500/30";

  const specialColor = activeUser.special
    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
    : "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[#141826] rounded-3xl shadow-2xl border border-[#2c2f44] text-white overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2c2f44]">
          <h2 className="text-2xl font-bold tracking-wide">
            Special User
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
              ["Special", activeUser.special ? "Yes" : "No"],
              ["Phone", activeUser.phone],
              ["Email", activeUser.email],
              ["Created At", formatDateShort(activeUser.created_at)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#1e2235] p-4 rounded-xl border border-[#2c2f44]"
              >
                <p className="text-sm text-gray-400">{label}</p>

                {label === "Status" ? (
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${statusColor}`}
                  >
                    {value}
                  </span>
                ) : label === "Special" ? (
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

          {/* LOCATION INFO */}
          <div className="col-span-3 bg-[#1e2235] p-4 rounded-2xl border border-[#2c2f44]">
            <p className="text-sm text-gray-400 mb-3">Location Info</p>

            {Array.isArray(activeUser.location) &&
            activeUser.location.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {activeUser.location.map((loc, i) => {
                  if (!loc?.location) return null;

                  const [lat, lng] = loc.location
                    .split(",")
                    .map((v) => parseFloat(v.trim()));

                  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
                    lng - 0.01
                  },${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;

                  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;

                  return (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden border border-[#2c2f44] bg-[#121526]"
                    >
                      {/* HEADER */}
                      <div className="px-3 py-2 text-xs font-semibold text-purple-300 border-b border-[#2c2f44]">
                        {loc.name}
                      </div>

                      {/* MAP */}
                      <iframe
                        title={loc.name}
                        src={mapUrl}
                        className="w-full h-48"
                        loading="lazy"
                      />

                      {/* FOOTER LINK */}
                      {/* <div className="p-2 text-center">
              <a
                href={fullMapUrl}
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
