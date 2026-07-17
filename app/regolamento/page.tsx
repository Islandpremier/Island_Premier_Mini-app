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

        <h1 className="text-4xl font-bold text-yellow-400 mb-3">
          📜 Regolamento
        </h1>

        <p className="text-gray-400 mb-10">
          Prima di inoltrare qualsiasi richiesta è obbligatorio prendere visione
          delle seguenti condizioni.
        </p>

        <div className="space-y-5">

          <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-5">
            🔒 Le richieste vengono prese in considerazione esclusivamente da utenti verificati.
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-5">
            🔒 Le richieste provenienti da utenti non verificati non verranno valutate.
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-5">
            👤 Eventuali incontri potranno avvenire esclusivamente con la persona che ha completato la verifica.
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-5">
            🚫 Non è consentita la presenza di accompagnatori o terze persone non autorizzate.
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-5">
            ⏰ Si richiedono puntualità, discrezione e massima serietà.
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-5">
            💶 In caso di importi concordati è richiesto presentarsi con la cifra esatta già preparata.
            <br />
            🚫 Non vengono gestiti cambi o conteggi sul posto.
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-5">
            ⚠️ Qualsiasi comportamento ritenuto inappropriato, sospetto o non conforme alle presenti condizioni comporterà l'interruzione immediata di ogni rapporto.
          </div>

        </div>

        <div className="mt-12 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-center">
          <p className="text-lg font-semibold text-yellow-400">
            🤝 Il rispetto delle regole garantisce un servizio più sicuro,
            rapido e organizzato per tutti.
          </p>

          <p className="mt-6 text-xl font-bold tracking-widest text-white">
            🏝️ ISLAND PREMIER
          </p>
        </div>

      </div>
    </main>
  );
}