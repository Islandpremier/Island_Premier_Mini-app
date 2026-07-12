"use client";

import { ShoppingCart } from "lucide-react";

type Props = {
  total: number;
  items: number;
  onOpen: () => void;
};

export default function FloatingCart({
  total,
  items,
  onOpen,
}: Props) {
  return (
    <button
      onClick={onOpen}
      className="
      fixed
      bottom-6
      right-6
      z-50
      flex
      items-center
      gap-3
      rounded-full
      bg-yellow-500
      px-6
      py-4
      shadow-2xl
      transition
      hover:scale-105
      "
    >
      <ShoppingCart
        size={24}
        className="text-black"
      />

      <div className="text-left">

        <div className="font-bold text-black">
          {items} prodotti
        </div>

        <div className="text-sm text-black">
          € {total}
        </div>

      </div>

    </button>
  );
}