//Declare my variables

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var timer;
var interval;
var player;
var demon;
var bullets = [];
var currentBullet = 0;
var fireCounter = 30;
var fireRate = 5;
var range = canvas.width/2;
var bulletAmount = 25;
var dir = {x:1,y:0};




	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:canvas.width/2 + 175});

	platform0 = new GameObject();
		platform0.width = canvas.width
        platform0.height = 20;
		platform0.x = platform0.width/2;
		platform0.y = player.y +player.height/2 + platform0.height/2 + 175;
		platform0.color = "#244968";
		
	
	platform1 = new GameObject();
		platform1.width = 575;
		platform1.x = canvas.width -platform1.width/2;
		platform1.y = player.y +player.height/2 + platform1.height/2;
		platform1.color = "#66ff33";

    demon = new GameObject({x:150, color:"#e04a6f"});
		
	
	goal = new GameObject({width:24, height:50, x:platform1.x + 100, y:platform1.y-100, color:"#00ffff"});
	
	for(var b = 0; b < bulletAmount; b++)
	{
		bullets[b] = new GameObject({force:10, width:10, height:5, color:"#00ffff"});
		//bullets[b].world = level;
		bullets[b].x = player.x;
		bullets[b].y = -1000;
	}	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	var myTimer= setInterval(myTimer, 1000);
	var time = 0;

	function myTimer() { 
	time++; 
	document.getElementById("timer").innerHTML = time;
	}

	function stopTimer() { 
	clearInterval(myTimer);
	}

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
		
		if(!a && !d){dir.x = 0;}
		dir.y = -1;
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
		dir.x = -1;
		if(!w && !s){dir.y = 0;}
		
	}
	if(d)
	{
		player.vx += player.ax * player.force;
		dir.x = 1;
		if(!w && !s){dir.y = 0;}
	}

	fireCounter--;
	
	if(space)
	{
		if(fireCounter <= 0)
		{
			bullets[currentBullet].x = player.x ;//- bullets[currentBullet].world.x;
			bullets[currentBullet].y = player.y;// - bullets[currentBullet].world.y;
			bullets[currentBullet].vx = dir.x * bullets[currentBullet].force;
			bullets[currentBullet].vy = dir.y * bullets[currentBullet].force;
			fireCounter = fireRate;
			currentBullet++;
			if(currentBullet >= bulletAmount)
			{
				currentBullet = 0;
			}
		}
	}
	else
	{
		fireCounter = 0;
	}

	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	demon.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	demon.y += Math.round(demon.vy);
	

	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}

	while(platform0.hitTestPoint({x:player.right(), y:player.bottom()}) && player.vy >=0)
	{
		player.y;
		player.vy = 0;
		player.canJump = true;
		this.drawDebug();
	}
	
	while(platform1.hitTestPoint({x:player.left(), y:player.bottom()}) && player.vy <=0)
	{
		player.y;
		player.vy = 0;
		player.canJump = true;
		this.drawDebug();
	}

	while(platform0.hitTestPoint(demon.bottom()))
	{
		demon.y--;
		demon.vy = 0;
	}
	
	for(var b = 0; b< bullets.length; b++) {

		bullets[b].move();
		bullets[b].drawRect();
		
		if(bullets[b].hitTestObject(demon))
	{
		demon.y = 100000;
	}
	}

	ctx.font = "20px Oblique";
   let timerText = `${visualTimer}`;
   let textWidth = ctx.measureText(timerText);
   ctx.fillText(timerText, canvas.width/2 - textWidth.width/2, 50);

	
	platform0.drawRect();

	player.drawRect();
	player.drawDebug();

	//goal.drawCircle();
	demon.drawRect();
}

