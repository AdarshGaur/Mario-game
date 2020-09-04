//
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var player = {
	xSprite: 0,
	ySprite: 0,
	width: 32,
	height: 50,
	jumping: false,
	faceLeft: false,
	faceRight: true,
	x: 224,//224
	y: 292,//392
	speedX: 0,
	speedY: 0,
	previousX: 224,
	previousY: 292
}

var countL = 1;
var countR = 1;

var camera = 700;

var indexX = 0;
var indexY = 0;
var map_index = 0;

///for storing key presses
var moves = [];


///////LAYOUT////
// width or columns = 130;
//height or rows = 15;
var map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

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
flagImage.src = '../img/flag.png';
flagImage.onload = function(){
	context.drawImage(flagImage, 0, 0, 32, 32, 0, 0, 32, 32);
}

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

	if(moves[85]){/// u == 85
		player.speedX += 10;
		//context.translate(-50, 0);
	}

	player.previousX = player.x;
	player.previousY = player.y;

	player.speedY += 1;//for gravity
	player.x += player.speedX;
	player.y += player.speedY;
	player.speedX *= 0.9;//friction
	player.speedY *= 0.9;//friction

	//for stoping mario on the floor
	// if(player.y > 370){
	// 	player.jumping = false;
	// 	player.y = 370;
	// 	player.speedY = 0;
	// 	/// for changing back mario's sprite when touches ground
	// 	if(player.faceRight && player.speedX >= 0 && player.speedX < 0.5){//right
	// 		player.xSprite = 0;
	// 	}
	// 	if(player.faceLeft && player.speedX > -0.5 && player.speedX <= 0){//left
	// 		player.xSprite = 255;
	// 	}
	// }

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

	//var camera = 700;

	/// for moving the screen window left 
	if(player.x > camera && camera<3590){
		context.translate(-5, 0);
		camera += 5;
	}
	///for keeping mario in frame
	if(player.x < camera-700){
		player.x = camera-700;
	}
	if(player.x > 3724){
		player.x = 3724;
	}


	//////////////////////////////////
	///////////COLLISION//////////////
	//////////////////////////////////


	collisionCheck();

	indexX = Math.floor((player.x)/ 32);
	indexY = Math.floor((player.y+20)/ 32);
	map_index = (indexY*130)+(indexX);


	console.log(map[map_index]);
	mariodraw(player.xSprite, player.ySprite, 30, player.height, player.x, player.y, player.width, player.height);

	requestAnimationFrame(updateGameArena);
}

//key movements
window.addEventListener('keydown', function(event){
	moves = (moves || []);
    moves[event.keyCode] = (event.type == "keydown");
    //
})
window.addEventListener('keyup', function (event) {
	moves[event.keyCode] = (event.type == "keydown");
})


requestAnimationFrame(updateGameArena);

////////////////////////////
/////COLLISION FUNCTION/////
////////////////////////////
function collisionCheck(){
	//////////down
	//////////right
	//////////left
	///////////up

	//for finding the index of mario
	// indexX = Math.floor((player.x)/ 32);
	// indexY = Math.floor((player.y+18) / 32);
	// map_index = (indexY*130)+(indexX);
	
	//check right collision
	indexX = Math.floor((player.x+32)/ 32);
	indexY = Math.floor((player.y+20)/ 32);
	map_index = (indexY*130)+(indexX);
	if(map[map_index]!=0){
		player.x = player.previousX;
		player.speedX = 0;
	}

	//////////////////////////////////
	///all posible bottom collision///
	//////////////////////////////////
	if(player.x > player.previousX){///right moving bottom collision
		indexX = Math.floor((player.x+10)/ 32);
		indexY = Math.floor((player.y+18)/ 32);
		map_index = (indexY*130)+(indexX);
		if(map[map_index+130]!=0){
			player.y = player.previousY;
			player.jumping = false;
			player.speedY = 0;
		}
		///////can change player.speedX condition with player.x < or > player.previousX
	}else if(player.speedX < -0.1){////left moving bottom collision
		indexX = Math.ceil((player.x-10)/ 32);
		indexY = Math.floor((player.y+18)/ 32);
		map_index = (indexY*130)+(indexX);
		if(map[map_index+130]!=0){
			player.y = player.previousY;
			player.jumping = false;
			player.speedY = 0;
		}
	}else {
		////check standing bottom collision
		indexX = Math.floor((player.x)/ 32);
		indexY = Math.floor((player.y+18)/ 32);
		map_index = (indexY*130)+(indexX);
		if(map[map_index+130]!=0){
			player.y = player.previousY;
			player.jumping = false;
			player.speedY = 0;
		}
	}



	////check up collision
	indexX = Math.ceil((player.x-10)/ 32);
	indexY = Math.floor((player.y+18)/ 32);
	map_index = (indexY*130)+(indexX);
	if(map[map_index-130]!=0 && player.speedY < 0){
		// if(player.y < ){

		// }
		player.y = player.previousY;
	}

	/// check left collision
	indexX = Math.floor((player.x)/ 32);
	indexY = Math.floor((player.y + 18) / 32);
	map_index = (indexY*130)+(indexX);
	if(map[map_index]!=0){
		player.x = player.previousX;
		player.speedX = 0;
	}
	
}


//function for drawing floor and sky
function init(){
	// canvas.style.backgrounImage = sky;
	for(var i=0; i<1950; i++){
		let x = (i%130);
		let y = Math.floor(i/130);
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
				//first draw sky then poles onto them
				context.drawImage(tiles, 48, 336, 15, 15
	 									, x*32, y*32, 32, 32);
				context.drawImage(tiles, 257, 145, 15, 15
	 									, x*32, y*32, 32, 32);//16*9 = 144
															////16*16 = 256
				///making flag stick to the pole
				if(i == 247){
					context.drawImage(flagImage, 0, 0, 32, 32
	 									, ((x-1)*32)+10, y*32, 32, 32);
				}
				break;

			case 6 : // flag
				//first draw sky behind flag
				context.drawImage(tiles, 48, 336, 16, 16
	 									, x*32, y*32, 32, 32);
				break;

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


// for drawing mario from sprite
function mariodraw(xSprite, ySprite, wSprite, hSprite, x_pos, y_pos, width, height){
	context.drawImage(marioImage, xSprite, ySprite, wSprite, hSprite
							, x_pos	, y_pos, width, height);
	console.log("heelllooooo, i'm v good rn");
	// console.log(camera.x);
}












