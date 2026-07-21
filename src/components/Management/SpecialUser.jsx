import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import axios from "axios";
import { useAlert } from "../../AlertContext";
import SpecialUserDetailModal from "./SpecialUserDetailModal";

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

  const { showAlert } = useAlert();

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ---------------- PAGINATION STATES ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token");

  // Fetch API every 500ms (live)
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://api.pwezayshops.com/special-users",
          {
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          }
        )
        .then((res) => setSpecialUsers(res.data))
        .catch((err) => console.error("API Error:", err));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  const getPhotoUrl = (photo) => {
    if (!photo) return "https://via.placeholder.com/80";
    return `https://api.pwezayshops.com/uploads/${photo}`;
  };

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

  // const openDeletePasscode = (user) => {
  //   setActiveUser(user);
  //   setPasscode("");
  //   setPasscodeModal(true);
  //   setTimeout(() => passcodeInputRef.current?.focus(), 100);
  // };
  const openDeletePasscode = (user) => {
    setActiveUser(user); // ✅ MUST use activeUser for delete
    setPasscode("");
    setPasscodeModal(true);
    setTimeout(() => passcodeInputRef.current?.focus(), 100);
  };

  const doDelete = async () => {
    if (!activeUser) return;
    // 1. VERIFY PASSCODE (API)
    try {
      const verifyRes = await axios.post(
        "https://api.pwezayshops.com/admin/verify-manager-passcode",
        {
    passcode,
  },
  {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
      );

      if (!verifyRes.data?.success) {
        showAlert(verifyRes.data?.message || "Incorrect passcode", "error");
        return;
      }
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Passcode verification failed",
        "error",
      );
      return;
    }
    try {
      setActionLoading((prev) => ({
        ...prev,
        [activeUser.id]: true,
      }));

      const res = await axios.delete(
        `https://api.pwezayshops.com/users/${activeUser.id}`,
          {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
      );

      setSpecialUsers((prev) => prev.filter((u) => u.id !== activeUser.id));

      showAlert(
        res.data?.message || "Special user deleted successfully",
        "success",
      );
    } catch (err) {
      showAlert(err.response?.data?.message || "Delete failed", "error");
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [activeUser.id]: false,
      }));

      setPasscodeModal(false);
      setPasscode("");
    }
  };

  const getPhoto = (photo) => photo || "https://via.placeholder.com/80";
  const formatDateShort = (date) =>
    date ? new Date(date).toLocaleString() : "-";
  const getMapUrl = (location) =>
    location
      ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
      : null;

  const toggleStatus = async (user, newStatus) => {
    if (user.status === newStatus) return; // ✅ prevent duplicate click

    try {
      setActionLoading((prev) => ({
        ...prev,
        [user.id]: true,
      }));

      const res = await axios.patch(
        `https://api.pwezayshops.com/users/status/${user.id}`, 
         { status: newStatus },
  {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
      );

      // ✅ update UI instantly
      setSpecialUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
      );

      // ✅ SAME as UserTable
      showAlert(res?.data?.message || "Status updated", "success");
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Failed to update status",
        "error",
      );
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [user.id]: false,
      }));
    }
  };
  const toggleSpecialUser = (user) => {
    setSpecialLoading((prev) => ({ ...prev, [user.id]: true }));

    if (!user.special) {
      // Make special user (your existing logic)
      axios
        .patch(`https://api.pwezayshops.com/special-users/${user.id}`, 
          // orderId: "O002",
          {},
            {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
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
        .patch(`https://api.pwezayshops.com/non-special-users/${user.id}`,
            {},
  {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
        )
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

  const confirmSpecialUser = async () => {
    if (!selectedUser) return;

    try {
      setSpecialLoading((prev) => ({
        ...prev,
        [selectedUser.id]: true,
      }));

      const isRemoving = selectedUser.special;

      const url = isRemoving
        ? `https://api.pwezayshops.com/non-special-users/${selectedUser.id}`
        : `https://api.pwezayshops.com/special-users/${selectedUser.id}`;

      const payload = isRemoving ? {} : { orderId: "O002" };

    const res = await axios.patch(
  url,
  payload,
  {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
);

      setSpecialUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, special: !isRemoving } : u,
        ),
      );

      showAlert(res.data.message || "Updated successfully", "success");
    } catch (err) {
      showAlert(err.response?.data?.message || "Failed to update", "error");
    } finally {
      setSpecialLoading((prev) => ({
        ...prev,
        [selectedUser.id]: false,
      }));

      setConfirmModal(false);
      setSelectedUser(null);
    }
  };
  return (
    <div className="">
      <div className="text-white mt-8 mb-8">
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
                      {/* <input
                        type="checkbox"
                        checked={user.special || false}
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
                            src={getPhotoUrl(user.photo)}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80";
                            }}
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
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4 backdrop-blur-md">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setConfirmModal(false)}
          />

          {/* MODAL */}
          <div
            className="relative w-full max-w-sm rounded-2xl 
      bg-gradient-to-b from-[#1b2235] to-[#121826]
      border border-white/10 shadow-2xl p-6"
          >
            {/* TITLE */}
            <h3 className="text-xl font-semibold text-center text-purple-400 mb-3">
              {selectedUser.special
                ? "Remove Special User"
                : "Mark Special User"}
            </h3>

            {/* MESSAGE */}
            <p className="text-sm text-slate-300 text-center mb-6 leading-relaxed">
              {selectedUser.special ? "Remove " : "Mark "}
              <span className="text-purple-300 font-semibold">
                {selectedUser?.name}
              </span>{" "}
              {selectedUser.special
                ? "from special users?"
                : "as a special user?"}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3">
              {/* CANCEL */}
              <button
                onClick={() => setConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 
          bg-white/5 text-slate-300 hover:bg-white/10 
          transition-all text-sm"
              >
                Cancel
              </button>

              {/* CONFIRM */}
              <button
                onClick={confirmSpecialUser}
                disabled={specialLoading[selectedUser?.id]}
                className="flex-1 py-2.5 rounded-xl 
          bg-gradient-to-r from-purple-600 to-indigo-500
          text-white font-medium hover:opacity-90 
          transition-all text-sm shadow-lg disabled:opacity-50"
              >
                {specialLoading[selectedUser?.id] ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <SpecialUserDetailModal
        modalOpen={modalOpen}
        activeUser={activeUser}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
