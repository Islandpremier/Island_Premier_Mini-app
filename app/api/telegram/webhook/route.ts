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

    // =========================
    // GESTIONE /START
    // =========================

    const message = update.message;

    if (message?.text === "/start") {
      const telegramId = message.from.id;
      const username = message.from.username ?? null;
      const firstName = message.from.first_name ?? null;
      const lastName = message.from.last_name ?? null;

      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("telegram_id", telegramId)
        .maybeSingle();

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
        await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: telegramId,
              text: existingUser.approved
                ? "✅ Il tuo account è già approvato."
                : "⏳ Il tuo account è ancora in attesa di approvazione.",
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
      approved_at: approved ? new Date().toISOString() : null,
    })
    .eq("telegram_id", Number(telegramId));

  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: Number(telegramId),
        text: approved
          ? "🎉 Il tuo account è stato approvato!\n\nA breve potrai accedere a Island Premier."
          : "❌ La tua richiesta di accesso non è stata approvata.",
      }),
    }
  );

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
        text: approved
          ? "🟢 UTENTE APPROVATO"
          : "🔴 UTENTE RIFIUTATO",
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

await supabase
  .from("orders")
  .update({ status })
  .eq("id", Number(orderId));

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
          text:
            status === "approved"
              ? "🟢 ORDINE APPROVATO"
              : "🔴 ORDINE RIFIUTATO",
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