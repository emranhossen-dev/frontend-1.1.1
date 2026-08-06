"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");

  const mockOrders = [
    {
      id: "WB-982341",
      date: "2026-08-01",
      total: 249.99,
      status: "Delivered",
      itemsCount: 2,
    },
    {
      id: "WB-712390",
      date: "2026-07-28",
      total: 129.50,
      status: "Processing",
      itemsCount: 1,
    },
  ];

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Sign In Required</h1>
        <p className="text-zinc-400 text-sm">Please sign in to access your order history and account details.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* User Header Card */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {(user?.displayName || user?.email || "U")[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-black text-white">{user.displayName || "Valued Customer"}</h1>
            <p className="text-xs text-zinc-400">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-zinc-800 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === "orders"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          Order History ({mockOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === "profile"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          Profile Settings
        </button>
      </div>

      {/* Content */}
      {activeTab === "orders" ? (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">#{order.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === "Delivered"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">Placed on {order.date} • {order.itemsCount} item(s)</p>
              </div>

              <div className="text-right self-end sm:self-auto">
                <span className="text-base font-black text-white">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 max-w-lg space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Full Name</label>
            <input
              type="text"
              readOnly
              value={user.displayName || "Customer"}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Email Address</label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
