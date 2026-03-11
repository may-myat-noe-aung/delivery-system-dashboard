import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import axios from "axios";
import { useAlert } from "../../AlertContext";

export default function SpecialUser() {
  const [specialUsers, setSpecialUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);
  const [specialLoading, setSpecialLoading] = useState({});

  const [actionLoading, setActionLoading] = useState({});
  const [alerts, setAlerts] = useState([]);
  const { showAlert } = useAlert();

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ---------------- PAGINATION STATES ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch API every 500ms (live)
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://38.60.244.137:3000/special-users")
        .then((res) => setSpecialUsers(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredUsers = specialUsers.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.id?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term) ||
      user.status?.toLowerCase().includes(term)
    );
  });

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const openDetail = (user) => {
    setActiveUser(user);
    setModalOpen(true);
  };

  const openDeletePasscode = (user) => {
    setActiveUser(user);
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 100);
  };

  const doDelete = () => {
    if (passcode === "234567") {
      setActionLoading((prev) => ({ ...prev, [activeUser.id]: true }));
      axios
        .delete(`http://38.60.244.137:3000/special-users/${activeUser.id}`)
        .then((res) => {
          setSpecialUsers((prev) => prev.filter((u) => u.id !== activeUser.id));
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

  const toggleStatus = (user, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [user.id]: true }));
    axios
      .patch(`http://38.60.244.137:3000/special-users/status/${user.id}`, {
        status: newStatus,
      })
      .then((res) => {
        setSpecialUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
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
        setActionLoading((prev) => ({ ...prev, [user.id]: false }));
      });
  };

  const toggleSpecialUser = (user) => {
    setSpecialLoading((prev) => ({ ...prev, [user.id]: true }));

    if (!user.special) {
      // Make special user (your existing logic)
      axios
        .patch(`http://38.60.244.137:3000/special-users/${user.id}`, {
          orderId: "O002",
        })
        .then((res) => {
          setSpecialUsers((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, special: true } : u)),
          );
          setAlerts((prev) => [
            ...prev,
            res.data.message || "User marked as special",
          ]);
        })
        .catch((err) =>
          setAlerts((prev) => [
            ...prev,
            err.response?.data?.message || "Failed to mark special",
          ]),
        )
        .finally(() =>
          setSpecialLoading((prev) => ({ ...prev, [user.id]: false })),
        );
    } else {
      // Remove from special → make non-special
      axios
        .patch(`http://38.60.244.137:3000/non-special-users/${user.id}`)
        .then((res) => {
          setSpecialUsers((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, special: false } : u)),
          );
          setAlerts((prev) => [
            ...prev,
            res.data.message || "User removed from special",
          ]);
        })
        .catch((err) =>
          setAlerts((prev) => [
            ...prev,
            err.response?.data?.message || "Failed to remove special",
          ]),
        )
        .finally(() =>
          setSpecialLoading((prev) => ({ ...prev, [user.id]: false })),
        );
    }
  };

  const confirmSpecialUser = () => {
    if (!selectedUser) return;

    setSpecialLoading((prev) => ({ ...prev, [selectedUser.id]: true }));

    const request = selectedUser.special
      ? axios.patch(
          `http://38.60.244.137:3000/non-special-users/${selectedUser.id}`,
        )
      : axios.patch(
          `http://38.60.244.137:3000/special-users/${selectedUser.id}`,
          {
            orderId: "O002",
          },
        );

    request
      .then((res) => {
        setSpecialUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id
              ? { ...u, special: !selectedUser.special }
              : u,
          ),
        );

        showAlert(res.data.message || "Updated successfully", "success");
      })
      .catch((err) => {
        showAlert(err.response?.data?.message || "Failed to update", "error");
      })
      .finally(() => {
        setSpecialLoading((prev) => ({
          ...prev,
          [selectedUser.id]: false,
        }));
        setConfirmModal(false);
        setSelectedUser(null);
      });
  };

  return (
    <div className="">
      {/* Alerts */}
      <div className="text-white mt-8 mb-8">
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
              placeholder="Search Users"
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
                  "Special User", // <-- new column
                  "ID",
                  "User Name",
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
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-6 text-slate-400 text-sm"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-slate-800 transition-all duration-300
              ${
                user.status === "active"
                  ? "bg-green-500/10 hover:bg-green-500/10"
                  : user.status === "warning"
                    ? "bg-red-500/5 hover:bg-red-500/10"
                    : "hover:bg-slate-800/40"
              }`}
                  >
                    {/* ---------- Special User Checkbox ---------- */}
                    <td className="py-4 text-center">
                      {/* <input
  type="checkbox"
  checked={user.special || false}  // checked if special
  disabled={!!specialLoading[user.id]}
onChange={() => {
  setSelectedUser(user);
  setConfirmModal(true);
}}
  className="w-5 h-5 text-purple-500 bg-slate-800 border-slate-700 rounded focus:ring-2 focus:ring-purple-500"
/> */}
                      <input
                        type="checkbox"
                        checked={user.special || false}
                        disabled={!!specialLoading[user.id]}
                        onChange={() => {
                          setSelectedUser(user);
                          setConfirmModal(true);
                        }}
                        className="w-5 h-5 text-purple-500 bg-slate-800 border-slate-700 rounded focus:ring-2 focus:ring-purple-500"
                      />
                    </td>

                    <td className="py-4">{user.id}</td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full 
                              bg-purple-500/30 
                              flex items-center justify-center 
                              text-purple-300 font-semibold"
                          >
                            {user.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
                        <span>{user.name}</span>
                      </div>
                    </td>

                    <td className="py-4">{user.email}</td>
                    <td className="py-4">{user.phone}</td>

                    <td className="py-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => toggleStatus(user, "active")}
                          disabled={!!actionLoading[user.id]}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all
                    ${
                      user.status === "active"
                        ? "bg-green-500/30 text-green-300 border border-green-400/40"
                        : "bg-green-500/10 text-green-400 border border-green-500/20"
                    }`}
                        >
                          Active
                        </button>

                        <button
                          onClick={() => toggleStatus(user, "warning")}
                          disabled={!!actionLoading[user.id]}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all
                    ${
                      user.status === "warning"
                        ? "bg-red-500/30 text-red-300 border border-red-400/40"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                        >
                          Warning
                        </button>
                      </div>
                    </td>

                    <td className="py-4 text-sm">
                      {splitDateTime(user.created_at)[0]} <br />
                      <span className="text-slate-400 text-xs">
                        {splitDateTime(user.created_at)[1]}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => openDetail(user)}
                          className="px-3 py-1.5 rounded-xl 
                           bg-purple-500/20 text-purple-300 
                           border border-purple-500/30
                           hover:bg-purple-500/40 hover:text-white 
                           transition-all text-xs"
                        >
                          Detail
                        </button>

                        <button
                          onClick={() => openDeletePasscode(user)}
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

      {/* ---------------- PAGINATION UI ---------------- */}

      {/* USER DETAIL MODAL */}
      {/* {modalOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 md:p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-4 md:p-6 w-full max-w-[800px] shadow-2xl border border-purple-200 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
                User Details - {activeUser.id}
              </h3>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <div className="flex flex-col items-center">
                {activeUser.photo ? (
                  <img
                    src={activeUser.photo}
                    className="w-36 h-36 md:w-44 md:h-44 rounded-xl border shadow-md object-cover"
                    alt={activeUser.name}
                  />
                ) : (
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl border shadow-md bg-[#B476FF] flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                    {activeUser.name
                      ? activeUser.name
                          .split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                {[
                  ["Name", activeUser.name],
                  ["Email", activeUser.email],
                  ["Phone", activeUser.phone],
                  ["Status", activeUser.status],
                  ["Created At", formatDateShort(activeUser.created_at)],
                  ["Location", activeUser.location || "-"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-600">{label}</div>
                    <div className="text-gray-800">{value}</div>
                  </div>
                ))}
              </div>

              <div className="col-span-3 mt-4">
                {activeUser.location && (
                  <div className="col-span-2">
                    <div className="font-semibold text-gray-600">
                      Location Map
                    </div>
                    <iframe
                      src={getMapUrl(activeUser.location)}
                      className="w-full h-56 rounded-lg border mt-1"
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* USER DETAIL MODAL - DARK THEME */}
      {modalOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 md:p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Box */}
          <div className="relative bg-slate-900 rounded-2xl p-4 md:p-6 w-full max-w-[800px] shadow-2xl border border-slate-700 max-h-[90vh] overflow-auto text-white">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                User Details - {activeUser.id}
              </h3>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              {/* Photo */}
              <div className="flex flex-col items-center">
                {activeUser.photo ? (
                  <img
                    src={activeUser.photo}
                    className="w-36 h-36 md:w-44 md:h-44 rounded-xl border border-slate-700 shadow-md object-cover"
                    alt={activeUser.name}
                  />
                ) : (
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl border border-slate-700 shadow-md bg-purple-700 flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                    {activeUser.name
                      ? activeUser.name
                          .split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .join("")
                      : "?"}
                  </div>
                )}
              </div>

              {/* Info Fields */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-sm">
                {[
                  ["Name", activeUser.name],
                  ["Email", activeUser.email],
                  ["Phone", activeUser.phone],
                  ["Status", activeUser.status],
                  ["Created At", formatDateShort(activeUser.created_at)],
                  ["Location", activeUser.location || "-"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-400">{label}</div>
                    <div className="text-gray-200">{value}</div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="col-span-3 mt-4">
                {activeUser.location && (
                  <div className="col-span-2">
                    <div className="font-semibold text-gray-400">
                      Location Map
                    </div>
                    <iframe
                      src={getMapUrl(activeUser.location)}
                      className="w-full h-56 rounded-lg border border-slate-700 mt-1"
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PASSCODE MODAL */}
      {/* {passcodeModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm p-2">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPasscodeModal(false)}
          />
          <div className="relative bg-white rounded-xl p-4 md:p-6 w-full max-w-[330px] shadow-2xl border border-purple-200">
            <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
              Enter Passcode
            </h3>
            <input
              ref={passcodeInputRef}
              type="password"
              className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doDelete()}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="px-4 py-1.5 border rounded-lg hover:bg-gray-100 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90 w-full sm:w-auto"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}
      {/* PASSCODE MODAL - DARK THEME */}
      {passcodeModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm p-2">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setPasscodeModal(false)}
          />

          {/* Modal Box */}
          <div className="relative bg-slate-900 rounded-xl p-4 md:p-6 w-full max-w-[330px] shadow-2xl border border-slate-700 text-white">
            {/* Header */}
            <h3 className="text-lg font-bold text-center bg-gradient-to-r text-[#B476FF] bg-clip-text  mb-4">
              Enter Passcode
            </h3>

            {/* Input */}
            <input
              ref={passcodeInputRef}
              type="password"
              className="border border-slate-700 rounded-lg w-full px-3 py-2 mb-4 bg-slate-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doDelete()}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="px-4 py-1.5 border border-slate-700 rounded-lg hover:bg-slate-700 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                className="px-4 py-1.5 bg-[#B476FF] text-white rounded-lg shadow hover:opacity-90 w-full sm:w-auto"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal && selectedUser && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setConfirmModal(false)}
          />

          {/* Modal */}
          <div
            className="relative bg-[#1a2030] border border-slate-700 
      rounded-xl p-6 w-[320px] text-white shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              {selectedUser.special
                ? "Remove Special User"
                : "Mark Special User"}
            </h3>

            <p className="text-sm text-slate-300 mb-6">
              {selectedUser.special
                ? "Do you want to remove "
                : "Do you want to mark "}
              <span className="text-purple-400 text-lg font-medium">
                {selectedUser?.name}
              </span>{" "}
              {selectedUser.special
                ? "from special users?"
                : "as special user?"}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-1.5 rounded-lg border border-slate-700 
          hover:bg-slate-700 text-sm"
              >
                No
              </button>

              <button
                onClick={confirmSpecialUser}
                disabled={specialLoading[selectedUser?.id]}
                className="px-4 py-1.5 rounded-lg bg-purple-600 
          hover:bg-purple-700 text-sm"
              >
                {specialLoading[selectedUser?.id] ? "Processing..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
