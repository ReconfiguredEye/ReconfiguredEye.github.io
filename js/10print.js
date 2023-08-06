let spacing = 20; // Define the spacing between lines

function setup() {
  createCanvas(windowWidth, windowHeight); // Make the canvas fill the browser window
  background(12); // Set a light gray background
  stroke(22, 20, 8); // Set the line color to a darker gray
  strokeWeight(3); // Set the line thickness
  noLoop(); // Run the drawing once without looping
}

function draw() {
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      push(); // Save the current drawing style
      translate(x, y); // Move to the current grid position
      let choice = floor(random(2)); // Randomly pick 0 or 1
      if (choice === 0) {
        line(0, 0, spacing, spacing); // Draw a "\"
      } else {
        line(spacing, 0, 0, spacing); // Draw a "/"
      }
      pop(); // Restore the drawing style
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(12);
  draw();
}
