"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "./components/ProductCard";
import FloatingCart from "./components/FloatingCart";
import CartDrawer from "./components/CartDrawer";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";

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
  quantity: number;
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
const telegramUser =
  typeof window !== "undefined"
    ? (window as any).Telegram?.WebApp?.initDataUnsafe?.user
    : null;
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [drawerOpen, setDrawerOpen] = useState(false);
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

  setCart((prev) => {
    const existingIndex = prev.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.option === option
    );

    if (existingIndex !== -1) {
      return prev.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...prev,
      {
        product,
        option,
        price,
        quantity: 1,
      },
    ];
  });
};

  const removeItem = (index: number) => {
    setCart((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };
  const decreaseQuantity = (index: number) => {
  setCart((prev) =>
    prev.flatMap((item, i) => {
      if (i !== index) return item;

      if (item.quantity <= 1) {
        return [];
      }

      return {
        ...item,
        quantity: item.quantity - 1,
      };
    })
  );
};

  const total = useMemo(() => {
  return cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
}, [cart]);
  const categories = [
  ...new Set(
    products
      .map((p: any) => p.category)
      .filter(Boolean)
  ),
];

const filteredProducts = products.filter((product: any) => {

  const matchCategory =
    !category ||
    product.category === category;

  const matchSearch =
    product.name
      .toLowerCase()
      .includes(search.toLowerCase());

  return matchCategory && matchSearch;

});

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
        telegramId: telegramUser?.id ?? null,
  telegramUsername: telegramUser?.username ?? null,
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
      <div className="space-y-5 mb-8">

  <SearchBar
    value={search}
    onChange={setSearch}
  />

  <CategoryFilter
    categories={categories}
    selected={category}
    onSelect={setCategory}
  />

</div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
           {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    selectedOption={
      selectedOptions[product.id] ||
      getOptions(product.price_list)[0]
    }
    onOptionChange={(value: string) =>
      setSelectedOptions((prev) => ({
        ...prev,
        [product.id]: value,
      }))
    }
    onAdd={() => addToCart(product)}
  />
))}
          </div>
        </div>

        <div className="hidden">
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
      <FloatingCart
  items={cart.length}
  total={total}
  onOpen={() => setDrawerOpen(true)}
/>

<CartDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
>
  <>
  {cart.length === 0 ? (
    <p className="text-center text-zinc-400">
      Il carrello è vuoto.
    </p>
  ) : (
    <>
      <div className="space-y-4">

       {cart.map((item, index) => (
  <div
    key={index}
    className="border-b border-zinc-700 pb-4"
  >
    <p className="font-semibold text-white">
      {item.product.name}
    </p>

    <p className="text-sm text-zinc-400">
      {item.option}
    </p>

    <div className="mt-3 flex items-center justify-between">

      <span className="font-bold text-yellow-500">
        €{item.price * item.quantity}
      </span>

      <div className="flex items-center gap-3">

        <button
          onClick={() => decreaseQuantity(index)}
          className="h-8 w-8 rounded-full bg-zinc-800 text-lg"
        >
          −
        </button>

        <span className="w-6 text-center font-bold">
          {item.quantity}
        </span>

        <button
          onClick={() => addToCart(item.product)}
          className="h-8 w-8 rounded-full bg-yellow-500 font-bold text-black"
        >
          +
        </button>

      </div>

    </div>

    <button
      onClick={() => removeItem(index)}
      className="mt-3 text-sm text-red-500"
    >
      Rimuovi
    </button>

  </div>
))}

      </div>

      <div className="mt-6 border-t border-zinc-700 pt-6">

        <p className="text-2xl font-bold text-yellow-500">
          Totale € {total}
        </p>

      </div>

     <div className="mt-6 space-y-4">

  <input
    type="text"
    placeholder="Nome e cognome"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    className="w-full rounded-xl border border-yellow-500 bg-black p-3"
  />

  <input
    type="text"
    placeholder="Numero di telefono"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className="w-full rounded-xl border border-yellow-500 bg-black p-3"
  />

  <input
    type="text"
    placeholder="Comune"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="w-full rounded-xl border border-yellow-500 bg-black p-3"
  />

 <select
  value={shippingMethod}
  onChange={(e) => setShippingMethod(e.target.value)}
  className="w-full rounded-xl border border-yellow-500 bg-black p-3"
>
  <option>Meet up</option>
  <option>Delivery</option>
  <option>Shipping in arrivo</option>
</select>

{shippingMethod === "Shipping in arrivo" && (
  <>
    <input
      type="text"
      placeholder="Via e numero civico"
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      className="w-full rounded-xl border border-yellow-500 bg-black p-3"
    />

    <input
      type="text"
      placeholder="CAP"
      value={cap}
      onChange={(e) => setCap(e.target.value)}
      className="w-full rounded-xl border border-yellow-500 bg-black p-3"
    />

    <input
      type="text"
      placeholder="Provincia"
      value={province}
      onChange={(e) => setProvince(e.target.value)}
      className="w-full rounded-xl border border-yellow-500 bg-black p-3"
    />
  </>
)}

{!deliveryAllowed && (
  <div className="rounded-xl border border-red-500 bg-red-900/20 p-3 text-sm text-red-200">
    Per il Delivery è richiesto un ordine minimo di 200€.
  </div>
)}

<select
  value={selectedSlot}
  onChange={(e) => setSelectedSlot(e.target.value)}
  className="w-full rounded-xl border border-yellow-500 bg-black p-3"
>
  <option value="">
    Seleziona fascia oraria
  </option>

  {availableSlots.map((slot, index) => (
    <option
      key={index}
      value={slot.slot_name}
    >
      {slot.slot_name}
    </option>
  ))}
</select>

  <button
    onClick={sendOrder}
    disabled={sending}
    className="w-full rounded-xl bg-yellow-500 py-4 text-lg font-bold text-black transition hover:bg-yellow-400"
  >
    {sending ? "Invio..." : "INVIA ORDINE"}
  </button>

</div>
    </>
  )}
</>
</CartDrawer>
    </main>
  );
}