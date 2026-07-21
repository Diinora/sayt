export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { ism, telefon } = req.body;
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.ADMIN_CHAT_ID;

  const text = `🆕 Yangi ro'yxatdan o'tish!\n👤 Ism: ${ism}\n📞 Tel: ${telefon}`;

  const result = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!result.ok) return res.status(500).json({ error: 'Xatolik yuz berdi' });
  return res.status(200).json({ success: true });
}
