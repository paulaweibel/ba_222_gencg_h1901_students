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
  background(20);
  position = createVector(0, 0);
  velocity = createVector(0.5, 1);
  smooth();
  // Init Var
}

function draw() {
  background(0,1)
  smooth();
  noFill();
  stroke(0.1)

  //ellipse(width/2+z,height/2-z,20)

  if(z<height/2){
  z = z + 10;}
  if(z>height/2){
    z=z-2}

  noStroke();
  fill(0);
 // rect(0,0,width,height);

  // Add the current speed to the location.
  position.add(velocity);

    // Check for bouncing
  if ((position.x > width) || (position.x < 0)) {
    velocity.x = velocity.x * -1;
  }
  if ((position.y > height) || (position.y < 0)) {
    velocity.y = velocity.y * -1;
  }

  //noise
  xoff = xoff + 0.01;
  let n = noise(xoff) * width;
  //line(n, 0, n, height);

  // Display at x,y location
  strokeWeight(1+(n/70));
  stroke(0+n,50)
  fill(0,1)

  ellipse(position.x,position.y,100-n,100-n);  ellipse(position.x/1.6,position.y,100-n,100-n);
  ellipse(position.x/10,position.y,100-n,100-n);
  noFill();
  strokeWeight(1);
  stroke(0)
  //rect(position.x-(120-n)/2,position.y-(120-n)/2,120-n,120-n);
  ellipse(position.x,position.y,150-n,150-n);


}



// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
