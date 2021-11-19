const floorTypes = {
    solid: 0,
    ground: 1,
    entrance: 2,
    exit: 3
}

// CHANGE TILE SPRITE SHEET DEPENDING ON DUNGEON ROOM

const tileTypes = {
    0: {tileName: "ground", floorType: floorTypes.ground, walkable: true, sprite: "ground.png"},
    1: {tileName: "path", floorType: floorTypes.ground, walkable: true, sprite: "path.png"},
    2: {tileName: "wall_left", floorType: floorTypes.solid, walkable: false, sprite: "wall_left.png"},
    3: {tileName: "wall_right", floorType: floorTypes.solid, walkable: false, sprite: "wall_right.png"},
    4: {tileName: "wall_top", floorType: floorTypes.solid, walkable: false, sprite: "wall_top.png"},
    5: {tileName: "wall_bottom", floorType: floorTypes.solid, walkable: false, sprite: "wall_bottom.png"},
    6: {tileName: "wall_top_left_corner", floorType: floorTypes.solid, walkable: false, sprite: "wall_corner_top_left.png"},
    7: {tileName: "wall_bottom_left_corner", floorType: floorTypes.solid, walkable: false, sprite: "wall_corner_bottom_left.png"},
    8: {tileName: "wall_top_right_corner", floorType: floorTypes.solid, walkable: false, sprite: "wall_corner_top_right.png"},
    9: {tileName: "wall_bottom_right_corner", floorType: floorTypes.solid, walkable: false, sprite: "wall_corner_bottom_right.png"},
    10: {tileName: "room_entrance", floorType: floorTypes.entrance, walkable: false, sprite: "room_entrance.png"},
    11: {tileName: "room_exit", floorType: floorTypes.exit, walkable: false, sprite: "room_exit.png"}
}

const dungeonTypes = [
    {type: "Sewer", monsterList: [9, 10]},
    {type: "Abandoned Mine", monsterList: [9, 10]},
    {type: "Graveyard", monsterList: [9, 10]},
]

const dungeonNames = [
    "Grotto of the Nameless Wizard",
    "Cells of the Blooded Orc",
    "Delves of the Mystic Occult",
    "Grotto of the Dark Jungle",
    "The Neverending Delves",
    "The Dreaded Tombs",
    "The Secret Caverns",
    "The Adamantite Vault",
    "The Motionless Quarters",
    "The Mysterious Labyrinth",
    "Maze of the Rejected Queen",
    "Chambers of the Ancient Ogre",
    "Lair of the Infernal Orc",
    "Burrows of the Dishonored Morass",
    "The Dry Point",
    "The Adamantine Crypt",
    "The Eclipse Tombs",
    "The Rocking Labyrinth",
    "The Broken Bones Delves",
    "The Thief Quarters",
    "Cells of the Burning Giant",
    "Point of the Unknown Hunter",
    "Maze of the Burning Guardian",
    "Delves of the Poisoned Serpent",
    "The Cold Cells",
    "The Overhanging Quarters",
    "The Fallen Legion Vault",
    "The Mystic Vault",
    "The Fire Mountain Cells",
    "The Deep Pits",
    "Labyrinth of the Frozen King",
    "Crypt of the Golden Paladin",
    "Chambers of the Phantom Raven",
    "Haunt of the Crystal Forest",
    "The Prisoner Grotto",
    "The Buried Lair",
    "The Sanguine Quarters",
    "The Enchanted Point",
    "The Specter Dungeon",
    "The Arcane Chambers"
];

function startDungeon(realm, dungeonType) {

    //let realm = realm;
    //let dungeonType = dungeonType;
    console.log(realm);
    let roomCount = randomInt(5, 10);

    createDungeon(realm, dungeonType, roomCount);

}

// TODO REWRITE DUNGEON CONSTRUCTOR 

