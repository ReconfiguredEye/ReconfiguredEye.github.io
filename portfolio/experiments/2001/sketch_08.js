let blockStates = [];
let rows = 6;
let cols = 16;
let blockWidth = 16;
let blockHeight = 86;
let gap = 10;

function setup() {
  createCanvas(1280, 720, WEBGL);
  colorMode(HSB);
  initBlockStates();
  setInterval(updateBlockStates, 3000); // Update block states every 3 seconds
  noLoop();
}

function draw() {
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
        setGlow(color(0, 100, 100, 0.5)); // Set red glow for "on" lights in HSB
        fill(0, 100, 100); // Bright red for "on" lights
      } else {
        noGlow();
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
  let doorRadius = 275;
  let doorZ = -400;

  push();
  translate(centerX, centerY, doorZ);
  setGlow(color(100, 100, 100, .5)); // Set white glow for the door in HSB
  fill(0, 0, 100); // White color in HSB
  ellipse(0, 0, doorRadius * 2, doorRadius * 2);

  // Draw inner parts of the door (to give a sense of depth and detail)
  //noGlow();
  //fill(0, 0, 10); // Dull inner circle
  fill(0, 100, 50);
  ellipse(0, 0, doorRadius * 1.9, doorRadius * 1.9);
  setGlow(color(0, 100, 100, 0.5)); // Set smaller white glow for the inner circle in HSB
  fill(0, 0, 100); // Bright inner circle
  ellipse(0, 0, doorRadius * 1.85, doorRadius * 1.85);
  //noGlow();
  fill(0, 0, 75); // Dull inner circle
  ellipse(0, 0, doorRadius * 1.8, doorRadius * 1.8);
  fill(0, 0, 100); // Bright inner circle
  ellipse(0, 0, doorRadius * 1.75, doorRadius * 1.75);
  pop();
}

function drawFloorAndCeiling() {
  let cols = 80; // Number of columns for floor and ceiling
  let rows = 20; // Number of rows for floor and ceiling
  let blockWidth = 30;
  let blockHeight = 50;
  let gap = 5;
  let floorY = 300; // Adjust vertical position of the floor
  let ceilingY = -400; // Adjust vertical position of the ceiling
  let z = -1; // Distance to floor and ceiling

  // Draw floor
  drawPlane(0, floorY, z, cols, rows, blockWidth, blockHeight, gap, true);

  // Draw ceiling
  drawPlane(0, ceilingY, z, cols, rows, blockWidth, blockHeight, gap, false);
}

function drawPlane(x, y, z, cols, rows, blockWidth, blockHeight, gap, isFloor) {
  push();
  translate(x, y, z);
  rotateX(PI / 2); // Rotate to lay the plane horizontally
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      fill(0, 100, 50); // Static color for floor and ceiling blocks in HSB
      rect(j * (blockWidth + gap) - (cols * (blockWidth + gap)) / 2, i * (blockHeight + gap) - (rows * (blockHeight + gap)) / 2, blockWidth, blockHeight);
    }
  }
  pop();
}

function setGlow(glowColor) {
  drawingContext.shadowBlur = 200;
  drawingContext.shadowColor = glowColor;
}

function noGlow() {
  drawingContext.shadowBlur = 0;
}
