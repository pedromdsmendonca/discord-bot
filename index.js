const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')

bot.on('ready', () => {
    console.log('bot is online');
});

bot.on('message', msg => {
    if(msg.content === '!hello')
        msg.author.send('hello friend');
});

bot.login(config.token);

function countdown(message){
    var voiceChannel = message.author.voiceChannel;
    if(!voiceChannel) return message.channel.send()
}