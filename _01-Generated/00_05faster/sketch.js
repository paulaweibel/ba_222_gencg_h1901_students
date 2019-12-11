// Global var
let direction;
let stepSize, rideDuration, startTime, t;
let objects;
let particleCount;
let thickness;
let n;
let x;
let xoff=0;

// Global var
let graphics, app;
let capturer, fps;

function setup() {
  p5.disableFriendlyErrors = true; // disables FES
  particleCount = 100;
  initParticles();
  createCanvas(windowWidth, windowHeight);
  startTime = new Date();

  // capturer.start();
}

function draw() {
background(0,10)
console.log(stepSize)
  rideDuration = getRideDuration(toInt(key));
  x=0;



  let t = (new Date() - startTime) / 1000;
  stepSize = animate(t, 0, 2, rideDuration, 2.5)

    if(direction == "up"){
      x=stepSize*-200;
    }
    if(direction == "down"){
        x=stepSize*200;
    }
 //noise
xoff = xoff + 0.01;
n = noise(xoff) * 255;


  //Useful Parameters
  particleStepMax = 10 + stepSize*2;
  thickness = 2 + stepSize*10;

    noFill()
    stroke(250,180-n,0,100)
    strokeWeight(5)

    // stroke(n,0+(stepSize*0),0+(stepSize*200));
    // strokeWeight(thickness+(stepSize*20));

//console.log("particleCount = "+ particleCount);
//console.log("rideDuration = "+ rideDuration);

stepSize = (direction === 'up') ? +stepSize : -stepSize;

  particles.forEach(p => {
    p.move();
    p.draw();
  });
}



function Particle() {
  this.pos = createVector(random(windowWidth), random(windowHeight));
  this.tail = [];
  this.tailLength = 5;
}

Particle.prototype.move = function() {
  if(this.tail.length > this.tailLength) {
    this.tail.splice(0, 1);
  }
  this.tail.push(this.pos.copy());

  this.pos.x += random(-particleStepMax, particleStepMax);
  this.pos.y += random(-particleStepMax, particleStepMax);
}

Particle.prototype.draw = function() {
  this.tail.forEach(pos => {
    line(this.pos.x, this.pos.y+x, pos.x, pos.y+x);
  });
}


function keyPressed() {
  if (keyCode === 32) setup() // 32 = Space
  if (keyCode === 38) direction = 'up' // 38 = ArrowUp
  if (keyCode === 40) direction = 'down' // 40 = ArrowDown
  if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
  //
  if (key === 's' || key === 'S') saveThumb(650, 350);
//  console.log(getRideDuration(toInt(key)))
}

function initParticles() {
  particles = [];
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  //initParticles();
  background(0);
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}
