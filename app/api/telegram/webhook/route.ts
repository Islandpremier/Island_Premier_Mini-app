import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const update = await req.json();

console.log("======== UPDATE ========");
console.log(JSON.stringify(update, null, 2));

    // =========================
    // GESTIONE /START
    // =========================

    const message = update.message;

    if (message?.text === "/start") {

  console.log("START ricevuto");
  console.log(message.from);

  const telegramId = message.from.id;
      const username = message.from.username ?? null;
      const firstName = message.from.first_name ?? null;
      const lastName = message.from.last_name ?? null;

      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("telegram_id", telegramId)
        .maybeSingle();
        console.log("Telegram ID:", telegramId);
console.log("Utente trovato:", existingUser);

      if (!existingUser) {
        await supabase.from("users").insert({
          telegram_id: telegramId,
          telegram_username: username,
          first_name: firstName,
          last_name: lastName,
          approved: false,
        });

        // Messaggio al cliente
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: telegramId,
              text:
                "✅ Richiesta inviata.\n\nIl tuo account è in fase di verifica. Riceverai un messaggio non appena verrà approvato.",
            }),
          }
        );

        // Notifica admin
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: ADMIN_CHAT_ID,
              parse_mode: "HTML",
              text: `
🆕 <b>NUOVA RICHIESTA DI ACCESSO</b>

👤 <b>${firstName ?? ""} ${lastName ?? ""}</b>

📱 @${username ?? "-"}

🆔 <code>${telegramId}</code>
`,
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "✅ Approva",
                      callback_data: `user_approve_${telegramId}`,
                    },
                    {
                      text: "❌ Rifiuta",
                      callback_data: `user_reject_${telegramId}`,
                    },
                  ],
                ],
              },
            }),
          }
        );
            } else {
        let text = "";

       if (existingUser.approved) {
  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramId,
        photo: "https://island-premier-mini-app.vercel.app/Logo.png",
        caption:
          "👋 Bentornato su Island Premier.\n\nIl tuo account è già approvato. Puoi accedere al catalogo in qualsiasi momento.",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛍️ Apri Island Premier",
                web_app: {
                  url: "https://island-premier-mini-app.vercel.app",
                },
              },
            ],
            [
              {
                text: "📸 Instagram",
                url: "https://www.instagram.com/island_premier?igsh=YzVsZTBjZmk5dmFm&utm_source=qr",
              },
              {
                text: "💬 Signal",
                url: "https://signal.me/#eu/AJzMlXYY_LRj1fGJDdcS-HuN0E_1MC_YSM30QhPlLZm_6IL7kzlKMJRbT_xPBY2o",
              },
            ],
            [
              {
                text: "🆘 Assistenza",
                url: "https://t.me/Sommelier14",
              },
            ],
          ],
        },
      }),
    }
  );

  return NextResponse.json({ ok: true });
} else if (existingUser.rejected) {
          text =
            "❌ Il tuo account è stato rifiutato.\n\nContatta l'assistenza se ritieni ci sia un errore.";
        } else {
          text =
            "⏳ Il tuo account è ancora in attesa di approvazione.";
        }

        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: telegramId,
              text,
            }),
          }
        );
      }

      return NextResponse.json({ ok: true });
    }

    // =========================
    // GESTIONE APPROVA/RIFIUTA ORDINI
    // =========================

    const callback = update.callback_query;

    if (!callback) {
      return NextResponse.json({ ok: true });
    }

   const data = callback.data as string;

// =======================
// APPROVAZIONE UTENTI
// =======================

