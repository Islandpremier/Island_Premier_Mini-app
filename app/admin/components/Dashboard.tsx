"use client";

import { useEffect, useState } from "react";
import Stats from "./Stats";
import SearchBar from "./SearchBar";
import OrderCard from "./OrderCard";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();

    if (data.success) {
      setOrders(data.orders);
    }
  }

  const filteredOrders = orders.filter((order: any) =>
    order.customer_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-yellow-500 mb-8">
          Dashboard Admin
        </h1>

        <Stats orders={orders} />

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <div className="mt-8 space-y-6">

          {filteredOrders.length === 0 && (
            <div className="text-zinc-400">
              Nessun ordine trovato.
            </div>
          )}

          {filteredOrders.map((order: any) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

        </div>

      </div>

    </main>
  );
}