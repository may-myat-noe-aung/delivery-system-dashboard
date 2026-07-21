import { useEffect, useRef, useState } from "react";
import SystemNotificationDropdown from "./SystemNotificationDropdown";

export default function SystemNotificationFetcherForDelimanager() {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  const seenRef = useRef(new Set());

  const initializedRef = useRef(false);

  const audioRef = useRef(null);

  // =============================
  // INIT SOUND
  // =============================
  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);

  const playSound = () => {
    try {
      audioRef.current?.play();
    } catch (e) {}
  };

  // =============================
  // STORAGE
  // =============================

  const save = (list) => {
    setNotifications(list);

    localStorage.setItem("deliManagerNoti", JSON.stringify(list));
  };

  const add = (noti) => {
    const prev = JSON.parse(localStorage.getItem("deliManagerNoti") || "[]");

    // duplicate check
    if (prev.some((n) => n.id === noti.id)) {
      return;
    }

    const updated = [noti, ...prev].slice(0, 100);

    save(updated);

    playSound();
  };

  // =============================
  // DELIVERYMEN
  // =============================

  const fetchDeliverymen = async () => {
    const res = await fetch("https://api.pwezayshops.com/deliverymen", {
      headers: {
        Authorization: `MSHteam ${token}`,
      },
    });

    const list = (await res.json()) || [];

    // FIRST LOAD
    if (!initializedRef.current) {
      list.forEach((d) => {
        seenRef.current.add(d.id);
      });

      initializedRef.current = true;

      return;
    }

    // CHECK NEW DELIVERYMAN

    list.forEach((d) => {
      if (!seenRef.current.has(d.id)) {
        seenRef.current.add(d.id);

        add({
          id: `deliveryman-${d.id}`,

          type: "deliveryman",

          message: `New delivery partner joined
Name: ${d.name}
ID: ${d.id}`,

          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // =============================
  // FETCH LOOP
  // =============================

  const fetchAll = async () => {
    try {
      await fetchDeliverymen();
    } catch (err) {
      console.log("Deli manager notification error:", err);
    }
  };

  // =============================
  // INIT
  // =============================

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("deliManagerNoti")) || [];

    setNotifications(saved);

    fetchAll();

    const interval = setInterval(fetchAll, 8000);

    return () => clearInterval(interval);
  }, []);

  return <SystemNotificationDropdown notifications={notifications} />;
}
