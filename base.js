// CONSOLE LOG IF USING WEBGL OR CANVAS
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);

let app = new PIXI.Application({
    width: 1200, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

// PIXI Image loader

PIXI.loader

    .add("images/dungeon/sewer/room.json")
    .add("images/background.png")
    .add("images/player.png")
    .add("images/ui/menu_button_background.png")
    .add("images/ui/sectionLeft.png")
    .add("images/ui/sectionMiddle.png")
    .add("images/ui/sectionRight.png")

    // Menu background
    .add("images/ui/menu/top_left_corner.png")
    .add("images/ui/menu/top_right_corner.png")
    .add("images/ui/menu/bottom_left_corner.png")
    .add("images/ui/menu/bottom_right_corner.png")
    .add("images/ui/menu/middle_top.png")
    .add("images/ui/menu/middle_bottom.png")
    .add("images/ui/menu/middle_left.png")
    .add("images/ui/menu/middle_right.png")
    .add("images/ui/menu/middle.png")
    .add("images/ui/menu/exit_button.png")

    // UI
    .add("images/ui/menu/plank_07.png")

    // Enemies

    .add("images/enemies/spider.png")

    .load(init);

function init() {

    // Create gameScene container
    gameScene = new PIXI.Container();
    gameScene.sortableChildren = true;
    app.stage.addChild(gameScene);

    // Add background;
    background = new PIXI.Sprite(PIXI.loader.resources["images/background.png"].texture);
    gameScene.addChild(background);

    // Add UI Components

    addUI();

}


// Detect arrow key press

let keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false
};

window.addEventListener("keydown", function(e) {

    if (e.keyCode>=37 && e.keyCode<=40) {
        keysDown[e.keyCode] = true;
    }
});

window.addEventListener("keyup", function(e) {
    
    if (e.keyCode>=37 && e.keyCode<=40) {
        keysDown[e.keyCode] = false;
    }
    
});


let game = {

    currentDungeon: undefined,

    settings: {

        dungeon: {

            tileTextureWidth: 64,
            tileTextureHeight: 64
        }
    },

    ui: {

        leftSectionWidth: 300,
        leftSectionHeight: 800,
        rightSectionWidth: 900,
        rightSectionHeight: 800,

        messageBox: undefined,


        menu: {
            menuCurrentlyOpen: false,
            menuOpen: undefined,

            dungeonMenu: {

            }
        },

        rightSection: undefined
    },

    references: {
        rightSection: undefined
    }

}

// ----- GAME LOOP ----- //

/*
app.ticker.add((delta) => {

});
*/

const fps = 60;
const frameDuration = 1000/60;
let prevTime = performance.now();
let accumulatedFrameTime = 0;

let game_loop_counter = 1;

function gameLoop(time) {

    const elapsedTimeBetweenFrames = time - prevTime;
    prevTime = time;
    accumulatedFrameTime += elapsedTimeBetweenFrames;
    let testdate = Date.now();
    let sec = 0;

    while (accumulatedFrameTime >= frameDuration) {

        //console.log("Game loop ran " + game_loop_counter + " times. Timestamp: " + new Date(testdate).getSeconds());
        game_loop_counter++;
        accumulatedFrameTime -= frameDuration;
        updateDungeon(testdate);
    };

    window.requestAnimationFrame(gameLoop);
};

window.requestAnimationFrame(gameLoop);

function updateDungeon(currentFrameTime) {

    if (game.currentDungeon !== undefined) {

        game.currentDungeon.update(currentFrameTime);
        
        if (game.currentDungeon.currentRoom.playerSpawned === true) {

            game.currentDungeon.currentRoom.player.update(currentFrameTime);

            //console.log(!game.currentDungeon.currentRoom.player.processMovement(currentFrameTime));
            if (!game.currentDungeon.currentRoom.player.processMovement(currentFrameTime)) {
                
                // Player will only move tile if the tile is walkable and the player is not busy and not in combat

                if (keysDown[37]) { // Left
            
                    if (game.currentDungeon.currentRoom.player.checkTileWalkable("left") === true && game.currentDungeon.currentRoom.player.isBusy !== true && game.currentDungeon.currentRoom.player.inCombat !== true) {
                        game.currentDungeon.currentRoom.player.tileTo[0] -= 1;
                        console.log("moving left");

                    }

                } else if (keysDown[39]) { // Right
                    if (game.currentDungeon.currentRoom.player.checkTileWalkable("right") === true && game.currentDungeon.currentRoom.player.isBusy !== true && game.currentDungeon.currentRoom.player.inCombat !== true) {
                        game.currentDungeon.currentRoom.player.tileTo[0] += 1;
                        console.log("moving right");

                    }
                } else if (keysDown[38]) { // Up
                    if (game.currentDungeon.currentRoom.player.checkTileWalkable("up") === true && game.currentDungeon.currentRoom.player.isBusy !== true && game.currentDungeon.currentRoom.player.inCombat !== true) {
                        game.currentDungeon.currentRoom.player.tileTo[1] -= 1;
                        console.log("moving up");

                    }

                } else if (keysDown[40]) { // Down
                    if (game.currentDungeon.currentRoom.player.checkTileWalkable("down") === true && game.currentDungeon.currentRoom.player.isBusy !== true && game.currentDungeon.currentRoom.player.inCombat !== true) {
                        game.currentDungeon.currentRoom.player.tileTo[1] += 1;
                        console.log("moving down");

                    }
                } 

                if (game.currentDungeon.currentRoom.player.tileFrom[0] !== game.currentDungeon.currentRoom.player.tileTo[0] || game.currentDungeon.currentRoom.player.tileFrom[1] !== game.currentDungeon.currentRoom.player.tileTo[1]) { 
                    game.currentDungeon.currentRoom.player.timeMoved = currentFrameTime;
                }

            }
        }
    }
}

///// End of Game Loop /////

///// Player /////

function spawnPlayer() {

    // Spawn player object in given container
    Player(game.currentDungeon.currentRoom);

    // Spawn player at entrance tile
    let xIndex = game.currentDungeon.currentRoom.tileMap.entranceTile[0];
    let yIndex = game.currentDungeon.currentRoom.tileMap.entranceTile[1];

    // Place player at given [x, y] tile
    game.currentDungeon.currentRoom.player.placeAt(xIndex, yIndex);

}

// Player constructor

function Player(container) {

    let player = new PIXI.Sprite(PIXI.loader.resources["images/player.png"].texture);

    player.name = "player";
    player.width = 48;
    player.height = 48;
    player.x;
    player.y;
    player.tileFrom = [undefined, undefined];
    player.tileTo = [undefined, undefined];
    player.timeMoved = 0;
    player.delayMove = 100;
    player.currentlyMoving = false;
    player.isBusy = false;
    player.collisionEnabled = true;

    player.targetEnemy = undefined;
    player.attackDamage = 1;
    player.attackSpeed = 100;
    player.lastAttacked = 0;
    player.health = 100;
    player.inCombat = false;

    player.placeAt = function (xIndex, yIndex) {

        player.tileFrom = [xIndex, yIndex];
        player.tileTo = [xIndex, yIndex];
        player.x = ((game.settings.dungeon.tileTextureWidth * (xIndex - 1)) + ((game.settings.dungeon.tileTextureWidth - player.width) / 2));
        player.y = ((game.settings.dungeon.tileTextureHeight * (yIndex - 1)) + ((game.settings.dungeon.tileTextureHeight - player.height) / 2));

    }

    player.update = function(t) {


        // If player has a target and is in combat
        if (player.targetEnemy !== undefined && player.inCombat === true) {

            player.processCombat(t)

        }

        if (player.currentlyMoving === false && player.inCombat !== true && player.isBusy !== true) {

            // If autoExplore enabled, player will walk in random direction

            if (playerProfile.upgrades.autoDungeon === true) {

                player.currentlyMoving = true;
                let direction = randomInt(1, 4); // Pick random number between 1-4

                switch (direction) { // For given number move player in the assigned direction
                    case 1: // Left
                        if (game.currentDungeon.currentRoom.player.checkTileWalkable("left") === true) {
                            player.tileTo[0] -= 1;
                        }
                        break;
                    case 2: // Right
                        if (game.currentDungeon.currentRoom.player.checkTileWalkable("right") === true) {
                            player.tileTo[0] += 1;
                        }
                        break;
                    case 3: // Up
                        if (game.currentDungeon.currentRoom.player.checkTileWalkable("up") === true) {
                            player.tileTo[1] -= 1;
                        }
                        break;
                    case 4: // Down
                        if (game.currentDungeon.currentRoom.player.checkTileWalkable("down") === true) {
                            player.tileTo[1] += 1;
                        }
                }
                
                if (player.tileFrom[0] !== player.tileTo[0] || player.tileFrom[1] !== player.tileTo[1]) { 
                    player.timeMoved = Date.now();

                }

            }

        }

    }

    // DO A CHECK BEFORE MOVEMENT AND SEE IF ANY ENTITIES SPAWNED ARE PASSABLE
    player.processMovement = function(t) {

        // UPDATE GAMELOOP TO ONLY CALL PROCESS MOVEMENT WHEN PLAYER ACTUALLY MOVING

        if (player.isBusy === false || player.inCombat !== true) {

            if (player.tileFrom[0] == player.tileTo[0] && player.tileFrom[1] == player.tileTo[1]) {

                return false;
    
            }
    
            if ((t - player.timeMoved) >= player.delayMove) {
    
                player.currentlyMoving = false;
                player.placeAt(player.tileTo[0], player.tileTo[1]);
    
            } else {

                player.x = (player.tileFrom[0] * game.settings.dungeon.tileTextureWidth) + ((game.settings.dungeon.tileTextureWidth - player.width) / 2);
                player.y = (player.tileFrom[1] * game.settings.dungeon.tileTextureHeight) + ((game.settings.dungeon.tileTextureHeight - player.height) / 2);
    
                if (player.tileTo[0] != player.tileFrom[0]) {
    
                    let diff = (game.settings.dungeon.tileTextureWidth / player.delayMove) * (t - player.timeMoved);
                    player.x += (player.tileTo[0] < player.tileFrom[0] ? 0 - diff : diff);
    
                }
    
                if (player.tileTo[1] != player.tileFrom[1]) {
    
                    let diff = (game.settings.dungeon.tileTextureHeight / player.delayMove) * (t - player.timeMoved);
                    player.y += (player.tileTo[1] < player.tileFrom[1] ? 0 - diff : diff);
    
                }
    
                player.x = Math.round(player.x - game.settings.dungeon.tileTextureWidth);
                player.y = Math.round(player.y - game.settings.dungeon.tileTextureHeight);
    
            }
    
            return true;
            
        } 

    }

    player.getNeighbouringTiles = function() {

        let neighbouringTiles = [];

        neighbouringTiles.push(new Object({
            "left": {
                id: 0,
                tileIndex: [player.tileFrom[0] -= 1, player.tileFrom[1]]
            }
        }));

        // TODO OTHER DIRECTIONS

    }

    player.checkTileWalkable = function(direction) {

        // TODO - Include check for if tile is occupied by monster/item etc

        let destinationTile = [];
        let playerTile = player.tileFrom.map(Object);
        let tileMap = game.currentDungeon.currentRoom.tileMap;
        
        switch (direction) {

            case "up":
                destinationTile = [playerTile[0], playerTile[1] -= 1];
                break;
            case "down":
                destinationTile = [playerTile[0], playerTile[1] += 1];    
                break;
            case "left":
                destinationTile = [playerTile[0] -= 1, playerTile[1]];    
                break;
            case "right":
                destinationTile = [playerTile[0] += 1, playerTile[1]];
        }

        // If tile is not undefined and within 1 tile of room width/height, then process tile type
        if (destinationTile[0] != undefined && destinationTile[1] != undefined && destinationTile[0] > 0 && destinationTile[1] > 0 && destinationTile[0] < game.currentDungeon.currentRoom.roomWidth + 1 && destinationTile[1] < game.currentDungeon.currentRoom.roomHeight + 1) {

            //console.log(destinationTile[0] + " " + destinationTile[1]);
            if (tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileType.walkable === false) {
                //console.log(tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileType.tileName);
                switch(tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileType.tileName) {

                    // Player walking on exit tile
                    case "room_exit":
                        game.currentDungeon.currentRoom.destroy();
                        game.currentDungeon.roomCreated = false;
                        return true;

                    // Player walking on entrance tile
                    case "room_entrance":
                        return true;
                    default:
                        console.log("test");

                        if (game.currentDungeon.currentRoom.player.isBusy !== true || game.currentDungeon.currentRoom.player.inCombat !== true) {
                            player.currentlyMoving = false;
                            return false;
                        }

                }

                return false;
            }

            if (destinationTile[0] < game.currentDungeon.currentRoom.roomWidth && destinationTile[0] > 1 && destinationTile[1] < game.currentDungeon.currentRoom.roomHeight && destinationTile[1] > 1) {

                if (tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileType.walkable === true
                && tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileOccupied === false) {

                    return true;
                
                // Check if tile occupied
                } else if (tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileOccupied === true) {

                    // Loop through each child and check if it is occupying the same tile as the destination tile
                    for (let i = 0; i < game.currentDungeon.currentRoom.children.length; i++) {

                        if (game.currentDungeon.currentRoom.children[i].tileFrom !== undefined) {

                            // Check for entityType
                            if (game.currentDungeon.currentRoom.children[i].tileFrom[0] == destinationTile[0] && game.currentDungeon.currentRoom.children[i].tileFrom[1] == destinationTile[1]) {

                                switch(game.currentDungeon.currentRoom.children[i].entityType) {

                                    case "enemy":
                                        //console.log("enemy");
                                        player.targetEnemy = game.currentDungeon.currentRoom.children[i];
                                        game.currentDungeon.currentRoom.player.inCombat = true;
                                        game.currentDungeon.currentRoom.player.isBusy = true;
                                        player.currentlyMoving = false;
                                        return false;
                                    break;

                                    case "item":
                                        console.log("item");
                                }
                                
                            }

                        }

                    }

                } else {

                    player.currentlyMoving = false;
                    return false;

                }
            
            // If player at room exit
            } else if (destinationTile[1] == 1 && tileMap.children[tileMapChildrenIndex(destinationTile[0], destinationTile[1])].tileType) {

            }
 
        } else {

            player.currentlyMoving = false;
            return false;

        }

    }

    // Player combat
    player.processCombat = function(t) {

        // Auto attack
        if (playerProfile.upgrades.autoAttack === true) {

            player.isBusy = true;

            //console.log("test1");

            // If player can attack again
            if (t - player.attackSpeed >= player.lastAttacked) {

                //console.log("test");
                player.attackEnemy();
                player.lastAttacked = t;
    
            }

        }

    }

    player.attackEnemy = function() {
        //console.log("attacked enemy");
                if (player.targetEnemy.health - player.attackDamage > 0) {
                    player.targetEnemy.health -= player.attackDamage;
                    //console.log(player.targetEnemy.health);
                    //player.targetEnemy.attacked(getPercentageChange(oldMonsterHealth, newMonsterHealth));
                } else if (player.targetEnemy.health - player.attackDamage <= 0) { // Enemy killed

                    game.currentDungeon.currentRoom.tileMap.children[tileMapChildrenIndex(player.targetEnemy.tileFrom[0], player.targetEnemy.tileFrom[1])].tileOccupied = false;
                    player.targetEnemy.destroy();
                    dropItem(player.targetEnemy.id);

                    //TO DO - ADD ITEM TO INVENTORY
                    player.targetEnemy = undefined;
                    player.inCombat = false;
                    player.isBusy = false;
                    playerProfile.statistics.enemiesKilled += 1;
                    
    
                    /// NEED TO CHANGE TILE BACK TO NOT OCCUPIED

                }

    }

    game.currentDungeon.currentRoom.player = player;
    container.addChild(player);

}

function listNeighbourTiles() {

    console.log("Left: " + game.currentDungeon.currentRoom.player.checkTileWalkable("left") +
    " . Right: " + game.currentDungeon.currentRoom.player.checkTileWalkable("right") +
    " . Up: " + game.currentDungeon.currentRoom.player.checkTileWalkable("up") + 
    " . Down: " + game.currentDungeon.currentRoom.player.checkTileWalkable("down")
    );
}
