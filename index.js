const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')

bot.on('ready', () => {
    console.log('bot is online');
});

bot.on('message', msg => {
    if(msg.content === '!hello')
        return msg.author.send('hello friend');
    if(msg.content === '!cd')
        return countdown(msg);
});

bot.login(config.token);

function countdown(message){
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('Not in voice channel!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }
    voiceChannel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
        return message.channel.send('connected!')
      }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      });
}