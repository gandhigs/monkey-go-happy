var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var survivalTime

function preload(){
  
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(450, 400)
  
  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(400, 350, 900, 10)
  ground.velocityX = -4
  ground.x = ground.width / 2
  console.log(ground.x)
  
  foodGroup = createGroup()
  obstacleGroup = createGroup()
  
  score = 0
  survivalTime = 0
  
}


function draw() {
  background("white")
  
  stroke("black")
  textSize(20)
  fill("black")
  text("Score: " + score, 300, 50)
  
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival time: " + survivalTime, 100, 50)
            
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
  
    if (keyDown("space")) {
      monkey.velocityY = -12
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(ground)
  
  if(foodGroup.isTouching(monkey)){
    score = score + 1
    foodGroup.destroyEach()
    
    }
  
  if(obstacleGroup.isTouching(monkey)){
    survivalTime = 0
    
    monkey.velocityY = 0
    
    foodGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    
    foodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    
    ground.velocityX = 0
    
    }
  
  spawnObstacles()
  spawnBananas()
  
  drawSprites()
  
}

function spawnObstacles() {
  if (frameCount % 225 === 0) {
    obstacle = createSprite(550, 315, 20, 20)
    obstacle.addAnimation("obstacles", obstacleImage)
    obstacle.scale = 0.15
    
    obstacle.velocityX = -8
  
    obstacle.lifetime = 65;
    
    obstacleGroup.add(obstacle)
    
  }
 
}

function spawnBananas() {
  if (frameCount % 110 === 0) {
    banana = createSprite(350, 175, 20, 20)
    banana.addAnimation("banana", bananaImage)
    banana.scale = 0.1
    
    banana.velocityX = -7
  
    banana.lifetime = 75;
    
    foodGroup.add(banana)  
    
  }
 
}