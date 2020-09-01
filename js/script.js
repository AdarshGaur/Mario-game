//
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var player = {width: 30, height: 50, x: 224, y: 392, speedX: 0.0, speedY: 0.0}


//loading spritesheet for tiles
var tiles = new Image();
tiles.src = '../img/spritesheet.png';
tiles.onload = function(){
	drawBackground();
}

function drawBackground(){
	init();
}

function updateGameArena(){
	drawBackground();
}

/// loading mario spritesheet
var marioImage = new Image();
marioImage.src = '../img/mario-sprites.png';
marioImage.onload = function(){
	mariodraw(0, 0, 30, 50
			 , player.x, player.y, 30, 50);
}

//keymovements
window.addEventListener('keydown', function(event){
	// event.preventDefault() // stop the button from scrolling the page
	if(event.keyCode === 37){// left
		drawBackground();
		player.x -= 10;
		console.log(player.x);
	}else if(event.keyCode === 39){//right
		player.x += 10;
		drawBackground();
		console.log(player.x);
	}else if(event.keyCode === 38){//up
		player.y -= 30;
		drawBackground();
		console.log(player.y);
	}else if(event.keyCode === 40){//up
		player.y += 30;
		drawBackground();
		console.log(player.y);
	}
	mariodraw(0, 0, 30, 50, player.x, player.y, player.width, player.height);
})


// for drawing mario from sprite
function mariodraw(xSprite, ySprite, wSprite, hSprite, x_pos, y_pos, width, height){
	context.drawImage(marioImage, xSprite, ySprite, wSprite, hSprite
							, x_pos	, y_pos, width, height);
	console.log("heelllooooo, i'm v good rn");
}

function init(){
	for(var i=0; i<80; i++){
		for(var j=0; j<30; j++){
			context.drawImage(tiles, 48, 336, 16, 16
									, i*16, j*16, 16, 16);
		}
	}
	for(var i=0; i<38; i++){
		context.drawImage(tiles, 0, 0, 16, 16,
						   i*32, 440, 32, 32);
		context.drawImage(tiles, 0, 0, 16, 16,
						   i*32, 470, 32, 32);
	}
}













