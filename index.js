const Discord = require('discord.js')
const bot = new Discord.Client();

const token = 'NTkyNzYzNzI5NDY5MjQzMzky.XREFtw.90f4HTpSWXCDHD7q-SpChJVmc1g'

bot.on('ready', () => {
    console.log('bot is online');
});

bot.on('message', msg => {
    if(msg.content === '!hello')
        msg.reply('hello friend');
});

bot.login(token);