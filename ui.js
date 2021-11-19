function addUI() {

    leftSectionContainer();
    rightSectionContainer();
    //messageBox();

}

function leftSectionContainer() {

    let sectionLeft = new PIXI.Container();
    let background = new PIXI.Sprite.from('/images/ui/sectionLeft.png');
    sectionLeft.addChild(background);

    // Player Button
    let playerButton = new PIXI.Sprite.from('/images/ui/menu_button_background.png');
        playerButton.x = 150;
        playerButton.y = 60;
        playerButton.anchor.set(0.5,0.5);
        playerButton.buttonMode = true;
        playerButton.interactive = true;
        playerButton
            .on('mousedown', openPlayerUI);

        let playerButtonText = new PIXI.Text();
        playerButtonText.style = new PIXI.TextStyle({
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 20,
            strokeThickness: 4
        });
        playerButtonText.text = "Player";
        playerButtonText.anchor.set(0.5, 0.5);
        playerButton.addChild(playerButtonText);
        
        sectionLeft.addChild(playerButton);

    // Inventory Button

    let inventoryButton = new PIXI.Sprite.from('/images/ui/menu_button_background.png');
    inventoryButton.x = 150;
    inventoryButton.y = 120;
    inventoryButton.anchor.set(0.5,0.5);
    inventoryButton.buttonMode = true;
    inventoryButton.interactive = true;
    inventoryButton
        .on('mousedown', openInventoryUI);

    let inventoryButtonText = new PIXI.Text();
    inventoryButtonText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    inventoryButtonText.text = "Inventory";
    inventoryButtonText.anchor.set(0.5, 0.5);
    inventoryButton.addChild(inventoryButtonText);
    
    sectionLeft.addChild(inventoryButton);

    // Dungeon Button

    let dungeonButton = new PIXI.Sprite.from('/images/ui/menu_button_background.png');
    dungeonButton.x = 150;
    dungeonButton.y = 180;
    dungeonButton.anchor.set(0.5,0.5);
    dungeonButton.buttonMode = true;
    dungeonButton.interactive = true;
    dungeonButton
        .on('mousedown', function() {

            if (game.ui.menu.menuCurrentlyOpen == true) {
                gameScene.getChildByName("rightSection").removeChild(game.ui.menu.menuOpen);
                game.ui.menu.menuCurrentlyOpen = true;
                openDungeonUI();
            } else if (game.ui.menu.menuCurrentlyOpen != true) {
                game.ui.menu.menuCurrentlyOpen = true;
                openDungeonUI();
            }
        });

    let dungeonButtonText = new PIXI.Text();
    dungeonButtonText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    dungeonButtonText.text = "Dungeon";
    dungeonButtonText.anchor.set(0.5, 0.5);
    dungeonButton.addChild(dungeonButtonText);
    
    sectionLeft.addChild(dungeonButton);

    // Crafting Button

    let craftingButton = new PIXI.Sprite.from('/images/ui/menu_button_background.png');
    craftingButton.x = 150;
    craftingButton.y = 240;
    craftingButton.anchor.set(0.5,0.5);
    craftingButton.buttonMode = true;
    craftingButton.interactive = true;
    craftingButton
        .on('mousedown', openCraftingUI);

    let craftingButtonText = new PIXI.Text();
    craftingButtonText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    craftingButtonText.text = "Crafting";
    craftingButtonText.anchor.set(0.5, 0.5);
    craftingButton.addChild(craftingButtonText);
    
    sectionLeft.addChild(craftingButton);

    // Smithing Button
    let smithingButton = new PIXI.Sprite.from('/images/ui/menu_button_background.png');
        smithingButton.x = 150;
        smithingButton.y = 300;
        smithingButton.anchor.set(0.5,0.5);
        smithingButton.buttonMode = true;
        smithingButton.interactive = true;
        smithingButton
            .on('mousedown', openSmithingUI);

        let smithingButtonText = new PIXI.Text();
        smithingButtonText.style = new PIXI.TextStyle({
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 20,
            strokeThickness: 4
        });
        smithingButtonText.text = "Smithing";
        smithingButtonText.anchor.set(0.5, 0.5);
        smithingButton.addChild(smithingButtonText);
        
        sectionLeft.addChild(smithingButton);

    gameScene.addChild(sectionLeft);

}

function openPlayerUI() {


    console.log("player button");
}

function openInventoryUI() {

    console.log("inventory button");

}

// Dungeon Menu

