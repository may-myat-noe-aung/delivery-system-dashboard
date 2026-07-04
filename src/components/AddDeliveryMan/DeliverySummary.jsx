import React, { useEffect, useState } from "react";
import { Truck, UserCheck, PackageCheck, ClipboardList } from "lucide-react";

/* ================= CARD ================= */
function DashboardCard({ title, value, icon, gradient, iconBg }) {
  return (
    <div
      className="
        relative overflow-hidden rounded-3xl border border-white/10
        bg-white/5 backdrop-blur-xl
        p-3 lg:p-4 xl:p-5 2xl:p-6
        transition-all duration-300 hover:scale-[1.02]
      "
    >
      {/* BG */}
      <div
        className={`absolute inset-0 opacity-20 bg-gradient-to-br ${gradient}`}
      />

      {/* Glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl ${iconBg} opacity-20`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm text-slate-300">
            {title}
          </p>

          <h2 className="mt-1 font-bold text-white text-sm lg:text-base xl:text-lg 2xl:text-xl">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex items-center justify-center border border-white/10 rounded-xl
            ${iconBg}
            w-8 h-8
            lg:w-9 lg:h-9
            xl:w-10 xl:h-10
            2xl:w-12 2xl:h-12
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ================= LOADING ================= */
function LoadingCard() {
  return (
    <div className="h-[120px] rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
  );
}

/* ================= MAIN ================= */
export default function DeliverySummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/deliverymen-summaries-by-system"
        );

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <section className="grid grid-cols-4 gap-3 lg:gap-4 xl:gap-5 mb-5">
        {[...Array(4)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-4 gap-3 lg:gap-4 xl:gap-5 mb-5">
      {/* TOTAL DELIVERYMEN */}
      <DashboardCard
        title="Total Delivery Men"
        value={data.total_deliverymen}
        icon={
          <Truck className="text-indigo-300 w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
        }
        gradient="from-indigo-500 to-transparent"
        iconBg="bg-indigo-500/20"
      />

      {/* ACTIVE DELIVERYMEN */}
      <DashboardCard
        title="Active Delivery Men"
        value={data.active_deliverymen}
        icon={
          <UserCheck className="text-emerald-300 w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
        }
        gradient="from-emerald-500 to-transparent"
        iconBg="bg-emerald-500/20"
      />

      {/* TODAY FINISHED ORDERS */}
      <DashboardCard
        title="Today's Finished Orders"
        value={data.today_orders_finished}
        icon={
          <PackageCheck className="text-sky-300 w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
        }
        gradient="from-sky-500 to-transparent"
        iconBg="bg-sky-500/20"
      />

      {/* ALL FINISHED ORDERS */}
      <DashboardCard
        title="All Finished Orders"
        value={data.all_orders_finished}
        icon={
          <ClipboardList className="text-rose-300 w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
        }
        gradient="from-rose-500 to-transparent"
        iconBg="bg-rose-500/20"
      />
    </section>
  );
}