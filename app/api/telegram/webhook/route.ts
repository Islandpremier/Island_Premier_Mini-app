import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const update = await req.json();

    const callback = update.callback_query;

    if (!callback) {
      return NextResponse.json({ ok: true });
    }

    const data = callback.data as string;

    const [action, orderId] = data.split("_");

    const status =
      action === "approve" ? "approved" : "rejected";

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