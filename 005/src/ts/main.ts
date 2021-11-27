import p5 from 'p5';
const count = 100;
const movers = [];
let attractor;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode('hsb');
    for (let i = 0; i < count; i++) {
      movers.push(new Mover());
    }
    attractor = new Attractor();
  };

  p.draw = () => {
    p.noStroke();
    p.background(0);
    movers.forEach(mover => {
      const attraction = attractor.attract(mover);
      mover.applyForce(attraction);
      mover.update();
      mover.render();
    });

    // attractor.render();
  };

  class Mover {
    vecLocation: p5.Vector;
    vecVelocity: p5.Vector;
    accel: p5.Vector;
    size: number;
    color: number;
    alpha: number;
    mass: number;
    constructor() {
      this.vecLocation = p.createVector(p.random(p.width), p.random(p.height));
      this.vecVelocity = p.createVector(p.random(2) - 1, p.random(2) - 1);
      // this.vecVelocity = p.createVector(0, 0);
      this.size = p.random(10, 80);
      this.color = p.random(360);
      this.alpha = p.random(1);
      this.mass = this.size;
      // this.mass = 1;
      this.accel = p.createVector(0, 0);
    }
    update() {
      // p.fill(this.color, 100, 100, this.alpha);
      p.fill(this.color, 100, 100, 1);
      this.vecVelocity.add(this.accel);
      this.vecLocation.add(this.vecVelocity);
      // if (this.vecLocation.x > p.width || this.vecLocation.x < 0) {
      //   this.vecVelocity.x *= -1;
      // }
      // if (this.vecLocation.y > p.height || this.vecLocation.y < 0) {
      //   this.vecVelocity.y *= -1;
      // }
      this.accel.mult(0);
    }
    render() {
      p.ellipse(this.vecLocation.x, this.vecLocation.y, this.size);
    }
    applyForce(force) {
      let a = force.div(this.mass);
      this.accel.add(a)
    }
  }

  class Attractor {
    location: p5.Vector;
    mass: number;
    G: number;
    constructor() {
      this.location = p.createVector(p.width / 2, p.height / 2);
      this.mass = 10;
      this.G = 1;
    }
    attract(mover) {
      let attraction = p5.Vector.sub(this.location, mover.vecLocation);
      let distance = attraction.mag();
      distance = p.constrain(distance, 5, 30);
      attraction.normalize();
      // const power = (this.G * this.mass * mover.mass) / (distance * distance);
      const power = (this.G * this.mass * mover.mass * distance) / 1000;
      attraction.mult(power);
      return attraction;
    }
    render() {
      p.noStroke();
      p.fill(100, 100, 100, 1);
      p.ellipse(this.location.x, this.location.y, this.mass * 2);
    }
  }
};

new p5(sketch);
