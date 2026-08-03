"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { CartDrawer } from "../../components/CartDrawer";
import { useAuth } from "../../context/AuthContext";

export default function AccountDashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "settings">("orders");

  // Protected Route Check
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-32 space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-400 font-medium">Checking authentication status...</p>
        </div>
        <Footer />
      </main>
    );
  }

  const mockOrders = [
    {
      id: "NX-310842",
      date: "August 3, 2026",
      status: "Processing",
      statusColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      total: 249.0,
      itemsCount: 1,
      items: ["Apex Ultra Smartwatch 2"],
    },
    {
      id: "NX-743109",
      date: "August 1, 2026",
      status: "Shipped",
      statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      total: 159.0,
      itemsCount: 1,
      items: ["CyberDeck RGB Mechanical Keyboard"],
    },
    {
      id: "NX-982141",
      date: "July 24, 2026",
      status: "Delivered",
      statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      total: 299.0,
      itemsCount: 1,
      items: ["Nexus Pro Wireless ANC Headphones"],
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Dashboard Header / Profile Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                {user.displayName?.[0] || user.email?.[0] || "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-extrabold text-white">
                    {user.displayName || "Customer Account"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    VERIFIED MEMBER ★
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => logout()}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold rounded-xl transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-800 gap-6 mb-8 text-sm">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-4 font-bold transition-colors relative ${
                activeTab === "orders" ? "text-white border-b-2 border-indigo-500" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`pb-4 font-bold transition-colors relative ${
                activeTab === "addresses" ? "text-white border-b-2 border-indigo-500" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-4 font-bold transition-colors relative ${
                activeTab === "settings" ? "text-white border-b-2 border-indigo-500" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Account Settings
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Your Recent Orders</h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-base">#{order.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">Placed on {order.date} • {order.itemsCount} item(s)</p>
                      <p className="text-xs text-zinc-300 font-medium">{order.items.join(", ")}</p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-0 border-zinc-800">
                      <div className="text-right">
                        <span className="text-xs text-zinc-500 block">Total Amount</span>
                        <span className="text-base font-bold text-white">${order.total.toFixed(2)}</span>
                      </div>

                      <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-xs transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Default Delivery Address</span>
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold rounded">DEFAULT</span>
                </div>
                <p className="text-xs text-zinc-300">{user.displayName || "Customer"}</p>
                <p className="text-xs text-zinc-400">House 42, Road 11, Banani</p>
                <p className="text-xs text-zinc-400">Dhaka - 1213, Bangladesh</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 max-w-2xl space-y-4">
              <h3 className="font-bold text-white text-base">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Full Name</label>
                  <input type="text" defaultValue={user.displayName || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Email</label>
                  <input type="email" readOnly defaultValue={user.email || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-400 cursor-not-allowed" />
                </div>
              </div>
              <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md">
                Save Changes
              </button>
            </div>
          )}

        </div>

        <CartDrawer />
      </div>

      <Footer />
    </main>
  );
}
