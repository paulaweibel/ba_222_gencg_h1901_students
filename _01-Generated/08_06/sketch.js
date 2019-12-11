// https://peterbeshai.com/blog/2018-10-28-p5js-ccapture/
// https://github.com/spite/ccapture.js

// Global var
// Global var
let direction;
let stepSize, rideDuration, startTime, t;
let objects;
let particleCount;
let thickness;
let n;
let x;
let xoff=0;
let graphics, app;
let capturer, fps;

function setup() {
  //
  background(0);
  particleCount = 50;
  initParticles();
  var density = displayDensity();
  pixelDensity(density);
  createCanvas(6480 / density, 3840 / density);

  // Capture settings
  fps = 60;
  capturer = new CCapture({ format: 'png', framerate: fps });

  // this is optional, but lets us see how the animation will look in browser.
  frameRate(fps);

  // start the recording
  capturer.start();

  // Init Var
  objects = [...Array(1000)].map(e => [random(width), random(height)]);
  startTime = millis();
  rideDuration = getRideDuration(2);

}

function draw() {
  background(0,100);

  // duration in milliseconds
  var duration = 5;
  var t = (millis() - startTime)/1000;

  // if we have passed t=duration then end the animation.
  if (t > duration) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }

  // Draw something here
  x=0;

  stepSize = animate(t, 0, 2, rideDuration, 2.5)

  if(direction == "up"){
    x=stepSize*-200;
  }
  if(direction == "down"){
      x=stepSize*200;
  }
  xoff = xoff + 0.01;
  n = noise(xoff) * 255;


  //Useful Parameters
  particleStepMax = 10 + stepSize*2;
  thickness = 2 + stepSize*10+x;

  stroke(250-(stepSize*20),180-(stepSize*50),0,20)
  strokeWeight(2+(stepSize*7))
  console.log(x)

  stepSize = (direction === 'up') ? +stepSize : -stepSize;

  particles.forEach(p => {
    p.move();
    p.draw();
  });
  // end drawing code

  // handle saving the frame
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));

}

function initParticles() {
  particles = [];
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function Particle() {
  this.pos = createVector(random(6480), random(3840));
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

  if (keyCode === 32) setup(); // 32 = Space
  if (keyCode === 38) direction = 'up'; // 38 = ArrowUp
  if (keyCode === 40) direction = 'down'; // 40 = ArrowDown
  if (key == 's' || key == 'S') saveThumb(650, 350);

}

// Tools
// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

function map(x, a, b, c, d) {
  return (x - a) / (b - a) * (d - c) + c
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}
