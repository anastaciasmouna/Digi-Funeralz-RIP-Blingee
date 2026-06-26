// Adapted from p5's radial gradient example
// https://editor.p5js.org/p5/sketches/Color:_Radial_Gradient
// or try in the wayback machine:
// https://p5js.org/examples/color-radial-gradient.html

let dim;
let c1;
let c2;
let c3;
let c4;

let nameInput;
let button;
let greeting;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);

  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("z-index", "0");
  canvas.style("pointer-events", "none");

  // Reduces work on high-resolution screens.
  pixelDensity(1);

  // 20 frames per second is plenty for this background.
  frameRate(20);

  dim = Math.max(width, height) * 2;

  noStroke();
  ellipseMode(RADIUS);

  c1 = color("white");
  c2 = color("blue");
  c3 = color(random(255), random(255), random(255));
  c4 = color(random(100), random(255), random(255));

  greeting = createElement("h2", "");
  greeting.position(160, 5);
  greeting.style("z-index", "20");

  nameInput = createInput();
  nameInput.position(785, 420);
  nameInput.style("z-index", "20");

  button = createButton("submit");
  button.position(670 + nameInput.width, 400);
  button.style("z-index", "20");

  button.mousePressed(greet);
  nameInput.changed(greet);

  function greet() {
    const fixedMessage = document.querySelector("h1");

    if (fixedMessage) {
      fixedMessage.remove();
    }

    const name = nameInput.value();

    greeting.html(`Hello, ${name}!`);
    nameInput.value("");
  }

  nameInput.changed(greet);
}

function draw() {
  background(0);

  const horizontalAmount = constrain(mouseX / width, 0, 1);
  const verticalAmount = constrain(mouseY / height, 0, 1);

  drawGradient(
    width / 2,
    height / 2,
    lerpColor(c1, c3, horizontalAmount),
    lerpColor(c2, c4, verticalAmount),
  );
}

function drawGradient(x, y, innerColour, outerColour) {
  const radius = dim / 2;

  // Previously this decreased by 1.
  // Decreasing by 12 draws about 12× fewer circles.
  for (let r = radius; r > 0; r -= 12) {
    const gradientColour = lerpColor(innerColour, outerColour, r / radius);

    fill(gradientColour);
    circle(x, y, r);
  }
}

function keyPressed() {
  c1 = color(random(255), random(255), random(255));
  c2 = color(random(255), random(255), random(255));
  c3 = color(random(255), random(255), random(255));
  c4 = color(random(255), random(255), random(255));
}

function greet() {
  const message = nameInput.value().trim();

  if (!message) {
    return;
  }

  saveMessage(message);

  const fixedMessage = document.querySelector("#h1");

  if (fixedMessage) {
    fixedMessage.remove();
  }

  greeting.html(`Hello, ${message}!`);
  nameInput.value("");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  dim = Math.max(width, height) * 2;
}
async function saveMessage(message) {
  try {
    const response = await fetch("/api/save-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Message was not saved");
    }
  } catch (error) {
    console.error(error);
  }
}
