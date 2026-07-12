"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background */}
      <img
        src="/Hero.png"
        alt="Island Premier"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />

      {/* Hero */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >

        <motion.img
          src="/Logo.png"
          alt="Island Premier"
          className="mb-10 w-44 drop-shadow-[0_0_35px_rgba(250,204,21,0.45)]"
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
        />

        <h1 className="text-6xl font-black uppercase tracking-[10px] text-white md:text-8xl">
          ISLAND
        </h1>

        <h2 className="mt-2 text-3xl font-light uppercase tracking-[18px] text-yellow-500 md:text-5xl">
          PREMIER
        </h2>

        <p className="mt-10 max-w-2xl text-lg leading-8 text-zinc-300 md:text-2xl">
          Benvenuto in Island Premier.
          <br />
          Esplora il catalogo, guarda i prodotti e invia
          il tuo ordine direttamente dalla Mini App.
        </p>

        <Link
          href="/catalogo"
          className="group mt-14 flex items-center gap-3 rounded-2xl bg-yellow-500 px-8 py-5 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
        >
          ESPLORA IL CATALOGO

          <ArrowRight
            size={22}
            className="transition group-hover:translate-x-1"
          />
        </Link>

        <div className="mt-20 flex flex-wrap justify-center gap-5">

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
            <p className="text-sm uppercase tracking-[3px] text-yellow-500">
              Delivery
            </p>

            <p className="mt-1 text-zinc-300">
              Lombardia
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
            <p className="text-sm uppercase tracking-[3px] text-yellow-500">
              Meet Up
            </p>

            <p className="mt-1 text-zinc-300">
              LC · BG · MB
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
            <p className="text-sm uppercase tracking-[3px] text-yellow-500">
              Ordini
            </p>

            <p className="mt-1 text-zinc-300">
              Telegram
            </p>
          </div>

        </div>

      </motion.div>

    </section>
  );
}