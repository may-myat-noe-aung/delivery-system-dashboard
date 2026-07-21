import React, { useState, useRef, useEffect } from "react";
import { useAlert } from "../../AlertContext";

/* ================= FORMAT HELPERS ================= */
function formatDateShort(dtString) {
  if (!dtString) return "-";
  const d = new Date(dtString.replace(" ", "T"));
  if (isNaN(d)) return dtString;
  return d.toLocaleString();
}

const categories = [
  {
    id: 1,
    name: "Fashion",
    icon: "fashion",
  },
  {
    id: 2,
    name: "Food & Restaurant",
    icon: "foodrestaurant",
  },
  {
    id: 3,
    name: "Electronic",
    icon: "electronic",
  },
  {
    id: 4,
    name: "Convenience Shop",
    icon: "convenience",
  },
  {
    id: 5,
    name: "Material",
    icon: "material",
  },
  {
    id: 6,
    name: "Fast Food",
    icon: "fastfood",
  },
  {
    id: 7,
    name: "Snack",
    icon: "snack",
  },
  {
    id: 8,
    name: "Breakfast",
    icon: "breakfast",
  },
  {
    id: 9,
    name: "Cake",
    icon: "cake",
  },
  {
    id: 10,
    name: "Coffee",
    icon: "coffee",
  },
  {
    id: 11,
    name: "Drink",
    icon: "drink",
  },
  {
    id: 12,
    name: "Lunch",
    icon: "lunch",
  },
  {
    id: 13,
    name: "Morning",
    icon: "morning",
  },
  {
    id: 14,
    name: "Sweets",
    icon: "sweets",
  },
  {
    id: 15,
    name: "Other",
    icon: "other",
  },
];

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

