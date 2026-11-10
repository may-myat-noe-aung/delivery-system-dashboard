// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   MapPin,
//   Plus,
//   Pencil,
//   Trash2,
//   X,
//   Check,
//   Loader2,
// } from "lucide-react";
// import { useAlert } from "../../AlertContext";

// const API_BASE = "https://api.pwezayshops.com";

// export default function BlockManagement() {
//   const { showAlert } = useAlert();

//   const [blocks, setBlocks] = useState([]);
//   const [blockName, setBlockName] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editName, setEditName] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deletingIndex, setDeletingIndex] = useState(null);

//   const token = localStorage.getItem("token");

//   const headers = {
//     Authorization: `MSHteam ${token}`,
//   };

//   // ================= GET BLOCKS =================
 
// const fetchBlocks = async () => {
//   try {
//     setLoading(true);

//     const res = await axios.get(`${API_BASE}/get-blocks`, {
//       headers,
//     });

//     if (res.data?.success === false) {
//       throw new Error(
//         res.data.message || "Failed to load blocks"
//       );
//     }

//     // API response: { success: true, data: { blocks: [] } }
//     const result = res.data?.data?.blocks;

//     if (!Array.isArray(result)) {
//       throw new Error(
//         res.data?.message || "Invalid blocks response format"
//       );
//     }

//     setBlocks(result);
//   } catch (error) {
//     console.error("GET BLOCKS ERROR:", error);

//     showAlert(
//       error.response?.data?.message ||
//         error.message ||
//         "Failed to load blocks",
//       "error"
//     );
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchBlocks();
//   }, []);

//   // ================= POST UPDATED ARRAY =================
//   const saveBlocks = async (updatedBlocks) => {
//     try {
//       setSaving(true);

//       // Send the array directly, NOT { blocks: updatedBlocks }.
//    const res = await axios.post(
//   `${API_BASE}/create-blocks`,
//   { blocks: updatedBlocks },
//   { headers }
// );

//       if (res.data?.success === false) {
//         throw new Error(
//           res.data.message || "Failed to save blocks"
//         );
//       }

//       // Update the UI only after a successful API request.
//       setBlocks(updatedBlocks);

//       showAlert(
//         res.data?.message || "Request completed successfully",
//         "success"
//       );

//       return true;
//     } catch (error) {
//       console.error("SAVE BLOCKS ERROR:", error);

//       showAlert(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to save blocks",
//         "error"
//       );

//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= CREATE BLOCK =================
//   const handleCreate = async (e) => {
//     e.preventDefault();

//     const name = blockName.trim();

//     if (!name) {
//       showAlert("Please enter a block name", "error");
//       return;
//     }

//     const exists = blocks.some(
//       (block) => block.toLowerCase() === name.toLowerCase()
//     );

//     if (exists) {
//       showAlert("This block already exists", "error");
//       return;
//     }

//     const updatedBlocks = [...blocks, name];

//     const success = await saveBlocks(updatedBlocks);

//     if (success) {
//       setBlockName("");
//     }
//   };

//   // ================= START EDIT =================
//   const startEdit = (index) => {
//     setEditingIndex(index);
//     setEditName(blocks[index]);
//   };

//   // ================= EDIT BLOCK =================
//   const handleEdit = async (e) => {
//     e.preventDefault();

//     if (editingIndex === null) return;

//     const name = editName.trim();

//     if (!name) {
//       showAlert("Please enter a block name", "error");
//       return;
//     }

//     const oldName = blocks[editingIndex];

//     if (name === oldName) {
//       setEditingIndex(null);
//       setEditName("");
//       return;
//     }

//     const exists = blocks.some(
//       (block, index) =>
//         index !== editingIndex &&
//         block.toLowerCase() === name.toLowerCase()
//     );

//     if (exists) {
//       showAlert("This block already exists", "error");
//       return;
//     }

//     const updatedBlocks = blocks.map((block, index) =>
//       index === editingIndex ? name : block
//     );

//     const success = await saveBlocks(updatedBlocks);

//     if (success) {
//       setEditingIndex(null);
//       setEditName("");
//     }
//   };

//   // ================= DELETE BLOCK =================
//   const handleDelete = async (index) => {
//     const blockToDelete = blocks[index];

