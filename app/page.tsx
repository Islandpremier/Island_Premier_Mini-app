export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <img
        src="/Logo.png"
        alt="Island Premier"
        className="w-64 mb-8 rounded-xl"
      />

      <h1 className="text-5xl font-bold text-yellow-500 text-center">
        ISLAND PREMIER
      </h1>

      <p className="text-gray-300 text-center mt-4 max-w-xl">
        Catalogo premium con ordini tramite Telegram.
      </p>

      <a
        href="/catalogo"
        className="mt-8 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
      >
        Entra nel Catalogo
      </a>
    </main>
  );
}