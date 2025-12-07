// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DeliveryForm from "../AddDeliveryMan/DeliveryForm";
// import DeliveryTable from "../AddDeliveryMan/DeliveryTable";
// import DeliverySummary from "../AddDeliveryMan/DeliverySummary";

// const AddDeliveryMan = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     location: "",
//     status: "Full time",
//     photo: "",
//   });
//   const [deliveryMen, setDeliveryMen] = useState([]);

//   const fetchDeliveryMen = async () => {
//     try {
//       const res = await axios.get("http://38.60.244.108:3000/deliverymen");
//       setDeliveryMen(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // fetch every 500ms
//   useEffect(() => {
//     fetchDeliveryMen();
//     const interval = setInterval(fetchDeliveryMen, 500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col bg-gray-100 p-4">
//       <DeliverySummary />
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#B476FF] text-white px-6 py-2 rounded-full"
//         >
//           Add Delivery Man
//         </button>
//       </div>

//       {showForm && (
//         <DeliveryForm
//           formData={formData}
//           setFormData={setFormData}
//           onClose={() => setShowForm(false)}
//           refreshList={fetchDeliveryMen}
//         />
//       )}

//       <DeliveryTable
//         deliveryMen={deliveryMen}
//         onOpenChat={(man) => {
//           setActiveChat(man);
//           setChatOpen(true);
//           if (!messages[man.id])
//             setMessages((prev) => ({ ...prev, [man.id]: [] }));
//         }}
//       />
//     </div>
//   );
// };

// export default AddDeliveryMan;

import React, { useState, useEffect } from "react";
import axios from "axios";
import DeliveryForm from "../AddDeliveryMan/DeliveryForm";
import DeliveryTable from "../AddDeliveryMan/DeliveryTable";
import DeliverySummary from "../AddDeliveryMan/DeliverySummary";

const AddDeliveryMan = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    status: "Full time",
    photo: "",
  });
  const [deliveryMen, setDeliveryMen] = useState([]);

  const fetchDeliveryMen = async () => {
    try {
      const res = await axios.get("http://38.60.244.108:3000/deliverymen");
      setDeliveryMen(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // fetch every 500ms
  useEffect(() => {
    fetchDeliveryMen();
    const interval = setInterval(fetchDeliveryMen, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 p-4">
      <DeliverySummary />

      {showForm && (
        <DeliveryForm
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowForm(false)}
          refreshList={fetchDeliveryMen}
        />
      )}

      <DeliveryTable
        deliveryMen={deliveryMen}
        setShowForm={setShowForm} // ← pass this prop to table
        onOpenChat={(man) => {
          setActiveChat(man);
          setChatOpen(true);
          if (!messages[man.id])
            setMessages((prev) => ({ ...prev, [man.id]: [] }));
        }}
      />
    </div>
  );
};

export default AddDeliveryMan;