//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${blockToDelete}"?`
//     );

//     if (!confirmed) return;

//     setDeletingIndex(index);

//     const updatedBlocks = blocks.filter(
//       (_, blockIndex) => blockIndex !== index
//     );

//     const success = await saveBlocks(updatedBlocks);

//     if (success) {
//       setEditingIndex(null);
//       setEditName("");
//     }

//     setDeletingIndex(null);
//   };

//   // ================= UI =================
//   return (
//     <div className="">
//       {/* HEADER */}
//       <div className="mb-6 flex items-center gap-3">
//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B476FF]/15">
//           <MapPin className="text-[#B476FF]" size={22} />
//         </div>

//         <div>
//           <h3 className="text-lg font-bold text-white">
//             Block Management
//           </h3>
//           <p className="text-sm text-gray-400">
//             Manage your blocks and neighborhoods
//           </p>
//         </div>
//       </div>

//       {/* CREATE FORM */}
//       <form
//         onSubmit={handleCreate}
//         className="mb-6 flex flex-col gap-3 sm:flex-row"
//       >
//         <input
//           type="text"
//           value={blockName}
//           onChange={(e) => setBlockName(e.target.value)}
//           placeholder="ရပ်ကွက်နာမည် ထည့်ရန်"
//           disabled={saving || loading}
//           className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-neutral-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-[#B476FF] disabled:opacity-60"
//         />

//         <button
//           type="submit"
//           disabled={saving || loading}
//           className="flex items-center justify-center gap-2 rounded-xl bg-[#B476FF] px-5 py-3 font-semibold text-black transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {saving ? (
//             <Loader2 size={18} className="animate-spin" />
//           ) : (
//             <Plus size={18} />
//           )}
//           Add Block
//         </button>
//       </form>

//       {/* BLOCK COUNT */}
//       <div className="mb-4 flex items-center justify-between">
//         <h4 className="font-semibold text-white">ရပ်ကွက်များ</h4>

//         <span className="rounded-full bg-[#B476FF]/15 px-3 py-1 text-sm font-medium text-[#B476FF]">
//           {blocks.length} blocks
//         </span>
//       </div>

//       {/* BLOCK LIST */}
//       {loading ? (
//         <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
//           <Loader2 size={20} className="animate-spin" />
//           Loading blocks...
//         </div>
//       ) : blocks.length === 0 ? (
//         <div className="rounded-xl border border-dashed border-gray-700 py-10 text-center">
//           <MapPin
//             className="mx-auto mb-3 text-gray-500"
//             size={30}
//           />

//           <p className="font-medium text-gray-300">
//             No blocks found
//           </p>

//           <p className="mt-1 text-sm text-gray-500">
//             Add your first block above.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {blocks.map((block, index) => (
//             <div
//               key={`${block}-${index}`}
//               className="flex flex-col gap-3 rounded-xl border border-gray-700 bg-neutral-800/70 p-4 sm:flex-row sm:items-center"
//             >
//               <div className="flex min-w-0 flex-1 items-center gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#B476FF]/15">
//                   <MapPin
//                     size={19}
//                     className="text-[#B476FF]"
//                   />
//                 </div>

//                 {editingIndex === index ? (
//                   <form
//                     onSubmit={handleEdit}
//                     className="flex min-w-0 flex-1 gap-2"
//                   >
//                     <input
//                       autoFocus
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       disabled={saving}
//                       className="min-w-0 flex-1 rounded-lg border border-[#B476FF] bg-neutral-900 px-3 py-2 text-white outline-none"
//                     />

//                     <button
//                       type="submit"
//                       disabled={saving}
//                       title="Save changes"
//                       className="rounded-lg bg-[#B476FF] p-2 text-black disabled:opacity-50"
//                     >
//                       {saving ? (
//                         <Loader2
//                           size={17}
//                           className="animate-spin"
//                         />
//                       ) : (
//                         <Check size={17} />
//                       )}
//                     </button>

//                     <button
//                       type="button"
//                       disabled={saving}
//                       onClick={() => {
//                         setEditingIndex(null);
//                         setEditName("");
//                       }}
//                       title="Cancel editing"
//                       className="rounded-lg border border-gray-600 p-2 text-gray-300 hover:bg-gray-700"
//                     >
//                       <X size={17} />
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="min-w-0">
//                     <p className="truncate font-medium text-white">
//                       {block}
//                     </p>

