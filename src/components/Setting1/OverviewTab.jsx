
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export default function OverviewTab() {
// //   const [account, setAccount] = useState(null);

// //   useEffect(() => {
// //     const timer = setTimeout(async () => {
// //       try {
// //         const res = await axios.get("http://38.60.244.137:3000/admin");

// //         if (res.data?.success) {
// //           const ownerAccount = res.data.data.find(
// //             (a) => a.role === "owner"
// //           );

// //           if (ownerAccount) {
// //             setAccount({
// //               id: ownerAccount.id,
// //               name: ownerAccount.name,
// //               email: ownerAccount.email,
// //               phone: ownerAccount.phone,
// //               gender: ownerAccount.gender,
// //               role: ownerAccount.role,
// //             });
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Failed to load owner data", error);
// //       }
// //     }, 500); // ⏱️ 500ms delay

// //     return () => clearTimeout(timer);
// //   }, []);

// //   if (!account) {
// //     return (
// //       <p className="text-neutral-500">
// //         Loading personal information...
// //       </p>
// //     );
// //   }

// //   return (
// //     <div className="w-full bg-white border border-neutral-200 rounded-xl p-5">
// //       <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
// //         Personal Information
// //       </h3>

// //       <div className="grid grid-cols-2 gap-6">
// //         <div className="space-y-4">
// //           <div>
// //             <label className="text-sm text-neutral-600 block mb-2">Name</label>
// //             <div className="bg-white rounded-lg p-2 border border-neutral-300">
// //               <p className="font-medium text-sm">{account.name}</p>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="text-sm text-neutral-600 block mb-2">
// //               Email Address
// //             </label>
// //             <div className="bg-white rounded-lg p-2 border border-neutral-300">
// //               <p className="font-medium text-sm">{account.email}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="space-y-4">
// //           <div>
// //             <label className="text-sm text-neutral-600 block mb-2">
// //               Mobile Number
// //             </label>
// //             <div className="bg-white rounded-lg p-2 border border-neutral-300">
// //               <p className="font-medium text-sm">{account.phone}</p>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="text-sm text-neutral-600 block mb-2">Gender</label>
// //             <div className="bg-white rounded-lg p-2 border border-neutral-300">
// //               <p className="font-medium text-sm">{account.gender}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-span-2 space-y-4">
// //           <div>
// //             <label className="text-sm text-neutral-600 block mb-2">Role</label>
// //             <div className="bg-white rounded-lg p-2 border border-neutral-300">
// //               <p className="font-medium text-sm">{account.role}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function OverviewTab({ dark = false }) { // <-- added dark prop
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       try {
//         const res = await axios.get("http://38.60.244.137:3000/admin");

//         if (res.data?.success) {
//           const ownerAccount = res.data.data.find(
//             (a) => a.role === "owner"
//           );

//           if (ownerAccount) {
//             setAccount({
//               id: ownerAccount.id,
//               name: ownerAccount.name,
//               email: ownerAccount.email,
//               phone: ownerAccount.phone,
//               gender: ownerAccount.gender,
//               role: ownerAccount.role,
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load owner data", error);
//       }
//     }, 500); // ⏱️ 500ms delay

//     return () => clearTimeout(timer);
//   }, []);

//   if (!account) {
//     return (
//       <p className={`text-neutral-500 ${dark ? "dark:text-neutral-400" : ""}`}>
//         Loading personal information...
//       </p>
//     );
//   }

//   return (
//     <div
//       className={`w-full border rounded-xl p-5 
//         ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-neutral-200"}`}
//     >
//       <h3 className={`font-bold text-xl mb-6 ${dark ? "text-purple-400" : "text-[#B476FF]"}`}>
//         Personal Information
//       </h3>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label className={`text-sm block mb-2 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
//               Name
//             </label>
//             <div className={`rounded-lg p-2 border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-neutral-300"}`}>
//               <p className="font-medium text-sm">{account.name}</p>
//             </div>
//           </div>

//           <div>
//             <label className={`text-sm block mb-2 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
//               Email Address
//             </label>
//             <div className={`rounded-lg p-2 border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-neutral-300"}`}>
//               <p className="font-medium text-sm">{account.email}</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className={`text-sm block mb-2 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
//               Mobile Number
//             </label>
//             <div className={`rounded-lg p-2 border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-neutral-300"}`}>
//               <p className="font-medium text-sm">{account.phone}</p>
//             </div>
//           </div>

//           <div>
//             <label className={`text-sm block mb-2 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
//               Gender
//             </label>
//             <div className={`rounded-lg p-2 border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-neutral-300"}`}>
//               <p className="font-medium text-sm">{account.gender}</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-2 space-y-4">
//           <div>
//             <label className={`text-sm block mb-2 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
//               Role
//             </label>
//             <div className={`rounded-lg p-2 border ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-neutral-300"}`}>
//               <p className="font-medium text-sm">{account.role}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OverviewTab() {
  const [account, setAccount] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // detect system dark mode
  useEffect(() => {
    const darkModeMq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkModeMq.matches);

    const handler = (e) => setIsDark(e.matches);
    darkModeMq.addEventListener("change", handler);

    return () => darkModeMq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get("http://38.60.244.137:3000/admin");

        if (res.data?.success) {
          const ownerAccount = res.data.data.find(
            (a) => a.role === "owner"
          );

          if (ownerAccount) {
            setAccount({
              id: ownerAccount.id,
              name: ownerAccount.name,
              email: ownerAccount.email,
              phone: ownerAccount.phone,
              gender: ownerAccount.gender,
              role: ownerAccount.role,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load owner data", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!account) {
    return (
      <p className={`text-neutral-500 ${isDark ? "text-gray-400" : ""}`}>
        Loading personal information...
      </p>
    );
  }

  return (
    // <div
    //   className={`w-full border rounded-xl p-5 transition-colors duration-300
    //     ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-neutral-200"}`}
    // >
    <div>
      <h3 className={`font-bold text-xl mb-6 transition-colors duration-300
        ${isDark ? "text-purple-400" : "text-[#B476FF]"}`}
      >
        Personal Information
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className={`text-sm block mb-2 transition-colors duration-300
              ${isDark ? "text-gray-300" : "text-neutral-600"}`}
            >
              Name
            </label>
            <div className={`rounded-lg p-2 border transition-colors duration-300
              ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-neutral-300"}`}
            >
              <p className={`font-medium text-sm ${isDark ? "text-white" : ""}`}>{account.name}</p>
            </div>
          </div>

          <div>
            <label className={`text-sm block mb-2 transition-colors duration-300
              ${isDark ? "text-gray-300" : "text-neutral-600"}`}
            >
              Email Address
            </label>
            <div className={`rounded-lg p-2 border transition-colors duration-300
              ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-neutral-300"}`}
            >
              <p className={`font-medium text-sm ${isDark ? "text-white" : ""}`}>{account.email}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className={`text-sm block mb-2 transition-colors duration-300
              ${isDark ? "text-gray-300" : "text-neutral-600"}`}
            >
              Mobile Number
            </label>
            <div className={`rounded-lg p-2 border transition-colors duration-300
              ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-neutral-300"}`}
            >
              <p className={`font-medium text-sm ${isDark ? "text-white" : ""}`}>{account.phone}</p>
            </div>
          </div>

          <div>
            <label className={`text-sm block mb-2 transition-colors duration-300
              ${isDark ? "text-gray-300" : "text-neutral-600"}`}
            >
              Gender
            </label>
            <div className={`rounded-lg p-2 border transition-colors duration-300
              ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-neutral-300"}`}
            >
              <p className={`font-medium text-sm ${isDark ? "text-white" : ""}`}>{account.gender}</p>
            </div>
          </div>
        </div>

        {/* Full Width Role */}
        <div className="col-span-2 space-y-4">
          <div>
            <label className={`text-sm block mb-2 transition-colors duration-300
              ${isDark ? "text-gray-300" : "text-neutral-600"}`}
            >
              Role
            </label>
            <div className={`rounded-lg p-2 border transition-colors duration-300
              ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-neutral-300"}`}
            >
              <p className={`font-medium text-sm ${isDark ? "text-white" : ""}`}>{account.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}