class TicTacToe{
    constructor(creator){
        this.player1 = creator;
        this.player2 = undefined;
        console.log(`created ttt game for: ${creator}`);
    }

    addPlayer(player) {
        this.player2 = player;
    }

    generateCode(){
        return 'this is a random code';
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
}

module.exports = {TicTacToe, GamesManager};