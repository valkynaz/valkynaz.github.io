let enemyList = [
    {   
        id: 1,
        name: "Rat",
        health: 10,
        damage: 1,
        itemDrops: [
            {id: 2, dropChance: 100},
            {id: 3, dropChance: 25}
            ],
        sprite: undefined
    },
    {id: 2, name: "Giant Rat", health: 25, damage: 2, dropChance: 50, itemDrops: [
        //{id: 2, dropChance: 100},
        {id: 3, dropChance: 35},
        {id: 4, dropChance: 10}
    ], sprite: undefined},
    {id: 3, name: "Spider", health: 20, damage: 2, dropChance: 75, itemDrops: [
        {id: 2, dropChance: 10},
        {id: 3, dropChance: 10},
        {id: 4, dropChance: 5},
        {id: 5, dropChance: 5},
        {id: 6, dropChance: 1},
    ], sprite: "images/enemies/spider.png"},
];

// TODO Add new items/resources

let itemList = [

    {id: 0, name: "null"},
    {id: 1, name: "Coins", stackable: true, tradable: true, sellValue: 0, sprite: undefined},
    {id: 2, name: "Bones", stackable: false, tradable: true, sellValue: 1, sprite: undefined},
    {id: 3, name: "Spiders Eggs", stackable: true, tradable: true, sellValue: 1, sprite: undefined},
    {id: 4, name: "Iron", stackable: false, tradable: true, sellValue: 1, sprite: undefined},
    {id: 5, name: "Silver", stackable: false, tradable: true, sellValue: 1, sprite: undefined},
    {id: 6, name: "Coins", stackable: false, tradable: true, sellValue: 1, sprite: undefined}
];

// Enemy constructor using enemy ID

function Enemy(enemyObject) {
    console.log(enemyObject);
    let enemy = new PIXI.Sprite.from(enemyObject.sprite);
    enemy.name = enemyObject.name;
    enemy.id = enemyObject.id;
    enemy.entityType = "enemy";
    enemy.health = enemyObject.health;
    enemy.damage = enemyObject.damage;
    enemy.dropChance = enemy.dropChance;
    enemy.itemDrops = enemyObject.itemDrops;
    console.log(enemy.itemDrops);
    enemy.tileFrom = [0, 0];
    enemy.tileTo = [0, 0];
    enemy.timeMoved = 0;
    enemy.delayMove = 1000; // Movement speed
    enemy.collisionEnabled = true;

    // TODO - enemy can only spawn only walkable tiles

    enemy.placeAt = function(xIndex, yIndex) {

        enemy.tileFrom = [xIndex, yIndex];
        enemy.tileTo = [xIndex, yIndex];
        enemy.x = ((game.settings.dungeon.tileTextureWidth * (xIndex - 1)) + ((game.settings.dungeon.tileTextureWidth - enemy.width) / 2));
        enemy.y = ((game.settings.dungeon.tileTextureHeight * (yIndex - 1)) + ((game.settings.dungeon.tileTextureHeight - enemy.height) / 2));

    }

    enemy.processMovement = function(t) {

        //TODO

    }

    return enemy;
}

// Create enemy from constructor and add to currentRoom

function createEnemy(ID) {

    let enemyIndex = returnIndexFromID(ID, enemyList); // Grab enemy ID enemyList object index
    let enemyObject = Enemy(enemyList[enemyIndex]); // Create new enemy sprite using Enemy(enemyObject) constructor and enemy object from enemyList array
    game.currentDungeon.currentRoom.enemiesAlive.push(new Object(enemyObject)); // Add enemy to enemy reference array

    // Generate tileX and tileY for enemy spawn


    let tileX = randomInt(2, game.currentDungeon.currentRoom.roomWidth - 1);
    let tileY = randomInt(2, game.currentDungeon.currentRoom.roomHeight - 1);

    for (let i = 0; i < game.currentDungeon.currentRoom.enemiesAlive.length; i++) {

        if (game.currentDungeon.currentRoom.enemiesAlive[i].tileFrom[0] == tileX && game.currentDungeon.currentRoom.enemiesAlive[i].tileFrom[1] == tileY) {

            console.log("regenerating spawn tile");

            tileX = randomInt(2, game.currentDungeon.currentRoom.roomWidth - 1);
            tileY = randomInt(2, game.currentDungeon.currentRoom.roomHeight - 1);

            i = -1;

        } else {

            console.log("tile not changed");

        }

    }

    enemyObject.placeAt(tileX, tileY); // Call placeAt() function to spawn enemy

    game.currentDungeon.currentRoom.tileMap.children[tileMapChildrenIndex(enemyObject.tileFrom[0], enemyObject.tileFrom[1])].tileOccupied = true; // Set tile to occupied;
    game.currentDungeon.currentRoom.addChild(enemyObject); // Add new enemy sprite to current room

}

function dropItem(enemyID) {

    // TODO NEED TO ASSIGN WEIGHT RANGES TO DROPS SO THERE IS NO NEED FOR MULTIPLE FOR LOOPS

    //FOR RANGES DO RARITY ROLL GREATER THAN && LESS THAN

    let rarityRoll = 100;
    let totalWeight = 0;
    let weightRanges = [];

    let enemy = enemyList[returnIndexFromID(enemyID, enemyList)];

    console.log(enemy);
    for (let i = 0; i < enemy.itemDrops.length; i++) {

        totalWeight += enemy.itemDrops[i].dropChance;

        for (let k = 0; k < enemy.itemDrops[i].dropChance; k++) {

            weightRanges.push(enemy.itemDrops[i].id);

        }                

    }

    for (let i = 0; weightRanges.length < 100; i++) {

        weightRanges.push(0);

    }

    // Assign ranges to each possible drop

    if (weightRanges.length > 0) {

        let itemDrop = itemList[returnIndexFromID(weightRanges[randomInt(0, 99)], itemList)];;
        
            if (itemDrop.id != 0) {

                sendGameMessage("Item " + itemDrop.name + " dropped. Rolled: " + rarityRoll + ". Enemy drop rate: " + enemy.dropChance);

            } else {

                sendGameMessage("Item roll failed. No item dropped.")

            }

        return itemDrop;

    }

}

function dropSimulator(enemyID, repititions) {

    let enemy = enemyList[returnIndexFromID(enemyID, enemyList)];
    console.log(enemy.itemDrops);
    let itemDrops = [];

    itemDrops.push(new Object({id: itemList[0].id, name: itemList[0].name, dropCount: 0}));

    for (let i = 0; i < enemy.itemDrops.length; i++) {

        itemDrops.push(new Object({
            id: enemy.itemDrops[i].id,
            name: itemList[returnIndexFromID(enemy.itemDrops[i].id, itemList)].name,
            dropCount: 0
        }))

    }

    for (let i = 0; i < repititions; i++) {

        let itemDrop = dropItem(enemyList[2]);

            itemDrops[returnIndexFromID(itemDrop.id, itemDrops)].dropCount += 1;

    }

    console.log(itemDrops);
}