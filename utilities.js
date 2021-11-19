// Returns random integer between given min and max values
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Remove element from array
function remove(array, element) {

  var index = array.indexOf(element);
  array.splice(index, 1);
};


function returnIndexFromID(ID, array) {
    
  if(array.length !== 0) {
      let index = array.map(function(object) {
          return object.id;
      }).indexOf(ID);
      return index;
  } else {
      return undefined;
  }

}

const sumArrayProperty = (array, property) => array.reduce((a, b) => +a + +b[property], 0);

// https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript

function precisionRound(number, precision) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

function formatNumber(x) {
  if (x <= 9999) {
      return x;
  } else if (x >= 10000 && x <= 999999) {
      return Math.floor(x / 1000) + "k";
  } else if (x >= 1000000 && x <= 999999999) {
      return Math.floor(x / 1000000) + "m";
  };
};

function tileMapChildrenIndex(x, y)
{
	return(((y - 1) * game.currentDungeon.currentRoom.roomWidth) + x - 1);
}





function keyboard(value) {
    const key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = (event) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = (event) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
}

const left = keyboard("ArrowLeft"),
up = keyboard("ArrowUp"),
right = keyboard("ArrowRight"),
down = keyboard("ArrowDown");

left.press = () => {
    console.log("left");
}

right.press = () => {
    console.log("right");
}

up.press = () => {
    console.log("up");
}

down.press = () => {
    console.log("down");
}

if(up.press == true) {
    console.log("uppppp");
}

// helper that generates a bitmap texture containing
// a circle of the required radius and color
let generateCircleTexture = (radius, color) => {
  let gfx = new PIXI.Graphics();
  let texture = PIXI.RenderTexture.create(radius * 2, radius * 2);
  gfx.beginFill(color);
  gfx.drawCircle(radius, radius, radius);
  gfx.endFill();
  app.render(gfx, texture);
  return texture;
}

let circleTexture = (radius, colour) => {
  return generateCircleTexture(radius, colour);
}