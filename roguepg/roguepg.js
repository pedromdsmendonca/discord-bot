const UserRepository = require('./repos/UserRepository');
const DungeonRepository = require('./repos/DungeonRepository');
const Discord = require('discord.js');

class RoguePG{
    constructor(){
        this.userRepository = new UserRepository();
        this.dungeonRepository = new DungeonRepository();
        this.cooldowns = {}
    }

    register(msg, name){
        if(this.userRepository.users.find(u => u.discordId == msg.author.id)){
            return msg.reply('You already have a character! If you want to create a new first delete your current one! (!rpg delete)');
        }

        this.userRepository.addUser({name: msg.author.name, discordId: msg.author.id}, this.createCharacter(name));
        return msg.reply('Created a character!');
    }

    createCharacter(name){
        return {
            name: name,
            level: 1,
            hp: 10,
            att: 5,
            def: 5,
            gold: 0,
            eva: 5,
            exp: 0,
            inventory: [],
            equips: []
        }
    }

    getCharacter(msg){
        let user = this.userRepository.users.find(u => u.discordId == msg.author.id);
        
        if(!user) return msg.reply('You have not created a character yet! (!rpg create)');

        let embed = new Discord.RichEmbed()
            .setTitle('Character Status')
            .addField('Name', user.character.name, true)
            .addField('Lvl', user.character.level, true)
            .addBlankField()
            .addField('HP', user.character.hp, true)
            .addField('Defense', user.character.def, true)
            .addField('Attack', user.character.att, true)
            .addField('Magic', user.character.matt, true)
        
        return msg.reply(embed);
    }

    getDungeonList(msg){

        let dungs = this.dungeonRepository.dungeons;

        var response = '';

        dungs.forEach(d => {
            response += d.name + '\n';
        });
              
        return msg.reply(response);
    }

    attemptDungeon(msg, tag){
        let dung = this.dungeonRepository.dungeons.find(d => d.tag == tag);

        if(!dung) return msg.reply('Invalid tag! Check which tags exist with !rpg dungeon');

        let user = this.userRepository.users.find(u => u.discordId == msg.author.id);

        if(user.character.level < dung.level) return msg.reply('Dungeon level is too high for you! Try a weaker dungeon!');

        msg.reply('You just started attempting the dungeon! The time for completion is ' + dung.cooldown + ' seconds.');

        setTimeout(() => {
            msg.reply('Finished dungeon!');
        }, dung.cooldown * 1000)
    }

    performAction(msg){
        let cd = this.cooldowns[msg.author.id];
        let currentTime = new Date();
        if(!cd){ // not in cooldown list: can perform action
            this.cooldowns[msg.author.id] = currentTime;
            return msg.reply('doing action for X seconds');
        } 
        
        let dif = currentTime.getTime() - cd.getTime();
        console.log(`cd: ${cd}\ncu: ${currentTime}\ndif: ${dif/1000}`);
        if(dif < 5){
            return msg.reply('still in cooldown');
        }
        this.cooldowns[msg.author.id] = currentTime;
        return msg.reply('doing action for X seconds');
    }
}

module.exports = RoguePG;