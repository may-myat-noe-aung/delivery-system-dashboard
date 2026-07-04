import { useEffect, useRef, useState } from "react";
import SystemNotificationDropdown from "./SystemNotificationDropdown";

export default function SystemNotificationFetcher() {
  const [notifications, setNotifications] = useState([]);

  // seen tracking
  const seenRef = useRef({
    users: new Set(),
    shopsPending: new Set(),
    shopsApproved: new Set(),
    deliverymen: new Set(),
  });

  // first load control
  const initializedRef = useRef({
    users: false,
    shopsPending: false,
    shopsApproved: false,
    deliverymen: false,
  });

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
    localStorage.setItem("systemNoti", JSON.stringify(list));
  };

  const add = (noti) => {
    const prev = JSON.parse(localStorage.getItem("systemNoti") || "[]");

    // prevent duplicate
    if (prev.some((n) => n.id === noti.id)) return;

    const updated = [noti, ...prev].slice(0, 100);

    save(updated);
    playSound();
  };

  // =============================
  // USERS
  // =============================
  const fetchUsers = async () => {
    const res = await fetch("https://api.pwezayshops.com/users");
    const list = (await res.json()) || [];

    if (!initializedRef.current.users) {
      list.forEach((u) => seenRef.current.users.add(u.id));
      initializedRef.current.users = true;
      return;
    }

    list.forEach((u) => {
      if (!seenRef.current.users.has(u.id)) {
        seenRef.current.users.add(u.id);

        add({
          id: `user-${u.id}`,
          type: "user",
          message: `New user registered\nName: ${u.name}\nID: ${u.id}`,
          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // =============================
  // SHOP PENDING
  // =============================
  const fetchShopsPending = async () => {
    const res = await fetch("https://api.pwezayshops.com/shops-pending");
    const list = (await res.json()) || [];

    if (!initializedRef.current.shopsPending) {
      list.forEach((s) => seenRef.current.shopsPending.add(s.id));
      initializedRef.current.shopsPending = true;
      return;
    }

    list.forEach((s) => {
      if (!seenRef.current.shopsPending.has(s.id)) {
        seenRef.current.shopsPending.add(s.id);

        add({
          id: `shop-p-${s.id}`,
          type: "shop-pending",
          message: `New shop waiting approval\nShop: ${s.shop_name}\nID: ${s.id}`,
          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // =============================
  // SHOP APPROVED
  // =============================
  const fetchShopsApproved = async () => {
    const res = await fetch("https://api.pwezayshops.com/shops-approve");
    const list = (await res.json()) || [];

    if (!initializedRef.current.shopsApproved) {
      list.forEach((s) => seenRef.current.shopsApproved.add(s.id));
      initializedRef.current.shopsApproved = true;
      return;
    }

    list.forEach((s) => {
      if (!seenRef.current.shopsApproved.has(s.id)) {
        seenRef.current.shopsApproved.add(s.id);

        add({
          id: `shop-a-${s.id}`,
          type: "shop-approved",
          message: `New Shop approved\nName: ${s.shop_name}\nID: ${s.id}`,
          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // =============================
  // DELIVERYMEN
  // =============================
  const fetchDeliverymen = async () => {
    const res = await fetch("https://api.pwezayshops.com/deliverymen");
    const list = (await res.json()) || [];

    if (!initializedRef.current.deliverymen) {
      list.forEach((d) => seenRef.current.deliverymen.add(d.id));
      initializedRef.current.deliverymen = true;
      return;
    }

    list.forEach((d) => {
      if (!seenRef.current.deliverymen.has(d.id)) {
        seenRef.current.deliverymen.add(d.id);

        add({
          id: `dm-${d.id}`,
          type: "deliveryman",
          message: `New delivery partner joined\nName: ${d.name}\nID: ${d.id}`,
          time: new Date().toLocaleTimeString(),
        });
      }
    });
  };

  // =============================
  // MASTER FETCH
  // =============================
  const fetchAll = async () => {
    try {
      await Promise.all([
        fetchUsers(),
        fetchShopsPending(),
        fetchShopsApproved(),
        fetchDeliverymen(),
      ]);
    } catch (e) {
      console.log("System noti error:", e);
    }
  };

  // =============================
  // INIT
  // =============================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("systemNoti")) || [];
    setNotifications(saved);

    fetchAll();

    const interval = setInterval(fetchAll, 8000);

    return () => clearInterval(interval);
  }, []);

  return <SystemNotificationDropdown notifications={notifications} />;
}