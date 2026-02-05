// import React, { useState, useEffect, useRef } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useAlert } from "../../AlertContext";

// export default function ChangePasscodeForm({ email }) {
//   const [showNewPasscode, setShowNewPasscode] = useState(false);
//   const [showConfirmPasscode, setShowConfirmPasscode] = useState(false);
//   const [showOwnerPasscodeSecurity, setShowOwnerPasscodeSecurity] =
//     useState(false);
//   const [security, setSecurity] = useState({
//     email: email || "",
//     passcode: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [emails, setEmails] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   const dropdownRef = useRef();
//   const { showAlert } = useAlert();

//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const res = await fetch("http://38.60.244.108:3000/admin");
//         const json = await res.json();
//         if (json.success && Array.isArray(json.data)) {
//           const sorted = json.data
//             .filter((item) => item.email && item.role)
//             .sort((a, b) => {
//               const order = { owner: 0, manager: 1, seller: 2 };
//               return (
//                 (order[a.role.toLowerCase()] ?? 99) -
//                 (order[b.role.toLowerCase()] ?? 99)
//               );
//             });
//           setEmails(sorted);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchEmails();
//   }, []);

//   useEffect(() => {
//     if (email) setSecurity((prev) => ({ ...prev, email }));
//   }, [email]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//         setHighlightedIndex(-1);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSecurityChange = (field, value) => {
//     setSecurity((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEnterFocusNext = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const next = e.currentTarget
//         .closest("form,div")
//         ?.querySelectorAll("input, select");
//       const inputs = Array.from(next);
//       const index = inputs.indexOf(e.currentTarget);

//       if (inputs[index + 1]) {
//         inputs[index + 1].focus();
//       } else {
//         handleChangePasscode();
//       }
//     }
//   };

//   const handleCancelSecurity = () => {
//     setSecurity({
//       email: "",
//       passcode: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//   };

//   // ✅ UPDATED (ONLY THIS FUNCTION CHANGED)
//   const handleChangePasscode = async () => {
//     setLoading(true);

//     try {
//       if (security.newPassword !== security.confirmPassword) {
//         showAlert("New passcode နှင့် confirm passcode သည် ကိုက်ညီမှု မရှိပါ");
//         setLoading(false);
//         return;
//       }

//       if (security.newPassword.length !== 6) {
//         showAlert("Passcode သည် 6လုံး အတိအကျ ရှိရမည်");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch("http://38.60.244.108:3000/admin/verify-owner-passcode", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: security.email,
//           newpasscode: security.newPassword,
//           passcode: security.passcode,
//         }),
//       });

//       // Safe JSON parse
//       const data = await res.json().catch(() => ({}));


//       const apiMsg = data.message || data.error;

    
//       if (!res.ok) {
//         showAlert(apiMsg || "Something went wrong", "error");
//         setLoading(false);
//         return;
//       }

//       // SUCCESS message
//       if (apiMsg) showAlert(apiMsg, "success");

//       if (data.success) handleCancelSecurity();

//     } catch (err) {
//       console.error(err);
//       showAlert("Network error (Server unreachable)", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
// <div className="w-full bg-white border border-gray-200 rounded-xl p-5">
//   <h4 className="text-lg font-semibold mb-4 text-[#B476FF]">Change Passcode</h4>
//   <div className="space-y-5 w-full">
    
//     {/* Email Dropdown */}
//     <div className="w-full relative" ref={dropdownRef}>
//       <label className="block text-sm mb-2 text-gray-600">Email</label>
//       <div
//         className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-gray-900 cursor-pointer focus:outline-none focus:border-[#B476FF]"
//         onClick={() => setDropdownOpen((prev) => !prev)}
//         tabIndex={0}
//       >
//         {security.email || "Select account email"}
//       </div>

//       {dropdownOpen && (
//         <ul className="absolute z-50 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg mt-1 scrollbar-none">
//           {emails.map((admin, index) => (
//             <li
//               key={admin.id}
//               className="px-3 py-2 cursor-pointer hover:bg-[#B476FF] hover:text-white"
//               onMouseEnter={() => setHighlightedIndex(index)}
//               onMouseLeave={() => setHighlightedIndex(-1)}
//               onClick={() => {
//                 handleSecurityChange("email", admin.email);
//                 setDropdownOpen(false);
//               }}
//             >
//               {admin.email}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>

