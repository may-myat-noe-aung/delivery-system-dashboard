
// import React, { useEffect, useState } from "react";

// export default function OnlineDeliveryMenModal({ order, close }) {
//   const [deliverymen, setDeliverymen] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assigning, setAssigning] = useState(null);

//   useEffect(() => {
//     const fetchOnlineDeliveryMen = async () => {
//       try {
//         const res = await fetch("http://38.60.244.137:3000/online-deliverymen");
//         const result = await res.json();
//         setDeliverymen(result.data || []);
//       } catch (err) {
//         console.error(err);
//         setDeliverymen([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOnlineDeliveryMen();
//   }, []);

//   const handleAssign = async (deliverymanId) => {
//     try {
//       setAssigning(deliverymanId);
//       console.log("Assign order", order.id, "to", deliverymanId);
//       alert(`Order ${order.id} assigned to ${deliverymanId}`);
//       close();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setAssigning(null);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active": return "text-green-400";
//       case "warning": return "text-yellow-400";
//       case "inactive": return "text-red-400";
//       default: return "text-slate-400";
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-[#1a2030] w-[90%] max-w-3xl rounded-3xl p-6 shadow-2xl border border-slate-700">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-indigo-400">Active Delivery Men</h2>
//           <button onClick={close} className="text-red-400 hover:text-red-300">✕</button>
//         </div>

//         {loading ? (
//           <div className="text-center text-slate-400 py-10">Loading online delivery men...</div>
//         ) : deliverymen.length === 0 ? (
//           <div className="text-center text-slate-400 py-10">No active delivery men.</div>
//         ) : (
//           <div className="overflow-y-auto max-h-[400px]">
//             <table className="w-full text-sm">
//               <thead className="text-slate-400 border-b border-slate-700">
//                 <tr>
//                   <th className="py-3 text-left">ID</th>
//                   <th className="py-3 text-left">Name</th>
//                   <th className="py-3 text-left">Phone</th>
//                   <th className="py-3 text-left">Status</th>
//                   <th className="py-3 text-left">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {deliverymen.map((dm) => (
//                   <tr key={dm.id} className="border-b border-slate-800 hover:bg-slate-800/40 transition">
//                     <td className="py-3 text-cyan-400 font-semibold">{dm.id}</td>
//                     <td className="py-3">{dm.name}</td>
//                     <td className="py-3">{dm.phone}</td>
//                     <td className={`py-3 font-semibold ${getStatusColor(dm.status)}`}>{dm.status}</td>
//                     <td className="py-3">
//                       <button
//                         onClick={() => handleAssign(dm.id)}
//                         disabled={assigning === dm.id}
//                         className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded-lg text-sm disabled:opacity-50"
//                       >
//                         {assigning === dm.id ? "Assigning..." : "Assign"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useAlert } from "../../AlertContext";

export default function OnlineDeliveryMenModal({ order, close }) {
  const { showAlert } = useAlert();

  const [deliverymen, setDeliverymen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(null);

  useEffect(() => {
    const fetchOnlineDeliveryMen = async () => {
      try {
        const res = await fetch("http://38.60.244.137:3000/online-deliverymen");
        const result = await res.json();
        setDeliverymen(result.data || []);
      } catch (err) {
        console.error(err);
        setDeliverymen([]);
        showAlert("Failed to fetch delivery men", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOnlineDeliveryMen();
  }, []);

  const handleAssign = async (deliverymanId) => {
    try {
      setAssigning(deliverymanId);

      const res = await fetch(
        `http://38.60.244.137:3000/assign-orders/${deliverymanId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order.id }),
        }
      );

      const result = await res.json();

      if (res.ok && result) {
        showAlert(result.message || "Order assigned successfully", "success");
        close();
      } else {
        showAlert(result.message || "Failed to assign order", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("Something went wrong while assigning order", "error");
    } finally {
      setAssigning(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "inactive":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a2030] w-[90%] max-w-3xl rounded-3xl p-6 shadow-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-indigo-400">Active Delivery Men</h2>
          <button onClick={close} className="text-red-400 hover:text-red-300">✕</button>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-10">Loading online delivery men...</div>
        ) : deliverymen.length === 0 ? (
          <div className="text-center text-slate-400 py-10">No active delivery men.</div>
        ) : (
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 text-left">ID</th>
                  <th className="py-3 text-left">Name</th>
                  <th className="py-3 text-left">Phone</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {deliverymen.map((dm) => (
                  <tr key={dm.id} className="border-b border-slate-800 hover:bg-slate-800/40 transition">
                    <td className="py-3 text-cyan-400 font-semibold">{dm.id}</td>
                    <td className="py-3">{dm.name}</td>
                    <td className="py-3">{dm.phone}</td>
                    <td className={`py-3 font-semibold ${getStatusColor(dm.status)}`}>{dm.status}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleAssign(dm.id)}
                        disabled={assigning === dm.id}
                        className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded-lg text-sm disabled:opacity-50"
                      >
                        {assigning === dm.id ? "Assigning..." : "Assign"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}