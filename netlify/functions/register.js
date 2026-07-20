exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { ism, telefon } = JSON.parse(event.body);
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.ADMIN_CHAT_ID;

  const text = `🆕 Yangi ro'yxatdan o'tish!\n👤 Ism: ${ism}\n📞 Tel: ${telefon}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) return { statusCode: 500, body: 'Xatolik yuz berdi' };
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
