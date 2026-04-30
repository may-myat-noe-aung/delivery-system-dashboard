// import React from "react";
// import TrackDeliveryMan from "../components/Delivery/DeliveryStatistic";
// import AddDeliveryMan from '../components/Delivery/AddDeliveryMan'

// const DeliveryPage = () => {
//   return (
//     <section className=" max-w-8xl px-4 h-[720px] overflow-y-auto">
//       <AddDeliveryMan />
//       <TrackDeliveryMan />
//     </section>
//   );
// };

// export default DeliveryPage;
import React from "react";
import TrackDeliveryMan from "../components/TrackDelivery/TrackDeliveryMan";
import AddDeliveryMan from "../components/TrackDelivery/AddDeliveryMan";

const DeliveryPage = () => {
  return (
    <section className="min-h-screen overflow-y-auto max-w-8xl px-4 py-6 bg-gray-900 text-gray-100">
      <AddDeliveryMan />
      <TrackDeliveryMan />
    </section>
  );
};

export default DeliveryPage;
