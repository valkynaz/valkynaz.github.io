var canvas = document.querySelector("canvas"); //searches HTML documents for "canvas" tag
var c = canvas.getContext("2d"); //"context" in HTML Canvas is shortened to "c". "paint brush"/allows access to variables to draw 2d shapes

var clickObjectRadius = 10;
var asteroidCount = 10000;
var maxAsteroidCount = 10000;

var test1 = true;
var test2 = false;

canvas.width = innerWidth; //sets canvas width to browser inner width
canvas.height = innerHeight; //sets canvas height to browser inner height
canvasCenter = [canvas.width / 2, canvas.height / 2];

// x, y, dx, dy, radius, velocity, mass, gravSrc

var clickObject = [canvas.width / 2, canvas.height / 2, 0, 0, clickObjectRadius, 0, 32000, null];

var bigG = 6.673e-4; //gravitational number



var realm = {
	
	clickObjectSolarMass: 75,
	clickObjectTotalClicks: 0,
	clickObjectLifetimeClicks: 0,
	
	asteroidArray: [],
	
	physicsBodyMaxRadius: 2,
	physicsBodyMinRadius: 1,
	physicsBodyColorArray: ["#5a554c", "#767676", "#93928c", "#362d01", "#9fd344"] // CREDIT TO PYRA_LIRA (SOURCED FROM http://www.color-hex.com/color-palette/21597)
};



////////////////////////////////
// START OF TOOLS / UTILITIES //
////////////////////////////////


// TRYING TO FIGURE OUT HOW TO GET GRAVITY TO WORK. NEED TO FIGURE OUT HOW TO DECREASE DISTANCE FROM CENTER BASED ON ABOVE RESULTS

// DECREASE DISTANCE FROM CENTER OVER TIME?


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
	function getDistance(x1, y1, x2, y2) {
    var xDistance = x1 - x2;
    var yDistance = y1 - y2;
	
	    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	}
	
function clickObjectCollisionDetection() {
	
	for (var i = 0; i < realm.asteroidArray.length; i++){

	}

}



window.addEventListener("click", function(event) { // Add event listener for `click` events.
    var xPos = event.clientX;
    var yPos = event.clientY;




	
        if (getDistance(xPos, yPos, clickObject[0], clickObject[1]) < clickObject[4]){
	//alert("1231232123");
	//clickObjectClick(1);
	console.log(realm.asteroidArray.length);
        }

}, false);
 
//////////////////////////////
// END OF TOOLS / UTILITIES //
//////////////////////////////

function attractAsteroid() {
	
	console.log("attractPhysicsBody working");

		//maxAsteroidCount += 25;
	}

function clickObjectClick() {
	
	realm.clickObjectTotalClicks += 1;
	realm.clickObjectLifetimeClicks += 1;
	console.log("clickObjectClick");
	
	attractAsteroid();
	
	//for (var l = 0; l < realm.clickObjectRadius; l++) {
	//	
	//	if (realm.clickObjectRadius <= 250) {
	//		realm.clickObjectRadius += 1;
	//	} else if (realm.clickObjectRadius > 200){
	//		realm.clickObjectRadius -= 1;
	//	}
	//}
}

console.log(PhysicsBody[1]);

window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

window.addEventListener("onwheel", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

// x, y, dx, dy, radius, velocity, mass, gravSrc


// double star system upgrade?


function PhysicsBody(x, y, radius, color, velocity, mass, gravSrc, distanceFromClickObject) {
	
	this.x = x;
	this.y = y;
	this.relX = this.x + canvasCenter[0];
	this.relY = this.y + canvasCenter[1];
	this.radius = radius;
	this.color = color;
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = velocity;
	this.mass = mass;
	this.gravSrc = gravSrc;
	this.distanceFromClickObject = distanceFromClickObject;
	
	this.update = function() {
		
		// MOVE POINTS OVER TIME
		this.radians += this.velocity;
		this.relX = this.x + Math.cos(this.radians) * this.distanceFromClickObject;
		this.relY = this.y + Math.sin(this.radians) * this.distanceFromClickObject;
		this.distanceFromClickObject = this.distanceFromClickObject - 0.5;
		this.draw();

	};
	
	this.draw = function(){
		
		c.beginPath();
		c.arc(this.relX, this.relY, radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	
	};
}

//var x = Math.random() * innerWidth;
//var y = Math.random() * innerHeight;
//var dx = Math.random() - 0.5;
//var dy = Math.random() - 0.5;
//var radius = 5;

console.log(clickObject);
console.log(realm.asteroidArray);

function init() {
	
		for (var i = 0; i < asteroidCount; i++) {

			if (realm.asteroidArray.length < asteroidCount) {
			
				var x = canvas.width / 2;
				var y = canvas.height / 2;
				var radius = (Math.random() + 1) / 5;
				var color = realm.physicsBodyColorArray[Math.floor(Math.random() * realm.physicsBodyColorArray.length)];
				var velocity = randomIntFromRange(1.75, 2) / 500;
				var mass = 100;
				var gravSrc = "clickObject";
				var distanceFromClickObject = randomIntFromRange(250, 3000);
			
				realm.asteroidArray.push(new PhysicsBody(x, y, radius, color, velocity, mass, gravSrc, distanceFromClickObject));
	
			}
		}
}

function animate(){
	
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.beginPath();
		
	c.arc(clickObject[0], clickObject[1], clickObject[4], 0, Math.PI * 2, false);
	c.strokeStyle = "white";
	c.stroke();
	c.fillStyle = "white";
	c.fill();
	
	for (var i = 0; i < realm.asteroidArray.length; i++){
		
		if(getDistance(realm.asteroidArray[i].relX, realm.asteroidArray[i].relY, clickObject[0], clickObject[1]) < realm.asteroidArray[i].radius + clickObject[4]) {
			remove(realm.asteroidArray, i);

	} else {
		realm.asteroidArray[i].update();
	}
	
	}
}
	

	
	
	

init();
animate();
gameLoopTimerSetInterval();
clickObjectCollisionDetection();
var gameLoopTimer;

function gameLoopTimerSetInterval() {
	
	gameLoopTimer = setInterval(gameLoop, 1);
}

function gameLoop() {
	
		for (var i = 0; i < realm.asteroidArray.length; i++) {	
			
			if (realm.asteroidArray.length < maxAsteroidCount) {
			
			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var radius = (Math.random() + 1) / 5;
			var color = realm.physicsBodyColorArray[Math.floor(Math.random() * realm.physicsBodyColorArray.length)];
			var velocity = randomIntFromRange(1, 2) / 500;
			var mass = 100;
			var gravSrc = "clickObject";
			var distanceFromClickObject = randomIntFromRange(250, 3000);

			realm.asteroidArray.push(new PhysicsBody(x, y, radius, color, velocity, mass, gravSrc, distanceFromClickObject));
	
			}
	
		}

}