function openDungeonUI() {

    let rightSection = gameScene.getChildByName("rightSection");

    console.log("dungeon button");

    let dungeonUI = createMenuBackground(rightSection, 650, 650);
    dungeonUI.x = (rightSection.width - dungeonUI.width) / 2;
    dungeonUI.y = (rightSection.height - dungeonUI.height) / 2;

    // Add exit button

    let exitButton = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/exit_button.png"].texture);
    exitButton.scale.set(0.05, 0.05);
    exitButton.anchor.set(0.5, 0.5);
    exitButton.x = dungeonUI.width - exitButton.width;
    exitButton.y = exitButton.height;
    exitButton.interactive = true;
    exitButton
        .on('mousedown', function() {
            rightSection.removeChild(dungeonUI);
            game.ui.menu.menuCurrentlyOpen = false;
            game.ui.menu.menuOpen = undefined;
        });
        dungeonUI.addChild(exitButton);

    // Menu Title

    let menuTitle = new PIXI.Sprite.from('/images/ui/menu_button_background.png');
    menuTitle.anchor.set(0.5, 0.5);
    menuTitle.x = dungeonUI.width / 2;
    menuTitle.y = menuTitle.height;

    let menuTitleText = new PIXI.Text();
    menuTitleText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    menuTitleText.text = "Dungeon";
    menuTitleText.anchor.set(0.5, 0.5);
    menuTitle.addChild(menuTitleText);

    dungeonUI.addChild(menuTitle);

    // Realm selection title

    let realmSelection = new PIXI.Container();

    realmSelection.x = dungeonUI.width / 2;
    realmSelection.y = 100;

    let realmSelectionTitleText = new PIXI.Text();
    realmSelectionTitleText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    realmSelectionTitleText.text = "Realm";
    realmSelectionTitleText.anchor.set(0.5, 0.5);
    realmSelection.addChild(realmSelectionTitleText);

    // Realm selection
    let currentRealmSelection = new PIXI.Text();
    currentRealmSelection.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    currentRealmSelection.currentSelection = 0;
    currentRealmSelection.text = listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection];
    currentRealmSelection.selectionList = listPlayerUnlocks(playerProfile.realmsUnlocked);
    currentRealmSelection.anchor.set(0.5, 0.5);
    currentRealmSelection.y = 50;
    realmSelection.addChild(currentRealmSelection);

    // Realm selector left arrow
    let rsArrowLeft = new PIXI.Sprite.from('/images/ui/menu/arrow_left.png');
    rsArrowLeft.scale.set(0.2, 0.2);
    rsArrowLeft.anchor.set(0.5, 0.5);
    rsArrowLeft.x = -150;
    rsArrowLeft.y = 50;
    rsArrowLeft.interactive = true;
    rsArrowLeft.buttonMode = true;
    rsArrowLeft
        .on('mousedown', function() {
            if (currentRealmSelection.currentSelection > 0) {
                currentRealmSelection.currentSelection -= 1;
                currentRealmSelection.text = listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection];
                console.log(currentRealmSelection.currentSelection);
            } else if (currentRealmSelection.currentSelection == 0) {
                currentRealmSelection.currentSelection = currentRealmSelection.selectionList.length - 1;
                currentRealmSelection.text = listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection];
            }
        });
    realmSelection.addChild(rsArrowLeft);

    // Realm selector right arrow
    let rsArrowRight = new PIXI.Sprite.from('/images/ui/menu/arrow_right.png');
    rsArrowRight.scale.set(0.2, 0.2);
    rsArrowRight.anchor.set(0.5, 0.5);
    rsArrowRight.x = 150;
    rsArrowRight.y = 50;
    rsArrowRight.interactive = true;
    rsArrowRight.buttonMode = true;
    rsArrowRight
        .on('mousedown', function() {
            if (currentRealmSelection.currentSelection < currentRealmSelection.selectionList.length - 1) {
                currentRealmSelection.currentSelection += 1;
                currentRealmSelection.text = listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection];
            } else if (currentRealmSelection.currentSelection == currentRealmSelection.selectionList.length - 1) {
                currentRealmSelection.currentSelection = 0;
                currentRealmSelection.text = listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection];
            }
        });
    realmSelection.addChild(rsArrowRight);

    dungeonUI.addChild(realmSelection);

    // Dungeon selection title

    let dungeonSelection = new PIXI.Container();

    dungeonSelection.x = dungeonUI.width / 2;
    dungeonSelection.y = 200;

    let dungeonSelectionTitleText = new PIXI.Text();
    dungeonSelectionTitleText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    dungeonSelectionTitleText.text = "Dungeon";
    dungeonSelectionTitleText.anchor.set(0.5, 0.5);
    dungeonSelection.addChild(dungeonSelectionTitleText);
    
    // Current dungeon selection
    let currentDungeonSelection = new PIXI.Text();
    currentDungeonSelection.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    currentDungeonSelection.currentSelection = 0;
    currentDungeonSelection.text = listPlayerUnlocks(playerProfile.dungeonsUnlocked)[currentDungeonSelection.currentSelection];
    currentDungeonSelection.selectionList = listPlayerUnlocks(playerProfile.dungeonsUnlocked);
    currentDungeonSelection.anchor.set(0.5, 0.5);
    currentDungeonSelection.y = 50;
    dungeonSelection.addChild(currentDungeonSelection);

    // Dungeon selector left arrow
    let dsArrowLeft = new PIXI.Sprite.from('/images/ui/menu/arrow_left.png');
    dsArrowLeft.scale.set(0.2, 0.2);
    dsArrowLeft.anchor.set(0.5, 0.5);
    dsArrowLeft.x = -150;
    dsArrowLeft.y = 50;
    dsArrowLeft.interactive = true;
    dsArrowLeft.buttonMode = true;
    dsArrowLeft
        .on('mousedown', function() {
            if (currentDungeonSelection.currentSelection > 0) {
                currentDungeonSelection.currentSelection -= 1;
                currentDungeonSelection.text = listPlayerUnlocks(playerProfile.dungeonsUnlocked)[currentDungeonSelection.currentSelection];
                console.log(currentDungeonSelection.currentSelection);
            } else if (currentDungeonSelection.currentSelection == 0) {
                currentDungeonSelection.currentSelection = currentDungeonSelection.selectionList.length - 1;
                currentDungeonSelection.text = listPlayerUnlocks(playerProfile.dungeonsUnlocked)[currentDungeonSelection.currentSelection];
            }
        });
    dungeonSelection.addChild(dsArrowLeft);

    // Dungeon selector right arrow
    let dsArrowRight = new PIXI.Sprite.from('/images/ui/menu/arrow_right.png');
    dsArrowRight.scale.set(0.2, 0.2);
    dsArrowRight.anchor.set(0.5, 0.5);
    dsArrowRight.x = 150;
    dsArrowRight.y = 50;
    dsArrowRight.interactive = true;
    dsArrowRight.buttonMode = true;
    dsArrowRight
        .on('mousedown', function() {
            if (currentDungeonSelection.currentSelection < currentDungeonSelection.selectionList.length - 1) {
                currentDungeonSelection.currentSelection += 1;
                currentDungeonSelection.text = listPlayerUnlocks(playerProfile.dungeonsUnlocked)[currentDungeonSelection.currentSelection];
            } else if (currentDungeonSelection.currentSelection == currentDungeonSelection.selectionList.length - 1) {
                currentDungeonSelection.currentSelection = 0;
                currentDungeonSelection.text = listPlayerUnlocks(playerProfile.dungeonsUnlocked)[currentDungeonSelection.currentSelection];
            }
        });
    dungeonSelection.addChild(dsArrowRight);

    dungeonUI.addChild(dungeonSelection);
    rightSection.addChild(dungeonUI);
    game.ui.menu.menuOpen = dungeonUI;

    // Start dungeon button

    let startButton = new PIXI.Sprite.from('/images/ui/menu/plank_07.png');
    startButton.anchor.set(0.5, 0.5);
    startButton.x = dungeonUI.width / 2;
    startButton.y = 400;
    startButton.buttonMode = true;
    startButton.interactive = true;
    startButton
        .on('mousedown', function() {
            rightSection.removeChild(dungeonUI);
            game.ui.menu.menuCurrentlyOpen = false;
            game.ui.menu.menuOpen = undefined;
            sendGameMessage("You have started exploring dungeon " + currentDungeonSelection.selectionList[currentDungeonSelection.currentSelection] + " in realm " + listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection])
            startDungeon(listPlayerUnlocks(playerProfile.realmsUnlocked)[currentRealmSelection.currentSelection], currentDungeonSelection.selectionList[currentDungeonSelection.currentSelection]);
        });
    let startButtonText = new PIXI.Text();
    startButtonText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        align: 'center',
        fontSize: 20,
        strokeThickness: 4
    });
    startButtonText.text = "Start Dungeon";
    startButtonText.anchor.set(0.5, 0.5);
    startButton.addChild(startButtonText);

    dungeonUI.addChild(startButton);

}

