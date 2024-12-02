let blockStates = [];
let rows = 6;
let cols = 16;
let blockWidth = 16;
let blockHeight = 86;
let gap = 10;
let aspectRatio = 16 / 10;
let noiseGen;
let filter;
let isSoundPlaying = true; // Variable to track the sound state

function setup() {
  let canvasWidth = windowWidth;
  let canvasHeight = canvasWidth / aspectRatio;
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  colorMode(HSB);
  initBlockStates();
  setInterval(updateBlockStates, 3000); // Update block states every 3 seconds
  noLoop();

  // Initialize noise generator
  noiseGen = new p5.Noise('white');
  noiseGen.amp(0.03); // Set amplitude (volume) of noise
  noiseGen.start();

  // Initialize filter
  filter = new p5.LowPass();
  noiseGen.disconnect();
  noiseGen.connect(filter);
  filter.freq(3200); // Set filter frequency
  filter.res(15); // Set filter resonance
}

function draw() {
  smooth();
  background(0, 0, 5); // Dull back wall color in HSB
  // Set perspective
  let fov = PI / 3;
  let cameraZ = (height / 2.0) / tan(fov / 2.0);
  perspective(fov, width / height, cameraZ / 10.0, cameraZ * 10.0);

  // Draw the back wall with segmented groups
  drawSegmentedBackWall();

  // Draw the floor and ceiling
  drawFloorAndCeiling();
}

function mousePressed() {
  if (isSoundPlaying) {
    noiseGen.stop();
  } else {
    noiseGen.start();
  }
  isSoundPlaying = !isSoundPlaying;
}

function windowResized() {
  let canvasWidth = windowWidth;
  let canvasHeight = canvasWidth / aspectRatio;
  resizeCanvas(canvasWidth, canvasHeight);
}

function initBlockStates() {
  for (let i = 0; i < rows; i++) {
    blockStates[i] = [];
    for (let j = 0; j < cols * 4; j++) {
      blockStates[i][j] = random() > 0.25 ? true : false;
    }
  }
}

function updateBlockStates() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols * 4; j++) {
      if (random() > 0.99) { // Randomly change a few blocks
        blockStates[i][j] = !blockStates[i][j];
      }
    }
  }
  redraw(); // Redraw the canvas with the updated block states
}

function drawSegmentedBackWall() {
  let segmentWidth = cols * (blockWidth + gap) - gap;
  let wallHeight = rows * (blockHeight + gap) - gap;
  let doorRadius = 275; // Adjusted to match the door size
  let spacing = doorRadius + gap * 2; // Adjust spacing to avoid overlap with the door
  let innerSpacing = 60; // Reduced spacing between the segments on each side

  // Calculate horizontal and vertical alignment
  let centerX = 0;
  let centerY = -50; // move the door slightly above center

  // Left segments
  drawSegment(centerX - spacing - segmentWidth - innerSpacing / 2, centerY - wallHeight / 2, 0);
  drawSegment(centerX - spacing - segmentWidth * 2 - innerSpacing * 1.5, centerY - wallHeight / 2, 1);

  // Right segments
  drawSegment(centerX + spacing + innerSpacing / 2, centerY - wallHeight / 2, 2);
  drawSegment(centerX + spacing + segmentWidth + innerSpacing * 1.5, centerY - wallHeight / 2, 3);

  // Draw the circular door
  drawCircularDoor(centerX, centerY);
}

function drawSegment(startX, startY, segmentIndex) {
  
  push();
  translate(startX, startY, -400);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (blockStates[i][j + segmentIndex * cols]) {
        fill(0, 100, 100); // Bright red for "on" lights
      } else {
        fill(0, 100, 20); // Dull red for "off" lights
      }
      rect(j * (blockWidth + gap), i * (blockHeight + gap), blockWidth, blockHeight);
    }
    // Draw the small dots between the rows
    if (i < rows - 1) {
      for (let j = 0; j < cols; j++) {
        fill(0, 100, 70);
        ellipse(j * (blockWidth + gap) + blockWidth / 2, (i + 1) * (blockHeight + gap) - gap / 2, 5, 5);
      }
    }
  }
  pop();
}

