import p5 from 'p5';

const sketch = (p: p5) => {
  const boxSpread = (
    xNumber: number,
    yNumber: number,
    boxSize: number,
    margin: number
  ) => {
    // const calc = (source: number) => {
    //   return source * boxSize + (source - 1) * margin;
    // };
    const calc = (increment: number, source: number) => {
      return (
        (boxSize + margin) * increment -
        (source * boxSize + (source - 1) * margin) / 2
      );
    };

    for (let i = 0; i < xNumber; i++) {
      for (let j = 0; j < yNumber; j++) {
        p.push();
        p.translate(calc(i, xNumber), calc(j, yNumber));
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.box(boxSize);
        p.pop();
      }
    }
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, 'webgl');
    p.colorMode('hsb');
    // p.noStroke()
  };

  p.draw = () => {
    p.background(255);
    p.fill(30, 100, 100, 1);
    boxSpread(5, 5, 50, 10);
    p.orbitControl();
  };
};

new p5(sketch);
