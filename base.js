var canvas = document.querySelector("canvas"); //searches HTML documents for "canvas" tag
var c = canvas.getContext("2d"); //"context" in HTML Canvas is shortened to "c". "paint brush"/allows access to variables to draw 2d shapes

canvas.width = window.innerWidth; //sets canvas width to browser inner width
canvas.height = window.innerHeight; //sets canvas height to browser inner height

////////////////////////////////
// START OF TOOLS / UTILITIES //
////////////////////////////////

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Add event listener for `click` events.

window.addEventListener("click", function(event) {
    var xPos = event.clientX;
    var yPos = event.clientY;

	function getDistance(x1, y1, x2, y2) {
    var xDistance = x1 - x2;
    var yDistance = y1 - y2;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	}
	
        if (getDistance(xPos, yPos, clickObjectArray[0], clickObjectArray[1]) < clickObjectArray[4]){
alert("1231232123");
        }

}, false);
// (var i = 0; i < 50; i++){

//////////////////////////////
// END OF TOOLS / UTILITIES //
//////////////////////////////

var realm = {
	
	
	clickObjectSolarMass: 75,
	clickObjectTotalClicks: 0,
	clickObjectLifetimeClicks: 0,
	
	asteroidArray: [],
	
	asteroidMaxRadius: 2,
	asteroidMinRadius: 1,
	asteroidcolorArray: ["#5a554c", "#767676", "#93928c", "#362d01", "#9fd344"] // CREDIT TO PYRA_LIRA (SOURCED FROM http://www.color-hex.com/color-palette/21597)
};

var clickObjectRadius = 100;
var asteroidCount;

//              = x, y, radius 
//var clickObject = [canvas.width / 2, canvas.height / 2, 75];
	
function attractAsteroids(){
	
}

function clickObjectClick() {
	attractAsteroids();
	realm.clickObjectTotalClicks += 1;
	realm.clickObjectLifetimeClicks += 1;
	console.log("clickObjectClick");
	
	for (var l = 0; l < realm.clickObjectRadius; l++) {
		
		if (realm.clickObjectRadius <= 250) {
			realm.clickObjectRadius += 1;
		} else if (realm.clickObjectRadius > 200){
			realm.clickObjectRadius -= 1;
		}
	}
}


window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

// x, y, dx, dy, radius, velocity
var clickObjectArray = [canvas.width / 2, canvas.height / 2, 0, 0, clickObjectRadius, 0];
var clickObjectArray = [canvas.width / 2, canvas.height / 2, 0, 0, clickObjectRadius, 0];

// double start syste,m upgrade?
function Asteroid(x, y, dx, dy, radius, velocity) {
	
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = realm.asteroidcolorArray[Math.floor(Math.random() * realm.asteroidcolorArray.length)];
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = velocity;
	this.distanceFromClickObject = randomIntFromRange(250, 1300);
	
	this.update = function() {
		// MOVE POINTS OVER TIME
		this.radians += this.velocity;
		this.x = x + Math.cos(this.radians) * this.distanceFromClickObject;
		this.y = y + Math.sin(this.radians) * this.distanceFromClickObject;
		
	//if (this.x + radius > innerWidth || this.x - radius < 0){
	//	this.dx = -this.dx;
	//}
	//
	//if (this.y + radius > innerHeight || this.y - radius < 0){
	//	this.dy = -this.dy;
	//}
	//
	//this.x += this.dx;
	//this.y += this.dy;
	
	this.draw();

	};
	
	this.draw = function(){
	c.beginPath();
	c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
	c.fillStyle = this.color;
	c.fill();
	
	};
	
}

//var x = Math.random() * innerWidth;
//var y = Math.random() * innerHeight;
//var dx = Math.random() - 0.5;
//var dy = Math.random() - 0.5;
//var radius = 5;




console.log(clickObjectArray);
console.log(realm.asteroidArray);

function init() {
	
	for (var i = 0; i < 2000; i++) {

	var x = innerWidth / 2;
	var y = innerHeight / 2;
	var dx = (Math.random() - 0.5) * 1;
	var dy = (Math.random() - 0.5) * 1;
	var radius = Math.random() + 1;
	var velocity = randomIntFromRange(1, 2) / 2500;
	


	realm.asteroidArray.push(new Asteroid(x, y, dx, dy, radius, velocity));
	var clickObject = new Asteroid(clickObjectArray[0], clickObjectArray[1], clickObjectArray[2], clickObjectArray[3], clickObjectArray[4]);
	}

}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.beginPath();
		
	c.arc(clickObjectArray[0], clickObjectArray[1], clickObjectArray[4], 0, Math.PI * 2, false);
	c.strokeStyle = "white";
	c.stroke();
	c.fillStyle = "white";
	c.fill();
	
	for (var i = 0; i < realm.asteroidArray.length; i++){
		realm.asteroidArray[i].update();
	}
	
	realm.asteroidArray.forEach(Asteroid => {
		Asteroid.update();
	});

}

init();
animate();


