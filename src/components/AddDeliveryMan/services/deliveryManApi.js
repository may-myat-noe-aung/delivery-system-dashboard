// import axios from "axios";

// const API = "https://api.pwezayshops.com";

// export const deleteDeliveryMan = (id) =>
//   axios.delete(`${API}/deliverymen/${id}`);

// export const updateDeliveryManStatus = (id, status) =>
//   axios.patch(`${API}/deliverymen/status/${id}`, {
//     status,
//   });

// export const updateDeliveryMan = (id, formData) =>
//   axios.put(`${API}/deliverymen/${id}`, formData);
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