//     {/* New Passcode */}
//     <div className="w-full">
//       <label className="block text-sm mb-2 text-gray-600">New Passcode</label>
//       <div className="relative">
//         <input
//           type={showNewPasscode ? "text" : "password"}
//           value={security.newPassword}
//           onChange={(e) => {
//             const val = e.target.value.replace(/\D/g, "").slice(0, 6);
//             handleSecurityChange("newPassword", val);
//           }}
//           onKeyDown={handleEnterFocusNext}
//           placeholder="Enter new passcode"
//           className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-gray-900"
//         />
//         <span
//           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
//           onClick={() => setShowNewPasscode(!showNewPasscode)}
//         >
//           {showNewPasscode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//         </span>
//       </div>
//     </div>

//     {/* Confirm Passcode */}
//     <div className="w-full">
//       <label className="block text-sm mb-2 text-gray-600">Confirm Passcode</label>
//       <div className="relative">
//         <input
//           type={showConfirmPasscode ? "text" : "password"}
//           value={security.confirmPassword}
//           onChange={(e) => {
//             const val = e.target.value.replace(/\D/g, "").slice(0, 6);
//             handleSecurityChange("confirmPassword", val);
//           }}
//           onKeyDown={handleEnterFocusNext}
//           placeholder="Confirm new passcode"
//           className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-gray-900"
//         />
//         <span
//           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
//           onClick={() => setShowConfirmPasscode(!showConfirmPasscode)}
//         >
//           {showConfirmPasscode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//         </span>
//       </div>
//     </div>

//     {/* Owner Passcode */}
//     <div className="w-full">
//       <label className="block text-sm mb-2 text-gray-600">Owner Passcode</label>
//       <div className="relative">
//         <input
//           type={showOwnerPasscodeSecurity ? "text" : "password"}
//           value={security.passcode}
//           onChange={(e) => handleSecurityChange("passcode", e.target.value)}
//           onKeyDown={handleEnterFocusNext}
//           placeholder="Enter owner passcode"
//           className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-gray-900"
//         />
//         <span
//           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
//           onClick={() =>
//             setShowOwnerPasscodeSecurity(!showOwnerPasscodeSecurity)
//           }
//         >
//           {showOwnerPasscodeSecurity ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//         </span>
//       </div>
//     </div>

//     {/* Buttons */}
//     <div className="flex flex-col sm:flex-row gap-3 pt-4">
//       <button
//         onClick={handleCancelSecurity}
//         disabled={loading}
//         className="rounded-lg border border-gray-300 bg-white text-gray-800 px-5 py-2 text-sm"
//       >
//         Cancel
//       </button>
//       <button
//         onClick={handleChangePasscode}
//         disabled={loading}
//         className="rounded-lg bg-[#B476FF] text-white px-5 py-2 font-medium text-sm"
//       >
//         {loading ? "Updating..." : "Change Passcode"}
//       </button>
//     </div>
//   </div>
// </div>

//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAlert } from "../../AlertContext";

