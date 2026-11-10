import axios from "axios";

const API = "https://api.pwezayshops.com";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `MSHteam ${token}`,
  };
};

export const deleteDeliveryMan = (id) =>
  axios.delete(`${API}/deliverymen/${id}`, {
    headers: getHeaders(),
  });


export const updateDeliveryManStatus = (id, status) =>
  axios.patch(
    `${API}/deliverymen/status/${id}`,
    {
      status,
    },
    {
      headers: getHeaders(),
    }
  );


export const updateDeliveryMan = (id, formData) =>
  axios.put(
    `${API}/deliverymen/${id}`,
    formData,
    {
      headers: {
        ...getHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );

// const API = "https://api.pwezayshops.com";

// const getHeaders = () => {
//   const token = localStorage.getItem("token");

//   return {
//     Authorization: `MSHteam ${token}`,
//   };
// };

// export const deleteDeliveryMan = (id) =>
//   fetch(`${API}/deliverymen/${id}`, {
//     method: "DELETE",
//     headers: getHeaders(),
//   }).then((response) => {
//     if (!response.ok) {
//       return response.json().then((error) => {
//         throw new Error(error.message || "Failed to delete delivery man");
//       });
//     }

//     return response.json();
//   });

// export const updateDeliveryManStatus = (id, status) =>
//   fetch(`${API}/deliverymen/status/${id}`, {
//     method: "PATCH",
//     headers: {
//       ...getHeaders(),
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       status,
//     }),
//   }).then((response) => {
//     if (!response.ok) {
//       return response.json().then((error) => {
//         throw new Error(error.message || "Failed to update status");
//       });
//     }

//     return response.json();
//   });

// export const updateDeliveryMan = (id, formData) =>
//   fetch(`${API}/deliverymen/${id}`, {
//     method: "PUT",
//     headers: getHeaders(),
//     body: formData,
//   }).then((response) => {
//     if (!response.ok) {
//       return response.json().then((error) => {
//         throw new Error(error.message || "Failed to update delivery man");
//       });
//     }

//     return response.json();
//   });
