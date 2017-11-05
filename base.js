var canvas = document.querySelector("canvas"); //searches HTML documents for "canvas" tag
var c = canvas.getContext("2d"); //"context" in HTML Canvas is shortened to "c". "paint brush"/allows access to variables to draw 2d shapes

canvas.width = window.innerWidth; //sets canvas width to browser inner width
canvas.height = window.innerHeight; //sets canvas height to browser inner height


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// (var i = 0; i < 50; i++){


var realm = {
	
	clickObjectSolarMass: 75,
	
	asteroidArray: [],
	
	asteroidMaxRadius: 2,
	asteroidMinRadius: 1,
	asteroidColorArray: ["#5a554c", "#767676", "#93928c", "#362d01", "#9fd344"] // CREDIT TO PYRA_LIRA (SOURCED FROM http://www.color-hex.com/color-palette/21597)
};




window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});


function Asteroid(x, y, dx, dy, radius, velocity) {
	
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = realm.asteroidColorArray[Math.floor(Math.random() * realm.asteroidColorArray.length)];
	this.radians = Math.random() * Math.PI * 2;
	this.velocity = velocity;
	this.distanceFromClickObject = randomIntFromRange(250, 400);
	
	this.update = () => {
		
		var lastPoint = {x: this.x, y: this.y}
		
		// MOVE POINTS OVER TIME
		this.radians += this.velocity;
		this.x = x + Math.cos(this.radians) * this.distanceFromClickObject;
		this.y = y + Math.sin(this.radians) * this.distanceFromClickObject;
	
		this.draw(lastPoint);
	};
	this.draw = lastPoint => {

	c.beginPath();
	//c.globalAlpha = 1;
	c.strokeStyle = this.color;
	c.lineWidth = this.radius;
	c.moveTo(lastPoint.x, lastPoint.y);
	c.lineTo(this.x, this.y);
	c.stroke();
	c.fill();
	c.closePath();

	};
	
}

//var x = Math.random() * innerWidth;
//var y = Math.random() * innerHeight;
//var dx = Math.random() - 0.5;
//var dy = Math.random() - 0.5;
//var radius = 5;




console.log(realm.asteroidArray);

function init() {
	
	realm.asteroidArray = [];
	
	for (var i = 0; i < 500; i++) {

	var x = innerWidth / 2;
	var y = innerHeight / 2;
	var dx = (Math.random() - 0.5) * 1;
	var dy = (Math.random() - 0.5) * 1;
	var radius = Math.random() + 2;
	var velocity = randomIntFromRange(1, 2) / 2000;
	

	realm.asteroidArray.push(new Asteroid(x, y, dx, dy, radius, velocity));
	var circle = new Asteroid(200, 200, 3, 3);
	
	}


	
	
	
	
}

function animate(){
	requestAnimationFrame(animate);
	c.fillStyle = "rgba(48, 60, 77, 0.1)";	
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	c.beginPath();
	c.arc(innerWidth / 2, innerHeight / 2, realm.clickObjectSolarMass, 0, Math.PI * 2, false);
	c.strokeStyle = "white";
	c.stroke();
	c.fillStyle = "white";
	c.fill();
	
	for (var i = 0; i < realm.asteroidArray.length; i++){
		realm.asteroidArray[i].update();
	}
	
	realm.asteroidArray.forEach(asteroid => {
		asteroid.update();
	});

}

init();
animate();


