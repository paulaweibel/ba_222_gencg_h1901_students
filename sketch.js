// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var b = 255, p = false;
var z = 0;
let xoff = 0.0;
let wid; // size of outer ellipse
let wid2; // size of inner ellipse

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
canvas.parent("p5Container");
  var density = displayDensity();
  pixelDensity(density);
  smooth();
   // Canvas full page
  createCanvas(windowWidth, windowHeight);
  // Default screen density (for retina)
  pixelDensity(density);
  // Var init
  position = createVector(0,0);
  velocity = createVector(2, 4);
  wid = windowHeight; // size of outer ellipse
  wid2 = windowHeight/1.5;  // size of inner ellipse
  position.x=width/2;
  position.y=height/2;
  background(100);
  console.log("function setup works")
}

function draw() {
  smooth();
  noFill();
  stroke(0.1)
  position.add(velocity);

  //noise (for the changing size of ellipse)
  xoff = xoff + 0.01;
  let n = noise(xoff) * 1000;

  //  Check for bouncing
  if ((position.x > width-(width/10)) || (position.x < (width/10))) {
    velocity.x = velocity.x * -1;
  }
  if ((position.y > height-(height/10)) || (position.y < (height/10))) {
    velocity.y = velocity.y * -1;
  }

// size, stroke and colour of ellipses:
  strokeWeight(5);
  stroke(0,0,0,200)
  ellipse(position.x,position.y,wid-n,wid-n);
  strokeWeight(1);
  stroke(300-(n/3),300-(n/2),300-(n/5))
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
