import React, { useEffect, useState } from "react";
import {
  DollarSign,
  Receipt,
  Percent,
  Store,
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

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">

        <div>
          <p className="text-xs text-slate-300">
            {title}
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            {value}
          </h2>
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

export default function FinanceSummaryCards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/finance-summaries",
          {
            method: "GET",
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          }
        );

        const result = await res.json();

        if (result.success) {
          setData(result);
        }
      } catch (err) {
        console.error("Finance summary fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();

    // Refresh every 1 second
    const interval = setInterval(fetchSummary, 1000);

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

      {/* Total Finance */}
      <Card
        title="Total Finance"
        value={`${Number(
          data.total_finance || 0
        ).toLocaleString()} Ks`}
        icon={
          <DollarSign className="w-5 h-5 text-emerald-300" />
        }
        gradient="from-emerald-500 to-transparent"
        iconBg="bg-emerald-500/20"
      />

      {/* Platform Fees */}
      <Card
        title="Total Platform Fees"
        value={`${Number(
          data.total_platform_fees || 0
        ).toLocaleString()} Ks`}
        icon={
          <Receipt className="w-5 h-5 text-indigo-300" />
        }
        gradient="from-indigo-500 to-transparent"
        iconBg="bg-indigo-500/20"
      />

      {/* Commission Fees */}
      <Card
        title="Total Commission Fees"
        value={`${Number(
          data.total_commission_fees || 0
        ).toLocaleString()} Ks`}
        icon={
          <Percent className="w-5 h-5 text-yellow-300" />
        }
        gradient="from-yellow-500 to-transparent"
        iconBg="bg-yellow-500/20"
      />

      {/* Total Shops */}
      <Card
        title="Total Shops"
        value={Number(
          data.total_shops || 0
        ).toLocaleString()}
        icon={
          <Store className="w-5 h-5 text-rose-300" />
        }
        gradient="from-rose-500 to-transparent"
        iconBg="bg-rose-500/20"
      />

    </section>
  );
}