import p5 from 'p5';
const count = 100;
const boxes = [];
let isFire = false;
const p = document.querySelector('p');
const pText = p.textContent.trim();
console.log(pText);
const pTextArr = pText.split('');
const pHTML = pTextArr.reduce((accu, curr, i) => {
  const char = curr == ' ' ? '&nbsp' : curr;
  return `${accu}<span class="char">${char}</span>`;
}, '');
// console.log(pHTML);
p.innerHTML = pHTML;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // p.createCanvas(600, 400);
    p.angleMode('degrees');
    // p.colorMode('hsb');
    for (let i = 0; i < count; i++) {
      boxes.push(new Direction());
    }
    const chars = p.selectAll('.char');
    console.log(chars);
  };

  p.draw = () => {
    p.background(204);
    boxes.forEach(box => {
      isFire && box.update();
      box.render();
    });

    // console.log(boxes);
  };

  p.mousePressed = () => {
    isFire = true;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  class Direction {
    location: p5.Vector;
    dLocation: p5.Vector;
    speed: number;
    accel: number;
    constructor() {
      this.location = p.createVector(p.random(p.width), p.random(p.height));
      this.dLocation = p.createVector(0, 0);
      this.speed = 1;
    }
    update() {
      const a = p.atan2(p.mouseY - this.location.y, p.mouseX - this.location.x);
      this.dLocation = p.createVector(
        p.cos(a) * -this.speed,
        p.sin(a) * -this.speed
      );
      this.location.add(this.dLocation);
    }
    render() {
      const a = p.atan2(p.mouseY - this.location.y, p.mouseX - this.location.x);
      p.push();
      p.translate(this.location.x, this.location.y);
      p.rotate(a);
      p.rect(-30, -5, 60, 10);
      p.pop();
      if (this.location.x < -100 || this.location.x > p.width + 100) {
        p.removeElements();
      }
      if (this.location.y < -100 || this.location.x > p.height + 100) {
        p.removeElements();
      }
    }
  }
};

new p5(sketch);
