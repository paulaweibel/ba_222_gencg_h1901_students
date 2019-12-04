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
  position = createVector(width/2, height/2);
  velocity = createVector(2.5, 5);
  smooth();
  // Init Var
}

function draw() {
  background(0)
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
 //noise
 xoff = xoff + 0.01;
 let n = noise(xoff) * height;
 let ncolor = noise(xoff) * 255;

  // Add the current speed to the location.
  position.add(velocity);

    // Check for bouncing
  if ((position.x > width+(100-n)) || (position.x < 0-(100-n))) {
    velocity.x = velocity.x * -1;
  }
  if ((position.y > height+(100-n)) || (position.y < 0-(100-n))) {
    velocity.y = velocity.y * -1;
  }


  //line(n, 0, n, height);

  // Display at x,y location
  strokeWeight(1+(n/70));
  stroke(0+n,50)
  fill(100-ncolor,250-ncolor,300-ncolor,5)
  ellipse(position.x,position.y,100-n,100-n);
  fill(0,20);
  strokeWeight(2);
  stroke(0,0+ncolor)
  noStroke()
  //rect(position.x-(120-n)/2,position.y-(120-n)/2,120-n,120-n);
  ellipse(position.x,position.y,400-n,400-n);

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
