import p5 from 'p5';
const count = 100;
const bugs = [];

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode('hsb');
    for (let i = 0; i < count; i++) {
      bugs.push(new Bug());
    }
  };

  p.draw = () => {
    p.noStroke();
    // p.background(0);
    bugs.forEach(bug => {
      bug.setup();
      bug.render();
    });
  };

  class Bug {
    vecLocation: { x: number; y: number };
    // speed: number;
    vecDirection: { x: number; y: number };
    size: number;
    color: number;
    alpha: number;
    constructor() {
      this.vecLocation = p.createVector(p.random(p.width), p.random(p.height));
      this.vecDirection = p.createVector(p.random(2) - 1, p.random(2) - 1);
      this.size = p.random(10, 80);
      this.color = p.random(360);
      this.alpha = p.random(1);
    }
    setup() {
      p.fill(this.color, 100, 100, this.alpha);
      this.vecLocation.x += this.vecDirection.x;
      this.vecLocation.y += this.vecDirection.y;

      if (this.vecLocation.x > p.width || this.vecLocation.x < 0) {
        this.vecDirection.x *= -1;
      }
      if (this.vecLocation.y > p.height || this.vecLocation.y < 0) {
        this.vecDirection.y *= -1;
      }
    }
    render() {
      p.ellipse(this.vecLocation.x, this.vecLocation.y, this.size);
    }
  }
};

new p5(sketch);
