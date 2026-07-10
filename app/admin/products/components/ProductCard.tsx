"use client";

type Props = {
  product: any;
  onEdit: () => void;
  refresh: () => void;
};

export default function ProductCard({
  product,
  onEdit,
  refresh,
}: Props) {
  async function deleteProduct() {
    const ok = confirm(
      `Eliminare "${product.name}"?`
    );

    if (!ok) return;

    try {
      const res = await fetch("/api/products/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error);
        return;
      }

      refresh();

    } catch (err) {
      console.error(err);
      alert("Errore durante l'eliminazione.");
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">

      <div className="aspect-square bg-zinc-800 flex items-center justify-center overflow-hidden">

        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-zinc-500">
            Nessuna immagine
          </div>
        )}

      </div>

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold text-yellow-500">
            {product.name}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.available
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {product.available
              ? "DISPONIBILE"
              : "NON DISPONIBILE"}
          </span>

        </div>

        <p className="text-zinc-400 mt-2">
          {product.category}
        </p>

        <p className="text-zinc-500 mt-4 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-6">

          <h3 className="font-semibold text-yellow-500 mb-2">
            Listino
          </h3>

          {product.price_list ? (
            <div className="space-y-1 text-sm">

              {product.price_list
                .split("\n")
                .map((row: string, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between"
                  >
                    <span>{row}</span>
                  </div>
                ))}

            </div>
          ) : (
            <div className="text-zinc-500">
              Nessun listino
            </div>
          )}

        </div>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onEdit}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold"
          >
            Modifica
          </button>

          <button
            onClick={deleteProduct}
            className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
          >
            Elimina
          </button>

        </div>

      </div>

    </div>
  );
}