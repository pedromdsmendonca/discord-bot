const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')
const https = require('https')

const {TicTacToe, GamesManager} = require('./tictactoe/ttt.js');

const gm = new GamesManager();

bot.on('ready', () => {
    console.log('bot is online');
    bot.user.setActivity('Porn Hub', {type: 'WATCHING'}).catch(console.error);
});

bot.on('message', msg => {
    if(msg.author.id === bot.user.id) return;
    
    if(msg.author.bot ) return msg.reply('Sai daqui que este server é meu!');
    let args = msg.content.split(" ");

    if(msg.content === '!hello')
        return msg.author.send('hello friend');
    if(args[0] === '!miguel')
        return countdown(msg, args[1]);
    if(msg.content === '!dad'){
        return dadJoke(msg);
    }

    //ttt related commands
    if(args[0] === '!ttt'){
        //create a new game
        if(args[1] === 'create'){
            if(gm.userInGame(msg.author.id)){
                return msg.reply('You can\'t create a new Game while you are still playing! If you want to leave your current game type the command: !ttt leave');
            }    
            let code = gm.generateGame(msg.author.id);
            return msg.reply(`Created game with code \'${code}\'. To join this game type the command: !ttt join ${code}`);
        }
        //join an existing game
        if(args[1] === 'join'){
            if(gm.userInGame(msg.author.id)){
                return msg.reply('You can\'t join a new Game while you are still playing! If you want to leave your current game type the command: !ttt leave');
            }
            if(gm.joinGame(msg.author.id, args[2])){
                return msg.reply('Joined the game!');
            }
            else{
                return msg.reply('Failed to join game D:');
            }
        }
        //leave current game
        if(args[1] === 'leave'){
            if(!gm.userInGame(msg.author.id)){
                return msg.reply('You can\'t leave a Game if you\'re not playing in one!');
            }
            gm.leaveGame(msg.author.id);
            return msg.reply('You left the game');
        }
        //for any other command we can first check if the user is in a game
        if(!gm.userInGame(msg.author.id)){
            return msg.reply('You\'re not currently in any game! Create a game first with the command: !ttt create');
        }

        //remaining commands
        //...
    }
});

bot.login(config.token);

function countdown(message, arg){
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('Not in voice channel!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }
    voiceChannel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
        var file = 'miguel_docinho';
        switch(arg){
            case 'espetaculo':
                file = 'miguel_espetaculo';
                break;
            case 'abanar':
                file = 'miguel_abanar';
                break;
            case 'docinho':
            default:
                file = 'miguel_docinho';
        }
        if (message.content === "!bernardo") file = 'bernardo';
        const dispatcher = connection.playFile(`./${file}.ogg`);
        dispatcher.on("end", end => {voiceChannel.leave()});
      }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      });
}

function dadJoke(message){
    var endpoint = 'https://icanhazdadjoke.com/'

    https.get(endpoint, {headers: {"Accept": "application/json"}}, (resp) => {
        let data = '';
        
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            let joke = JSON.parse(data).joke;
            console.log(joke);

            return message.channel.send(joke)
          });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}