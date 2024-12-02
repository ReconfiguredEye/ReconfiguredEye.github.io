function setup() {
    createCanvas(1280, 720, WEBGL);
    colorMode(HSB);
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
  
  function drawSegmentedBackWall() {
    let rows = 6;
    let cols = 16; // Number of columns per segment
    let blockWidth = 18;
    let blockHeight = 70;
    let gap = 10;
    let segmentWidth = cols * (blockWidth + gap) - gap;
    let wallHeight = rows * (blockHeight + gap) - gap;
    let doorRadius = 250; // Adjusted to match the door size
    let spacing = doorRadius + gap * 2; // Adjust spacing to avoid overlap with the door
    let innerSpacing = 60; // Reduced spacing between the segments on each side
  
    // Calculate the center shift for horizontal and vertical alignment
    let centerX = 0;
    let centerY = -50; // Adjust this value to move the door slightly above center
  
    // Left segments
    drawSegment(centerX - spacing - segmentWidth - innerSpacing / 2, centerY - wallHeight / 2, rows, cols, blockWidth, blockHeight, gap);
    drawSegment(centerX - spacing - segmentWidth * 2 - innerSpacing * 1.5, centerY - wallHeight / 2, rows, cols, blockWidth, blockHeight, gap);
  
    // Right segments
    drawSegment(centerX + spacing + innerSpacing / 2, centerY - wallHeight / 2, rows, cols, blockWidth, blockHeight, gap);
    drawSegment(centerX + spacing + segmentWidth + innerSpacing * 1.5, centerY - wallHeight / 2, rows, cols, blockWidth, blockHeight, gap);
  
    // Draw the circular door
    drawCircularDoor(centerX, centerY);
  }
  
  function drawSegment(startX, startY, rows, cols, blockWidth, blockHeight, gap) {
    push();
    translate(startX, startY, -400);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (random() > 0.2) {
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
    let doorRadius = 225;
    let doorZ = -400;
  
    push();
    translate(centerX, centerY, doorZ);
    setGlow(color(100, 100, 100, 1)); // Set white glow for the door in HSB
    fill(0, 0, 100); // White color in HSB
    ellipse(0, 0, doorRadius * 2, doorRadius * 2);
  
    // Draw inner parts of the door (to give a sense of depth and detail)
    noGlow();
    fill(0, 0, 10); // Dull inner circle
    ellipse(0, 0, doorRadius * 1.8, doorRadius * 1.8);
    setGlow(color(0, 100, 100, 0.5)); // Set smaller white glow for the inner circle in HSB
    fill(0, 0, 100); // Bright inner circle
    ellipse(0, 0, doorRadius * 1.6, doorRadius * 1.6);
    noGlow();
    //fill(0, 0, 10); // Dull inner circle
    //ellipse(0, 0, doorRadius * 1.4, doorRadius * 1.4);
    pop();
  }
  
  function drawFloorAndCeiling() {
    let cols = 80; // Number of columns for floor and ceiling
    let rows = 20; // Number of rows for floor and ceiling
    let blockWidth = 30;
    let blockHeight = 50;
    let gap = 5;
    let floorY = 240; // Adjust vertical position of the floor
    let ceilingY = -340; // Adjust vertical position of the ceiling
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
  