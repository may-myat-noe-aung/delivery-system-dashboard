import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import MapView from "./MapView";
import DriverList from "./DriverList";
import { parseLocation } from "./utils";

const API = "https://api.pwezayshops.com/deliverymen";

export default function TrackDeliveryMan() {
  const token = localStorage.getItem("token");
  const [drivers, setDrivers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [history, setHistory] = useState({});

  const fetchData = async () => {
    const res = await axios.get(API,{
      headers: {
        Authorization: `MSHteam ${token}`,
      },
    });

    const formatted = res.data.map((d) => {
      const pos = parseLocation(d.location);

      return {
        ...d,
        lat: pos?.lat,
        lng: pos?.lng,
      };
    });

    // 🟣 store route history
    setHistory((prev) => {
      const updated = { ...prev };

      formatted.forEach((d) => {
        if (!updated[d.id]) updated[d.id] = [];

        updated[d.id].push([d.lat, d.lng]);

        // keep last 20 points only
        if (updated[d.id].length > 20) {
          updated[d.id].shift();
        }
      });

      return updated;
    });

    setDrivers(formatted);
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 500); // live refresh
    return () => clearInterval(interval);
  }, []);

  // 🔍 FILTER LOGIC
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      const matchSearch =
        d.name?.toLowerCase().includes(search.toLowerCase()) ||
        d.phone?.includes(search);

      const matchFilter =
        filter === "all"
          ? true
          : filter === "online"
            ? d.is_online === 1
            : d.is_online === 0;

      return matchSearch && matchFilter;
    });
  }, [drivers, search, filter]);

  return (
    <div className="flex h-full gap-4 ">
      {/* LEFT SIDEBAR */}
      <div className="w-[340px] h-[580px] 2xl:h-[680px] bg-[#1a2030]/80 border border-slate-700 rounded-3xl p-4">
        <DriverList
          drivers={filteredDrivers}
          selected={selected}
          onSelect={setSelected}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* MAP */}
      <div className="flex-1 bg-[#1a2030]/80 border border-slate-700 rounded-3xl overflow-hidden z-10">
        {/* <MapView drivers={filteredDrivers} selected={selected} />
         */}
        <MapView
          drivers={filteredDrivers}
          selected={selected}
          history={history}
        />
      </div>
    </div>
  );
}
