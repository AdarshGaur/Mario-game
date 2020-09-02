//
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var player = {
	xSprite: 0,
	ySprite: 0,
	width: 30,
	height: 50,
	jumping: false,
	faceLeft: false,
	faceRight: true,
	x: 224,
	y: 292,//392
	speedX: 0,
	speedY: 0,
	gravity : .05,
	gravitySpeed: 0
}

var moves = [];

//loading tile spritesheet
var tiles = new Image();
tiles.src = '../img/spritesheet.png';
tiles.onload = function(){
	init();
}

/// loading mario spritesheet
var marioImage = new Image();
marioImage.src = '../img/mario-sprites.png';
marioImage.onload = function(){
	mariodraw(0, 0, 30, 50, player.x, player.y, 30, 50);
}

function updateGameArena(){
	init();
	/// right + left + jump movements
	if(moves[37]){//left
		player.speedX -= 0.5;
		player.faceLeft = true;
		player.faceRight = false;
	 	player.xSprite = 290;
	}
	if(moves[39]){//right
		player.speedX += 0.5;
		player.faceRight = true;
		player.faceLeft = false;
		player.xSprite = 30;
	}
	if(moves[38] && player.jumping==false){//jump
		player.speedY -= 25;
		player.jumping = true;
	}

	player.speedY += 1.5;//for gravity
	player.x += player.speedX;
	player.y += player.speedY;
	player.speedX *= 0.9;//friction
	player.speedY *= 0.9;//friction

	//for stoping mario on the floor
	if(player.y > 392){
		player.jumping = false;
		player.y = 392;
		player.speedY = 0;
		/// for changing back mario's sprite when touches ground
		if(player.faceRight && player.speedX >= 0 && player.speedX < 0.5){//right
			player.xSprite = 0;
		}
		if(player.faceLeft && player.speedX > -0.5 && player.speedX <= 0){//left
			player.xSprite = 255;
		}
	}

	/// for changinf his running sprite && need optimization in this later !
	if(player.speedX < 0.5 && player.speedX >= 0){
		if(player.faceRight){
			player.xSprite = 0;
		}
	}
	if(player.speedX > -0.5 && player.speedX <= 0){
		if(player.faceLeft){
			player.xSprite = 255;
		}
	}

	///for changing sprite while jumping
	if(player.jumping){
		if(player.faceRight){
			player.xSprite = 95;
		}else if(player.faceLeft){
			player.xSprite = 65;
		}
	}

	mariodraw(player.xSprite, player.ySprite, player.width, player.height, player.x, player.y, player.width, player.height);

	requestAnimationFrame(updateGameArena);
}

//keymovements
window.addEventListener('keydown', function(event){
	moves = (moves || []);
    moves[event.keyCode] = (event.type == "keydown");
    //
})
window.addEventListener('keyup', function (event) {
	moves[event.keyCode] = (event.type == "keydown");            
})


requestAnimationFrame(updateGameArena);


// for drawing mario from sprite
function mariodraw(xSprite, ySprite, wSprite, hSprite, x_pos, y_pos, width, height){
	context.drawImage(marioImage, xSprite, ySprite, wSprite, hSprite
							, x_pos	, y_pos, width, height);
	console.log("heelllooooo, i'm v good rn");
}


//function for drawing floor and sky
function init(){
	//for sky
	for(var i=0; i<75; i++){
		for(var j=0; j<33; j++){
			context.drawImage(tiles, 48, 336, 16, 16
									, i*16, j*16, 16, 16);
		}
	}
	///for ground
	for(var i=0; i<38; i++){
		context.drawImage(tiles, 0, 0, 16, 16,
						   i*32, 440, 32, 32);
		context.drawImage(tiles, 0, 0, 16, 16,
						   i*32, 470, 32, 32);
	}
}













