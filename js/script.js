//

let img = new Image();
img.src = '../img/spritesheet.png';

img.onload = function(){
	init();
}

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

function init(){
	
	for(var i=0; i<38; i++){
		context.drawImage(img, 0, 0, 16, 16,
						   i*32, 440, 32, 32);
		context.drawImage(img, 0, 0, 16, 16,
						   i*32, 470, 32, 32);
	}
}