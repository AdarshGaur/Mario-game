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
	y: 392,
	speedX: 0,
	speedY: 3,
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
		// player.x += player.speedX;
	 	player.xSprite = 290;

	 	// console.log(player.x);
	}
	if(moves[39]){//right
		player.speedX += 0.5;
		player.faceRight = true;
		player.faceLeft = false;
		// player.x += player.speedX;
		player.xSprite = 30;
	}
	if(moves[38] && player.jumping==false){//jump
		// player.gravitySpeed += player.gravity;
		// console.log(player.gravitySpeed);
		player.speedY -= 25;
		player.jumping = true;
		// player.y -= player.speedY + player.gravitySpeed;
	}
	// if(moves[40]){//down
	//  	player.y += player.speedY + player.gravitySpeed;
	//  	// console.log(player.y);
	// }

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

	// // event.preventDefault() // stop the button from scrolling the page
	// if(event.keyCode == 37){// left
	// 	// drawBackground();
	// 	player.x -= 10;
	// 	player.xSprite = 290;
	// 	console.log(player.x);
	// }
	// if(event.keyCode == 39){//right
	// 	player.x += 10;
	// 	player.xSprite = 30;
	// }
	// if(event.keyCode == 38){//up
	// 	player.y -= 30;
	// }
	// if(event.keyCode == 40){//down
	// 	player.y += 30;
	// 	console.log(player.y);
	// }

requestAnimationFrame(updateGameArena);

// window.addEventListener('keydown', function (e) {
//             myGameArea.keys = (myGameArea.keys || []);
//             myGameArea.keys[e.keyCode] = (e.type == "keydown");
//         })
//         window.addEventListener('keyup', function (e) {
//             myGameArea.keys[e.keyCode] = (e.type == "keydown");            
//         })


// for drawing mario from sprite
function mariodraw(xSprite, ySprite, wSprite, hSprite, x_pos, y_pos, width, height){
	context.drawImage(marioImage, xSprite, ySprite, wSprite, hSprite
							, x_pos	, y_pos, width, height);
	console.log("heelllooooo, i'm v good rn");
}


//function for drawing floor and sky
function init(){
	//for sky
	for(var i=0; i<80; i++){
		for(var j=0; j<30; j++){
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













