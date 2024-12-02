function setup() {
    createCanvas(800, 600, WEBGL);
    colorMode(HSB);
    noLoop();
  }
  
  function draw() {
    background(0, 0, 10); // Dull back wall color in HSB
    // Set perspective
    let fov = PI / 3;
    let cameraZ = (height / 2.0) / tan(fov / 2.0);
    perspective(fov, width / height, cameraZ / 10.0, cameraZ * 10.0);
  
    // Draw the back wall
    drawBackWall();
  }
  
  function drawBackWall() {
    let rows = 10;
    let cols = 50;
    let blockWidth = 15;
    let blockHeight = 30;
    let gap = 5;
    let wallWidth = cols * (blockWidth + gap) - gap;
    let wallHeight = rows * (blockHeight + gap) - gap;
  
    push();
    translate(-wallWidth / 2, -wallHeight / 2, -400);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (random() > 0.5) {
          fill(0, 100, 100); // Bright red for "on" lights
        } else {
          fill(0, 100, 20); // Dull red for "off" lights
        }
        rect(j * (blockWidth + gap), i * (blockHeight + gap), blockWidth, blockHeight);
      }
    }
    pop();
  
    // Draw the circular door
    drawCircularDoor(wallWidth, wallHeight);
  }
  
  function drawCircularDoor(wallWidth, wallHeight) {
    let doorRadius = 100;
    let doorX = 0;
    let doorY = 0;
    let doorZ = -400;
  
    push();
    translate(doorX, doorY, doorZ);
    fill(0, 0, 100); // White color in HSB
    ellipse(0, 0, doorRadius * 2, doorRadius * 2);
  
    // Draw inner parts of the door (to give a sense of depth and detail)
    fill(0, 0, 10); // Dull inner circle
    ellipse(0, 0, doorRadius * 1.8, doorRadius * 1.8);
    fill(0, 0, 100); // Bright inner circle
    ellipse(0, 0, doorRadius * 1.6, doorRadius * 1.6);
    fill(0, 0, 10); // Dull inner circle
    ellipse(0, 0, doorRadius * 1.4, doorRadius * 1.4);
    pop();
  }
  