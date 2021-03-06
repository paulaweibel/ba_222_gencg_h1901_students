function setup() {
  particleStepMax = 50;
  initParticles();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,150);
  stroke(250,180,0,20)
  strokeWeight(2)
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
    line(this.pos.x, this.pos.y, pos.x, pos.y);
  });
}




function initParticles() {
  particles = [];
  for(var i = 0; i < 1000; i++) {
    particles.push(new Particle());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  //initParticles();
  background(255);
}


// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}
