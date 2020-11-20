  var PLAY = 1;
  var END = 0;
  var gameState = 1;

  var sword,swordImage;
  var fruit1;
  var fruitImage1,fruitImage2,fruitImage3,fruitImage4
  var alien1, alienImage1,alien2,alienImage2;
  var gameover1, gameoverImage1,gameover2, gameoverImage2
  var knifeSwooshSound, gameOverSound;
  var score = 0;
 
function preload(){
  
  swordImage = loadImage("sword.png") 
  fruitImage1 = loadImage("fruit1.png")
  fruitImage2 = loadImage("fruit2.png")
  fruitImage3 = loadImage("fruit3.png")
  fruitImage4 = loadImage("fruit4.png")
  alienImage1 = loadImage("alien1.png") 
  alienImage2 = loadImage("alien2.png") 
  gameoverImage1 = loadImage("gameover.png");
  gameoverImage2 = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  }

function setup(){
  
   createCanvas(600, 480);
  
   score = 0
  enemyGroup = new Group();
  fruitGroup = new Group();
  
  //sword
  sword = createSprite(480,220,20,50);
  sword.addImage(swordImage);
  sword.scale = 0.6;
  sword.setCollider("circle",10,-15,40)
  sword.debug = false
  
   gameover1=createSprite(300,240)
   gameover1.addImage(gameoverImage1)
}

function draw(){
 
  if(gameState===PLAY){
    gameover1.visible=false
    sword.x = mouseX
    sword.y = mouseY
    
    fruit();
    enemy();
    
   if (sword.isTouching(fruitGroup)){
     fruitGroup.destroyEach();
     
    knifeSwooshSound.play();
     score = score+2;
   }
    if (sword.isTouching(enemyGroup)){
      gameState = END
      
      gameOverSound.play();
      fruit1.velocityX= 0
     }
     }
   
  
  if(gameState===END){ 
      sword.x = 260
      sword.y = 280
      sword.scale = 1.3;
      sword.velocityX = 0;
      sword.velocityY = 0;
      enemyGroup.destroyEach();
      
  }
  
  background ("lightgreen")
  
  drawSprites();
  
   textSize (28) 
   text ("Score= " + score,470,35) 
}

 function fruit(){
  if (World.frameCount%80===0){
    fruit1 = createSprite(400,200,20,20);
    fruit1.scale=0.2
    //fruit.debug = true;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit1.addImage(fruitImage1);
    }else if (r == 2){
      fruit1.addImage(fruitImage2);
    }else if (r == 3){
      fruit1.addImage(fruitImage3);
    }else if (r == 4){
      fruit1.addImage(fruitImage4);
    }
    fruit1.y=Math.round(random(50,340));
    
    fruit1.velocityX= -(7+(score/4));
    fruit1.setLifetime = 70;
    
    fruitGroup.add(fruit1);  
    }
 
 }

function enemy(){
  if (World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("enemy",alienImage1,alienImage2);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
   }
 }


