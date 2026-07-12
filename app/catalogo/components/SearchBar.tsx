"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Cerca un prodotto..."
        className="
          w-full
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          py-4
          pl-12
          pr-4
          text-white
          outline-none
          focus:border-yellow-500
        "
      />

    </div>
  );
}