function drawCircularDoor(centerX, centerY) {
  console.time('drawCircularDoor'); // Start the timer

  let doorRadius = 275;
  let doorZ = -400;
  let detail = 100; // Number of vertices for the circle

  push();
  translate(centerX, centerY, doorZ);
  noStroke(); // Remove outlines to make the circles smoother
  smooth(); // Enable anti-aliasing for smoother edges

  // Function to draw a high-detail ellipse
  function highDetailEllipse(radius, fillColor) {
    fill(fillColor);
    beginShape();
    for (let i = 0; i < detail; i++) {
      let angle = TWO_PI / detail * i;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  highDetailEllipse(doorRadius, color(0, 0, 100)); // White color in HSB
  highDetailEllipse(doorRadius * 0.95, color(0, 0, 10)); // Dull inner circle
  highDetailEllipse(doorRadius * 0.925, color(0, 0, 100)); // Bright inner circle
  highDetailEllipse(doorRadius * 0.9, color(0, 0, 75)); // Dull inner circle
  highDetailEllipse(doorRadius * 0.875, color(0, 0, 100)); // Bright inner circle

  pop();
  console.timeEnd('drawCircularDoor'); // End the timer and log the elapsed time
}

function drawFloorAndCeiling() {
  let cols = 120; // Number of columns for floor and ceiling
  let rows = 30; // Number of rows for floor and ceiling
  let blockWidth = 15;
  let blockHeight = 25;
  let gap = 8;
  let floorY = 300; // Adjust vertical position of the floor
  let ceilingY = -400; // Adjust vertical position of the ceiling
  let z = -1; // Distance to floor and ceiling

  // Draw floor with center beam and perpendicular beams
  drawPlane(0, floorY, z, cols, rows, blockWidth, blockHeight, gap, true);

  // Draw ceiling with center beam and perpendicular beams
  drawPlane(0, ceilingY, z, cols, rows, blockWidth, blockHeight, gap, false);

  drawPlaneWithBeams(0, floorY - 2, z, cols, rows, blockWidth, blockHeight, gap, true);
  drawPlaneWithBeams(0, ceilingY + 4, z, cols, rows, blockWidth, blockHeight, gap, false);
}

function drawPlane(x, y, z, cols, rows, blockWidth, blockHeight, gap, isFloor) {
  push();
  translate(x, y, z);
  rotateX(PI / 2); // Rotate to lay the plane horizontally

  let cornerRadius = 5;

  // Draw main grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      fill(0, 100, 50); // Static color for floor and ceiling blocks in HSB
      rect(j * (blockWidth + gap) - (cols * (blockWidth + gap)) / 2, i * (blockHeight + gap) - (rows * (blockHeight + gap)) / 2, blockWidth, blockHeight, cornerRadius);
    }
  }
  pop();
}

function drawPlaneWithBeams(x, y, z, cols, rows, blockWidth, blockHeight, gap, isFloor) {
  push();
  translate(x, y, z);
  rotateX(PI / 2); // Rotate to lay the plane horizontally

  // Draw center beam
  fill(0, 0, 5);
  let beamWidth = 150;
  rect(-beamWidth / 2, -rows * (blockHeight + gap) / 2, beamWidth, rows * (blockHeight + gap)); //center beam
  rect(-beamWidth/2  + 840, -rows * (blockHeight + gap) / 2, beamWidth, rows * (blockHeight + gap)); //right beam
  rect(-beamWidth/2 - 840, -rows * (blockHeight + gap) / 2, beamWidth, rows * (blockHeight + gap)); //left beam

  // Draw perpendicular beams
  let beamSpacing = 200; // Adjust beam spacing as needed
  let run = windowWidth;
  for (let i = -1; i <= 2; i++) {
    noStroke();
    fill(0, 0, 5);
    rect(-rows * (blockHeight + gap) / 2 - run / 2, i * beamSpacing - 200, rows * (blockHeight + gap) + run, blockWidth + 20);
  }
  pop();
}
