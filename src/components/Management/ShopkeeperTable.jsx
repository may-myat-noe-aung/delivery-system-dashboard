

import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import axios from "axios";

export default function ShopkeeperTable() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeShop, setActiveShop] = useState(null);
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);
  const [actionLoading, setActionLoading] = useState({});
  const [alerts, setAlerts] = useState([]);

  // ---------------- PAGINATION STATES ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Live fetch every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.137:3000/shops")
        .then((res) => setShopkeepers(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredShopkeepers = shopkeepers.filter((shop) => {
    const term = searchTerm.toLowerCase();
    return (
      shop.name?.toLowerCase().includes(term) ||
      shop.id?.toLowerCase().includes(term) ||
      shop.email?.toLowerCase().includes(term) ||
      shop.phone?.toLowerCase().includes(term) ||
      shop.status?.toLowerCase().includes(term) ||
      shop.shop_name?.toLowerCase().includes(term)
    );
  });

  const getPhoto = (photo) => photo || null;
  const formatDateShort = (date) =>
    date ? new Date(date).toLocaleString() : "-";

  // ---------------- LOCATION PARSER ----------------
  const parseLocation = (loc) => {
    if (!loc) return { lat: null, lon: null };
    const match = loc.match(/Lag\s*([0-9.\-]+),\s*Log\s*([0-9.\-]+)/i);
    if (!match) return { lat: null, lon: null };
    return { lat: Number(match[1]), lon: Number(match[2]) };
  };

  const getMapUrl = (location) => {
    const { lat, lon } = parseLocation(location);
    if (!lat || !lon) return null;

    // OpenStreetMap embed
    const delta = 0.01;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${
      lon - delta
    }%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lon}`;
  };

  const openDeletePasscode = (shop) => {
    setActiveShop(shop);
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 500);
  };

  // const doDelete = () => {
  //   if (passcode === "234567") {
  //     setActionLoading((prev) => ({ ...prev, [activeShop.id]: true }));
  //     axios
  //       .delete(`http://38.60.244.137:3000/shops/${activeShop.id}`)
  //       .then((res) => {
  //         setShopkeepers((prev) => prev.filter((s) => s.id !== activeShop.id));
  //         setAlerts((prev) => [
  //           ...prev,
  //           res.data.message || "Deleted successfully",
  //         ]);
  //       })
  //       .catch((err) =>
  //         setAlerts((prev) => [
  //           ...prev,
  //           err.response?.data?.message || "Delete failed",
  //         ])
  //       )
  //       .finally(() => {
  //         setActionLoading((prev) => ({ ...prev, [activeShop.id]: false }));
  //         setPasscodeModal(false);
  //       });
  //   } else {
  //     setAlerts((prev) => [...prev, "Incorrect passcode"]);
  //   }
  // };

  const doDelete = () => {
  if (!activeShop) return;

  setActionLoading((prev) => ({ ...prev, [activeShop.id]: true }));

  // Step 1: Verify passcode via API
  axios
    .patch("http://38.60.244.137:3000/admin/verify-admin-passcode", {
      passcode: passcode,
    })
    .then((res) => {
      // ✅ Passcode correct, now delete the shop
      return axios.delete(`http://38.60.244.137:3000/shops/${activeShop.id}`);
    })
    .then((res) => {
      // Update UI after successful deletion
      setShopkeepers((prev) => prev.filter((s) => s.id !== activeShop.id));
      setAlerts((prev) => [
        ...prev,
        res.data.message || "Deleted successfully",
      ]);
      setPasscodeModal(false);
    })
    .catch((err) => {
      // Handle incorrect passcode or delete failure
      const msg =
        err.response?.data?.message || "Passcode incorrect or delete failed";
      setAlerts((prev) => [...prev, msg]);
    })
    .finally(() => {
      setActionLoading((prev) => ({ ...prev, [activeShop.id]: false }));
    });
};
  const toggleStatus = (shop, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [shop.id]: true }));
    axios
      .patch(`http://38.60.244.137:3000/shops/status/${shop.id}`, {
        status: newStatus,
      })
      .then((res) => {
        setShopkeepers((prev) =>
          prev.map((s) => (s.id === shop.id ? { ...s, status: newStatus } : s))
        );
        setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
      })
      .catch((err) =>
        setAlerts((prev) => [
          ...prev,
          err.response?.data?.message || "Failed to update status",
        ])
      )
      .finally(() =>
        setActionLoading((prev) => ({ ...prev, [shop.id]: false }))
      );
  };

  const openDetail = (shop) => {
    setActiveShop(shop);
    setModalOpen(true);
  };

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(filteredShopkeepers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShopkeepers = filteredShopkeepers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="">

  <div className="pt-4 text-white">
    {/* Alerts */}
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-50">
      {alerts.map((msg, i) => (
        <div
          key={i}
          className="bg-purple-500/20 border border-purple-500/40 
          text-purple-300 px-4 py-2 rounded-xl 
          backdrop-blur-md shadow-lg text-sm"
        >
          {msg}
        </div>
      ))}
    </div>

    {/* Search + Export */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search Shopkeepers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-2xl 
          bg-slate-900 border border-slate-700 
          text-white text-sm
          focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:border-purple-500
          transition-all duration-200"
        />
      </div>

      <button
        className="flex items-center gap-2 px-4 py-2 
        rounded-2xl border border-purple-500/40
        bg-purple-500/10 text-purple-300
        hover:bg-purple-500/20 hover:text-white
        transition-all duration-200 text-sm"
      >
        <Download className="h-4 w-4" /> Export
      </button>
    </div>

    {/* Table Card */}
    <div
      className="bg-[#1a2030]/80 backdrop-blur-xl 
      border border-slate-700 
      rounded-3xl shadow-2xl 
      p-6 overflow-x-auto"
    >
      <table className="min-w-full text-sm">
        <thead className="text-slate-400 border-b border-slate-700 bg-slate-900/40">
          <tr>
            {[
              "ID",
              "Shopkeeper Name",
              "Shop Name",
              "Email",
              "Phone",
              "Status",
              "Date & Time",
              "Action",
            ].map((col) => (
              <th
                key={col}
                className="py-4 text-left font-medium tracking-wide text-sm"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedShopkeepers.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-6 text-slate-400 text-sm"
              >
                No results found.
              </td>
            </tr>
          ) : (
            paginatedShopkeepers.map((shop) => (
              <tr
                key={shop.id}
                className={`border-b border-slate-800 
                transition-all duration-300
                ${
                  shop.status === "active"
                    ? "bg-green-500/10 hover:bg-green-500/20"
                    : shop.status === "warning"
                    ? "bg-red-500/5 hover:bg-red-500/10"
                    : "hover:bg-slate-800/40"
                }`}
              >
                <td className="py-4">{shop.id}</td>

                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {shop.photo ? (
                      <img
                        src={`http://38.60.244.137:3000/shop-uploads/${shop.photo}`}
                        alt={shop.shop_name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full 
                        bg-purple-500/30 
                        flex items-center justify-center 
                        text-purple-300 font-semibold"
                      >
                        {shop.shop_name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <span>{shop.shopkeeper_name}</span>
                  </div>
                </td>

                <td className="py-4">{shop.shop_name}</td>
                <td className="py-4">{shop.email}</td>
                <td className="py-4">{shop.phone}</td>

                <td className="py-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => toggleStatus(shop, "active")}
                      disabled={!!actionLoading[shop.id]}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all
                      ${
                        shop.status === "active"
                          ? "bg-green-500/30 text-green-300 border border-green-400/40"
                          : "bg-green-500/10 text-green-400 border border-green-500/20"
                      }`}
                    >
                      Active
                    </button>

                    <button
                      onClick={() => toggleStatus(shop, "warning")}
                      disabled={!!actionLoading[shop.id]}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all
                      ${
                        shop.status === "warning"
                          ? "bg-red-500/30 text-red-300 border border-red-400/40"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      Warning
                    </button>
                  </div>
                </td>

                <td className="py-4 text-sm">
                  {splitDateTime(shop.created_at)[0]} <br />
                  <span className="text-slate-400 text-xs">
                    {splitDateTime(shop.created_at)[1]}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => openDetail(shop)}
                      className="px-3 py-1.5 rounded-xl 
                      bg-purple-500/20 text-purple-300 
                      border border-purple-500/30
                      hover:bg-purple-500/40 hover:text-white 
                      transition-all text-xs"
                    >
                      Detail
                    </button>

                    <button
                      onClick={() => openDeletePasscode(shop)}
                      className="px-3 py-1.5 rounded-xl 
                      bg-red-500/20 text-red-400 
                      border border-red-500/30
                      hover:bg-red-500/40 hover:text-white 
                      transition-all text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="flex justify-end mt-6 gap-2 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1.5 rounded-xl border border-slate-700 
        bg-slate-900/50 text-slate-300 
        hover:bg-purple-500/20 transition-all text-sm
        disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1.5 rounded-xl border border-slate-700 
          text-sm transition-all
          ${
            currentPage === page
              ? "bg-purple-500/30 text-white border-purple-500"
              : "bg-slate-900/50 text-slate-300 hover:bg-purple-500/20"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1.5 rounded-xl border border-slate-700 
        bg-slate-900/50 text-slate-300 
        hover:bg-purple-500/20 transition-all text-sm
        disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>


      {/* SHOP DETAIL MODAL */}
{/* SHOP DETAIL MODAL - DARK UI */}
{modalOpen && activeShop && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div
      className="absolute inset-0 bg-black/60"
      onClick={() => setModalOpen(false)}
    />

    <div
      className="relative w-[min(850px,95%)] max-h-[90vh] overflow-auto
      bg-[#1a2030]/90 backdrop-blur-2xl
      border border-slate-700
      rounded-3xl shadow-2xl p-8 text-white"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3
          className="text-xl font-bold 
          bg-gradient-to-r from-purple-400 to-purple-600 
          bg-clip-text text-transparent"
        >
          Shop Details - {activeShop.id}
        </h3>

        <button
          className="text-slate-400 hover:text-white transition"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Photo */}
        <div className="flex flex-col items-center">
          {activeShop.photo ? (
            <img
              src={`http://38.60.244.137:3000/shop-uploads/${activeShop.photo}`}
              className="w-48 h-48 rounded-2xl 
              border border-slate-700 
              shadow-lg object-cover"
              alt={activeShop.name}
            />
          ) : (
            <div
              className="w-48 h-48 rounded-2xl 
              bg-purple-500/30 
              border border-purple-500/40
              flex items-center justify-center 
              text-purple-300 text-4xl font-bold"
            >
              {activeShop.name
                ? activeShop.name
                    .split(" ")
                    .map((n) => n.charAt(0).toUpperCase())
                    .join("")
                : "?"}
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-5 text-sm">
          {[
            ["Shop Name", activeShop.shop_name],
            ["Shopkeeper", activeShop.name],
            ["Email", activeShop.email],
            ["Phone", activeShop.phone],
            ["Status", activeShop.status],
            ["Created At", formatDateShort(activeShop.created_at)],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-slate-400 text-xs tracking-wide">
                {label}
              </div>
              <div className="text-white font-medium break-words">
                {value || "-"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOCATION MAP */}
      {activeShop.location && (
        <div className="mt-8">
          <div className="text-slate-400 text-sm mb-2">Location</div>

          {(() => {
            const { lat, lon } = parseLocation(activeShop.location);

            if (!lat || !lon) {
              return <div className="text-slate-300">No location</div>;
            }

            return (
              <div>
                <iframe
                  src={getMapUrl(activeShop.location)}
                  className="w-full h-60 rounded-2xl 
                  border border-slate-700 
                  shadow-lg"
                  loading="lazy"
                ></iframe>

                <p className="text-xs text-slate-500 mt-2">
                  {lat}, {lon}
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  </div>
)}

 {/* PASSCODE MODAL - DARK UI */}
{passcodeModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
    <div
      className="absolute inset-0 bg-black/60"
      onClick={() => setPasscodeModal(false)}
    />

    <div
      className="relative w-full max-w-[360px]
      bg-[#1a2030]/90 backdrop-blur-2xl
      border border-slate-700
      rounded-3xl shadow-2xl p-8 text-white"
    >
      <h3
        className="text-xl font-semibold text-center mb-6
        bg-gradient-to-r from-purple-400 to-purple-600
        bg-clip-text text-transparent"
      >
        Enter Passcode
      </h3>

      <input
        ref={passcodeInputRef}
        type="password"
        className="w-full px-4 py-2.5 mb-6 rounded-2xl
        bg-slate-900 border border-slate-700
        text-white text-sm
        focus:outline-none focus:ring-2
        focus:ring-purple-500 focus:border-purple-500
        transition-all duration-200"
        placeholder="Passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && doDelete()}
      />

      <div className="flex justify-between gap-3">
        <button
          onClick={() => setPasscodeModal(false)}
          className="px-4 py-2 rounded-2xl
          border border-slate-700
          bg-slate-900/60 text-slate-300
          hover:bg-slate-800 hover:text-white
          transition-all text-sm"
        >
          Cancel
        </button>

        <button
          onClick={doDelete}
          className="px-4 py-2 rounded-2xl
          bg-purple-500/30 text-purple-200
          border border-purple-500/40
          hover:bg-purple-500/50 hover:text-white
          transition-all text-sm"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

