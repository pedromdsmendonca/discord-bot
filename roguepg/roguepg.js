const UserRepository = require('./repos/UserRepository');

class RoguePG{
    constructor(){
        this.userRepository = new UserRepository();
    }
}

module.exports = RoguePG;