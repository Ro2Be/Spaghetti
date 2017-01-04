function Spaghettus(){
  this.x = random(50, width - 50);
  this.y = 0;
  this.l = parseInt(random(125, 375)); //length
  this.points = [];
  
  //createPoints
  x = this.x;
  dx = 0;
  for(i = 0; i < this.l; i++){
    this.points.unshift(x);
    x += random(-0.5, 0.5) + dx;
    if(x > width - 50 || x < 50) {
      dx = dx/1.1;
    }
    dx += random(-0.1, 0.1);
  }

  
  this.show = function(){
    //display the spaghettus
    y = this.y
    inPlate = parseInt(y - (height - level - this.l));
    for(i = 0; i < this.l; i++){
      if(inPlate > 0 && inPlate < this.l) {
        if(abs(this.points[this.l - inPlate] - mouseX) < 40) {
        score += 0.005;
        fill(255, 0, 0);
        ellipse(this.points[this.l - inPlate], height - level + 1, 20, 6);
        }
        else {level += 0.0025;} 
      }
      if(y < height - level) {
        noStroke();
        fill(255, 255, 102);
        ellipse(this.points[i], y, 5, 10);
      }
      y += 1;
    }
    this.y += speed;
  }
} 

  spaghetti = [];
  var info;
  go = 0;
  level = 20;
  speed = 8;
  score = 0;
  topscore = 0;

setInterval(function(){if(speed < 11) {speed += 1;}}, 10000);

function preload() {
  eat = loadImage("eat.png");
  info = loadImage("info.png");
}

function setup() {
  createCanvas(800,800);
  spaghettus = new Spaghettus();
  spaghetti.push(spaghettus);
}

function mousePressed(){
  if (go === 1 & mouseX > width/2 - 55 & mouseX < width/2 + 55 & mouseY > height/2 -220 & mouseY < height/2 + 40) {
  	go = 0;
  	level = 20;
  	score = 0;
  }
}

function draw() {
  if(go === 0) {
    background(0);
    drawSea();    
    drawInfo();
    drawPlate();
    drawSpaghetti();
    drawScore();
    updateSpaghetti();
    gameOver();
  }
  
  if(go === 1) {
    background(0);
    drawSea();
    drawInfo();
    drawPlate();
    drawScore();
    drawMenu();
  }
  
  function drawSea(){
    fill(255, 255, 102);
    rect(0, height - level, width, level);
  }
  
  function drawPlate(){
    strokeWeight(1);
    stroke(0);
    fill(255);
    ellipse(constrain(mouseX, 20, width - 20), height - (level - 5), 80, 15);
    ellipse(constrain(mouseX, 20, width - 20), height - level, 100, 20);
    ellipse(constrain(mouseX, 20, width - 20), height - (level + 1), 80, 10);
  }
  
  function drawSpaghetti(){
    for(i = 0; i < spaghetti.length; i++) {
    spaghetti[i].show();
    }
  }
  
  function drawInfo(){
    strokeWeight(6);
    stroke(255);
    line(0, height/2 - 58, width, height/2 - 58);
    image(eat,  50, height/2 - 100, 75, 75);
    image(eat, 200, height/2 - 100, 75, 75);
    image(eat, 350, height/2 - 100, 75, 75);
    image(eat, 500, height/2 - 100, 75, 75);
    image(eat, 650, height/2 - 100, 75, 75);
    if(level > 75) {image(info, 50, height - level + 75, 700, 370);}
    noStroke();
  }
  
  function drawScore() {
      if (topscore < score) {topscore = score;}
      fill (255, 0, 155);
      textSize(15); 
      text("Topscore: " + str(parseInt(topscore)), 10, 20);
      text("Score: " + str(parseInt(score)), 10, 40);
  }
  
  function updateSpaghetti(){
    for(i = 0; i < spaghetti.length; i++) {
      if(spaghetti[i].y > height) {
        spaghetti[i] = new Spaghettus();
      }
    }
  }
  
  function gameOver(){
    if(level > height/2 + 60) {
      go = 1;
    }
  }
  
  function drawMenu(){
    fill (255, 0, 155)
    textSize(40);
    text("GAME OVER", width/2 - 120, height/2 - 250);
    rect (width/2 - 55, height/2 - 220, 110, 40);
    textSize(24);
    fill (255);
    text("AGAIN", width/2 - 35, height/2 -190);
  }
}