if (data.startsWith("user_")) {
  const [, action, telegramId] = data.split("_");

  const approved = action === "approve";

  await supabase
  .from("users")
  .update({
    approved,
    rejected: !approved,
    approved_at: approved ? new Date().toISOString() : null,
  })
  .eq("telegram_id", Number(telegramId));

 await fetch(
  `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: Number(telegramId),

      photo: "https://island-premier-mini-app.vercel.app/Logo.png",

      caption: approved
        ? "🎉 Il tuo account è stato approvato!\n\nBenvenuto su Island Premier."
        : "❌ La tua richiesta di accesso non è stata approvata.",

      reply_markup: approved
        ? {
            inline_keyboard: [
              [
                {
                  text: "🛍️ Apri Island Premier",
                  web_app: {
                    url: "https://island-premier-mini-app.vercel.app",
                  },
                },
              ],
              [
                {
                  text: "📸 Instagram",
                  url: "https://www.instagram.com/island_premier?igsh=YzVsZTBjZmk5dmFm&utm_source=qr",
                },
                {
                  text: "💬 Signal",
                  url: "https://signal.me/#eu/AJzMlXYY_LRj1fGJDdcS-HuN0E_1MC_YSM30QhPlLZm_6IL7kzlKMJRbT_xPBY2o",
                },
              ],
              [
                {
                  text: "🆘 Assistenza",
                  url: "https://t.me/Sommelier14",
                },
              ],
            ],
          }
        : undefined,
    }),
  }
);
const { data: user } = await supabase
  .from("users")
  .select("*")
  .eq("telegram_id", Number(telegramId))
  .single();
  await fetch(
  `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: callback.message.chat.id,
      message_id: callback.message.message_id,
      parse_mode: "HTML",
      text: approved
        ? `🟢 <b>UTENTE APPROVATO</b>

👤 <b>${user.first_name ?? ""} ${user.last_name ?? ""}</b>

📱 @${user.telegram_username ?? "-"}

🆔 <code>${telegramId}</code>

━━━━━━━━━━━━━━━━━━

✅ <b>STATO</b>

APPROVATO`
        : `🔴 <b>UTENTE RIFIUTATO</b>

👤 <b>${user.first_name ?? ""} ${user.last_name ?? ""}</b>

📱 @${user.telegram_username ?? "-"}

🆔 <code>${telegramId}</code>

━━━━━━━━━━━━━━━━━━

❌ <b>STATO</b>

RIFIUTATO`,
    }),
  }
);

  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callback_query_id: callback.id,
      }),
    }
  );

  return NextResponse.json({ ok: true });
}

// =======================
// ORDINI
// =======================

const [, orderId] = data.split("_");

const status =
  data.startsWith("approve")
    ? "approved"
    : "rejected";

const { data: order } = await supabase
  .from("orders")
  .update({ status })
  .eq("id", Number(orderId))
  .select("*")
  .single();

  if (order?.telegram_id) {
  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: order.telegram_id,
        parse_mode: "HTML",
        text:
  status === "approved"
    ? `✅ <b>Ordine approvato!</b>

Il tuo ordine è stato approvato con successo.

📅 Data: ${order.delivery_date}

🕒 Fascia oraria: ${order.preferred_time_slot}

Per definire gli ultimi dettagli contatta direttamente l'assistenza.

Grazie per aver scelto <b>Island Premier</b>.`
            : `❌ <b>Ordine rifiutato</b>

Il tuo ordine non è stato approvato.

Per maggiori informazioni contatta l'assistenza.`,
      }),
    }
  );
}
    const productsText = order.products
  .map(
    (item: any) =>
      `• <b>${item.product.name}</b>\n${item.option}\n€${item.price}`
  )
  .join("\n\n");

await fetch(
  `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: callback.message.chat.id,
      message_id: callback.message.message_id,
      parse_mode: "HTML",
      text:
        status === "approved"
          ? `🟢 <b>ORDINE APPROVATO #${order.id}</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Cliente</b>
${order.telegram_username ? `@${order.telegram_username}` : "-"}

🆔 <code>${order.telegram_id}</code>

📞 ${order.phone_number}

📍 ${order.city}

🚚 ${order.shipping_method}

📅 ${order.delivery_date}

🕒 ${order.preferred_time_slot}

━━━━━━━━━━━━━━━━━━

📦 <b>PRODOTTI</b>

${productsText}

━━━━━━━━━━━━━━━━━━

💰 <b>TOTALE</b>

€${order.total}

━━━━━━━━━━━━━━━━━━

✅ <b>STATO</b>

APPROVATO`
          : `🔴 <b>ORDINE RIFIUTATO #${order.id}</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Cliente</b>
${order.telegram_username ? `@${order.telegram_username}` : "-"}

🆔 <code>${order.telegram_id}</code>

📞 ${order.phone_number}

📍 ${order.city}

📦 <b>PRODOTTI</b>

${productsText}

━━━━━━━━━━━━━━━━━━

❌ <b>STATO</b>

RIFIUTATO`,
    }),
  }
);

    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callback_query_id: callback.id,
        }),
      }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}