"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  product: any;
  selectedOption: string;
  onOptionChange: (value: string) => void;
  onAdd: () => void;
};

export default function ProductCard({
  product,
  selectedOption,
  onOptionChange,
  onAdd,
}: Props) {
  const options = product.price_list
    ?.split("\n")
    .filter(Boolean);

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      overflow-hidden
      rounded-3xl
      border
      border-yellow-500/20
      bg-zinc-900
      shadow-xl
      "
    >

      {product.video_url ? (

        <video
          autoPlay
          muted
          loop
          playsInline
          className="
          h-80
          w-full
          object-cover
          transition
          duration-500
          hover:scale-105
          "
        >
          <source
            src={product.video_url}
            type="video/mp4"
          />
        </video>

      ) : product.image_url ? (

        <img
          src={product.image_url}
          alt={product.name}
          className="
          h-80
          w-full
          object-cover
          transition
          duration-500
          hover:scale-105
          "
        />

      ) : null}

      <div className="p-6">

        <div className="mb-2">

          <span className="
          rounded-full
          bg-yellow-500/20
          px-3
          py-1
          text-xs
          uppercase
          tracking-widest
          text-yellow-500
          ">
            {product.category}
          </span>

        </div>

        <h2 className="text-2xl font-bold text-white">

          {product.name}

        </h2>

        <p className="mt-3 text-zinc-400 leading-7">

          {product.description}

        </p>

        <select
          value={selectedOption}
          onChange={(e) =>
            onOptionChange(e.target.value)
          }
          className="
          mt-6
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-black
          p-3
          "
        >

          {options.map(
            (
              option: string,
              index: number
            ) => (
              <option
                key={index}
                value={option}
              >
                {option}
              </option>
            )
          )}

        </select>

        <button
          onClick={onAdd}
          className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-yellow-500
          py-4
          font-bold
          text-black
          transition
          hover:scale-[1.02]
          "
        >

          <ShoppingCart
            size={22}
          />

          Aggiungi al carrello

        </button>

      </div>

    </motion.div>
  );
}