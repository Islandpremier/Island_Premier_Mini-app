"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/informazioni", label: "Info" },
  { href: "/regolamento", label: "Regole" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-yellow-500/20 bg-black/70 backdrop-blur-xl px-4 py-3 shadow-xl">

        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="Island Premier"
            width={42}
            height={42}
            className="rounded-lg"
          />

          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-[0.2em] text-white">
              ISLAND
            </p>
            <p className="text-xs tracking-[0.3em] text-yellow-400">
              PREMIER
            </p>
          </div>

        </Link>

        <div className="flex items-center gap-2">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-yellow-500 text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-yellow-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

        </div>

      </nav>
    </header>
  );
}