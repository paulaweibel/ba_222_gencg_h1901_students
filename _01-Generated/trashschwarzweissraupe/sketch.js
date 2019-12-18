// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var b = 255, p = false;
var z = 0;
let xoff = 0.0;
let wid, wid2;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  var density = displayDensity();
  pixelDensity(density);
  smooth();
  background(0);
  position = createVector(0, 0);
  velocity = createVector(2, 4);
  wid = windowHeight/2; //size of outer ellipse 
  wid2 = windowHeight/2.1;//size of inner ellipse
  position.x=width/2;
  position.y=height/2;

  // Init Var
}

function draw() {
  smooth();
  noFill();
  stroke(0.1)
  position.add(velocity);

  //noise
  xoff = xoff + 0.05;
  let n = noise(xoff) * width/10;

  //  Check for bouncing
  if ((position.x > width-(width/10)) || (position.x < (width/10))) {
    velocity.x = velocity.x * -1;
  }
  if ((position.y > height-(height/10)) || (position.y < (height/10))) {
    velocity.y = velocity.y * -1;
  }
  // Display of ellipses
  //dark outer ellipse
  strokeWeight(10);
  stroke(20,50)
  ellipse(position.x,position.y,wid-n,wid-n);
  //bright inner ellipse
  fill(0,20);
  strokeWeight(2);
  stroke(250)
  ellipse(position.x,position.y,wid2-n,wid2-n);
}

function keyPressed() {
  if (keyCode === 32) setup() // 32 = Space
  if (keyCode === 38) direction = 'up' // 38 = ArrowUp
  if (keyCode === 40) direction = 'down' // 40 = ArrowDown
  if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
  if (key === 's' || key === 'S') saveThumb(650, 350);
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}

// Timestamp
function timestamp() {
  return Date.now();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
