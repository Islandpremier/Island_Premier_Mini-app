import { supabase } from "@/lib/supabase";
import CatalogoClient from "./CatalogoClient";

export default async function CatalogoPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("available", true);

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold text-red-500">
          Errore caricamento catalogo
        </h1>
      </main>
    );
  }

  return <CatalogoClient products={products || []} />;
}