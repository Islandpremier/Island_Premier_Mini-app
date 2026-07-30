import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  sendTelegramOrder,
  sendTelegramMessage,
} from "../telegram/send";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
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
  telegramId,
  telegramUsername,
} = body;

   const { data, error } = await supabase
  .from("orders")
  .insert({
    customer_name: customerName,
    phone_number: phoneNumber,
    city,
    shipping_method: shippingMethod,
    preferred_time_slot: selectedSlot,
    street,
    cap,
    province,
    products: cart,
    total, 
    telegram_id: telegramId,
    telegram_username: telegramUsername,
    status: "pending",
  })
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const productsText = cart
      .map(
        (item: any) => `
• <b>${item.product.name}</b>
${item.option}
€${item.price}`
      )
      .join("\n");

    const orderDate = new Date(data.created_at).toLocaleString("it-IT");

    const text = `
🛒 <b>NUOVO ORDINE #${data.id}</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Cliente</b>
${telegramUsername ? `@${telegramUsername}` : "Username non disponibile"}

🆔 <b>Telegram ID</b>
<code>${telegramId}</code>

📞 <b>Telefono</b>
${phoneNumber}

📍 <b>Comune</b>
${city}

🚚 <b>Metodo</b>
${shippingMethod}

🕒 <b>Fascia oraria</b>
${selectedSlot}

📅 <b>Ricevuto</b>
${orderDate}

━━━━━━━━━━━━━━━━━━

📦 <b>PRODOTTI</b>

${productsText}

━━━━━━━━━━━━━━━━━━

💰 <b>TOTALE</b>

€${total}

━━━━━━━━━━━━━━━━━━

🟡 <b>STATO</b>

IN ATTESA
`;

   await sendTelegramOrder(text, data.id);
   if (telegramId) {
  const customerMessage = `
🛒 <b>Ordine ricevuto!</b>

Abbiamo ricevuto correttamente il tuo ordine.

Il nostro staff lo verificherà il prima possibile.

Riceverai un nuovo messaggio quando l'ordine verrà approvato o rifiutato.

Grazie per aver scelto <b>Island Premier</b>.`;
  
  await sendTelegramMessage(
    telegramId,
    customerMessage
  );
}

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Errore interno del server.",
      },
      {
        status: 500,
      }
    );
  }
}