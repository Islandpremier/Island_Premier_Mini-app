import ProductCard from "./ProductCard";

type Props = {
  loading: boolean;
  products: any[];
  onEdit: (product: any) => void;
  refresh: () => void;
};

export default function ProductList({
  loading,
  products,
  onEdit,
  refresh,
}: Props) {
  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-400">
        Caricamento prodotti...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-12 text-center">

        <h2 className="text-2xl font-bold text-yellow-500">
          Nessun prodotto
        </h2>

        <p className="text-zinc-400 mt-3">
          Aggiungi il primo prodotto al catalogo.
        </p>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          refresh={refresh}
        />
      ))}

    </div>
  );
}