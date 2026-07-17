export default function RegolamentoPage() {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-black text-yellow-500 text-center mb-12">
          📜 REGOLAMENTO
        </h1>

        <p className="text-zinc-300 text-center text-lg mb-12">
          Prima di inoltrare qualsiasi richiesta è
          <strong> obbligatorio leggere e accettare </strong>
          le seguenti condizioni.
        </p>

        <div className="space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              🔒 Verifica
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Le richieste vengono prese in considerazione esclusivamente da utenti verificati.</strong></li>
              <li>Le richieste provenienti da utenti non verificati non verranno valutate.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              👤 Meet-Up
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Gli incontri potranno avvenire esclusivamente con la persona verificata.</strong></li>
              <li>Non è consentita la presenza di accompagnatori o terze persone.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              ⏰ Comportamento
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Si richiedono <strong>puntualità, discrezione e massima serietà.</strong></li>
              <li>Comportamenti sospetti o non conformi comporteranno l'interruzione immediata del rapporto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              💶 Pagamento
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Presentarsi con <strong>la cifra esatta.</strong></li>
              <li>Non vengono effettuati cambi o conteggi sul posto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              📸 Foto e Video
            </h2>

            <p className="text-zinc-300 leading-8">
              Per motivi di <strong>riservatezza</strong>, foto, video e materiale aggiuntivo
              non vengono pubblicati nella Mini App.
              Eventuali contenuti potranno essere richiesti privatamente,
              previa verifica e in base alla disponibilità.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">
              🔐 Privacy
            </h2>

            <p className="text-zinc-300 leading-8">
              Le informazioni fornite vengono utilizzate esclusivamente
              per la gestione dell'ordine e dell'assistenza.
            </p>
          </section>

        </div>

        <div className="mt-16 border border-yellow-500/20 rounded-3xl bg-zinc-900 p-8 text-center">

          <p className="text-lg text-zinc-300">
            🤝 Il rispetto delle presenti condizioni garantisce un servizio
            <strong> più sicuro, rapido e organizzato.</strong>
          </p>

          <p className="mt-8 text-yellow-500 font-bold text-2xl">
            🏝️ Welcome to Paradise
          </p>

        </div>

      </div>

    </main>
  );
}