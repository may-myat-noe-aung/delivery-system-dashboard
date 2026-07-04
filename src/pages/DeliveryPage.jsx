import React from "react";
import TrackDeliveryMan from "../components/TrackDelivery/TrackDeliveryMan";
import AddDeliveryMan from "../components/AddDeliveryMan/AddNewDeliveryMan";

const DeliveryPage = () => {
  return (
   <>

    <section className=" px-4 py-6 bg-gray-900 text-gray-100">
      <AddDeliveryMan />
      <TrackDeliveryMan />
    </section></>
  );
};

export default DeliveryPage;
