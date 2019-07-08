const uuid = require('uuid/v4')

class TicTacToe{
    constructor(creator){
        this.player1 = creator;
        this.player2 = undefined;
        this.code = undefined;
        console.log(`created ttt game for: ${creator}`);
    }

    addPlayer(player) {
        this.player2 = player;
    }

    generateCode(){
        let code = uuid();
        this.code = code;
        console.log('create game with code: ' + code);
        return code;
    }
}

class GamesManager{
    constructor(){
        this.userGames = {};
        this.gameCodes = {};
    }

    generateGame(user){
        let game = new TicTacToe(user);
        let code = game.generateCode();
        this.userGames[user] = game;
        this.gameCodes[code] = game;
        return code;
    }

    userInGame(user){
        return user in this.userGames;
    }

    joinGame(user, code){
        if(user in this.userGames){
            console.log('attempted to join while already in a game');
            return false;
        }
        if(!(code in this.gameCodes)){
            console.log('code not valid');
            return false;
        }
        let game = this.gameCodes[code];
        game.addPlayer(user);
        this.userGames[user] = game;
        console.log(`${user} joined game`)
        return true;
    }

    leaveGame(user){
        let game = this.userGames[user];
        delete this.gameCodes[game.code];
        delete this.userGames[game.player1];
        delete this.userGames[game.player2];
    }
}

module.exports = {TicTacToe, GamesManager};