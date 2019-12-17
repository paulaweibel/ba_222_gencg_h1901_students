// Global var
let direction;
let stepSize, rideDuration, startTime, t;
let objects;
let particleCount;
let thickness;


function setup() {
  background(0);
  p5.disableFriendlyErrors = true; // disables FES
  particleCount = 100; //how many particles
  initParticles(); //start
  createCanvas(windowWidth, windowHeight);
  startTime = new Date();
  wid = windowHeight / 50; //size of particles
  rideDuration = getRideDuration(toInt(key))
}

function draw() {
  // Time since the sketch started
  let t = (new Date() - startTime) / 1000;
  stepSize = animate(t, 0, 2, rideDuration, 2.5)
  //Useful Parameters
  particleStepMax = 2; //moving of particles
  thickness = wid + stepSize * wid; //thickness of particles
  //ellipsendarstellung
  background(0);
  fill(0, 50)
  stroke(250 + (stepSize * 200), 180 + (stepSize * 200), 0, 50);
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
  this.tailLength = 1;
}
Particle.prototype.move = function() {
  if (this.tail.length > this.tailLength) {
    this.tail.splice(0, 1);
  }
  this.tail.push(this.pos.copy());
  this.pos.x += random(-particleStepMax, particleStepMax);
  this.pos.y += random(-particleStepMax, particleStepMax);
}
Particle.prototype.draw = function() {
  this.tail.forEach(pos => {
    ellipse(this.pos.x, this.pos.y, windowHeight / 6);
  });
}

function keyPressed() {
  if (keyCode === 32) init() // 32 = Space
  if (keyCode === 38) direction = 'up' // 38 = ArrowUp
  if (keyCode === 40) direction = 'down' // 40 = ArrowDown
  if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
  if (key === 's' || key === 'S') saveThumb(650, 350);
}

function initParticles() {
  particles = [];
  for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
    startTime = new Date();
  }
}

function init() {
  particles = [];
  for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  startTime = new Date();
  stepSize = (direction === 'up') ? +stepSize : -stepSize;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
