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
}

module.exports = UserRepository;