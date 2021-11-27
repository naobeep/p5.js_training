const count = 100,
  num = 10,
  bugs = [];

function setup() {
  const container = createCanvas(windowWidth, 400);
  container.parent('container');
  colorMode(HSB);
  frameRate(1);
  for (let i = 0; i < count; i++) {
    bugs.push(new Bug());
  }
}

function draw() {
  noStroke();
  background(0);
  // fill(random(360), random(100), 100, random(1));
  // ellipse(random(width), random(height), random(100));
  bugs.forEach(bug => {
    bug.render();
  });
}

class Bug {
  constructor() {
    this.vecLocation = createVector(random(width), random(height));
    this.diameter = random(10, 50);
    this.color = random(10, 360);
    this.saturation = random(100);
    this.brightness = random(100);
    this.alpha = random(0, 1);
    this.vecVelocity = createVector(0, 0);
    this.speed = 1;
  }
  update() {}
  render() {
    fill(this.color, this.saturation, 100, this.alpha);
    ellipse(this.vecLocation.x, this.vecLocation.y, this.diameter);
  }

  checkEdges() {
    if (this.vecLocation.x > width || this.vecLocation.x < 0) {
      this.vecVelocity.x *= -1;
    }
    if (this.vecLocation.y > height || this.vecLocation.y < 0) {
      this.vecVelocity.y *= -1;
    }
  }
}
