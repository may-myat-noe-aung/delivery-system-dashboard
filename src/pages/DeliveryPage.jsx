import React from "react";
import TrackDeliveryMan from "../components/Delivery/DeliveryStatistic";
import AddDeliveryMan from '../components/Delivery/AddDeliveryMan'

const DeliveryPage = () => {
  return (
    <section className=" max-w-8xl px-4 h-[720px] overflow-y-auto">
      <AddDeliveryMan />
      <TrackDeliveryMan />
    </section>
  );
};

export default DeliveryPage;
