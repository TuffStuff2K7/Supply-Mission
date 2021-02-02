var helicopterIMG,helicopterSprite,packageSprite,packageIMG;
var packageBody,ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	packageSprite=createSprite(width/2, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width, 10);
	groundSprite.shapeColor=color(255)

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2, 200, 20, {restitution:0.2, isStatic:true});
	World.add(world, packageBody);
	
	ground = new StaticBox(width/2, 650, width, 10);

 	boxLeft = new StaticBox(300, 620, 30, 100);
	boxRight = new StaticBox(500, 620, 30, 100);
 	boxBottom = new StaticBox(width/2, 650, 200, 30);

	Engine.run(engine);  
}


function draw() {
    rectMode(CENTER);
	background(0);
 
	if (keyDown("right")){
		helicopterSprite.x += 5;
	}

	if (keyDown("left")){
		helicopterSprite.x -= 5;
	}

	if(packageBody.position.y < 250){
		packageBody.position.x = helicopterSprite.x;
	}

	if(keyWentDown("down")){
		Matter.Body.velocity.X(packageBody, 10);
	}

  	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;

	boxBottom.display();
	boxLeft.display();
	boxRight.display();

  	drawSprites();
}
