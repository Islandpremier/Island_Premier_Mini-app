"use client";

import Link from "next/link";
import {
  Package,
  Info,
  FileText,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Catalogo",
    text: "Esplora il catalogo completo con immagini, video e listini aggiornati.",
    href: "/catalogo",
    external: false,
  },
  {
    icon: Info,
    title: "Informazioni",
    text: "Scopri modalità di consegna, verifica, disponibilità e supporto.",
    href: "/informazioni",
    external: false,
  },
  {
    icon: FileText,
    title: "Regolamento",
    text: "Consulta il regolamento prima di inoltrare qualsiasi richiesta.",
    href: "/regolamento",
    external: false,
  },
  {
    icon: MessageCircle,
    title: "Assistenza",
    text: "Contattaci direttamente tramite Telegram per qualsiasi informazione.",
    href: "https://t.me/Sommelier14",
    external: true,
  },
];

export default function Features() {
  return (
    <section>

      <div className="mb-14 text-center">

        <h2 className="text-4xl font-bold text-red-500">
          prova
          <span className="text-yellow-500">
            {" "}Island Premier
          </span>
        </h2>

        <p className="mt-4 text-zinc-400 text-lg">
          Un'esperienza semplice, veloce e ottimizzata per Telegram.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {features.map((item, index) => {

          const Icon = item.icon;

          const content = (
            <>
              <Icon
                size={36}
                className="text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              />

              <h3 className="mt-6 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {item.text}
              </p>
            </>
          );

          if (item.external) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:bg-zinc-800 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className="group rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:bg-zinc-800 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
            >
              {content}
            </Link>
          );

        })}

      </div>

    </section>
  );
}