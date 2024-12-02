let depth = 100; // Number of octagons to create
let scrollPos = 0; // Variable to keep track of the scroll position
let scrollSpeed = .2; // Speed at which we travel down the hallway
let sectionSpacing = 400; // Space between sections (octagons)
let octagonVertices = []; // Store vertices of octagons

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  angleMode(DEGREES); // Use degrees for easier angle calculations
}

function draw() {
  background(255);
  
  // Set the initial size of the first octagon
  let size = min(width, height)*0.5;
  
  // Translate to the center of the canvas
  translate(width / 2, height / 2);

  // Clear previous vertices
  octagonVertices = [];
  
  // Draw the octagons and store their vertices
  for (let i = 0; i < depth; i++) {
    let currentSize = size - i * sectionSpacing + scrollPos;
    
    if (currentSize > 0) {
      // Calculate the color based on the position

      stroke(100,100,100);
      
      // Rotate to ensure a flat side is at the top and bottom
      push();
      rotate(22.5); // Rotate by 22.5 degrees (45/2) to align flat sides
      
      let vertices = [];
      beginShape();
      for (let j = 0; j < 8; j++) {
        let angle = 360 / 8 * j;
        let x = cos(angle) * currentSize;
        let y = sin(angle) * currentSize;
        vertex(x, y);
        vertices.push(createVector(x, y));
      }
      endShape(CLOSE);
      octagonVertices.push(vertices);
      
      pop();
    }
  }

  // Draw lines connecting corresponding vertices
  for (let i = 0; i < octagonVertices.length - 1; i++) {
    for (let j = 0; j < 8; j++) {
      push();
      rotate(22.5);
      let v1 = octagonVertices[i][j];
      let v2 = octagonVertices[i + 1][j];
    
      stroke(100,100,100);
      line(v1.x, v1.y, v2.x, v2.y);
      pop();
    }
  }

  if (octagonVertices.length > 0) {
    let smallestOctagon = octagonVertices[octagonVertices.length - 1];
    for (let v of smallestOctagon) {
      push();
      rotate(22.5);
      stroke(0, 0, 0, 100);
      line(v.x, v.y, 0, 0);
      pop();
    }
  }
}

function mouseWheel(event) {
  // Adjust scroll position based on mouse wheel movement
  scrollPos += event.delta * scrollSpeed;
  // Prevent default scrolling behavior
  return false;
}
