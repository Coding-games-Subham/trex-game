var PLAY=0;
var END=1;
var BOT=2;
var GameState=PLAY;

var trex,trexRunning,trex_collided;
var ground,invisibeGround,imageGround;

var cloud,cloudsGroup;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score=0;

var gameOver,restart;

var highScore;

function preload(){
trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided=loadImage("download (3).png");
  
  imageGround=loadImage("ground2.png");
  cloud2=loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png"); 
  restartImg = loadImage("restart.png");
}


function setup() {
  createCanvas(800, 200);
  trex=createSprite(50,160,20,20);
  trex.addAnimation("running",trexRunning);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.6;
  trex.setCollider("rectangle",0,0,50,70,20);
  
  ground=createSprite(200,175);
  ground.addImage("Ground",imageGround);
  ground.x=ground.width/2;
  
  restart=createSprite(400,100);
  restart.addImage("Groun_d",restartImg);
  
  gameOver=createSprite(400,70);
  gameOver.addImage("Groun",gameOverImg);
  
  gameOver.scale=0.6;
  restart.scale=0.6;
  
  gameOver.visible=false;
  restart.visible=false;
  invisibleGround=createSprite(200,185,400,2);
  invisibleGround.visible=false;
  
   cloudsGroup=new Group();
   obstaclesGroup=new Group();
  
  highScore=0;
}

function draw() {
  background(280);
  textSize(25);
  text("Score: "+score,640,50);
  
  if(highScore>0){
    text("Hi: "+highScore,550,50); 
     }
  if(GameState === PLAY||GameState===BOT){
    score=score+Math.round(getFrameRate()/60);
    
    if(keyDown("space") && trex.y >= 155&&GameState===PLAY){
      trex.velocityY = -15.2 ;
    }
    
    if(keyDown("b")){
    GameState=BOT;
  trex.setCollider("rectangle",0,0,180,trex.height); 
    }
    
    console.log(trex.width);
    
    if(keyDown("p")){
       GameState=PLAY;
      trex.setCollider("rectangle",0,0,50,70,20);
       }
    trex.velocityY = trex.velocityY + 1;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    ground.velocityX = -(5.5 +3*score/150);
    
   (trex.collide(invisibleGround));
    spwancloud();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
     if (GameState === PLAY){
     GameState = END;
     }else{
     trex.velocityY = -15.2 ;
     }
    }
  }
  if(GameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    restart.visible = true;
    gameOver.visible = true;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(score>highScore){
      
    highScore=score;
    }
    
    if(mousePressedOver(restart)){
       reset();
       }
    
  }
  
        
  
  drawSprites();
}
  
function spwancloud(){
 if (World.frameCount % 60 === 0) {
   
   
    var cloud = createSprite(800,50,40,10);
   cloud.addImage("a",cloud2);
    cloud.y = Math.round(random(80,130));
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 260 ;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   //grapes
   cloudsGroup.add(cloud);
    
  }

}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    
    var obstacle = createSprite(800,160,10,40);
    obstacle.velocityX = -(6+3*score/150);
    
    
    var rand=Math.round(random(1,6));
    switch (rand){
      case 1:obstacle.addImage(obstacle1);
             break;
      case 2:obstacle.addImage(obstacle2);
             break;
      case 3:obstacle.addImage(obstacle3);
             break;
      case 4:obstacle.addImage(obstacle4);
             break;
      case 5:obstacle.addImage(obstacle5);
             break;
      case 6:obstacle.addImage(obstacle6);
             break;             
             
    }
    
    
    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.7;
    obstacle.lifetime = 150;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
GameState = PLAY
  
gameOver.visible=false;
restart.visible=false;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
//  
trex.changeAnimation("running",trexRunning); 
  
score=0; 
  
  
  
}
