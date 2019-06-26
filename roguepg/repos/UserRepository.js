class UserRepository {
    constructor(){
        this.users = [
            {
                name: 'john',
                discordId: '1'
            },
            {
                name: 'jane',
                discordId: '2'
            },
            {
                name: 'doe',
                discordId: '3'
            },
        ];
    }

    addUser(user, character){
        this.users.push({
            name: user.name,
            discordId: user.discordId,
            character: character
        });
    }
}

module.exports = UserRepository;