import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import axios from "axios";
import { useAlert } from "../../AlertContext";
import UserDetailModal from "./UserDetailModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function UserTable() {
  const { showAlert, confirm } = useAlert();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);
  const [specialModal, setSpecialModal] = useState(false);
  const [specialUser, setSpecialUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  // const [specialLoading, setSpecialLoading] = useState({});

  // ---------------- PAGINATION STATES ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  // Fetch API every 500ms (live)
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://api.pwezayshops.com/users", {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        })
        .then((res) => {
          const nonSpecialUsers = res.data
            .filter((u) => u.special !== 1)
            .map((u) => ({
              ...u,
              photoUrl: u.photo
                ? `http://38.60.244.137:3000/uploads/${u.photo}`
                : null,
            }));

          setUsers(nonSpecialUsers);
        })
        .catch((err) => console.error("API Error:", err));
    }, 1000); // (recommend 5s, not 500ms)

    return () => clearInterval(interval);
  }, []);

  const splitDateTime = (datetime) => {
    if (!datetime) return ["-", "-"];
    const [date, time] = datetime.split(" ");
    return [date, time.slice(0, 8)];
  };

  const filteredUsers = users.filter((user) => {
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

  //   const openDeletePasscode = (user) => {
  //     setActiveUser(user);
  //     setPasscode(""); // reset
  //     setPasscodeModal(true);
  //    useEffect(() => {
  //   if (passcodeModal) {
  //     setTimeout(() => passcodeInputRef.current?.focus(), 100);
  //   }
  // }, [passcodeModal]);
  //   };
  useEffect(() => {
    if (passcodeModal) {
      const timer = setTimeout(() => {
        passcodeInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [passcodeModal]);
  const openDeletePasscode = (user) => {
    setActiveUser(user);
    setPasscode("");
    setPasscodeModal(true);
  };
  const doDelete = async () => {
    if (!passcode) {
      showAlert("Enter passcode", "error");
      return;
    }

    try {
      setActionLoading((prev) => ({
        ...prev,
        [activeUser.id]: true,
      }));

      // 1. VERIFY PASSCODE (API)
      const verifyRes = await axios.post(
        "https://api.pwezayshops.com/admin/verify-manager-passcode",
        {
          passcode,
        },
        {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        },
      );

      if (!verifyRes.data.success) {
        showAlert(verifyRes.data.message || "Incorrect passcode", "error");
        return;
      }

      // 2. DELETE USER (ONLY AFTER VERIFY SUCCESS)
      const res = await axios.delete(
        `https://api.pwezayshops.com/users/${activeUser.id}`,
        {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        },
      );

      // remove from UI
      setUsers((prev) => prev.filter((u) => u.id !== activeUser.id));

      showAlert(res.data?.message || "User deleted successfully", "success");

      // reset modal
      setPasscodeModal(false);
      setPasscode("");
      setActiveUser(null);
    } catch (err) {
      console.error(err);

      showAlert(err?.response?.data?.message || "Delete failed", "error");
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [activeUser.id]: false,
      }));
    }
  };

  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    return `https://api.pwezayshops.com/uploads/${photo}`;
  };
  const formatDateShort = (date) =>
    date ? new Date(date).toLocaleString() : "-";
  const getMapUrl = (location) =>
    location
      ? `https://maps.google.com?q=${encodeURIComponent(location)}&output=embed`
      : null;

  const toggleStatus = (user, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [user.id]: true }));

    axios
      .patch(`https://api.pwezayshops.com/users/status/${user.id}`,
          {
    status: newStatus,
  },
  {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
      )
      .then((res) => {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
        );

        showAlert(res.data?.message || "Status updated", "success");
      })
      .catch((err) => {
        showAlert(
          err.response?.data?.message || "Failed to update status",
          "error",
        );
      })
      .finally(() => {
        setActionLoading((prev) => ({ ...prev, [user.id]: false }));
      });
  };
  const [specialLoading, setSpecialLoading] = useState({});

  const handleSpecialCheckbox = (user) => {
    setSpecialUser(user);
    setSpecialModal(true);
  };
  const confirmSpecialUser = async () => {
    if (!specialUser) return;

    try {
      setSpecialLoading((prev) => ({
        ...prev,
        [specialUser.id]: true,
      }));

      const res = await axios.patch(
        `https://api.pwezayshops.com/special-users/${specialUser.id}`,
          {},
  {
    headers: {
      Authorization: `MSHteam ${token}`,
    },
  }
      );

      setUsers((prev) => prev.filter((u) => u.id !== specialUser.id));

      showAlert(res.data?.message || "Marked as special user", "success");
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Failed to mark special",
        "error",
      );
    } finally {
      setSpecialLoading((prev) => ({
        ...prev,
        [specialUser.id]: false,
      }));

      setSpecialModal(false);
    }
  };
  const handleExport = () => {
    try {
      const exportData = filteredUsers.map((user) => {
        const [date, time] = splitDateTime(user.created_at);

        return {
          ID: user.id,
          Name: user.name,
          Email: user.email,
          Phone: user.phone,
          Status: user.status,
          Special: user.special === 1 ? "Yes" : "No",
          Date: date,
          Time: time,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(exportData);

      worksheet["!cols"] = [
        { wch: 12 },
        { wch: 25 },
        { wch: 30 },
        { wch: 18 },
        { wch: 15 },
        { wch: 12 },
        { wch: 15 },
        { wch: 12 },
      ];

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `users_${Date.now()}.xlsx`);
    } catch (error) {
      console.error("Export Error:", error);
      showAlert("Export failed", "error");
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
            onClick={handleExport}
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
                  "Special User", 
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
                    colSpan={7}
                    className="text-center py-6 text-slate-400 text-sm"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-slate-800 
              transition-all duration-300
              ${
                user.status === "active"
                  ? "bg-green-500/10 hover:bg-green-500/10"
                  : user.status === "warning"
                    ? "bg-red-500/5 hover:bg-red-500/10"
                    : "hover:bg-slate-800/40"
              }`}
                  >
                    <td className="py-4">
                      <input
                        type="checkbox"
                        checked={user.special === 1}
                        disabled={!!specialLoading[user.id]}
                        onChange={() => handleSpecialCheckbox(user)}
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
                          <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-300 font-semibold">
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

      {specialModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4 backdrop-blur-md">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSpecialModal(false)}
          />

          {/* MODAL */}
          <div
            className="relative w-full max-w-sm rounded-2xl 
      bg-gradient-to-b from-[#1b2235] to-[#121826]
      border border-white/10 shadow-2xl p-6"
          >
            {/* TITLE */}
            <h3 className="text-xl font-semibold text-center text-purple-400 mb-3">
              Mark Special User
            </h3>

            {/* MESSAGE */}
            <p className=" text-slate-300 text-center mb-6 leading-relaxed">
              Mark{" "}
              <span className="text-purple-300 font-semibold">
                {specialUser?.name}
              </span>{" "}
              as a special user?
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() => setSpecialModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 
          bg-white/5 text-slate-300 hover:bg-white/10 
          transition-all text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmSpecialUser}
                className="flex-1 py-2.5 rounded-xl 
          bg-gradient-to-r from-purple-600 to-indigo-500
          text-white font-medium hover:opacity-90 
          transition-all text-sm shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* USER DETAIL MODAL */}
      <UserDetailModal
        modalOpen={modalOpen}
        activeUser={activeUser}
        onClose={() => setModalOpen(false)}
        formatDateShort={formatDateShort}
        getMapUrl={getMapUrl}
      />
    </div>
  );
}
