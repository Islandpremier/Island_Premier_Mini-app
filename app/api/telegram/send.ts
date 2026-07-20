const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function sendTelegramOrder(
  text: string,
  orderId: number
) {
  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Approva",
                callback_data: `approve_${orderId}`,
              },
              {
                text: "❌ Rifiuta",
                callback_data: `reject_${orderId}`,
              },
            ],
          ],
        },
      }),
    }
  );

  const result = await response.json();

  console.log("Telegram:", result);

  return result;
}