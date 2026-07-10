"use client";

import { useState } from "react";

export default function OrderCard({
  order,
}: {
  order: any;
}) {
  const products = order.products || [];

  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    try {
      setLoading(true);

      const res = await fetch("/api/order/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Errore durante l'aggiornamento.");
        return;
      }

      setStatus(newStatus);

      // aggiorna tutta la dashboard
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Errore durante l'aggiornamento dell'ordine.");
    } finally {
      setLoading(false);
    }
  }

  const badgeColor =
    status === "approved"
      ? "bg-green-600"
      : status === "rejected"
      ? "bg-red-600"
      : "bg-yellow-600";

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-yellow-500">
            Ordine #{order.id}
          </h2>

          <p className="mt-3">👤 {order.customer_name}</p>
          <p>📞 {order.phone_number}</p>
          <p>📍 {order.city}</p>
          <p>🚚 {order.shipping_method}</p>

        </div>

        <span
          className={`${badgeColor} px-4 py-2 rounded-full text-white font-semibold`}
        >
          {status}
        </span>

      </div>

      <div className="mt-6">

        <h3 className="font-bold text-yellow-500 mb-3">
          Prodotti
        </h3>

        <div className="space-y-2">

          {products.map((item: any, index: number) => (
            <div
              key={index}
              className="border-b border-zinc-800 pb-2"
            >
              <div className="font-semibold">
                {item.product?.name || item.product_name}
              </div>

              <div className="text-zinc-400 text-sm">
                {item.option || item.quantity_label}
              </div>

              <div className="text-green-400">
                €{item.price || item.unit_price}
              </div>
            </div>
          ))}

        </div>

      </div>

      <div className="mt-6 flex justify-between items-center">

        <div className="text-2xl font-bold text-yellow-500">
          Totale €{order.total}
        </div>

        <div className="space-x-3">

          <button
            disabled={loading}
            onClick={() => updateStatus("approved")}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "..." : "Approva"}
          </button>

          <button
            disabled={loading}
            onClick={() => updateStatus("rejected")}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "..." : "Rifiuta"}
          </button>

        </div>

      </div>

    </div>
  );
}