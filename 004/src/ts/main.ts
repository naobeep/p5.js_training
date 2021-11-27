import p5 from 'p5';
const bubbles = [];
const count = 100;

const sketch = (p: p5) => {
  const size = 100;
  let deg = 0;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode('hsb');
    p.angleMode(p.DEGREES);
    for (let i = 0; i < count; i++) {
      bubbles.push(new Bubble());
    }
  };

  const vecLocation = p.createVector(p.random(p.width), p.random(p.height));
  p.draw = () => {
    p.noStroke();
    p.background(90);
    bubbles.forEach(bubble => {
      bubble.setup();
      bubble.render();
    });
  };

  class Bubble {
    x: number;
    y: number;
    size: number;
    flowSpeed: number;
    alpha: number;

    constructor() {
      this.x = p.random(p.width);
      this.size = p.random(1) * p.random(1) * 100;
      this.flowSpeed = this.size / 100;
      this.y = p.height + this.size;
      console.log(this.size);
      this.alpha = this.size / 100;
    }
    setup() {
      this.x += ((p.random(2) - 1) * this.size) / 300;
      if (this.y < 0) {
        this.y = p.height + this.size;
      } else {
        this.y -= this.flowSpeed;
      }
      p.fill(200, 100, 100, this.alpha);
    }
    render() {
      p.ellipse(this.x, this.y, this.size);
    }
  }
};

new p5(sketch);
