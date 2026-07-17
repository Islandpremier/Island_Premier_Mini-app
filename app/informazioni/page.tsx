import Link from "next/link";

export default function InformazioniPage() {
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
          Informazioni
        </h1>

        <div className="space-y-8">

          <section>
            <h2 className="text-2xl font-semibold mb-2">Verifica</h2>
            <p className="text-gray-300">
              L'accesso ai servizi è riservato esclusivamente agli utenti verificati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Modalità disponibili
            </h2>

            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Delivery in Lombardia.</li>
              <li>Meet-Up nelle zone LC - BG - MB.</li>
              <li>Spedizione (in arrivo).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Come funziona l'ordine
            </h2>

            <p className="text-gray-300">
              Una volta inviato l'ordine, riceverai una risposta direttamente su
              <span className="text-yellow-400 font-semibold"> Telegram </span>
              con conferma, disponibilità e tutte le istruzioni necessarie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Disponibilità</h2>

            <p className="text-gray-300">
              Alcuni prodotti potrebbero terminare rapidamente. La disponibilità
              viene sempre confermata prima della conclusione dell'ordine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Assistenza</h2>

            <p className="text-gray-300">
              Per qualsiasi domanda puoi contattarci direttamente tramite Telegram.
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