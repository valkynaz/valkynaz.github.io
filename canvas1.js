var canvas = document.querySelector('canvas'); //searches HTML documents for "canvas" tag
var c = canvas.getContext('2d'); //"context" in HTML Canvas is shortened to "c". "paint brush"/allows access to variables to draw 2d shapes

canvas.width = window.innerWidth; //sets canvas width to browser inner width
canvas.height = window.innerHeight; //sets canvas height to browser inner height

// (var i = 0; i < 50; i++){
	

var realm = {
	
	click_object_solar_mass: 75,
	
};

window.addEventListener('mousemove', function(){
	
})
function Asteroid(x, y, dx, dy, radius) {
	
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	
	this.draw = function(){
	c.beginPath();
	c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
	c.strokeStyle = 'white';
	c.stroke();
	c.fillStyle = 'white';
	c.fill();
	
	}
	
	this.update = function(){
		
	if (this.x + radius > innerWidth || this.x - radius < 0){
		this.dx = -this.dx;
	}
	
	if (this.y + radius > innerHeight || this.y - radius < 0){
		this.dy = -this.dy;
	}

	this.x += this.dx;
	this.y += this.dy;
	
	this.draw();

	}
	
}

//var x = Math.random() * innerWidth;
//var y = Math.random() * innerHeight;
//var dx = Math.random() - 0.5;
//var dy = Math.random() - 0.5;
//var radius = 5;

var asteroidArray = [];

for (var i = 0; i < 500; i++) {

	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 1;
	var dy = (Math.random() - 0.5) * 1;
	var radius = 1;

	asteroidArray.push(new Asteroid(x, y, dx, dy, radius));
	var circle = new Asteroid(200, 200, 3, 3);
}

console.log(asteroidArray);

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.beginPath();
		
	c.arc(innerWidth / 2, innerHeight / 2, realm.click_object_solar_mass, 0, Math.PI * 2, false);
	c.strokeStyle = 'white';
	c.stroke();
	c.fillStyle = 'white';
	c.fill();
	
	for (var i = 0; i < asteroidArray.length; i++){
		asteroidArray[i].update();
	}

}

animate();


