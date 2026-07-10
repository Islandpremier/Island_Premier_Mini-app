"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  product?: any;
  onSuccess: () => void;
};

export default function ProductForm({
  product,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(
    product?.description ?? ""
  );

  const [category, setCategory] = useState(
    product?.category ?? ""
  );

  const [priceList, setPriceList] = useState(
    product?.price_list ?? ""
  );

  const [imageUrl, setImageUrl] = useState(
    product?.image_url ?? ""
  );

  const [videoUrl, setVideoUrl] = useState(
    product?.video_url ?? ""
  );

  const [available, setAvailable] = useState(
    product?.available ?? true
  );

  async function uploadImage(
    file: File
  ): Promise<string | null> {

    try {

      const fileName =
        `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        return null;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      return data.publicUrl;

    } catch (err) {

      console.error(err);

      alert("Errore upload immagine.");

      return null;

    }

  }

  async function uploadVideo(
    file: File
  ): Promise<string | null> {

    try {

      const fileName =
        `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("product-videos")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        return null;
      }

      const { data } = supabase.storage
        .from("product-videos")
        .getPublicUrl(fileName);

      return data.publicUrl;

    } catch (err) {

      console.error(err);

      alert("Errore upload video.");

      return null;

    }

  }

  async function imageChanged(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (!file) return;

    const url = await uploadImage(file);

    if (url) {

      setImageUrl(url);

    }

  }

  async function videoChanged(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (!file) return;

    const url = await uploadVideo(file);

    if (url) {

      setVideoUrl(url);

    }

  }

  async function saveProduct() {

    setLoading(true);

    try {

      const endpoint = product
        ? "/api/products/update"
        : "/api/products/create";

      const body = {

        id: product?.id,

        name,

        description,

        category,

        price_list: priceList,

        image_url: imageUrl,

        video_url: videoUrl,

        available,

      };
            const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Errore durante il salvataggio.");
        return;
      }

      onSuccess();

    } catch (err) {

      console.error(err);

      alert("Errore durante il salvataggio.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="space-y-6">

      <div>

        <label className="block mb-2 font-semibold">
          Nome prodotto
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Categoria
        </label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Descrizione
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Listino prezzi
        </label>

        <textarea
          rows={6}
          value={priceList}
          onChange={(e) => setPriceList(e.target.value)}
          placeholder={"5g - €55\n10g - €100\n20g - €180"}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Immagine prodotto
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={imageChanged}
          className="w-full"
        />

        {imageUrl && (

          <img
            src={imageUrl}
            alt="Anteprima"
            className="mt-4 h-48 rounded-xl object-cover border border-zinc-700"
          />

        )}

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Video prodotto
        </label>

        <input
          type="file"
          accept="video/*"
          onChange={videoChanged}
          className="w-full"
        />

        {videoUrl && (

          <video
            controls
            className="mt-4 rounded-xl w-full border border-zinc-700"
          >
            <source src={videoUrl} />
          </video>

        )}

      </div>

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={available}
          onChange={(e) =>
            setAvailable(e.target.checked)
          }
        />

        <span>Prodotto disponibile</span>

      </label>

      <button
        disabled={loading}
        onClick={saveProduct}
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl disabled:opacity-50"
      >
        {loading
          ? "Salvataggio..."
          : "Salva prodotto"}
      </button>

    </div>

  );

}