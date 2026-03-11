import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import axios from "axios";

export default function DeliveryTable() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);

  const [actionLoading, setActionLoading] = useState({});
  const [alerts, setAlerts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.137:3000/deliverymen")
        .then((res) => setDeliverymen(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredUsers = deliverymen.filter((delivery) => {
    const term = searchTerm.toLowerCase();
    return (
      delivery.name?.toLowerCase().includes(term) ||
      delivery.id?.toLowerCase().includes(term) ||
      delivery.email?.toLowerCase().includes(term) ||
      delivery.phone?.toLowerCase().includes(term) ||
      delivery.status?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openDetail = (delivery) => {
    setActiveUser(delivery);
    setModalOpen(true);
  };

  const openDeletePasscode = (delivery) => {
    setActiveUser(delivery);
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 100);
  };

  const doDelete = () => {
    if (passcode === "234567") {
      setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
      axios
        .delete(`http://38.60.244.137:3000/deliverymen/${activeUser.id}`)
        .then((res) => {
          setDeliverymen((prev) => prev.filter((u) => u.id !== activeUser.id));
          setAlerts((prev) => [
            ...prev,
            res.data.message || "Deleted successfully",
          ]);
        })
        .catch((err) =>
          setAlerts((prev) => [
            ...prev,
            err.response?.data?.message || "Delete failed",
          ]),
        )
        .finally(() => {
          setActionLoading((prev) => ({ ...prev, [activeUser.id]: false }));
          setPasscodeModal(false);
        });
    } else {
      setAlerts((prev) => [...prev, "Incorrect passcode"]);
    }
  };

  const getPhoto = (photo) => photo || "https://via.placeholder.com/80";
  const formatDateShort = (date) =>
    date ? new Date(date).toLocaleString() : "-";
  const getMapUrl = (location) =>
    location
      ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
      : null;

  const toggleStatus = (delivery, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [delivery.id]: true }));
    axios
      .patch(`http://38.60.244.137:3000/deliverymen/status/${delivery.id}`, {
        status: newStatus,
      })
      .then((res) => {
        setDeliverymen((prev) =>
          prev.map((u) =>
            u.id === delivery.id ? { ...u, status: newStatus } : u,
          ),
        );
        setAlerts((prev) => [...prev, res.data.message || "Status updated"]);
      })
      .catch((err) =>
        setAlerts((prev) => [
          ...prev,
          err.response?.data?.message || "Failed to update status",
        ]),
      )
      .finally(() => {
        setActionLoading((prev) => ({ ...prev, [delivery.id]: false }));
      });
  };

  return (
    <div className="">
      {/* Alerts */}
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
              placeholder="Search Deliverymen"
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
                  "Deliveryman",
                  "Email",
                  "Phone",
                  "Work Type",
                  "Orders",
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
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-6 text-slate-400 text-sm"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className={`border-b border-slate-800 
                transition-all duration-300
                ${
                  delivery.status === "active"
                    ? "bg-green-500/10 hover:bg-green-500/20"
                    : delivery.status === "warning"
                      ? "bg-red-500/5 hover:bg-red-500/10"
                      : "hover:bg-slate-800/40"
                }`}
                  >
                    <td className="py-4">{delivery.id}</td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {delivery.photo ? (
                          <img
                            src={`http://38.60.244.137:3000/deliverymen-uploads/${delivery.photo}`}
                            alt={delivery.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full 
                        bg-purple-500/30 
                        flex items-center justify-center 
                        text-purple-300 font-semibold"
                          >
                            {delivery.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
                        <span>{delivery.name}</span>
                      </div>
                    </td>

                    <td className="py-4">{delivery.email}</td>
                    <td className="py-4">{delivery.phone}</td>
                    <td className="py-4">{delivery.work_type}</td>

                    <td className="py-4 text-sm">
                      <div className="flex flex-col">
                        <span>Total: {delivery.total_order}</span>
                        <span className="text-slate-400 text-xs">
                          Assigned: {delivery.assign_order}
                        </span>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => toggleStatus(delivery, "active")}
                          disabled={!!actionLoading[delivery.id]}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all
                      ${
                        delivery.status === "active"
                          ? "bg-green-500/30 text-green-300 border border-green-400/40"
                          : "bg-green-500/10 text-green-400 border border-green-500/20"
                      }`}
                        >
                          Active
                        </button>

                        <button
                          onClick={() => toggleStatus(delivery, "warning")}
                          disabled={!!actionLoading[delivery.id]}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all
                      ${
                        delivery.status === "warning"
                          ? "bg-red-500/30 text-red-300 border border-red-400/40"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                        >
                          Warning
                        </button>
                      </div>
                    </td>

                    <td className="py-4 text-sm">
                      {splitDateTime(delivery.created_at)[0]} <br />
                      <span className="text-slate-400 text-xs">
                        {splitDateTime(delivery.created_at)[1]}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => openDetail(delivery)}
                          className="px-3 py-1.5 rounded-xl 
                      bg-purple-500/20 text-purple-300 
                      border border-purple-500/30
                      hover:bg-purple-500/40 hover:text-white 
                      transition-all text-xs"
                        >
                          Detail
                        </button>

                        <button
                          onClick={() => openDeletePasscode(delivery)}
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
      </div>
      {/* Pagination */}
<div className="flex justify-end mt-6 gap-2 flex-wrap">
  <button
    disabled={currentPage === 1}
    onClick={() => goToPage(currentPage - 1)}
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
      onClick={() => goToPage(page)}
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
    onClick={() => goToPage(currentPage + 1)}
    className="px-3 py-1.5 rounded-xl border border-slate-700 
    bg-slate-900/50 text-slate-300 
    hover:bg-purple-500/20 transition-all text-sm
    disabled:opacity-40"
  >
    Next
  </button>
</div>
      {/* USER DETAIL MODAL - DARK UI */}
      {modalOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setModalOpen(false)}
          />

          <div
            className="relative w-full max-w-[800px]
      bg-[#1a2030]/90 backdrop-blur-2xl
      border border-slate-700
      rounded-3xl shadow-2xl p-6
      max-h-[90vh] overflow-auto text-white"
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className="text-lg sm:text-xl font-bold
        bg-gradient-to-r from-purple-400 to-purple-600
        bg-clip-text text-transparent"
              >
                User Details - {activeUser.id}
              </h3>
              <button
                className="text-slate-400 hover:text-white"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
              <div className="flex flex-col items-center">
                {activeUser.photo ? (
                  <img
                    src={`http://38.60.244.137:3000/deliverymen-uploads/${activeUser.photo}`}
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl border border-slate-700 shadow-md object-cover"
                    alt={activeUser.name}
                  />
                ) : (
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl border border-slate-700 shadow-md bg-purple-500/30 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
                    {activeUser.name
                      ? activeUser.name
                          .split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-6 text-sm">
                {[
                  ["Name", activeUser.name],
                  ["Email", activeUser.email],
                  ["Phone", activeUser.phone],
                  ["Status", activeUser.status],
                  ["Created At", formatDateShort(activeUser.created_at)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-slate-400">{label}</div>
                    <div className="text-white break-words">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Passcode Modal */}
      {/* PASSCODE MODAL - DARK UI */}
      {passcodeModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-md p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setPasscodeModal(false)}
          />

          <div
            className="relative w-full max-w-[330px]
      bg-[#1a2030]/90 backdrop-blur-2xl
      border border-slate-700 rounded-2xl
      shadow-2xl p-6 text-white"
          >
            <h3
              className="text-lg sm:text-xl font-bold text-center
      bg-gradient-to-r from-purple-400 to-purple-600
      bg-clip-text text-transparent mb-4"
            >
              Enter Passcode
            </h3>

            <input
              ref={passcodeInputRef}
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doDelete()}
              className="w-full px-3 py-2 mb-4 rounded-lg
        border border-slate-600 bg-[#121826]/50
        text-white focus:outline-none focus:ring-2 focus:ring-purple-500
        placeholder:text-slate-400 transition-all"
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="px-4 py-1.5 border border-slate-600 rounded-lg
          hover:bg-slate-700 text-sm transition-all"
              >
                Cancel
              </button>

              <button
                onClick={doDelete}
                className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600
          rounded-lg text-white shadow hover:opacity-90 text-sm transition-all"
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
