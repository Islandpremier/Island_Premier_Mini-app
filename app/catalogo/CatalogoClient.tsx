"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  video_url: string;
  price_list: string;
};

type CartItem = {
  product: Product;
  option: string;
  price: number;
};

type TimeSlot = {
  slot_name: string;
  method: string;
  active: boolean;
};

type Props = {
  products: Product[];
};

export default function CatalogoClient({ products }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [shippingMethod, setShippingMethod] =
    useState("Meet up");

  const [selectedSlot, setSelectedSlot] = useState("");
  const [street, setStreet] = useState("");
  const [cap, setCap] = useState("");
  const [province, setProvince] = useState("");

  const [selectedOptions, setSelectedOptions] =
    useState<Record<number, string>>({});
const [sending, setSending] = useState(false);
  useEffect(() => {
    const loadSlots = async () => {
     const { data, error } = await supabase
  .from("time slots")
  .select("*");

  if (error) {
  console.error(error);
  return;
}

setSlots(data ?? []);
    };

    loadSlots();
  }, []);
useEffect(() => {
  setSelectedSlot("");
}, [shippingMethod]);
  const getOptions = (priceList: string) => {
    return priceList
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const extractPrice = (option: string) => {
    const match = option.match(/(\d+)/g);

    if (!match) return 0;

    return Number(match[match.length - 1]);
  };

  const addToCart = (product: Product) => {
    const option =
      selectedOptions[product.id] ||
      getOptions(product.price_list)[0];

    const price = extractPrice(option);

    setCart((prev) => [
      ...prev,
      {
        product,
        option,
        price,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setCart((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [cart]);

const availableSlots = useMemo(() => {
  const methodMap: Record<string, string> = {
    "Meet up": "meet_up",
    Delivery: "delivery",
    "Shipping in arrivo": "ship",
  };

  return slots.filter(
    (slot) => slot.method === methodMap[shippingMethod]
  );
}, [slots, shippingMethod]);
  const deliveryAllowed =
    shippingMethod !== "Delivery" ||
    total >= 200;

  const buildTelegramMessage = () => {
    const productsText = cart
      .map(
        (item) =>
          `${item.product.name} - ${item.option}`
      )
      .join("\n");

    return `
Nuovo Ordine 

Nome: ${customerName}

Telefono: ${phoneNumber}

Comune: ${city}

Metodo: ${shippingMethod}

Fascia Oraria: ${selectedSlot}

Prodotti:
${productsText}

Totale: €${total}
`;
  };
  const sendOrder = async () => {
  if (cart.length === 0) {
    alert("Il carrello è vuoto.");
    return;
  }

  if (!customerName || !phoneNumber || !city) {
    alert("Compila tutti i campi obbligatori.");
    return;
  }

  if (!selectedSlot) {
    alert("Seleziona una fascia oraria.");
    return;
  }

  try {
    setSending(true);

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        phoneNumber,
        city,
        shippingMethod,
        selectedSlot,
        street,
        cap,
        province,
        cart,
        total,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    alert("Ordine inviato con successo!");

    setCart([]);
    setCustomerName("");
    setPhoneNumber("");
    setCity("");
    setStreet("");
    setCap("");
    setProvince("");
    setSelectedSlot("");
  } catch (err) {
    console.error(err);
    alert("Errore durante l'invio dell'ordine.");
  } finally {
    setSending(false);
  }
};
 
  return (
    <main className="min-h-screen bg-black text-white p-6">
        <a
  href="/"
  className="inline-block mb-6 bg-zinc-800 px-4 py-2 rounded-lg border border-yellow-500"
>
  ← Torna alla Home
</a>
      <h1 className="text-4xl font-bold text-yellow-500 mb-8">
        Menù Island Premier
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-yellow-500/20"
              >
     {product.video_url ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    controls={false}
    className="w-full h-[320px] object-cover bg-black"
  >
    <source
      src={product.video_url}
      type="video/mp4"
    />
  </video>
) : product.image_url ? (
  <img
    src={product.image_url}
    alt={product.name}
    className="w-full h-[320px] object-cover"
  />
) : (
  <div className="w-full h-[320px] flex items-center justify-center bg-zinc-800 text-zinc-500">
    Nessuna anteprima
  </div>
)}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-yellow-500">
                    {product.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {product.description}
                  </p>

                  <div className="mt-4">
                    <select
                      className="w-full bg-black border border-yellow-500 rounded-lg p-2"
                      onChange={(e) =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [product.id]: e.target.value,
                        }))
                      }
                    >
                      {getOptions(product.price_list).map(
                        (option, index) => (
                          <option
                            key={index}
                            value={option}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg w-full font-semibold"
                  >
                    Aggiungi al carrello
                  </button>
                </div>
                </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-zinc-900 border border-yellow-500 rounded-xl p-4 sticky top-4">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              Carrello
            </h2>

            {cart.length === 0 ? (
              <p className="text-zinc-400">
                Nessun prodotto nel carrello
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-zinc-700 pb-3"
                    >
                      <p className="font-semibold">
                        {item.product.name}
                      </p>

                      <p className="text-sm text-zinc-400">
                        {item.option}
                      </p>

                      <p className="text-sm text-yellow-500">
                        €{item.price}
                      </p>

                      <button
                        onClick={() =>
                          removeItem(index)
                        }
                        className="text-red-500 text-sm mt-1"
                      >
                        Rimuovi
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-zinc-700 pt-4">
                  <p className="text-xl font-bold text-yellow-500">
                    Totale: €{total}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    placeholder="Nome e cognome"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                  />

                  <input
                    type="text"
                    placeholder="Numero telefono"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                  />

                  <input
                    type="text"
                    placeholder="Città / Comune"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                  />

                  <select
                    value={shippingMethod}
                    onChange={(e) =>
                      setShippingMethod(
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                  >
                    <option>
                      Meet up
                    </option>
                    <option>
                      Delivery
                    </option>
                    <option>
                      Shipping in arrivo
                    </option>
                  </select>

                  {shippingMethod ===
                    "Shipping in arrivo" && (
                    <>
                      <input
                        type="text"
                        placeholder="Via e numero civico"
                        value={street}
                        onChange={(e) =>
                          setStreet(
                            e.target.value
                          )
                        }
                        className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                      />

                      <input
                        type="text"
                        placeholder="CAP"
                        value={cap}
                        onChange={(e) =>
                          setCap(
                            e.target.value
                          )
                        }
                        className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                      />

                      <input
                        type="text"
                        placeholder="Provincia"
                        value={province}
                        onChange={(e) =>
                          setProvince(
                            e.target.value
                          )
                        }
                        className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                      />
                    </>
                  )}

                  <select
                    value={selectedSlot}
                    onChange={(e) =>
                      setSelectedSlot(
                        e.target.value
                      )
                    }
                    className="w-full p-3 rounded-lg bg-black border border-yellow-500"
                  >
                    <option value="">
                      Seleziona fascia oraria
                    </option>

                    {availableSlots.map(
                      (slot, index) => (
                        <option
                          key={index}
                          value={slot.slot_name}
                        >
                          {slot.slot_name}
                        </option>
                      )
                    )}
                  </select>

                  {!deliveryAllowed && (
                    <div className="bg-red-900/30 border border-red-500 p-3 rounded-lg text-sm">
                      Per il Delivery è richiesto
                      un ordine minimo di 200€.
                    </div>
                  )}

   <button
  onClick={sendOrder}
  disabled={sending}
  className="block w-full mt-4 bg-yellow-500 text-black text-center py-3 rounded-lg font-bold disabled:opacity-50"
>
  {sending ? "Invio..." : "INVIA ORDINE"}
</button>

                  <textarea
                    readOnly
                    value={buildTelegramMessage()}
                    className="w-full h-56 p-3 rounded-lg bg-black border border-yellow-500 text-sm"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}