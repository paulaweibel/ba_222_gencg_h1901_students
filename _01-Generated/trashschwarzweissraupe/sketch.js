// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var b = 255, p = false;
var z = 0;
let xoff = 0.0;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
 // canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();

  pixelDensity(density);
  // Colors and drawing modes
  background(200);
  smooth();
   // Canvas full page
  createCanvas(windowWidth, windowHeight);
  // Default screen density (for retina)
  pixelDensity(density);
  // Var init
  background(0);
  position = createVector(0, 0);
  velocity = createVector(2, 4);
  smooth();
  position.x=width/2;
  position.y=height/2;
  // Init Var
}

function draw() {
  // background(0,50)
  smooth();
  noFill();
  stroke(0.1)
  // position.x=width/2;
  // position.y=height/2;

  position.add(velocity);



  //noise
  xoff = xoff + 0.05;
  let n = noise(xoff) * width/10;
  //line(n, 0, n, height);

  //  Check for bouncing
  if ((position.x > width-(width/10)) || (position.x < (width/10))) {
    velocity.x = velocity.x * -1;
  }
  if ((position.y > height-(height/10)) || (position.y < (height/10))) {
    velocity.y = velocity.y * -1;
  }
  // Display at x,y location
  strokeWeight(1+(n/70));
  stroke(0+n,50)

  strokeWeight(10);
  stroke(20,200)
  ellipse(position.x,position.y,100-n,100-n);
  fill(20,0,0);
  noFill()
  strokeWeight(2);
  stroke(250)
  //rect(position.x-(120-n)/2,position.y-(120-n)/2,120-n,120-n);
  ellipse(position.x,position.y,102-n,102-n);


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
