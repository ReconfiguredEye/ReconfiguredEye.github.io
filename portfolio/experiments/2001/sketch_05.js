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
    let rows = 8;
    let cols = 15; // Number of columns per segment
    let blockWidth = 15;
    let blockHeight = 40;
    let gap = 5;
    let segmentWidth = cols * (blockWidth + gap) - gap;
    let wallHeight = rows * (blockHeight + gap) - gap;
    let doorRadius = 175; // Adjusted to match the door size
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
    let doorRadius = 175;
    let doorZ = -400;
  
    push();
    translate(centerX, centerY, doorZ);
    fill(0, 0, 100); // White color in HSB
    ellipse(0, 0, doorRadius * 2, doorRadius * 2);
  
    // Draw inner parts of the door (to give a sense of depth and detail)
    fill(0, 0, 10); // Dull inner circle
    ellipse(0, 0, doorRadius * 1.8, doorRadius * 1.8);
    fill(0, 0, 100); // Bright inner circle
    ellipse(0, 0, doorRadius * 1.6, doorRadius * 1.6);
    //fill(0, 0, 10); // Dull inner circle
    //ellipse(0, 0, doorRadius * 1.4, doorRadius * 1.4);
    pop();
  }
  
  function drawFloorAndCeiling() {
    let cols = 30; // Number of columns for floor and ceiling
    let rows = 8; // Number of rows for floor and ceiling
    let blockWidth = 40;
    let blockHeight = 15;
    let gap = 5;
    let floorY = 200; // Adjust vertical position of the floor
    let ceilingY = -200; // Adjust vertical position of the ceiling
    let z = -500; // Distance to floor and ceiling
    
    // Draw floor
    drawPlane(0, floorY, z, cols, rows, blockWidth, blockHeight, gap, true);
    
    // Draw ceiling
    drawPlane(0, ceilingY, z, cols, rows, blockWidth, blockHeight, gap, false);
  }
  
  function drawPlane(x, y, z, cols, rows, blockWidth, blockHeight, gap, isFloor) {
    push();
    translate(x, y, z);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        fill(0, 100, 50); // Static color for floor and ceiling blocks
        if (isFloor) {
          rect(j * (blockWidth + gap), i * (blockHeight + gap), blockWidth, blockHeight);
        } else {
          rect(j * (blockWidth + gap), -i * (blockHeight + gap), blockWidth, blockHeight);
        }
      }
    }
    pop();
  }
  