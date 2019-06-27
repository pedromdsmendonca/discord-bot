class DungeonRepository {
    constructor(){
        this.dungeons = [
            {
                name: 'Dung 1',
                tag: 'd1',
                cooldown: 10,
                level: 1
            },
            {
                name: 'Dung 2',
                tag: 'd2',
                cooldown: 20,
                level: 2
            },
            {
                name: 'Dung 3',
                tag: 'd3',
                cooldown: 30,
                level: 3
            },
        ];
    }
}

module.exports = DungeonRepository;