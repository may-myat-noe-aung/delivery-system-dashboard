import React, { useState, useEffect } from "react";
import axios from "axios";
import DeliveryForm from "./AddDeliveryForm";
import DeliveryTable from "./DeliveryTable";
import DeliverySummary from "./DeliverySummary";

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
  const token = localStorage.getItem("token");

const fetchDeliveryMen = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://api.pwezayshops.com/deliverymen",
      {
        headers: {
          Authorization: `MSHteam ${token}`,
        },
      }
    );

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
    <div className="flex flex-col  bg-gray-900 text-gray-100 min-h-screen">
      <DeliverySummary />
      <div className="flex justify-end">
      </div>

      {showForm && (
        <DeliveryForm
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowForm(false)}
          refreshList={fetchDeliveryMen}
        />
      )}

      <DeliveryTable deliveryMen={deliveryMen} setShowForm={setShowForm} />
    </div>
  );
};

export default AddDeliveryMan;