// Smithing Menu

function openSmithingUI() {

    console.log("smithing button");
}

function openCraftingUI() {

    console.log("crafting button");
}

function buttonDown() {

    console.log("test");

}

// ----- RIGHT SECTION ----- //

function rightSectionContainer() {

    let rightSection = new PIXI.Container();
    
    let background = new PIXI.Sprite.from('/images/ui/sectionRight.png');
    rightSection.name = "rightSection"
    rightSection.addChild(background);
    rightSection.addChild(messageBox());
    rightSection.x = game.ui.leftSectionWidth;
    rightSection.zIndex = 1;
    rightSection.sortableChildren = true;
    gameScene.addChild(rightSection);
    game.ui.rightSection = rightSection;
}

// Draw message box
function messageBox() {

    let messageBox = new PIXI.Container();
    game.ui.messageBox = messageBox;

    let background = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/middle.png"].texture);
    background.width = game.ui.rightSectionWidth;
    background.height = 150;
    background.alpha = 0.5;
    messageBox.addChild(background);
    
    messageBox.width = game.ui.rightSectionWidth;
    messageBox.y = game.ui.rightSectionHeight - background.height;

    for (let i = 1; i < 8; i++) {

        let message = new PIXI.Text();
        message.anchor.y = 0.5;
        message.style = new PIXI.TextStyle({
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 12,
            strokeThickness: 2,
        });
        message.x = 10;
        message.alpha = 1 - (1 / 8) * i;
        message.y = background.height - (((i * 2) - 1) * (background.height/14));
        messageBox.addChild(message);
    }

    return messageBox;

}

