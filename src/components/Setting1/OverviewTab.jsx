// import React, { useState, useEffect } from "react";

// /* 🔹 FAKE ADMIN DATA */
// const fakeAccount = {
//   id: 1,
//   name: "Su Su Khin",
//   email: "owner@example.com",
//   phone: "+1234567890",
//   gender: "Male",
//   role: "Owner",
// };

// export default function OverviewTab() {
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     // Simulate loading delay
//     setTimeout(() => {
//       setAccount(fakeAccount);
//     }, 500);
//   }, []);

//   if (!account) {
//     return <p className="text-neutral-500">Loading personal information...</p>;
//   }

//   return (
//     <div className="w-full bg-white border border-neutral-200 rounded-xl p-5">
//       <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
//         Personal Information
//       </h3>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label className="text-sm text-neutral-600 block mb-2">Name</label>
//             <div className="bg-white rounded-lg p-2 border border-neutral-300">
//               <p className="font-medium text-sm">{account.name}</p>
//             </div>
//           </div>

//           <div>
//             <label className="text-sm text-neutral-600 block mb-2">
//               Email Address
//             </label>
//             <div className="bg-white rounded-lg p-2 border border-neutral-300">
//               <p className="font-medium text-sm">{account.email}</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="text-sm text-neutral-600 block mb-2">
//               Mobile Number
//             </label>
//             <div className="bg-white rounded-lg p-2 border border-neutral-300">
//               <p className="font-medium text-sm">{account.phone}</p>
//             </div>
//           </div>

//           <div>
//             <label className="text-sm text-neutral-600 block mb-2">Gender</label>
//             <div className="bg-white rounded-lg p-2 border border-neutral-300">
//               <p className="font-medium text-sm">{account.gender}</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-2 space-y-4">
//           <div>
//             <label className="text-sm text-neutral-600 block mb-2">Role</label>
//             <div className="bg-white rounded-lg p-2 border border-neutral-300">
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

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get("http://38.60.244.108:3000/admin");

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
    }, 500); // ⏱️ 500ms delay

    return () => clearTimeout(timer);
  }, []);

  if (!account) {
    return (
      <p className="text-neutral-500">
        Loading personal information...
      </p>
    );
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-xl p-5">
      <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
        Personal Information
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-neutral-600 block mb-2">Name</label>
            <div className="bg-white rounded-lg p-2 border border-neutral-300">
              <p className="font-medium text-sm">{account.name}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600 block mb-2">
              Email Address
            </label>
            <div className="bg-white rounded-lg p-2 border border-neutral-300">
              <p className="font-medium text-sm">{account.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-neutral-600 block mb-2">
              Mobile Number
            </label>
            <div className="bg-white rounded-lg p-2 border border-neutral-300">
              <p className="font-medium text-sm">{account.phone}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600 block mb-2">Gender</label>
            <div className="bg-white rounded-lg p-2 border border-neutral-300">
              <p className="font-medium text-sm">{account.gender}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div>
            <label className="text-sm text-neutral-600 block mb-2">Role</label>
            <div className="bg-white rounded-lg p-2 border border-neutral-300">
              <p className="font-medium text-sm">{account.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