export default function ChangePasscodeForm({ email }) {
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [showConfirmPasscode, setShowConfirmPasscode] = useState(false);
  const [showOwnerPasscodeSecurity, setShowOwnerPasscodeSecurity] = useState(false);

  const [security, setSecurity] = useState({
    email: email || "",
    passcode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef();
  const { showAlert } = useAlert();

  // Fetch admin emails
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch("http://38.60.244.108:3000/admin");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const sorted = json.data
            .filter((item) => item.email && item.role)
            .sort((a, b) => {
              const order = { owner: 0, manager: 1, seller: 2 };
              return (
                (order[a.role.toLowerCase()] ?? 99) -
                (order[b.role.toLowerCase()] ?? 99)
              );
            });
          setEmails(sorted);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmails();
  }, []);

  // Sync prop email
  useEffect(() => {
    if (email) setSecurity((prev) => ({ ...prev, email }));
  }, [email]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSecurityChange = (field, value) => {
    setSecurity((prev) => ({ ...prev, [field]: value }));
  };

  const handleEnterFocusNext = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = e.currentTarget.closest("form,div")?.querySelectorAll("input, select");
      const inputs = Array.from(next);
      const index = inputs.indexOf(e.currentTarget);

      if (inputs[index + 1]) {
        inputs[index + 1].focus();
      } else {
        handleChangePasscode();
      }
    }
  };

  const handleCancelSecurity = () => {
    setSecurity({
      email: "",
      passcode: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // ✅ Update Passcode function
  const handleChangePasscode = async () => {
    setLoading(true);

    try {
      if (security.newPassword !== security.confirmPassword) {
        showAlert("New passcode နှင့် confirm passcode သည် ကိုက်ညီမှု မရှိပါ", "error");
        setLoading(false);
        return;
      }

      if (security.newPassword.length !== 6) {
        showAlert("Passcode သည် 6 လုံး အတိအကျ ရှိရမည်", "error");
        setLoading(false);
        return;
      }

      const res = await fetch("http://38.60.244.108:3000/admin/verify-owner-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: security.email,
          newpasscode: security.newPassword,
          passcode: security.passcode,
        }),
      });

      const data = await res.json().catch(() => ({}));
      const apiMsg = data.message || data.error;

      if (!res.ok) {
        showAlert(apiMsg || "Something went wrong", "error");
        setLoading(false);
        return;
      }

      if (apiMsg) showAlert(apiMsg, "success");

      if (data.success) handleCancelSecurity();

    } catch (err) {
      console.error(err);
      showAlert("Network error (Server unreachable)", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#1f1f1f] border border-gray-700 rounded-xl p-5">
      <h4 className="text-lg font-semibold mb-4 text-[#B476FF]">Change Passcode</h4>
      <div className="space-y-5 w-full">
        
        {/* Email Dropdown */}
        <div className="w-full relative" ref={dropdownRef}>
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Email</label>
          <div
            className="w-full rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 cursor-pointer focus:outline-none focus:border-[#B476FF]"
            onClick={() => setDropdownOpen((prev) => !prev)}
            tabIndex={0}
          >
            {security.email || "Select account email"}
          </div>

          {dropdownOpen && (
            <ul className="absolute z-50 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 scrollbar-none">
              {emails.map((admin, index) => (
                <li
                  key={admin.id}
                  className={`px-3 py-2 cursor-pointer ${
                    highlightedIndex === index ? "bg-[#B476FF] text-white" : "hover:bg-[#B476FF]/80 hover:text-white"
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                  onClick={() => {
                    handleSecurityChange("email", admin.email);
                    setDropdownOpen(false);
                  }}
                >
                  {admin.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* New Passcode */}
        <div className="w-full">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">New Passcode</label>
          <div className="relative">
            <input
              type={showNewPasscode ? "text" : "password"}
              value={security.newPassword}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                handleSecurityChange("newPassword", val);
              }}
              onKeyDown={handleEnterFocusNext}
              placeholder="Enter new passcode"
              className="w-full rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#B476FF]"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 dark:text-gray-300"
              onClick={() => setShowNewPasscode(!showNewPasscode)}
            >
              {showNewPasscode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </span>
          </div>
        </div>

        {/* Confirm Passcode */}
        <div className="w-full">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Confirm Passcode</label>
          <div className="relative">
            <input
              type={showConfirmPasscode ? "text" : "password"}
              value={security.confirmPassword}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                handleSecurityChange("confirmPassword", val);
              }}
              onKeyDown={handleEnterFocusNext}
              placeholder="Confirm new passcode"
              className="w-full rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 dark:text-gray-300"
              onClick={() => setShowConfirmPasscode(!showConfirmPasscode)}
            >
              {showConfirmPasscode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </span>
          </div>
        </div>

        {/* Owner Passcode */}
        <div className="w-full">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Owner Passcode</label>
          <div className="relative">
            <input
              type={showOwnerPasscodeSecurity ? "text" : "password"}
              value={security.passcode}
              onChange={(e) => handleSecurityChange("passcode", e.target.value)}
              onKeyDown={handleEnterFocusNext}
              placeholder="Enter owner passcode"
              className="w-full rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 dark:text-gray-300"
              onClick={() => setShowOwnerPasscodeSecurity(!showOwnerPasscodeSecurity)}
            >
              {showOwnerPasscodeSecurity ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleCancelSecurity}
            disabled={loading}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-5 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePasscode}
            disabled={loading}
            className="rounded-lg bg-[#B476FF] text-white px-5 py-2 font-medium text-sm"
          >
            {loading ? "Updating..." : "Change Passcode"}
          </button>
        </div>
      </div>
    </div>
  );
}
