var trex, trex_running, trex_collided;
var cloud, ground, invisibleGround, groundImage, cloudImage;

var restart,gameOver,restartI,gameOverI;

var c1Image, c2Image, c3Image, c4Image, c5Image, c6Image;

var dieSound, jumpSound, checkPointSound; 

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudG,cactiG;
var s;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  c1Image = loadImage("obstacle1.png");
  c2Image = loadImage("obstacle2.png");
  c3Image = loadImage("obstacle3.png");
  c4Image = loadImage("obstacle4.png");
  c5Image = loadImage("obstacle5.png");
  c6Image = loadImage("obstacle6.png");
  
  restartI = loadImage("restart.png");
  gameOverI = loadImage("gameOver.png");
  
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(600, 200);

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  //trex.debug= true;// shows the collision radius
  trex.setCollider("circle",10,10,30);

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -5;

  // invisible ground so trex stays on ground 
  invisibleGround = createSprite(200, 185, 400, 10);
  invisibleGround.visible = false; // making invisible ground invisible
  cloudG = new Group();
  cactiG = new Group();

  //game over and restart variables
  restart = createSprite(280,110,30,30);
  restart.addImage(restartI);
  restart.visible=false;
  gameOver = createSprite(275,60,30,30);
  gameOver.addImage(gameOverI);
  gameOver.visible=false;
}

function draw() { // called for every frame 
    if(s>=300)
      background("black");
    else 
        background("white");
    fill("green");
    textSize(15);
    textFont("courier");
    text("Score: "+s,460,15);

  if(gameState === PLAY){
        //move the ground
        ground.velocityX = -5;
        s = Math.round(frameCount/10);


      if (keyDown("space") && trex.y >= 120) {
        trex.velocityY = -10;
      }
      if(keyDown("space"))
        jumpSound.play();

      
      trex.velocityY = trex.velocityY + 0.8

      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }

      trex.collide(invisibleGround);

      // console.log(frameCount);// framers per second

      if(frameCount%300==0)
          checkPointSound.play();
    
      spawnClouds();

      spawnCacti();
    
      if(trex.isTouching(cactiG)){
        gameState=END;
        dieSound.play();
      }
      
  }
  else if(gameState === END){
      //stop the ground
      trex.changeAnimation("collided");
      trex.y=invisibleGround.y-26;
      ground.velocityX = 0;
      cactiG.setVelocityXEach(0);
      cloudG.setVelocityXEach(0);
      cactiG.setLifetimeEach(-1);
      restart.visible=true;
      gameOver.visible=true;
      if(mousePressedOver(restart)){
         reset();
         
      }
  }
  drawSprites();
}

function reset(){
    gameState=PLAY;
    frameCount=0;
    gameOver.visible=false;
    restart.visible=false;
    cloudG.setLifetimeEach(0);
    cactiG.setLifetimeEach(0);
    trex.changeAnimation("running");
}

function spawnCacti() {
  var cactus;
  var c = Math.round(random(1, 6));

  switch (c) {
    case 1:
      if (frameCount % 120 == 0) {
          cactus = createSprite(600, 155, 20, 20);
          cactus.addImage("running", c1Image);
          cactus.scale = 0.1;
          cactus.velocityX = -4;
          cactus.lifetime=160;
          cactiG.add(cactus);
      }
      break;
    case 2:
      if (frameCount % 250 == 0) {
          cactus = createSprite(600, 155, 20, 20);
          cactus.addImage("running", c2Image);
          cactus.scale = 0.1;
          cactus.velocityX = -4;
          cactus.lifetime=160;
          cactiG.add(cactus);
       }
      break;
    case 3:
       if (frameCount % 190 == 0) {
          cactus = createSprite(600, 162, 20, 20);
          cactus.addImage("running", c3Image);
          cactus.scale = 0.1;
          cactus.velocityX = -4;
          cactus.lifetime=160;
          cactiG.add(cactus);
       }
      break;
    case 4:
       if (frameCount % 150 == 0) {
          cactus = createSprite(600, 147, 20, 20);
          cactus.addImage("running", c4Image);
          cactus.scale = 0.07;
          cactus.velocityX = -4;
          cactus.lifetime=160;
          cactiG.add(cactus);
       }
      break;
    case 5:
       if (frameCount % 320 == 0) {
          cactus = createSprite(600, 152, 20, 20);
          cactus.addImage("running", c5Image);
          cactus.scale = 0.05;
          cactus.velocityX = -4;
          cactus.lifetime=160;
          cactiG.add(cactus);
       }
      break;
    case 6:
       if (frameCount % 100 == 0) {
          cactus = createSprite(600, 162, 20, 20);
          cactus.addImage("running", c6Image);
          cactus.scale = 0.1;
          cactus.velocityX = -4;
          cactus.lifetime=160;
          cactiG.add(cactus);
       }
      break;
    }
}

function spawnClouds() {
  //clouds
  if (frameCount % 80 == 0) {
    clouds = createSprite(600, 50, 45, 45);
    clouds.y = Math.round(random(15, 120));
    clouds.addImage("running", cloudImage);
    clouds.scale = 0.25;
    clouds.velocityX = -5;

    trex.depth = (clouds.depth) + 1;
    cloudG.add(clouds);
  }
}