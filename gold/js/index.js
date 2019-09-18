//游戏结束提示，获得多少分，元宝分值及时间
var stage, loader;
var background, manImg, man, start;
var C_W, C_H, SPEED = 3, COIN_W = 100, COIN_H = 56, COIN_X = 30, COIN_Y = 30;
var allCoins = [], countCoins = document.getElementById("coins");
var loop, time = document.getElementById("time"), time_count = document.getElementById("timeCount");
var vx = 0;
var game_over;

window.onload = function() {
	init();
}

function init(){
	stage = new createjs.Stage("canvas");
	C_W = stage.canvas.width;
	C_H = stage.canvas.height;

	var manifest = [
		{src: "./img/bg.jpg", id: "background"},
		{src: "./img/man.png", id: "man"},
		{src: "./img/coin.png", id: "coin"},
		{src: "./img/start.png", id: "start"},
		{src: "./audio/score.mp3", id: "sound"},
	];

	loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.on("complete", handlerComplete);
	loader.loadManifest(manifest);
}
function registerSound(event){
	sound = event.src;
}
function handlerComplete(){
	var bgImg = loader.getResult("background");
	background = new createjs.Shape();
	background.graphics.bf(bgImg).drawRect(0, 0, C_W, C_H);
	stage.addChild(background);

	manImg = loader.getResult("man");
	man = new createjs.Bitmap(manImg);
	man.x = 400;
	man.y = 385;
	stage.addChild(man);

	var startImg = loader.getResult("start");
	start = new createjs.Bitmap(startImg,);
	start.x = 360;
	start.setTransform(start.x, 240, 0.5, 0.5);
	stage.addChild(start);
	start.addEventListener("click",handlerStartGame);
	
	game_over = new createjs.Text('Game Over !!!','50px Algerian','yellow');
	game_over.x = 320;
	game_over.y = 150;
	game_over.shadow = new createjs.Shadow("#000000", 5, 5, 10)
	game_over.visible = false;
	stage.addChild(game_over);

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}

function handlerStartGame(){
	start.visible = false;
	time.innerHTML = 10;
	countCoins.innerHTML = 0;
	time_count.style.display = 'block';
	var coinImg = loader.getResult("coin");
	coinsHandle(coinImg);

	window.addEventListener("keydown", handlerKeyDown);
}

function coinsHandle(coins){
	loop = setInterval(function(){
		var coin = createCoin(coins);
		allCoins.push(coin);
		time.innerHTML = parseInt(time.innerHTML) - 1;
		if(vx != 0) vx--;
		if(time.innerHTML == "0"){
			clearInterval(loop);
			gameOver();
		}
	}, 1000);
}
function gameOver(){
	start.visible = true;
	game_over.visible = true;
	time_count.style.display = 'none';
	man.x = 400;
	man.y = 385;
	coins.visible = false;
	allCoins.forEach(function(cc, index){
		if(cc.shape.visible){
			cc.shape.visible = false;
		}
	});
}
function tick(event){
	if(!start.visible){
		man.x += vx;
		if(man.x < 0) man.x = 0;
		else if(man.x + manImg.width > C_W) man.x = C_W - manImg.width;
		if(man.y < 0) man.y = 0;
		else if(man.y + manImg.height > C_H) man.y = C_H - manImg.height;

		allCoins.forEach(function(cc, index){
			if(cc.shape.visible){
				if((cc.shape.x + cc.size().w) > man.x && cc.shape.x < (man.x + manImg.width) && (cc.shape.y + cc.size().h) > (man.y + manImg.height/2)){
					cc.isget = true;
					countCoins.innerHTML = parseInt(countCoins.innerHTML) + 1;
					createjs.Sound.play("sound");
				}
				cc.update();
			}
		});
	}
	stage.update(event);
}

function handlerKeyDown(event){
 	switch(event.keyCode){
 		case 65://A
 			vx = -4;
 			break;
 		case 68://D
 			vx = 4
 			break;
 	}
}
