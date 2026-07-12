import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-black">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-3">

          <div>

            <img
              src="/Logo.png"
              alt="Island Premier"
              className="w-24"
            />

            <p className="mt-5 text-zinc-400 leading-7">
              Island Premier è una Mini App moderna,
              veloce e ottimizzata per Telegram.
            </p>

          </div>

          <div>

            <h3 className="mb-5 text-lg font-bold text-yellow-500">
              Navigazione
            </h3>

            <div className="space-y-3">

              <Link
                href="/"
                className="block text-zinc-400 hover:text-yellow-500"
              >
                Home
              </Link>

              <Link
                href="/catalogo"
                className="block text-zinc-400 hover:text-yellow-500"
              >
                Catalogo
              </Link>

              <Link
                href="/regolamento"
                className="block text-zinc-400 hover:text-yellow-500"
              >
                Regolamento
              </Link>

            </div>

          </div>

          <div>

            <h3 className="mb-5 text-lg font-bold text-yellow-500">
              Informazioni
            </h3>

            <p className="text-zinc-400">
              Meet Up
            </p>

            <p className="text-zinc-400">
              Delivery Lombardia
            </p>

            <p className="text-zinc-400">
              Supporto Telegram
            </p>

          </div>

        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Island Premier
        </div>

      </div>

    </footer>
  );
}