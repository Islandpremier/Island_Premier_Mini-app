"use client";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">

      <button
        onClick={() => onSelect("")}
        className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
          selected === ""
            ? "bg-yellow-500 text-black font-bold"
            : "bg-zinc-900 text-white border border-zinc-700"
        }`}
      >
        Tutti
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
            selected === category
              ? "bg-yellow-500 text-black font-bold"
              : "bg-zinc-900 text-white border border-zinc-700"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}