/* ================= COMPONENT ================= */
export default function ShopDetailsModal({
  modalOpen,
  activeShop,
  setModalOpen,
}) {
  /* ================= STATES ================= */
  const [passcode, setPasscode] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");

  /* ================= REFS ================= */
  const passcodeInputRef = useRef(null);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    if (pendingAction && passcodeInputRef.current) {
      passcodeInputRef.current.focus();
    }
  }, [pendingAction]);

  /* ================= GUARD ================= */
  if (!modalOpen || !activeShop) return null;

  /* ================= DATA ================= */
  const { lat, lon, label } = parseLocation(activeShop.location);

  const mapUrl =
    lat !== null && lon !== null
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${
          lon - 0.01
        }%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`
      : null;

  const permissionColor =
    activeShop.permission === "pending"
      ? "bg-yellow-500/80 text-white"
      : activeShop.permission === "approved"
        ? "bg-green-500/20 text-green-400"
        : "bg-red-500/20 text-red-400";

  const closeAll = () => {
    setPendingAction(null);
    setPasscode("");
    setLoading(false);
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    if (!passcode) {
      showAlert("Enter passcode", "warning");
      return;
    }

    setLoading(true);

    try {
      const verifyRes = await fetch(
        "https://api.pwezayshops.com/admin/verify-shopmanager-passcode",
          {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `MSHteam ${token}`,
    },
    body: JSON.stringify({ passcode }),
  }
      );

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        showAlert(verifyData.message || "Wrong passcode", "error");
        closeAll(); // ✅ IMPORTANT FIX
        return;
      }

      const url =
        pendingAction === "approve"
          ? `https://api.pwezayshops.com/shops/approve/${activeShop.id}`
          : `https://api.pwezayshops.com/shops/reject/${activeShop.id}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
    "Content-Type": "application/json",
    Authorization: `MSHteam ${token}`,
  },
      });

      const data = await res.json();

      if (data.success) {
        showAlert(data.message || "Success", "success");
        closeAll(); // ✅ CLOSE POPUP HERE
        setModalOpen(false);
      } else {
        showAlert(data.message || "Failed", "error");
        closeAll(); // optional but safe
      }
    } catch (err) {
      console.error(err);
      showAlert("Server error", "error");
      closeAll(); // ✅ VERY IMPORTANT
    }
  };
  return (
    <>
      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setModalOpen(false)}
        />

        {/* MODAL */}
        <div
          className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl 
bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#0b1020]
border border-white/10 shadow-2xl text-white"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Shop Details{" "}
                <span className="text-[#B476FF]">#{activeShop.id}</span>
              </h2>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 
      flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PROFILE CARD */}
            <div className="lg:col-span-1">
              <div
                className="
      relative overflow-hidden
      rounded-3xl
      border border-purple-500/20
      bg-gradient-to-b from-[#1b2338] via-[#141b2d] to-[#0f172a]
      py-3 px-4
      shadow-2xl
    "
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

                {/* Status */}
                <div className="absolute top-4 right-4 z-50">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg ${permissionColor}`}
                  >
                    {activeShop.permission}
                  </span>
                </div>

                {/* Photo */}
                <div className="relative mx-auto size-52">
                  {activeShop.photo ? (
                    <img
                      src={`https://api.pwezayshops.com/shop-uploads/${activeShop.photo}`}
                      alt={activeShop.shop_name}
                      className="w-full h-full object-cover rounded-3xl border-4 border-purple-500/20 shadow-xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-6xl font-bold text-white">
                      {activeShop.shop_name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Shop Info */}
                <div className="mt-2 text-center">
                  <h3 className="text-2xl font-bold text-white">
                    {activeShop.shop_name}
                  </h3>

                  <p className="mt-1 text-purple-300 text-base">
                    {activeShop.shopkeeper_name}
                  </p>
                </div>

                {/* Contact */}
                <div className="mt-2 space-y-3">
                  <div className="">
                    <p className="text-xs text-slate-400 mb-1">Phone</p>
                    <p className="text-white font-medium">{activeShop.phone}</p>
                  </div>

                  <div className="">
                    <p className="text-xs text-slate-400 mb-1">Email</p>
                    <p className="text-white font-medium break-all">
                      {activeShop.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {/* Categories */}
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400  mb-3">Categories</p>

                <div className="grid grid-cols-3 gap-3 max-h-[150px] overflow-y-auto">
                  {activeShop.categories?.map((id) => {
                    const category = categories.find((c) => c.id === id);

                    if (!category) return null;

                    return (
                      <div
                        key={id}
                        className="p-2 rounded-xl border border-purple-500 bg-black flex flex-col items-center"
                      >
                        <img
                          src={`/categoriesIcon/${category.icon}.png`}
                          alt={category.name}
                          className="size-12 object-contain"
                        />

                        <p className="text-[11px] text-gray-300 mt-2 text-center">
                          {category.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {[
                ["Items", activeShop.items],
                ["Created", formatDateShort(activeShop.created_at)],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
                >
                  <p className="text-gray-400  mb-1">{k}</p>
                  <p className="text-sm font-medium break-words">{v}</p>
                </div>
              ))}

              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
                <p className="text-gray-400  mb-1">Address</p>
                <p className="text-sm font-medium break-words">
                  {activeShop.address || "-"}
                </p>
              </div>
            </div>

            {/* MAP */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-gray-400 text-sm mb-3">Location</p>

                {mapUrl ? (
                  <iframe
                    src={mapUrl}
                    className="w-full h-72 rounded-xl border border-white/10"
                  />
                ) : (
                  <p className="text-gray-300">{label}</p>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 p-5 border-t border-white/10">
            <button
              onClick={() => {
                setPendingAction("reject");
                setPasscode("");
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-xl
      bg-red-500/10 border border-red-500/30 text-red-300
      hover:bg-red-500/20 transition"
            >
              Reject
            </button>

            <button
              onClick={() => {
                setPendingAction("approve");
                setPasscode("");
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-xl
      bg-purple-500
      text-white font-medium hover:opacity-90 transition shadow-lg"
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* PASSCODE MODAL */}
      {pendingAction && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-3">
          {/* Overlay */}
          <div
            className="absolute inset-0"
            onClick={() => setPendingAction(null)}
          />

          {/* Modal */}
          <div className="relative bg-[#1e2235] border border-[#2c2f44] rounded-xl p-5 w-full max-w-[340px] text-white shadow-2xl">
            {/* Title */}
            <h3 className="text-lg font-semibold text-purple-400 text-center mb-2">
              Enter Passcode
            </h3>

            {/* Input */}
            <input
              ref={passcodeInputRef}
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleConfirm();
                }
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#141826] border border-slate-600 text-white outline-none focus:border-purple-500 mb-4"
              placeholder="passcode"
            />

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setPendingAction(null)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded-lg text-white transition ${
                  pendingAction === "approve"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