function createDungeon(realm, dungeonType, roomCount) {

    let currentDungeon = new PIXI.Container();
    //currentDungeon.scale.set(0.5, 0.5);
    currentDungeon.name = "current dungeon";
    currentDungeon.zIndex = 2;
    game.ui.rightSection.addChild(currentDungeon);
    currentDungeon.roomCount = roomCount;
    currentDungeon.dungeonType = dungeonType;
    currentDungeon.currentRoom = {
        tileMap: {
            layout: [],
            entrance: {
                x: undefined,
                y: undefined
            },
            exit: {
                x: undefined,
                y: undefined
            }
        },
        roomWidth: 5,
        roomHeight: 5,
        
    }
    currentDungeon.bossKilled = false,
    currentDungeon.roomCreated = false,

    // Update function to be called every game tick

    currentDungeon.update = function() {

        // Create a new room if one has not already been created
        if (game.currentDungeon.roomCreated === false) {

            if (game.currentDungeon.roomCount >= 2) {

                createRoom("normal", game.currentDungeon.currentRoom.roomWidth, game.currentDungeon.currentRoom.roomHeight);

            } else if (game.currentDungeon.roomCount == 1) {

                createRoom("boss", game.currentDungeon.currentRoom.roomWidth, game.currentDungeon.currentRoom.roomHeight);

            }

        // If a room has already been created
        } else if (game.currentDungeon.roomCreated === true) {

            game.currentDungeon.currentRoom.update();

        }

    }

    game.currentDungeon = currentDungeon;

}

function createRoom(type, roomWidth, roomHeight) {

    let currentRoom = new PIXI.Container();
    game.currentDungeon.currentRoom = currentRoom;
    currentRoom.name = "current room";
    currentRoom.interactive = true;
    currentRoom.roomWidth = roomWidth;
    currentRoom.roomHeight = roomHeight;
    currentRoom.roomType = type; 
    currentRoom.enemiesAlive = [];

    // Tile map
    currentRoom.addChild(createRoomLayout(roomWidth, roomHeight));
    game.currentDungeon.currentRoom.tileMap = currentRoom.getChildByName("tileMap");

    // Player/enemy
    currentRoom.playerSpawned = false;
    currentRoom.enemiesSpawned = false;

    currentRoom.update = function() {

        // Spawn player
        if (currentRoom.playerSpawned === false) {

            currentRoom.playerSpawned = true;
            spawnPlayer();

        }

        if (currentRoom.enemiesSpawned === false) {

            currentRoom.enemiesSpawned = true;

            for (let i = 0; i < 1; i++) {

                // Generate random spawn tile for enemy
                let spawnTile = [randomInt(2, currentRoom.roomWidth - 1), randomInt(2, currentRoom.roomHeight - 1)];
                createEnemy(3, spawnTile[0], spawnTile[1]);

                // TODO SPAWN CHECK IF SPAWNING ONTO BLOCKED TILE OR ANOTHER ENTITY

            }

        }

        // TODO CHECK IF PLAYER WALKING ONTO CERTAIN TILES E.G. EXIT

    }

    switch(currentRoom.type) {
        case "normal":
            console.log("Normal room spawned");
            break;
        case "boss":
            console.log("Boss room spawned");
    }

    game.currentDungeon.addChild(currentRoom);
    game.currentDungeon.x = (gameScene.getChildByName("rightSection").width - game.currentDungeon.width) / 2;
    game.currentDungeon.y = (gameScene.getChildByName("rightSection").height - game.currentDungeon.height - game.ui.messageBox.height) / 2;
    game.currentDungeon.roomCreated = true;

}

// TODO -- IN THE MIDDLE OF REWRITING CODE TO CREATE ROOM LAYOUT (THEN CREATEROOM AND CREATE DUNGEON)

// Create tile map layout using sprites

