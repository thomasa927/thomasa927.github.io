let hue = 180;
let brushSize = 10;
let eraser = false;
let pg;

let slidingLeft  = false;
let slidingRight = false;
let slidingUp    = false;
let slidingDown  = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  pg = createGraphics(width, height);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.background(200, 30, 20);
}

function draw() {
  if (!eraser && (slidingLeft || slidingRight)) {
    hue = (hue + (slidingRight ? 1.5 : -1.5) + 360) % 360;
  }
  if (slidingUp)   brushSize = min(brushSize + 0.4, 80);
  if (slidingDown) brushSize = max(brushSize - 0.4, 2);

  clear();
  image(pg, 0, 0);
  drawCursorRing();
  drawUI();
}

function drawCursorRing() {
  noFill();
  stroke(eraser ? color(0, 0, 100, 40) : color(hue, 70, 100, 70));
  strokeWeight(1.5);
  circle(mouseX, mouseY, brushSize + 6);
}

function mouseDragged() {
  pg.strokeCap(ROUND);
  if (eraser) {
    pg.stroke(200, 30, 20, 100);
    pg.strokeWeight(brushSize * 1.4);
  } else {
    pg.stroke(hue, 85, 100, 90);
    pg.strokeWeight(brushSize);
  }
  pg.line(pmouseX, pmouseY, mouseX, mouseY);
}

function mousePressed() {
  pg.noStroke();
  pg.fill(eraser ? color(200, 30, 20) : color(hue, 85, 100));
  pg.circle(mouseX, mouseY, brushSize);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW)  { slidingLeft  = true;  slidingRight = false; eraser = false; }
  if (keyCode === RIGHT_ARROW) { slidingRight = true;  slidingLeft  = false; eraser = false; }
  if (keyCode === UP_ARROW)    { slidingUp    = true;  slidingDown  = false; }
  if (keyCode === DOWN_ARROW)  { slidingDown  = true;  slidingUp    = false; }
  if (key === 'S' || key === 's') saveCanvas('drawing', 'png');
  if (key === 'C' || key === 'c') pg.background(200, 30, 20);
  if (key === 'E' || key === 'e') eraser = !eraser;
  if (key === 'R' || key === 'r') { hue = random(360); eraser = false; }
  return false;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW)  slidingLeft  = false;
  if (keyCode === RIGHT_ARROW) slidingRight = false;
  if (keyCode === UP_ARROW)    slidingUp    = false;
  if (keyCode === DOWN_ARROW)  slidingDown  = false;
  return false;
}

function drawUI() {
  const bx = 18, by = 18, bw = 190, bh = 240;
  push();
  fill(180, 40, 90, 85);
  stroke(180, 25, 95);
  strokeWeight(1.5);
  rect(bx, by, bw, bh, 8);
  pop();
  push();
  fill(180, 10, 98);
  noStroke();
  textFont('monospace');
  textSize(11);
  const lx = bx + 14;
  let ly = by + 22;
  const gap = 19;
  text('S  save png',    lx, ly); ly += gap;
  text('C  clear',       lx, ly); ly += gap;
  text('E  eraser',      lx, ly); ly += gap;
  text('←→  color',      lx, ly); ly += gap;
  text('↑↓  brush size', lx, ly); ly += gap * 1.4;
  text('← + ↑ for rainbow mode!', lx, ly); ly += gap * 1.4;
  stroke(180, 20, 90, 60);
  strokeWeight(1);
  line(lx, ly - gap * 0.6, bx + bw - 14, ly - gap * 0.6);
  noStroke();
  const barW = bw - 28;
  text('color', lx, ly); ly += 16;
  drawRainbowBar(lx, ly, barW, 12);
  ly += 26;
  text('size', lx, ly); ly += 16;
  drawSizeBar(lx, ly, barW, 12);
  pop();
}

function drawRainbowBar(x, y, w, h) {
  push();
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  for (let i = 0; i < w; i++) {
    fill(map(i, 0, w, 0, 360), 90, 100);
    rect(x + i, y, 1, h);
  }
  const cx = x + (hue / 360) * w;
  fill(hue, 85, 100);
  stroke(255);
  strokeWeight(1.5);
  circle(cx, y + h / 2, 14);
  pop();
}

function drawSizeBar(x, y, w, h) {
  push();
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < w; i++) {
    const trackH = map(i, 0, w, 2, h);
    noStroke();
    fill(180, 20, 85, 80);
    rect(x + i, y + h / 2 - trackH / 2, 1, trackH);
  }
  const cx = x + map(brushSize, 2, 80, 0, w);
  fill(180, 15, 97);
  stroke(255);
  strokeWeight(1.5);
  circle(cx, y + h / 2, 14);
  pop();
}

function windowResized() {
  let temp = createGraphics(width, height);
  temp.image(pg, 0, 0);
  resizeCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.background(200, 30, 20);
  pg.image(temp, 0, 0);
  temp.remove();
}
