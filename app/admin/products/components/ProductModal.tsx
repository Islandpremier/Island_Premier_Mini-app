"use client";

import ProductForm from "./ProductForm";

type Props = {
  open: boolean;
  product: any;
  onClose: () => void;
};

export default function ProductModal({
  open,
  product,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl max-h-[90vh] bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col">

        <div className="flex items-center justify-between border-b border-zinc-700 p-6">

          <h2 className="text-2xl font-bold text-yellow-500">
            {product ? "Modifica prodotto" : "Nuovo prodotto"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-6">

          <ProductForm
            product={product}
            onSuccess={onClose}
          />

        </div>

      </div>

    </div>
  );
}