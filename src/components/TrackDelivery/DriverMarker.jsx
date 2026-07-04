// import React from "react";
// import { Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import { User } from "lucide-react";

// const createIcon = (isOnline, isSelected) =>
//   new L.DivIcon({
//     html: `
//       <div style="
//         width:40px;
//         height:40px;
//         border-radius:50%;
//         display:flex;
//         align-items:center;
//         justify-content:center;
//         background:#111827;
//         border:2px solid ${
//           isSelected ? "#a855f7" : isOnline ? "#22c55e" : "#6b7280"
//         };
//         box-shadow:0 0 8px rgba(0,0,0,0.4);
//       ">
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
//           fill="none" stroke="white" stroke-width="2"
//           viewBox="0 0 24 24">
//           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//           <circle cx="12" cy="7" r="4"/>
//         </svg>
//       </div>
//     `,
//     className: "",
//   });

// export default function DriverMarker({ driver, selected }) {
//   if (!driver.lat || !driver.lng) return null;

//   const isOnline = driver.is_online === 1;
//   const isSelected = selected?.id === driver.id;

//   return (
//     <Marker
//       position={[driver.lat, driver.lng]}
//       icon={createIcon(isOnline, isSelected)}
//     >
//       <Popup>
//         <div className="text-center">
//           <User className="mx-auto text-purple-400 mb-2" />
//           <p className="font-bold">{driver.name}</p>
//           <p className="text-sm">{driver.phone}</p>
//           <p className="text-sm">
//             Orders: {driver.assign_order}
//           </p>
//         </div>
//       </Popup>
//     </Marker>
//   );
// }

import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { User } from "lucide-react";

const createIcon = (isOnline, isSelected) =>
  new L.DivIcon({
    html: `
      <div style="
        position:relative;
        width:44px;
        height:44px;
        display:flex;
        align-items:center;
        justify-content:center;
        transform: rotate(45deg);
        background:${isSelected ? "#a855f7" : isOnline ? "#22c55e" : "#6b7280"};
        border-radius:12px;
        box-shadow:0 8px 20px rgba(0,0,0,0.35);
      ">
        <div style="
          width:38px;
          height:38px;
          background:#0f172a;
          border-radius:10px;
          display:flex;
          align-items:center;
          justify-content:center;
          transform: rotate(-45deg);
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            fill="none" stroke="white" stroke-width="2"
            viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        ${
          isOnline
            ? `<span style="
                position:absolute;
                top:-4px;
                right:-4px;
                width:10px;
                height:10px;
                background:#22c55e;
                border-radius:50%;
                box-shadow:0 0 8px #22c55e;
              "></span>`
            : ""
        }
      </div>
    `,
    className: "",
  });

export default function DriverMarker({ driver, selected }) {
  if (!driver.lat || !driver.lng) return null;

  const isOnline = driver.is_online === 1;
  const isSelected = selected?.id === driver.id;

  return (
    <Marker
      position={[driver.lat, driver.lng]}
      icon={createIcon(isOnline, isSelected)}
    >
     <Popup>
  <div className="min-w-[120px] text-center p-1">

    <p className="font-semibold text-sm text-slate-800 leading-tight">
      {driver.name}
    </p>

    <p className="text-[11px] text-gray-500">
      {driver.phone}
    </p>

    <div
      className={`text-[10px] px-2 py-[2px] rounded-full ${
        isOnline
          ? "bg-green-500/20 text-green-600"
          : "bg-gray-500/20 text-gray-500"
      }`}
    >
      {isOnline ? "Online" : "Offline"}
    </div>

    <p className="text-[11px] text-slate-600">
      Orders: {driver.assign_order}
    </p>

  </div>
</Popup>
    </Marker>
  );
}