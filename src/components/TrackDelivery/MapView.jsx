// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import DriverMarker from "./DriverMarker";

// function Focus({ selected }) {
//   const map = useMap();

//   useEffect(() => {
//     if (selected?.lat && selected?.lng) {
//       map.flyTo([selected.lat, selected.lng], 15, {
//         duration: 1.2,
//       });
//     }
//   }, [selected]);

//   return null;
// }

// export default function MapView({ drivers, selected }) {
//   return (
//     <MapContainer
//       center={[16.78, 96.18]}
//       zoom={13}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       <Focus selected={selected} />

//       {drivers.map((d) => (
//         <DriverMarker key={d.id} driver={d} selected={selected} />
//       ))}
//     </MapContainer>
//   );
// }
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Polyline } from "react-leaflet";
import DriverMarker from "./DriverMarker";

function Focus({ selected }) {
  const map = useMap();

  useEffect(() => {
    if (selected?.lat && selected?.lng) {
      map.flyTo([selected.lat, selected.lng], 15, {
        duration: 1.2,
      });
    }
  }, [selected]);

  return null;
}

export default function MapView({ drivers, selected, history = {} }) {
  return (
    <MapContainer
      center={[16.78, 96.18]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Base map */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Auto focus selected driver */}
      <Focus selected={selected} />

      {/* 🟣 ROUTE LINES (REAL TRACKING PATH) */}
   {Object.entries(history || {}).map(([driverId, path]) => {
  if (!Array.isArray(path) || path.length < 2) return null;

  const cleanPath = path.filter(
    (p) => Array.isArray(p) && p[0] && p[1]
  );

  if (cleanPath.length < 2) return null;

  return (
    <Polyline
      key={driverId}
      positions={cleanPath}
      color={driverId == selected?.id ? "#a855f7" : "#60a5fa"}
      weight={3}
      opacity={0.7}
    />
  );
})}

      {/* 🚗 DRIVER MARKERS */}
      {drivers.map((d) => (
        <DriverMarker key={d.id} driver={d} selected={selected} />
      ))}
    </MapContainer>
  );
}