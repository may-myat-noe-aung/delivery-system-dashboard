import { useEffect, useState } from "react";
import FinanceNotificationDropdown from "./FinanceNotificationDropdown";

const API_URL = "https://api.pwezayshops.com";

export default function FinanceNotificationFetcher() {
  const [shops, setShops] = useState([]);

  const token = localStorage.getItem("token");

  const fetchFinance = async () => {
    try {
      const res = await fetch(
        `${API_URL}/finance-noti`,
        {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          `Finance API error: ${res.status}`
        );
      }

      const data = await res.json();

      if (data?.success) {
        setShops(data.shops || []);
      } else {
        setShops([]);
      }
    } catch (error) {
      console.error(
        "Finance notification error:",
        error
      );

      setShops([]);
    }
  };

  useEffect(() => {
    fetchFinance();

    const interval = setInterval(
      fetchFinance,
      8000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <FinanceNotificationDropdown
      shops={shops}
    />
  );
}