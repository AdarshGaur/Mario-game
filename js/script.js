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
	x: 0,//224
	y: 292,//392
	speedX: 0,
	speedY: 0,
	gravity : .05,
	gravitySpeed: 0
}

var countL = 1;
var countR = 1;

var cameraX = player.x;

player.x = 224;

///for storing key presses
var moves = [];


/////////////////////////////////
///////LAYOUT OF WHOLE LEVEL ////
/////////////////////////////////
// width or columns = 120;
//height or rows = 15;
var map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

/*
0 = sky;
1 = groundtile;
2 = coin block;
3 = powerup;
4 = stairblock;
5 = pole;
6 = flag;
7 = pipeLeft;
8 = pipeRight;
9 = pipeUpperLeft;
10 = pipeUpperRight;
*/

var flagImage = new Image();
flagImage = '../img/flag.png';
// var sky = new Image();
// sky = '../img/sky.png';
// sky.onload = function(){
// 	context.drawImage(sky, 0, 0, 1200, 500);
// }

//loading tile spritesheet
var tiles = new Image();
tiles.src = '../img/spritesheet.png';
tiles.onload = function(){
	// flagImage.onload = function(){
	// 	init();
	// 	console.log("flag loaded");
	// }
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

		////////for moving effect
		countL++;
	 	if(countL >= 8){    
	 		player.xSprite = 255;
	 	}else {
	 		player.xSprite = 290;
	 	}
	 	if(countL == 16){
	 		countL = 0;
	 	}
	}

	if(moves[39]){//right
		player.speedX += 0.5;
		player.faceRight = true;
		player.faceLeft = false;
		
		////////for moving effect
		countR++;
		if(countR >= 8){
	 		player.xSprite = 0;
	 	}else{
	 		player.xSprite = 30;
	 	}
	 	if(countR == 16){
	 		countR=0;
	 	}
	}

	if(moves[38] && player.jumping==false){//jump
		player.speedY -= 25;
		player.jumping = true;
	}

	player.speedY += 1.2;//for gravity
	player.x += player.speedX;
	player.y += player.speedY;
	player.speedX *= 0.9;//friction
	player.speedY *= 0.9;//friction

	//for stoping mario on the floor
	if(player.y > 370){
		player.jumping = false;
		player.y = 370;
		player.speedY = 0;
		/// for changing back mario's sprite when touches ground
		if(player.faceRight && player.speedX >= 0 && player.speedX < 0.5){//right
			player.xSprite = 0;
		}
		if(player.faceLeft && player.speedX > -0.5 && player.speedX <= 0){//left
			player.xSprite = 255;
		}
	}

	/// for changing back mario's standing sprite && need optimization in this later !
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
	// console.log(camera.x);
}


//function for drawing floor and sky
function init(){
	// canvas.style.backgrounImage = sky;
	for(var i=0; i<1800; i++){
		let x = (i%120);
		let y = Math.floor(i/120);
		switch(map[i]){
			case 0: // sky
				context.drawImage(tiles, 48, 336, 15, 15
	 									, x*32, y*32, 32, 32);
				break;

			case 1 : // ground
				context.drawImage(tiles, 0, 0, 16, 16
	 									, x*32, y*32, 32, 32);
				break;

			case 2 : //coin blocks
				context.drawImage(tiles, 384, 0, 16, 16
	 									, x*32, y*32, 32, 32);// 384 = 24*16;
				break;

			case 4 : // stairblocks
				context.drawImage(tiles, 0, 16, 16, 16
	 									, x*32, y*32, 32, 32);
				break;

			case 5 : // pole
				context.drawImage(tiles, 16*16, 9*16, 16, 16
	 									, x*32, y*32, 32, 32);//
				break;

			case 6 : // flag
				context.drawImage(tiles, 48, 336, 16, 16
	 									, x*32, y*32, 32, 32);
				break;

				// context.drawImage(flagImage, 0, 0, 32, 32
	 		// 							, x*32, y*32, 32, 32);
				// break;

			case 7 : //pipeLeft
				context.drawImage(tiles, 48, 336, 15, 15
	 									, x*32, y*32, 32, 32);
				context.drawImage(tiles, 0, 9*16, 15, 15
	 									, x*32, y*32, 32, 32);
				break;

			case 8 : //pipeRight
				context.drawImage(tiles, 48, 336, 14, 14
	 									, x*32, y*32, 32, 32);
				context.drawImage(tiles, 16, 9*16, 16, 16
	 									, x*32, y*32, 32, 32);
				break;

			case 9 : // pipeUpperleft
				context.drawImage(tiles, 0, 8*16, 16, 16
	 									, x*32, y*32, 32, 32);
				break;

			case 10 : //pipeUpperRight
				context.drawImage(tiles, 16, 8*16, 16, 16
	 									, x*32, y*32, 32, 32);
				break;
		}
	}



	//for sky
	// for(var i=0; i<75; i++){
	// 	for(var j=0; j<33; j++){
	// 		context.drawImage(tiles, 48, 336, 16, 16
	// 								, i*16, j*16, 16, 16);
	// 	}
	// }
	// ///for ground
	// for(var i=0; i<38; i++){
	// 	context.drawImage(tiles, 0, 0, 16, 16,
	// 					   i*32, 440, 32, 32);
	// 	context.drawImage(tiles, 0, 0, 16, 16,
	// 					   i*32, 470, 32, 32);
	// }
}













