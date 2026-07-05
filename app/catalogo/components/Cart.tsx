"use client";

import { useState } from "react";

type CartItem = {
  name: string;
  quantityLabel: string;
  price: number;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (
    name: string,
    quantityLabel: string,
    price: number
  ) => {
    setItems((prev) => [
      ...prev,
      {
        name,
        quantityLabel,
        price,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-4 mt-8">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">
        Carrello
      </h2>

      {items.length === 0 ? (
        <p className="text-zinc-400">
          Nessun prodotto nel carrello
        </p>
      ) : (
        <>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-zinc-700 pb-2"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {item.quantityLabel}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span>{item.price}€</span>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="text-xl font-bold">
              Totale: {total}€
            </p>
          </div>
        </>
      )}
    </div>
  );
}