var robot, robotImg;
var virus, virusGroup, virusImg1, virusImg2, virusImg3, virusImg4;
var vaccine, vaccineGroup, vaccineImg1, vaccineImg2;
var elixir, elixirGroup, elixirImg1, elixirImg2;

var bg, gamebgImg;
var invisibleGround;

var gameState;
var score = 0;

var edges;

function preload(){
	//loading the bg image
	gamebgImg = loadImage("Images/Lab Background.png");

	//loading the robot's image
	robotImg = loadImage("Images/PC-Robot.png");

	//loading the various virus images
	virusImg1 = loadImage("Images/Virus-1.png");
	virusImg2 = loadImage("Images/Virus-2.png");
	virusImg3 = loadImage("Images/Virus-3.png");
	virusImg4 = loadImage("Images/Virus-4.png");

	//loading the vaccine images
	vaccineImg1 = loadImage("Images/Vaccine-1.png");
	vaccineImg2 = loadImage("Images/Vaccine-2.png");

	//loading the elixir images
	elixirImg1 = loadImage("Images/Elixir-1.png");
	elixirImg2 = loadImage("Images/Elixir-2.png");
}

function setup() {
	createCanvas(850, 500);

	//creating the background
	bg = createSprite(425, 220, 1000, 400);
	bg.addImage(gamebgImg);
	bg.scale = 1;
	bg.x = bg.width/2;

	//creating the PC - robot
	robot = createSprite(70, 470, 10, 10);
	robot.addImage(robotImg);
	robot.scale = 0.2;

	//creating an invisible ground
	invisibleGround = createSprite(500,480,1000,20);
	invisibleGround.shapeColor = "grey";
  	invisibleGround.visible = false;

	//creating groups
	virusGroup = createGroup();
	vaccineGroup = createGroup();
	elixirGroup = createGroup();
  
}

function draw() {
  background(180);
  edges = createEdgeSprites();

  drawSprites();

  //colliding the robot with the bottom edge
  robot.collide(invisibleGround);

  //to enable the robot to jump
  if(keyDown(UP_ARROW) || touches.length > 0){
	  robot.velocityY = -10;
  }

  //adding gravity to the robot
  robot.velocityY+= 0.4;

  //setting velocity of the background
  bg.velocityX = -3;

  //reseting the background image
  if (bg.x < 260){
	bg.x = bg.width/2;
  };

  //calling the functions
  spawnVirus();
  spawnVaccine();
  spawnElixir();

  //when the robot collides with the virus
  if(virusGroup.isTouching(robot)){
	  robot.velocityY = 0;
	  bg.velocityX = 0;
	  virusGroup.setVelocityXEach(0);
	  virusGroup.setLifetimeEach(-1);
	  vaccineGroup.setVelocityXEach(0);
	  vaccineGroup.setLifetimeEach(-1);
	  elixirGroup.setVelocityXEach(0);
	  elixirGroup.setLifetimeEach(-1);
  }
  
  //for displaying score
  fill("#1EFF74");
  textSize(25);
  textFont("Georgia");
  text("Score: " + score, 50, 50);
 
}

function spawnVirus(){
	if(frameCount % 180 === 0){
		//creating the virus sprite and adding characteristics
		virus = createSprite(850, random(340, 450), 10, 10);
		virus.velocityX = -3;
		virus.scale = 0.26;
		virus.lifetime = 285;

		//adding images to the virus sprite
		var rand = Math.round(random(1, 4));
		switch(rand){
			case 1: virus.addImage(virusImg1);
					break;
			case 2: virus.addImage(virusImg2);
					break;
			case 3: virus.addImage(virusImg3);
					break;
			case 4: virus.addImage(virusImg4);
					break;
		}

		//definging the depths
		virus.depth = robot.depth;
		robot.depth+=1;

		//adding the individual virus sprite to the virus group
		virusGroup.add(virus);
	}
}

function spawnVaccine(){
	if(frameCount % 260 === 0){
		//creating the vaccine sprite and adding characteristics
		vaccine = createSprite(850, random(240, 350), 10, 10);
		vaccine.velocityX = -3;
		vaccine.scale = 0.36;
		vaccine.lifetime = 285;

		//adding images to the vaccine sprite
		var rand = Math.round(random(1, 2));
		switch(rand){
			case 1: vaccine.addImage(vaccineImg1);
					break;
			case 2: vaccine.addImage(vaccineImg2);
					break;
		}

		//definging the depths
		vaccine.depth = robot.depth;
		robot.depth+=1;

		//adding the individual vaccine sprite to the vaccine group
		vaccineGroup.add(vaccine);
	}
}

function spawnElixir(){
	if(frameCount % 600 === 0){
		//creating the eixir sprite and adding characteristics
		elixir = createSprite(850, random(240, 350), 10, 10);
		elixir.velocityX = -3;
		elixir.scale = 0.45;
		elixir.lifetime = 285;

		//adding images to the elixir sprite
		var rand = Math.round(random(1, 2));
		switch(rand){
			case 1: elixir.addImage(elixirImg1);
					break;
			case 2: elixir.addImage(elixirImg2);
					break;
		}

		//definging the depths
		elixir.depth = robot.depth;
		robot.depth+=1;

		//adding the individual vaccine sprite to the vaccine group
		elixirGroup.add(elixir);
	}
}