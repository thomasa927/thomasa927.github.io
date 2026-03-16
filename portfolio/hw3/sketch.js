function setup() {
  createCanvas(400, 380);
}
function draw() {
  background("skyblue");
  stroke(50);
  strokeWeight(2);
  fill("rgb(72,150,72)");
  rect(120, 260, 160, 140, 20);
  fill(255, 219, 172);
  rect(90, 270, 30, 100, 20);
  rect(280, 270, 30, 100, 20);
  ellipse(130, 180, 25, 35);
  ellipse(270, 180, 25, 35);
  fill(255, 219, 172);
  ellipse(200, 180, 140, 165);
  stroke(50);
  fill(255);
  ellipse(170, 175, 50, 14);
  ellipse(230, 175, 50, 14);
  fill(60, 90, 140);
  ellipse(170, 175, 14, 14);
  ellipse(230, 175, 14, 14);
  fill(0);
  ellipse(170, 175, 6, 6);
  ellipse(230, 175, 6, 6);
  fill(60, 40, 25);
  rect(150, 158, 40, 6, 3);
  rect(210, 158, 40, 6, 3);
  fill(240, 200, 160);
  ellipse(200, 195, 16, 22);
  fill(180, 70, 70);
  arc(200, 220, 45, 28, 0, PI);
  let hH = 130;
  let lHH = 120;
  fill(60, 60, 60);
  arc(200, hH, 170, 190, PI, TWO_PI);
  rect(115, lHH, 170, 30, 20);
  let textBuffer = 10;
  let textHeight = hH + textBuffer;
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("ARCTERYX", 180, textHeight);
  text("Thomas Aabo", 40, 370);
}
