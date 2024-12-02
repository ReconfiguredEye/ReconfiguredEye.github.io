let depth = 100; // Number of octagons to create
let scrollPos = 0; // Variable to keep track of the scroll position
let scrollSpeed = 0.2; // Speed at which we travel down the hallway
let sectionSpacing = 400; // Base space between sections (octagons)
let octagonVertices = []; // Store vertices of octagons
let segmentColors = []; // Store colors of segments

function setup() {
  createCanvas(1200, 720);
  noFill();
  angleMode(DEGREES); // Use degrees for easier angle calculations
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB with hue from 0-360, saturation and brightness from 0-100

  // Initialize segmentColors array
  for (let i = 0; i < depth - 1; i++) {
    let layerColors = [];
    for (let j = 0; j < 8; j++) {
      layerColors.push(color(random(150, 200), random(10, 20), random(75,90))); // Use HSB color mode
    }
    segmentColors.push(layerColors);
  }
}

function draw() {
  background(200, 50, 50);
  
  // Set the initial size of the first octagon
  let size = min(width, height) * 0.8;
  
  // Translate to the center of the canvas
  translate(width / 2, height / 2);

  // Clear previous vertices
  octagonVertices = [];
  
  // Draw the octagons and store their vertices
  for (let i = 0; i < depth; i++) {
    // Calculate dynamic spacing
    let distanceFactor = pow(0.2, i + scrollPos / sectionSpacing); // Adjust the factor to get desired effect
    let dynamicSpacing = sectionSpacing * distanceFactor;
    let currentSize = size * distanceFactor;
    
    if (currentSize > 0) {
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

  // Draw four-sided shapes with persistent random colors connecting corresponding vertices
  for (let i = 0; i < octagonVertices.length - 1; i++) {
    for (let j = 0; j < 8; j++) {
      push();
      let v1 = octagonVertices[i][j];
      let v2 = octagonVertices[i + 1][j];
      let v3 = octagonVertices[i + 1][(j + 1) % 8];
      let v4 = octagonVertices[i][(j + 1) % 8];

      rotate(22.5);
      
      fill(segmentColors[i][j]); // Use the stored color for the segment
      beginShape();
      vertex(v1.x, v1.y);
      vertex(v2.x, v2.y);
      vertex(v3.x, v3.y);
      vertex(v4.x, v4.y);
      endShape(CLOSE);
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
