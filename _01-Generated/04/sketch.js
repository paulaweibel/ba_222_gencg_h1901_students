// Global var
let direction;
let stepSize, rideDuration, startTime, t;
let objects;
let particleCount;
let thickness;
let n;
let xoff=0;
let wid;
let proportion;

function setup() {
  cursor(HAND);
  p5.disableFriendlyErrors = true; // disables FES
  particleCount = 150;
  initParticles();
  createCanvas(windowWidth, windowHeight);
  startTime = new Date();
  background('#000c14');
  wid = windowHeight/200;

}

function draw() {
  proportion= 10*wid/rideDuration;

  // Time since the sketch started
  let t = (new Date() - startTime) / 1000;
  stepSize = animate(t, 0, 2, rideDuration, 2.5)



  //Useful Parameters
  particleStepMaxX = proportion;
  thickness = stepSize*wid;
  particleStepMaxY = proportion;
    // console.log(thickness)

  //noise
   xoff = xoff + 0.05;
   n = noise(xoff) * 100;

  if(direction=="up"){
    particleStepMaxY = proportion;
  }

  if(direction=="down"){
    particleStepMaxY = -proportion;
  }


// background(0,10)
    stroke('#f8002f11');
    stroke(250-thickness-n,0,300-n,10);
    console.log(n)
    fill(10,10,10,20);
    // noFill();
    strokeWeight(thickness);


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

  this.pos.x += random(particleStepMaxX, -particleStepMaxX);
  this.pos.y += random(particleStepMaxY);
}

Particle.prototype.draw = function() {
  this.tail.forEach(pos => {
    ellipse(this.pos.x, this.pos.y,1+(-stepSize*wid*3));
  });
}


function keyPressed() {
  if (keyCode === 32) init() // 32 = Space
  if (keyCode === 38) direction = 'up' // 38 = ArrowUp
  if (keyCode === 40) direction = 'down' // 40 = ArrowDown
  if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
  if (key === 's' || key === 'S') saveThumb(650, 350);
//  console.log(getRideDuration(toInt(key)))
}

function initParticles() {
  particles = [];
  for(var i = 0; i < particleCount; i++) {
  particles.push(new Particle());
  }
}

function init() {
  particles = [];
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  startTime = new Date();
  // background(0);
  stepSize = (direction === 'up') ? +stepSize : -stepSize;
  wid = windowHeight/100;
  console.log(stepSize)
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
