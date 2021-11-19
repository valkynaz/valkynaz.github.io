let playerProfile = {

    realmsUnlocked: {
        "Realm 1": true,
        "Realm 2": true,
        "Realm 3": false
    },

    dungeonsUnlocked: {
        "Sewer": true,
        "Abandoned Mine": true,
        "Graveyard": true
    },

    upgrades: {
        autoDungeon: false,
        autoAttack: true
    },

    inventorySize: 100,
    inventory: [],
    

    level: 1,
    experience: 0,
    
    skills: {
        melee: {
            level: 1,
            experience: 0
        },
        ranged: {
            level: 1,
            experience: 0
        },
        magic: {
            level: 1,
            experience: 0
        }

    },

    statistics: {

        enemiesKilled: 0,

        dungeons: {
            dungeonsCleared: 0,
            dungeonRoomsCleared: 0
        }
    },

    settings: {

        dungeon: {

            autoExplore: true

        }
    }
    
}

function listPlayerUnlocks(unlocksArray) {

    let unlocks = [];
    
    for (let i = 0; i < Object.keys(unlocksArray).length; i++) {
        if (unlocksArray[Object.keys(unlocksArray)[i]] === true) {
            unlocks.push(Object.keys(unlocksArray)[i]);
        }
    }

    return unlocks;
}