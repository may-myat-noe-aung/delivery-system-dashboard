// import React, { useEffect, useState } from "react";

// export default function OverviewTab({ account: accountProp }) {
//   const token = localStorage.getItem("token");
//   const [account, setAccount] = useState(accountProp || null);
//   const [loading, setLoading] = useState(!accountProp);

//   // Support Owner and Manager
//   const adminId = localStorage.getItem("userId");

//   useEffect(() => {
//     // If parent already passes account, use it
//     if (accountProp) {
//       setAccount(accountProp);
//       setLoading(false);
//       return;
//     }

//     if (!adminId) {
//       setLoading(false);
//       return;
//     }

//     const fetchAdmin = async () => {
//       try {
//         const res = await fetch(
//           `https://api.pwezayshops.com/admin/${adminId}`,
//           {
//             headers: {
//               Authorization: `MSHteam ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (
//           data.success &&
//           Array.isArray(data.data) &&
//           data.data.length > 0
//         ) {
//           setAccount(data.data[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch admin:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmin();

//     const interval = setInterval(fetchAdmin, 1000);

//     return () => clearInterval(interval);
//   }, [adminId, accountProp]);

//   if (loading) {
//     return (
//       <p className="text-neutral-400">
//         Loading personal information...
//       </p>
//     );
//   }

//   if (!account) {
//     return (
//       <p className="text-red-400">
//         Unable to load account information.
//       </p>
//     );
//   }

//   return (
//     <div>
//       <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
//         Personal Information
//       </h3>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Name */}
//         <div>
//           <label className="text-sm text-neutral-400 block mb-2">
//             Name
//           </label>
//           <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
//             {account.name || "-"}
//           </div>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="text-sm text-neutral-400 block mb-2">
//             Email Address
//           </label>
//           <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
//             {account.email || "-"}
//           </div>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="text-sm text-neutral-400 block mb-2">
//             Mobile Number
//           </label>
//           <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
//             {account.phone || "-"}
//           </div>
//         </div>

//         {/* Gender */}
//         <div>
//           <label className="text-sm text-neutral-400 block mb-2">
//             Gender
//           </label>
//           <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700 capitalize">
//             {account.gender || "-"}
//           </div>
//         </div>

//         {/* Role */}
//         <div className="md:col-span-2">
//           <label className="text-sm text-neutral-400 block mb-2">
//             Role
//           </label>
//           <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700 capitalize">
//             {account.role || "-"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function OverviewTab({ account: accountProp }) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userId =
    user.id ||
    localStorage.getItem("userId");

  const [account, setAccount] = useState(accountProp || null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    if (accountProp) {
      setAccount(accountProp);
      setLoading(false);
      return;
    }


    const fetchAdmin = async () => {

      if (!userId) {
        setLoading(false);
        return;
      }


      try {

        const res = await fetch(
          `https://api.pwezayshops.com/admin/${userId}`,
          {
            headers:{
              Authorization:`MSHteam ${token}`,
            },
          }
        );


        const data = await res.json();



        if(
          data.success &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ){
          setAccount(data.data[0]);
        }


      }catch(err){

        console.log("ADMIN ERROR:",err);

      }finally{

        setLoading(false);

      }

    };


    fetchAdmin();


  }, [userId]);





  if(loading){
    return (
      <p className="text-neutral-400">
        Loading personal information...
      </p>
    );
  }


  if(!account){

    return(
      <p className="text-red-400">
        Unable to load account information.
      </p>
    );

  }



  return (
    <div>

      <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
        Personal Information
      </h3>


      <div className="grid md:grid-cols-2 gap-6">


        <div>
          <label className="text-sm text-neutral-400">
            Name
          </label>

          <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
            {account.name || "-"}
          </div>
        </div>



        <div>
          <label className="text-sm text-neutral-400">
            Email
          </label>

          <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
            {account.email || "-"}
          </div>
        </div>



        <div>
          <label className="text-sm text-neutral-400">
            Phone
          </label>

          <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
            {account.phone || "-"}
          </div>
        </div>



        <div>
          <label className="text-sm text-neutral-400">
            Gender
          </label>

          <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700 capitalize">
            {account.gender || "-"}
          </div>
        </div>



        <div>
          <label className="text-sm text-neutral-400">
            Role
          </label>

          <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700 text-[#B476FF] capitalize">
            {account.role || "-"}
          </div>
        </div>


      </div>

    </div>
  );
}