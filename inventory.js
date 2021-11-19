function addItemToInventory(itemID, amount) {

    if (playerProfile.inventory.length < playerProfile.inventorySize) {

        let item = itemList[returnIndexFromID(itemID, itemList)];

        let itemInInventory = false;
        let itemInventoryIndex;

        // Search through inventory to see if player already has the item
        for (let i = 0; i < playerProfile.inventory.length; i++) {

            if (playerProfile.inventory[i].item.id === item.id) {

                console.log("item in inventory");
                itemInInventory = true;
                itemInventoryIndex = i;

            }

        }
        
        console.log(itemInventoryIndex);
        if (itemInInventory === true) {

            if (item.stackable === true) {

                playerProfile.inventory[itemInventoryIndex].amount += amount;

            } else {

                playerProfile.inventory.push(new Object({item, amount}));

            }

        } else {

            playerProfile.inventory.push(new Object({item, amount})); // IF ITEM NOT ALREADY PRESENT IN INVENTORY, ADD THE AMOUNT OF ITEM TO INVENTORY

        }

    } else {

    }

    console.log(playerProfile.inventory);

}


// TODO - FUNCTION TO SEARCH PLAYER INVENTORY FOR ITEM
/*
function itemInInventory(itemID) {

    if (yes )

    return true;

    if (no)

    return false;
}*/

