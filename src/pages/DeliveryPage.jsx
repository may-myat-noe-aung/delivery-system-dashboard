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
import TrackDeliveryMan from "../components/Delivery/DeliveryStatistic";
import AddDeliveryMan from '../components/Delivery/AddDeliveryMan';
import { useTheme } from "../components/ThemeProvider";

const DeliveryPage = () => {
  const { dark } = useTheme(); // get dark mode value

  return (
    <section
      className={`
        max-w-8xl px-4 h-[720px] overflow-y-auto
        ${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
      `}
    >
      <AddDeliveryMan />
      <TrackDeliveryMan />
    </section>
  );
};

export default DeliveryPage;
