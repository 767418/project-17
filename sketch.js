var monkey, monkey_running;

var banana, bananaImage, bananaGroup;

var obstacle, obstacleImage, obstaclesGroup;

var score = 0,
  survivalTime = 0;

var ground, invisibleGround, groundImage;

var PLAY=1, END=2;
var gameState=1;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 200);


  obstaclesGroup = createGroup();
  bananasGroup = createGroup();


  monkey = createSprite(50, 100);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.099999;
  monkey.debug = true;


  ground = createSprite(300, 190, 1500, 5);
  ground.velocityX = -10;
  ground.x = ground.width / 2;


}


function draw() {

  background(180);
  

  if (gameState === 1) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }


    if (keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -10;
    } else {
      monkey.velocityY = monkey.velocityY + 0.5;
    }


    if (World.frameCount % 80 === 0) {
      spawnBananas();
    }

    if (World.frameCount % 100 === 0) {
      spawnObstacles();
    }

    survivalTime = Math.round(frameCount / 35);


    if (bananasGroup.isTouching(monkey)) {
      score = score + 1
      bananasGroup.destroyEach();
    }


    if (obstaclesGroup.isTouching(monkey)) {
      gameState = 2
    }
    
    ground.velocityX = 0;

  }
  
  if (gameState === 2) {
    
    banana.velocityX = 0;
    obstacle.velocityX = 0;
    
    
    banana.lifetime = -1;
    obstacle.lifetime = -1;
    
  }

  console.log (gameState);
  console.log (obstaclesGroup.velocityX);

  monkey.collide(ground);


  textSize(20);
  textFont("papyrus");

  fill("white");
  text("Score: " + score, 500, 50);

  fill("black");
  text("Surival Time: " + survivalTime + " seconds", 125, 50)



  drawSprites();

}


function spawnBananas() {

  banana = createSprite(610, Math.round(random(50, 185)));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -8;
  banana.lifetime = 100;

  bananasGroup.add(banana);

}


function spawnObstacles() {

  obstacle = createSprite(610, 160);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -5;
  obstacle.lifetime = 150;
  
  obstaclesGroup.add(obstacle);

}