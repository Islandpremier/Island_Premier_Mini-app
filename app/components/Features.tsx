"use client";

import {
  Truck,
  Package,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Catalogo",
    text: "Prodotti aggiornati in tempo reale con immagini e video.",
  },
  {
    icon: Truck,
    title: "Consegna",
    text: "Meet Up e Delivery disponibili in base alla tua zona.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    text: "Ordini gestiti in modo riservato tramite Telegram.",
  },
  {
    icon: Headphones,
    title: "Supporto",
    text: "Assistenza diretta per qualsiasi richiesta.",
  },
];

export default function Features() {
  return (
    <section>

      <div className="mb-14 text-center">

        <h2 className="text-4xl font-bold text-white">
          Perché scegliere
          <span className="text-yellow-500">
            {" "}Island Premier
          </span>
        </h2>

        <p className="mt-4 text-zinc-400">
          Un catalogo semplice, veloce e ottimizzato anche per Telegram.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {features.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="rounded-3xl border border-yellow-500/20 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-yellow-500"
            >

              <Icon
                size={34}
                className="text-yellow-500"
              />

              <h3 className="mt-6 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {item.text}
              </p>

            </div>

          );

        })}

      </div>

    </section>
  );
}