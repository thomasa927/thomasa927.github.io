let radius, r;
let ballCount = 40;
let maxSpeed;
let sc;
let xPos = [], yPos = [], velX = [], velY = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  sc = min(width / 2560, height / 1440);
  radius = 150 * sc;
  maxSpeed = 7 * sc;
  r = radius / 2;
  for (let i = 0; i < ballCount; i++) {
    xPos.push(random(r, width - r));
    yPos.push(random(r, height - r));
    velX.push(random(-maxSpeed, maxSpeed));
    velY.push(random(-maxSpeed, maxSpeed));
  }
}

function draw() {
  for (let y = 0; y < height; y++) {
    let t = y / height;
    let c = lerpColor(color("rgb(12,12,79)"), color("rgb(29,135,169)"), t);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
  for (let i = 0; i < ballCount; i++) {
    for (let j = i + 1; j < ballCount; j++) {
      let dx = xPos[j] - xPos[i];
      let dy = yPos[j] - yPos[i];
      let d = sqrt(dx * dx + dy * dy);
      if (d < radius && d > 0) {
        let overlap = radius - d;
        let nx = dx / d;
        let ny = dy / d;
        xPos[i] -= (nx * overlap) / 2;
        yPos[i] -= (ny * overlap) / 2;
        xPos[j] += (nx * overlap) / 2;
        yPos[j] += (ny * overlap) / 2;
        let dvx = velX[i] - velX[j];
        let dvy = velY[i] - velY[j];
        let dotProd = dvx * nx + dvy * ny;
        if (dotProd > 0) {
          velX[i] -= dotProd * nx;
          velY[i] -= dotProd * ny;
          velX[j] += dotProd * nx;
          velY[j] += dotProd * ny;
        }
      }
    }
  }
  for (let i = 0; i < ballCount; i++) {
    xPos[i] += velX[i];
    yPos[i] += velY[i];
    if (xPos[i] > width - r) { xPos[i] = width - r; velX[i] *= -1; }
    if (xPos[i] < r)          { xPos[i] = r;         velX[i] *= -1; }
    if (yPos[i] > height - r) { yPos[i] = height - r; velY[i] *= -1; }
    if (yPos[i] < r)          { yPos[i] = r;          velY[i] *= -1; }
    drawBubble(xPos[i], yPos[i]);
  }
  drawClock();
}

function drawBubble(x, y) {
  noStroke();
  fill(150, 210, 255, 40);
  ellipse(x, y, radius, radius);
  noFill();
  strokeWeight(2 * sc);
  stroke(255, 255, 255, 80);
  ellipse(x, y, radius * 0.85, radius * 0.85);
  noStroke();
  fill(255, 255, 255, 160);
  ellipse(x - radius * 0.18, y - radius * 0.2, radius * 0.22, radius * 0.14);
  noFill();
  strokeWeight(1.5 * sc);
  stroke(200, 240, 255, 120);
  ellipse(x, y, radius, radius);
}

function drawClock() {
  let rawH = hour();
  let ampm = rawH >= 12 ? "PM" : "AM";
  let h = nf(rawH % 12 || 12, 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);
  let timeStr = h + ":" + m + ":" + s + " " + ampm;
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let dateStr = days[new Date().getDay()] + ", " + months[month() - 1] + " " + day() + ", " + year();
  let tSize = 56 * sc;
  let dSize = 28 * sc;
  let padX = 38 * sc;
  let padY1 = 78 * sc;
  let padY2 = 26 * sc;
  noStroke();
  fill(0, 0, 0, 100);
  textSize(tSize);
  textAlign(RIGHT, BOTTOM);
  text(timeStr, width - padX + 2 * sc, height - padY1 + 2 * sc);
  textSize(dSize);
  text(dateStr, width - padX + 2 * sc, height - padY2 + 2 * sc);
  fill(255, 255, 255, 220);
  textSize(tSize);
  text(timeStr, width - padX, height - padY1);
  textSize(dSize);
  text(dateStr, width - padX, height - padY2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
