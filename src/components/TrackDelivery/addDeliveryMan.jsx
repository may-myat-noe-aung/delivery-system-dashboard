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
      const res = await axios.get("http://38.60.244.137:3000/deliverymen");
      setDeliveryMen(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
    const interval = setInterval(fetchDeliveryMen, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col p-4 bg-gray-900 text-gray-100 min-h-screen">
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
        setShowForm={setShowForm}
      />
    </div>
  );
};

export default AddDeliveryMan;