//                     <p className="mt-1 text-xs text-gray-500">
//                       Block #{index + 1}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {editingIndex !== index && (
//                 <div className="flex items-center gap-2 sm:justify-end">
//                   <button
//                     type="button"
//                     disabled={saving || deletingIndex !== null}
//                     onClick={() => startEdit(index)}
//                     className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 transition hover:border-[#B476FF] hover:text-[#B476FF] disabled:opacity-50"
//                   >
//                     <Pencil size={15} />
//                     Edit
//                   </button>

//                   <button
//                     type="button"
//                     disabled={saving || deletingIndex !== null}
//                     onClick={() => handleDelete(index)}
//                     className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
//                   >
//                     {deletingIndex === index ? (
//                       <Loader2
//                         size={15}
//                         className="animate-spin"
//                       />
//                     ) : (
//                       <Trash2 size={15} />
//                     )}
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useAlert } from "../../AlertContext";

const API_BASE = "https://api.pwezayshops.com";
const VERIFY_PASSCODE_URL =
  `${API_BASE}/admin/verify-owner-passcode`;

const ITEMS_PER_PAGE = 3;

export default function BlockManagement() {
  const { showAlert } = useAlert();

  const [blocks, setBlocks] = useState([]);
  const [blockName, setBlockName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Passcode modal
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const passcodeInputRef = useRef(null);
  const [pendingOperation, setPendingOperation] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `MSHteam ${token}`,
    };
  };

  const totalPages = Math.ceil(blocks.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedBlocks = blocks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Keep current page valid when the number of blocks changes.
  useEffect(() => {
    const maxPage = Math.max(
      1,
      Math.ceil(blocks.length / ITEMS_PER_PAGE)
    );

    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [blocks.length, currentPage]);

  useEffect(() => {
    fetchBlocks();
  }, []);

  useEffect(() => {
    if (passcodeModal) {
      const timer = setTimeout(() => {
        passcodeInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [passcodeModal]);

  // ================= GET BLOCKS =================
  const fetchBlocks = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/get-blocks`, {
        headers: getHeaders(),
      });

      if (res.data?.success === false) {
        throw new Error(
          res.data.message || "Failed to load blocks"
        );
      }

      const result = res.data?.data?.blocks;

      if (!Array.isArray(result)) {
        throw new Error(
          res.data?.message || "Invalid blocks response format"
        );
      }

      setBlocks(result);
    } catch (error) {
      console.error("GET BLOCKS ERROR:", error);

      showAlert(
        error.response?.data?.message ||
          error.message ||
          "Failed to load blocks",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= OPEN PASSCODE MODAL =================
  const requestPasscode = (operation) => {
    setPendingOperation(operation);
    setPasscode("");
    setPasscodeModal(true);
  };

  const closePasscodeModal = () => {
    if (pendingSubmit || saving) return;

    setPasscodeModal(false);
    setPasscode("");
    setPendingOperation(null);
    setDeletingIndex(null);
  };

  // ================= VERIFY PASSCODE =================
  const doSubmit = async (e) => {
    e?.preventDefault();

    if (pendingSubmit || saving) return;

    if (!passcode.trim()) {
      showAlert("Please enter passcode", "error");
      passcodeInputRef.current?.focus();
      return;
    }

    if (!pendingOperation) {
      showAlert("No pending action found", "error");
      return;
    }

    setPendingSubmit(true);

    try {
      const token = localStorage.getItem("token");

      // Use fetch directly so a wrong passcode returning 403
      // does not trigger automatic logout.
      const verifyResponse = await fetch(VERIFY_PASSCODE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token
            ? { Authorization: `MSHteam ${token}` }
            : {}),
        },
        body: JSON.stringify({
          passcode: passcode.trim(),
        }),
      });

      const verifyData = await verifyResponse
        .json()
        .catch(() => ({}));

      if (!verifyResponse.ok || verifyData.success !== true) {
        showAlert(
          verifyData.message || "Passcode verification failed",
          "error"
        );
        return;
      }

      // Passcode is correct. Execute the pending operation.
      const operation = pendingOperation;
      const success = await saveBlocks(operation.updatedBlocks);

      if (success) {
        operation.onSuccess?.();

        setPasscodeModal(false);
        setPasscode("");
        setPendingOperation(null);
        setDeletingIndex(null);
      }
    } catch (error) {
      console.error("PASSCODE VERIFICATION ERROR:", error);

      showAlert(
        error.response?.data?.message ||
          error.message ||
          "Passcode verification failed",
        "error"
      );
    } finally {
      setPendingSubmit(false);
    }
  };

  // ================= POST UPDATED ARRAY =================
  const saveBlocks = async (updatedBlocks) => {
    try {
      setSaving(true);

      const res = await axios.post(
        `${API_BASE}/create-blocks`,
        { blocks: updatedBlocks },
        {
          headers: {
            ...getHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success === false) {
        showAlert(
          res.data.message || "Failed to save blocks",
          "error"
        );
        return false;
      }

      // Update the UI only after a successful API request.
      setBlocks(updatedBlocks);

      showAlert(
        res.data?.message || "Request completed successfully",
        "success"
      );

      return true;
    } catch (error) {
      console.error("SAVE BLOCKS ERROR:", error);

      showAlert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save blocks",
        "error"
      );

      return false;
    } finally {
      setSaving(false);
    }
  };

  // ================= CREATE BLOCK =================
  const handleCreate = (e) => {
    e.preventDefault();

    const name = blockName.trim();

    if (!name) {
      showAlert("Please enter a block name", "error");
      return;
    }

    const exists = blocks.some(
      (block) => block.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      showAlert("This block already exists", "error");
      return;
    }

    const updatedBlocks = [...blocks, name];

    requestPasscode({
      updatedBlocks,
      onSuccess: () => {
        setBlockName("");
      },
    });
  };

  // ================= START EDIT =================
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditName(blocks[index]);
  };

  // ================= EDIT BLOCK =================
  const handleEdit = (e) => {
    e.preventDefault();

    if (editingIndex === null) return;

    const name = editName.trim();

    if (!name) {
      showAlert("Please enter a block name", "error");
      return;
    }

    const oldName = blocks[editingIndex];

    if (name === oldName) {
      setEditingIndex(null);
      setEditName("");
      return;
    }

    const exists = blocks.some(
      (block, index) =>
        index !== editingIndex &&
        block.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      showAlert("This block already exists", "error");
      return;
    }

    const updatedBlocks = blocks.map((block, index) =>
      index === editingIndex ? name : block
    );

    requestPasscode({
      updatedBlocks,
      onSuccess: () => {
        setEditingIndex(null);
        setEditName("");
      },
    });
  };

  // ================= DELETE BLOCK =================
  const handleDelete = (index) => {
    // No browser window.confirm().
    // Open the passcode modal directly.
    const updatedBlocks = blocks.filter(
      (_, blockIndex) => blockIndex !== index
    );

    setDeletingIndex(index);

    requestPasscode({
      updatedBlocks,
      onSuccess: () => {
        setEditingIndex(null);
        setEditName("");
      },
    });
  };

  // ================= UI =================
  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B476FF]/15">
          <MapPin className="text-[#B476FF]" size={22} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            Block Management
          </h3>
          <p className="text-sm text-gray-400">
            Manage your blocks and neighborhoods
          </p>
        </div>
      </div>

      {/* CREATE FORM */}
      <form
        onSubmit={handleCreate}
        className="mb-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={blockName}
          onChange={(e) => setBlockName(e.target.value)}
          placeholder="ရပ်ကွက်နာမည် ထည့်ရန်"
          disabled={saving || loading || pendingSubmit}
          className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-neutral-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-[#B476FF] disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={saving || loading || pendingSubmit}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#B476FF] px-5 py-3 font-semibold text-black transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving || pendingSubmit ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Plus size={18} />
          )}
          Add Block
        </button>
      </form>

      {/* BLOCK COUNT */}
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-semibold text-white">ရပ်ကွက်များ</h4>

        <span className="rounded-full bg-[#B476FF]/15 px-3 py-1 text-sm font-medium text-[#B476FF]">
          {blocks.length} blocks
        </span>
      </div>

      {/* BLOCK LIST */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          Loading blocks...
        </div>
      ) : blocks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 py-10 text-center">
          <MapPin
            className="mx-auto mb-3 text-gray-500"
            size={30}
          />

          <p className="font-medium text-gray-300">
            No blocks found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Add your first block above.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedBlocks.map((block, index) => {
              // Actual index in the complete blocks array.
              // This keeps Edit/Delete correct on every page.
              const actualIndex = startIndex + index;

              return (
                <div
                  key={`${block}-${actualIndex}`}
                  className="flex flex-col gap-3 rounded-xl border border-gray-700 bg-neutral-800/70 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#B476FF]/15">
                      <MapPin
                        size={19}
                        className="text-[#B476FF]"
                      />
                    </div>

                    {editingIndex === actualIndex ? (
                      <form
                        onSubmit={handleEdit}
                        className="flex min-w-0 flex-1 gap-2"
                      >
                        <input
                          autoFocus
                          value={editName}
                          onChange={(e) =>
                            setEditName(e.target.value)
                          }
                          disabled={saving || pendingSubmit}
                          className="min-w-0 flex-1 rounded-lg border border-[#B476FF] bg-neutral-900 px-3 py-2 text-white outline-none"
                        />

                        <button
                          type="submit"
                          disabled={saving || pendingSubmit}
                          title="Save changes"
                          className="rounded-lg bg-[#B476FF] p-2 text-black disabled:opacity-50"
                        >
                          {saving || pendingSubmit ? (
                            <Loader2
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Check size={17} />
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={saving || pendingSubmit}
                          onClick={() => {
                            setEditingIndex(null);
                            setEditName("");
                          }}
                          title="Cancel editing"
                          className="rounded-lg border border-gray-600 p-2 text-gray-300 hover:bg-gray-700"
                        >
                          <X size={17} />
                        </button>
                      </form>
                    ) : (
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {block}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Block #{actualIndex + 1}
                        </p>
                      </div>
                    )}
                  </div>

                  {editingIndex !== actualIndex && (
                    <div className="flex items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        disabled={
                          saving ||
                          pendingSubmit ||
                          deletingIndex !== null
                        }
                        onClick={() => startEdit(actualIndex)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 transition hover:border-[#B476FF] hover:text-[#B476FF] disabled:opacity-50"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          saving ||
                          pendingSubmit ||
                          deletingIndex !== null
                        }
                        onClick={() => handleDelete(actualIndex)}
                        className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                      >
                        {deletingIndex === actualIndex ? (
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PAGINATION — same style as ManagerSellerList */}
          {totalPages > 1 && (
            <div className="mt-4 flex flex-col justify-between gap-2 px-4 py-2 text-sm text-neutral-400 md:flex-row md:gap-0">
              <p>
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  className={`rounded-md border border-neutral-700 px-3 py-1 ${
                    currentPage === 1
                      ? "cursor-not-allowed text-neutral-500"
                      : "text-[#B476FF] hover:bg-neutral-900"
                  }`}
                >
                  Prev
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-md border border-neutral-700 px-3 py-1 ${
                      currentPage === page
                        ? "bg-[#B476FF] font-semibold text-black"
                        : "text-[#B476FF] hover:bg-neutral-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className={`rounded-md border border-neutral-700 px-3 py-1 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed text-neutral-500"
                      : "text-[#B476FF] hover:bg-neutral-900"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* PASSCODE MODAL — same UI as AnnouncementTab.jsx */}
      {passcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closePasscodeModal}
          />

          <div className="relative w-[90%] max-w-[330px] rounded-xl border border-[#2c2f44] bg-[#1e2235] p-6">
            <h3 className="mb-4 text-center text-lg font-bold text-purple-400">
              Enter Passcode
            </h3>

            <form onSubmit={doSubmit}>
              <input
                ref={passcodeInputRef}
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                disabled={pendingSubmit || saving}
                className="mb-4 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-purple-500 disabled:opacity-50"
                placeholder="Passcode"
                autoComplete="current-password"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closePasscodeModal}
                  disabled={pendingSubmit || saving}
                  className="flex-1 rounded-lg border border-neutral-700 px-3 py-2 text-white transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={pendingSubmit || saving}
                  className="flex-1 rounded-lg bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pendingSubmit || saving ? "..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
