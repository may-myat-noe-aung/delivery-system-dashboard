// export const parseLocation = (loc) => {
//   try {
//     if (!loc || typeof loc !== "string") return null;

//     const clean = loc.toLowerCase().trim();

//     const latMatch = clean.match(/lag\s*([-.\d]+)/);
//     const lngMatch = clean.match(/log\s*([-.\d]+)/);

//     if (!latMatch || !lngMatch) return null;

//     return {
//       lat: parseFloat(latMatch[1]),
//       lng: parseFloat(lngMatch[1]),
//     };
//   } catch {
//     return null;
//   }
// };
export const parseLocation = (loc) => {
  try {
    if (!loc || typeof loc !== "string") return null;

    const clean = loc.toLowerCase().trim();

    const latMatch = clean.match(/lag\s*([-.\d]+)/);
    const lngMatch = clean.match(/log\s*([-.\d]+)/);

    if (!latMatch || !lngMatch) return null;

    return {
      lat: parseFloat(latMatch[1]),
      lng: parseFloat(lngMatch[1]),
    };
  } catch {
    return null;
  }
};

// 👇 ADD THIS (DON’T REPLACE parseLocation)
export const getDriverPhoto = (photo) => {
  if (!photo) return null;

  return `http://38.60.244.108:3000/deliverymen-uploads/${photo}`;
};