function createRoomLayout(roomWidth, roomHeight) {

    let tileMap = new PIXI.Container();
    tileMap.name = "tileMap";
    tileMap.layout = [];
    tileMap.roomWidth = roomWidth;
    tileMap.roomHeight = roomHeight;
    tileMap.roomSprites = PIXI.loader.resources["images/dungeon/sewer/room.json"];

    // Populate layout array with total amount of tiles in room
    for (let i = 0; i < roomWidth * roomHeight; i++) {

        let tile = new PIXI.Sprite()
        tileMap.addChild(tile);
        tileMap.children[i].tileType = tileTypes[0];
        tileMap.children[i].tileID = i;

    }

    // Add left walls
    for (let i = 0, e = roomWidth; i < roomWidth * roomHeight; i += e){
        tileMap.children[i].tileType = tileTypes[2];
    }

    // Add right walls
    for (let i = 0; i < roomHeight; i++) {
        if (i !== 0) {
            tileMap.children[i * roomWidth - 1].tileType = tileTypes[3];
        }
    }

    // Add top walls
    for (let i = 0; i < roomWidth; i++) {
        tileMap.children[i].tileType = tileTypes[4];
    }

    // Add bottom walls
    for (let i = 0, e = roomWidth * roomHeight; i < roomWidth; i++) {
        tileMap.children[e - roomWidth + i].tileType = tileTypes[5];
    }

    // Add other tiles
    tileMap.children[0].tileType = tileTypes[6]; // Top left corner
    tileMap.children[roomWidth * roomHeight - roomWidth].tileType = tileTypes[7]; // Bottom left corner
    tileMap.children[roomWidth - 1].tileType = tileTypes[8]; // Top right corner
    tileMap.children[roomWidth * roomHeight - 1].tileType = tileTypes[9]; // Bottom right corner
    tileMap.children[randomInt((roomWidth * roomHeight) - roomWidth + 1, (roomWidth * roomHeight) - 2)].tileType = tileTypes[10]; // Random entrance
    tileMap.children[randomInt(1, roomWidth - 2)].tileType = tileTypes[11]; // Random exit

    // Update tile sprites after being assigned tileType

    for (let i = 0; i < tileMap.children.length; i++) {

        tileMap.children[i].texture = PIXI.Texture.from(tileMap.roomSprites.textures[tileMap.children[i].tileType.sprite]);

    }

    // For each row, loop through each tile
    for (let y = 0; y < roomHeight; y++) {
        for (let x = 0; x < roomWidth; x++) {

            let index = (y * roomWidth) + x;

            tileMap.children[index].tileOccupied = false;
            tileMap.children[index].texture = PIXI.Texture.from(tileMap.roomSprites.textures[tileMap.children[index].tileType.sprite]); // Set sprite
            tileMap.children[index].tileIndex = [x + 1, y + 1]; // Set tile index [X, Y];

    
            tileMap.children[index].x = x * game.settings.dungeon.tileTextureWidth; // Set tile x pos
            tileMap.children[index].y = y * game.settings.dungeon.tileTextureHeight; // Set tile y pos

            tileMap.children[index].interactive = true;

            tileMap.children[index].tileHighlight = new PIXI.Graphics();
            tileMap.children[index].tileHighlight.lineStyle(1, 0xFFFFFF, 1);
            tileMap.children[index].tileHighlight.drawRect(undefined, undefined, 64, 64 - 1);

            tileMap.children[index]
                .on('mouseover', function() {
                    tileMap.children[index].addChild(tileMap.children[index].tileHighlight);
                });
            tileMap.children[index]
                .on('mouseout', function() {
                    tileMap.children[index].removeChild(tileMap.children[index].tileHighlight);
                });

            // Assign entrance and exit tiles
            if (tileMap.children[index].tileType == tileTypes[10]) {

                tileMap.entranceTile = tileMap.children[index].tileIndex = [x + 1, y + 1]; //  Set entranceTile tileIndex
                console.log(tileMap.entranceTile)

            } else if (tileMap.children[index].tileType == tileTypes[11]) {

                tileMap.exitTile = tileMap.children[index].tileIndex = [x + 1, y + 1]; // Set exitTile tileIndex
                console.log(tileMap.exitTile);
            }

        }
    }

    return tileMap;

}

function consoleLogMapLayout(layout, width, height) {
    // CONSOLE LOG THE MAP IN MORE VISIBLE LAYOUT
    let array = []

    for (let i = 0; i < height; i++) {
        let displayArray = [];
        for (let k = 0; k < width; k++) {
            displayArray.push(layout[k + width * i]);
        }
        array.push(displayArray);
    }
    console.log(array);
}