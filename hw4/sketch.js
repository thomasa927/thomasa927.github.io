let colors = [];
let laneHeight = 55;
let stationGap = 75;
let segmentMin = 110;
let segmentMax = 180;
let verticalWiggle = 18;

function setup() {
  createCanvas(1024, 1024);
  noLoop();
  colors = [
    color(220, 50, 50),
    color(40, 120, 220),
    color(240, 180, 40),
    color(50, 160, 90),
    color(160, 60, 180),
    color(255, 120, 60),
    color(0, 150, 150),
    color(200, 80, 120)
  ];
}

function draw() {
  background(230, 220, 200);
  let lineIndex = 0;
  for (let laneTop = 0; laneTop < height; laneTop += laneHeight) {
    let laneCenter = laneTop + laneHeight / 2;
    drawMetroLine(laneCenter, laneTop, laneTop + laneHeight, colors[lineIndex % colors.length]);
    lineIndex++;
  }
}

function drawMetroLine(startY, minY, maxY, c) {
  let x = 0;
  let y = startY;
  let path = [];
  path.push({ x: x, y: y });
  while (x < width) {
    let seg = random(segmentMin, segmentMax);
    x += seg;
    if (random() < 0.6) {
      let shift = random([-verticalWiggle, verticalWiggle]);
      y = constrain(y + shift, minY + 12, maxY - 12);
    }
    path.push({ x: x, y: y });
  }
  stroke(0);
  strokeWeight(14);
  noFill();
  beginShape();
  for (let p of path) vertex(p.x, p.y);
  endShape();
  stroke(c);
  strokeWeight(8);
  beginShape();
  for (let p of path) vertex(p.x, p.y);
  endShape();
  drawStationsOnPath(path);
}

function drawStationsOnPath(path) {
  stroke(0);
  strokeWeight(2);
  fill(255);
  for (let i = 0; i < path.length - 1; i++) {
    let a = path[i];
    let b = path[i + 1];
    let d = dist(a.x, a.y, b.x, b.y);
    let count = floor(d / stationGap);
    for (let j = 1; j < count; j++) {
      let t = j / count;
      let sx = lerp(a.x, b.x, t);
      let sy = lerp(a.y, b.y, t);
      ellipse(sx, sy, 14, 14);
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas("assignment4_pattern_aabo_thomas", "png");
  }
}
