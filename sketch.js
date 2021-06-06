let bubbles = [];
let h = 400;
let w = 400;



function setup() {
  createCanvas(h, w);
    for (let i = 0; i < 50; i++) {
    let r = random(10);
    let x = 200;
    let y = 200;
    let time = random(7);
    let vx = random(-3, 3);
    let vy = random(-3, 3);
    bubbles[i] = new Bubble(x,y,r,vx,vy,time);
    }
  print(bubbles[0])
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].move();
    bubbles[i].out();
  }
}


class Bubble {
  constructor(x, y, r, vx, vy, time) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.time = time;
  }
  
  show() {
        this.time = this.time - 0.1;
    if(this.time < 0) {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2)
    }
  }
  
  move() {
    this.time = this.time - 0.1;
    if(this.time < 0) {
    this.x += this.vx;
    this.y += this.vy;
    }
  }
  
  out() {
      if(this.x > w || this.y > h || this.x < 0 || this.y < 0) {
      this.x = 200;
      this.y = 200;
      this.vx = random(-3, 3);
      this.vy = random(-3, 3)
      this.r = random(10);
    }
  }
}