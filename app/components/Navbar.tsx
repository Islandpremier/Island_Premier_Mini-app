"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/Logo.png"
            alt="Island Premier"
            className="w-12"
          />

          <span className="text-lg font-bold tracking-wider text-white">
            ISLAND PREMIER
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm md:flex">

          <Link
            href="/"
            className="text-zinc-300 hover:text-yellow-500 transition"
          >
            Home
          </Link>

          <Link
            href="/catalogo"
            className="text-zinc-300 hover:text-yellow-500 transition"
          >
            Catalogo
          </Link>

          <Link
            href="/regolamento"
            className="text-zinc-300 hover:text-yellow-500 transition"
          >
            Regolamento
          </Link>

        </nav>

        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>

      </div>

    </header>
  );
}