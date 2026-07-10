type Props = {
  onNewProduct: () => void;
};

export default function Toolbar({
  onNewProduct,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold text-yellow-500">
          Gestione Prodotti
        </h1>

        <p className="text-zinc-400 mt-2">
          Gestisci il catalogo Island Premier.
        </p>

      </div>

      <button
        onClick={onNewProduct}
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition"
      >
        + Nuovo Prodotto
      </button>

    </div>
  );
}