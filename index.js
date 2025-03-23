import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

// 🔁 REPLACE THIS with your actual bot token
const TELEGRAM_TOKEN = 'PASTE_YOUR_BOT_TOKEN_HERE';

// 🔁 Identify which client's config this bot should use
const CLIENT_ID = 'ricardo';

// Supabase setup
const SUPABASE_URL = `https://rgsnykswshlltmbynpzn.supabase.co/rest/v1/configs?client_id=eq.${CLIENT_ID}`;
const SUPABASE_HEADERS = {
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnc255a3N3c2hsbHRtYnlucHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDk0NjgsImV4cCI6MjA1ODI4NTQ2OH0.mnLfo8RtOeh5BZDdlE_ayKO_SadDLRIJuK_1fvNxeNo',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnc255a3N3c2hsbHRtYnlucHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDk0NjgsImV4cCI6MjA1ODI4NTQ2OH0.mnLfo8RtOeh5BZDdlE_ayKO_SadDLRIJuK_1fvNxeNo`,
};

// Initialize bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Triggered when user types /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  try {
    const configRes = await fetch(SUPABASE_URL, { headers: SUPABASE_HEADERS });
    const configData = await configRes.json();
    const messages = configData[0]?.settings?.messages;

    if (!messages) {
      bot.sendMessage(chatId, 'No config found for this client.');
      return;
    }

    const intro = messages.intro || `Hey ${username}, nice to meet you!`;
    bot.sendMessage(chatId, intro);

  } catch (err) {
    bot.sendMessage(chatId, 'Error pulling your config. Try again later.');
    console.error(err);
  }
});