// Send game message to message box

function sendGameMessage(message) {

    for (let i = 7; i > 1; i--) {

        game.ui.messageBox.children[i].text = game.ui.messageBox.children[i - 1].text; // Change the current message text to the below message text

    }

    game.ui.messageBox.children[1].text = message; // Change first message text to message passed in function

}

// ----- END OF RIGHT SECTION ----- //

// ----- OTHER ----- //

// Create background for menus

function createMenuBackground(container, width, height) {

    let menu = new PIXI.Container();
    menu.container = container;

    // Create top row

    let topLeftCorner = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/top_left_corner.png"].texture);
    menu.addChild(topLeftCorner);

    let topRightCorner = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/top_right_corner.png"].texture);
    topRightCorner.x = width - topRightCorner.width;
    menu.addChild(topRightCorner);

    let middleTop = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/middle_top.png"].texture);
    middleTop.x = topLeftCorner.width;
    middleTop.width = width - topLeftCorner.width - topRightCorner.width;
    menu.addChild(middleTop);

    // Create bottom row of menu

    let bottomLeftCorner = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/bottom_left_corner.png"].texture);
    bottomLeftCorner.y = height - bottomLeftCorner.height;
    menu.addChild(bottomLeftCorner);

    let bottomRightCorner = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/bottom_right_corner.png"].texture);
    bottomRightCorner.x = width - bottomRightCorner.width;
    bottomRightCorner.y = height - bottomRightCorner.height;
    menu.addChild(bottomRightCorner);

    let middleBottom = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/middle_bottom.png"].texture);
    middleBottom.width = width - bottomLeftCorner.width - middleBottom.width;
    middleBottom.x = bottomLeftCorner.width;
    middleBottom.y = height - middleBottom.height;
    menu.addChild(middleBottom);

    // Create sides and fill middle

    let middleLeft = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/middle_left.png"].texture);
    middleLeft.y = topLeftCorner.height;
    middleLeft.height = height - topLeftCorner.height - bottomLeftCorner.height;
    menu.addChild(middleLeft);

    let middleRight = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/middle_right.png"].texture);
    middleRight.x = width - topRightCorner.width;
    middleRight.y = topRightCorner.height;
    middleRight.height = height - topRightCorner.height - bottomRightCorner.height;
    menu.addChild(middleRight);

    let middle = new PIXI.Sprite(PIXI.loader.resources["images/ui/menu/middle.png"].texture);
    middle.x = middleLeft.width;
    middle.y = topLeftCorner.height;
    middle.width = width - middleLeft.width - middleRight.width;
    middle.height = height - middleTop.height - middleBottom.height;
    menu.addChild(middle);

    return menu;

}


function testMessageBox() {

    let messages = [
        "Don't step on the broken glass.",
        "Test",
        "1, 2, 3",
        "My Name is Lewis",
        "The fox in the tophat whispered into the ear of the rabbit.",
        "There was no telling what thoughts would come from the machine.",
        "1",
        "2",
        "3",
        "4"
    ];

    setTimeout(function() {
        testMessageBox()
    }, 1000);

    sendGameMessage(messages[randomInt(0, messages.length - 1)]);
}