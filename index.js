import dotenv from 'dotenv';
dotenv.config();

import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(TELEGRAM_TOKEN);
bot.setWebHook(WEBHOOK_URL);

// When bot is added to a group chat, introduce itself automatically
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;

  newMembers.forEach(member => {
    if (member.username === bot.me.username) {
      bot.sendMessage(chatId, "Hey everyone! I'm Ricardo's assistant bot, here to help keep conversations and details organized.");
    }
  });
});

// Basic message logging (for now, just outputs to the console)
bot.on('message', (msg) => {
  const username = msg.from.username;
  const text = msg.text;

  console.log(`Message from ${username}: ${text}`);

  // Future logic: save important info to Supabase/database here
});