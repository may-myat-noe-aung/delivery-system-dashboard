import { useEffect, useRef, useState } from "react";
import SystemNotificationDropdown from "./SystemNotificationDropdown";

export default function SystemNotificationFetcherForShopmanager() {
  const [notifications, setNotifications] = useState([]);

  const seenRef = useRef({
    pending: new Set(),
    approved: new Set(),
  });

  const initializedRef = useRef({
    pending: false,
    approved: false,
  });

  const audioRef = useRef(null);

  // ================= SOUND =================

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);

  const playSound = () => {
    try {
      audioRef.current?.play();
    } catch {}
  };

  // ================= STORAGE =================

  const save = (list) => {
    setNotifications(list);

    localStorage.setItem("shopManagerNoti", JSON.stringify(list));
  };

  const add = (noti) => {
    const old = JSON.parse(localStorage.getItem("shopManagerNoti") || "[]");

    if (old.some((n) => n.id === noti.id)) {
      return;
    }

    const updated = [noti, ...old].slice(0, 100);

    save(updated);

    playSound();
  };

  // ================= PENDING SHOPS =================

  const fetchPendingShops = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://api.pwezayshops.com/shops-pending", {
      headers: {
        Authorization: `MSHteam ${token}`,
      },
    });

    const list = (await res.json()) || [];

    if (!initializedRef.current.pending) {
      list.forEach((shop) => seenRef.current.pending.add(shop.id));

      initializedRef.current.pending = true;

      return;
    }

    list.forEach((shop) => {
      if (!seenRef.current.pending.has(shop.id)) {
        seenRef.current.pending.add(shop.id);

        add({
          id: `shop-pending-${shop.id}`,
          type: "shop-pending",
          message: `New shop waiting approval
Shop: ${shop.shop_name}
ID: ${shop.id}`,
          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // ================= APPROVED SHOPS =================

  const fetchApprovedShops = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://api.pwezayshops.com/shops-approve", {
      headers: {
        Authorization: `MSHteam ${token}`,
      },
    });

    const list = (await res.json()) || [];

    if (!initializedRef.current.approved) {
      list.forEach((shop) => seenRef.current.approved.add(shop.id));

      initializedRef.current.approved = true;

      return;
    }

    list.forEach((shop) => {
      if (!seenRef.current.approved.has(shop.id)) {
        seenRef.current.approved.add(shop.id);

        add({
          id: `shop-approved-${shop.id}`,

          type: "shop-approved",

          message: `Shop approved
Shop: ${shop.shop_name}
ID: ${shop.id}`,

          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // ================= FETCH ALL =================

  const fetchAll = async () => {
    try {
      await Promise.all([fetchPendingShops(), fetchApprovedShops()]);
    } catch (err) {
      console.log("Shop manager notification error:", err);
    }
  };

  // ================= INIT =================

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shopManagerNoti")) || [];

    setNotifications(saved);

    fetchAll();

    const interval = setInterval(fetchAll, 8000);

    return () => clearInterval(interval);
  }, []);

  return <SystemNotificationDropdown notifications={notifications} />;
}
