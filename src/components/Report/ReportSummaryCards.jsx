import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  DollarSign,
  Truck,
  Users,
} from "lucide-react";

function Card({ title, value, icon, gradient, iconBg }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      {/* Background */}
      <div
        className={`absolute inset-0 opacity-20 bg-gradient-to-br ${gradient}`}
      />

      {/* Glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl ${iconBg} opacity-20`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-300">{title}</p>
          <h2 className="mt-1 text-2xl font-bold text-white">{value}</h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="h-[120px] rounded-3xl bg-white/5 border border-white/10 animate-pulse" />
  );
}

export default function ReportSummaryCards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/report-system-summaries"
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

    fetchSummary();

    const interval = setInterval(fetchSummary, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[...Array(4)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      <Card
        title="Today's Orders"
        value={data.today_orders.toLocaleString()}
        icon={<ShoppingBag className="w-5 h-5 text-indigo-300" />}
        gradient="from-indigo-500 to-transparent"
        iconBg="bg-indigo-500/20"
      />

      <Card
        title="Today's Amount"
        value={`${Number(
          data.today_amount || 0
        ).toLocaleString()} Ks`}
        icon={<DollarSign className="w-5 h-5 text-emerald-300" />}
        gradient="from-emerald-500 to-transparent"
        iconBg="bg-emerald-500/20"
      />

      <Card
        title="Delivery Fees"
        value={`${Number(
          data.today_delivery_fees || 0
        ).toLocaleString()} Ks`}
        icon={<Truck className="w-5 h-5 text-yellow-300" />}
        gradient="from-yellow-500 to-transparent"
        iconBg="bg-yellow-500/20"
      />

      <Card
        title="Total Customers"
        value={data.total_customers.toLocaleString()}
        icon={<Users className="w-5 h-5 text-rose-300" />}
        gradient="from-rose-500 to-transparent"
        iconBg="bg-rose-500/20"
      />
    </section>
  );
}