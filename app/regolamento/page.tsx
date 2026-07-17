import Link from "next/link";

export default function RegolamentoPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="inline-block mb-8 rounded-xl border border-yellow-500 px-5 py-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
        >
          ← Torna alla Home
        </Link>

        <h1 className="text-4xl font-bold text-yellow-400 mb-10">
          Regolamento
        </h1>

        <div className="space-y-8">

          <section>
            <h2 className="text-2xl font-semibold mb-2">Verifica</h2>
            <p className="text-gray-300">
              L'utilizzo del servizio è consentito esclusivamente agli utenti verificati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Meet-Up</h2>
            <p className="text-gray-300">
              Gli incontri vengono concordati solo dopo conferma dell'ordine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Pagamento</h2>
            <p className="text-gray-300">
              Le modalità di pagamento vengono comunicate esclusivamente durante la conferma dell'ordine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Comportamento</h2>
            <p className="text-gray-300">
              Qualsiasi comportamento scorretto comporterà l'interruzione del servizio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Foto e Video</h2>
            <p className="text-gray-300">
              Le immagini presenti hanno solo scopo illustrativo e possono differire dal prodotto disponibile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Privacy</h2>
            <p className="text-gray-300">
              I dati forniti vengono utilizzati esclusivamente per la gestione dell'ordine.
            </p>
          </section>

        </div>

        <div className="mt-16 text-center text-yellow-400">
          Welcome to Paradise.
        </div>

      </div>
    </main>
  );
}