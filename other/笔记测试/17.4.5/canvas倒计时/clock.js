var WINDOW_WIDTH = 1124,
	WINDOW_HEIGHT = 500,
	R = 8;
var LEFT = 60;
var TOP = 30;

// var endTime = new Date(2017, 3, 6, 18, 0, 0);
var curShowTimeSeconds = 0;



var balls = [];
var colors = ["#fe6471", "#f4b2a6", "#ecccb3", "#bcefd0", "#a1e8e4", "#22c8b2", "#c3ecee", "#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900"]

window.onload = function() {
	WINDOW_WIDTH=document.documentElement.clientWidth;
	WINDOW_HEIGHT=document.documentElement.clientHeight;

	LEFT=Math.round(WINDOW_WIDTH/10);
	R=Math.round(WINDOW_WIDTH*4/5/108)-1;

	TOP=Math.round(WINDOW_HEIGHT/5)

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(
		function() {
			if(!document.hidden){

	            render( ctx );
	            update();

            }
		}, 50);
}

function getCurrentShowTimeSeconds() {
	var curTime = new Date();
	// var ret = endTime.getTime() - curTime.getTime();
	// ret = Math.round(ret / 1000);

	// return ret >= 0 ? ret : 0;

	 var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

    return ret;
}

function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var hours = parseInt(curShowTimeSeconds / 3600),
		minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60),
		seconds = curShowTimeSeconds % 60;

	var nextHours = parseInt(nextShowTimeSeconds / 3600),
		nextMinutes = parseInt((nextShowTimeSeconds - hours * 3600) / 60),
		nextSeconds = nextShowTimeSeconds % 60;

	if (nextSeconds != seconds) {
		var num = [];
		num[0] = 0;
		var LEFTS = [];
		LEFTS[0] = LEFT;

		var numMarginLeft = 1;

		var timeNum = [hours / 10, hours % 10, 10, minutes / 10, minutes % 10, 10, seconds / 10, seconds % 10];

		for (var i = 0; i < 8; i++) {
			if (i == 3 || i == 6) {
				num[i] = num[i - 1] + 2 * 4 + numMarginLeft;
				LEFTS[i] = LEFT + num[i] * (R + 1);
			} else if (i == 0) {
				
			} else {
				num[i] = num[i - 1] + 2 * 7 + numMarginLeft;
				LEFTS[i] = LEFT + num[i] * (R + 1);
			}

			

			// addBalls(LEFTS[i], TOP, parseInt(timeNum[i]));

		}

		if (parseInt(hours/10)!=parseInt(nextHours/10)) {
					addBalls(LEFTS[0],TOP,parseInt(timeNum[0]));
				}
			if (parseInt(hours%10)!=parseInt(nextHours%10)) {
					addBalls(LEFTS[1],TOP,parseInt(timeNum[1]));
				}
			if (parseInt(minutes/10)!=parseInt(nextMinutes/10)) {
					addBalls(LEFTS[3],TOP,parseInt(timeNum[3]));
				}
			if (parseInt(minutes%10)!=parseInt(nextMinutes%10)) {
					addBalls(LEFTS[4],TOP,parseInt(timeNum[4]));
				}
			if (parseInt(seconds/10)!=parseInt(nextSeconds/10)) {
					addBalls(LEFTS[6],TOP,parseInt(timeNum[6]));
				}
			if (parseInt(seconds%10)!=parseInt(nextSeconds%10)) {
					addBalls(LEFTS[7],TOP,parseInt(timeNum[7]));
				}

		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
	// console.log(balls.length);
}

function render(ctx) {

	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds / 3600),
		minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60),
		seconds = curShowTimeSeconds % 60;

	var num = [];
		num[0] = 0;
	var LEFTS = [];
		LEFTS[0] = LEFT;

	var numMarginLeft = 1;

	var timeNum = [hours / 10, hours % 10, 10, minutes / 10, minutes % 10, 10, seconds / 10, seconds % 10];

	for (var i = 0; i < 8; i++) {
		if (i == 3 || i == 6) {
			num[i] = num[i - 1] + 2 * 4 + numMarginLeft;
			LEFTS[i] = LEFT + num[i] * (R + 1);
		} else if (i == 0) {} else {
			num[i] = num[i - 1] + 2 * 7 + numMarginLeft;
			LEFTS[i] = LEFT + num[i] * (R + 1);
		}

		renderDigit(LEFTS[i], TOP, parseInt(timeNum[i]), ctx);

	}

	for (var i = 0; i < balls.length; i++) {
		ctx.fillStyle=balls[i].color;

		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
		ctx.closePath();

		ctx.fill();
	}
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				var aBall = {
					x: x + j * 2 * (R + 1) + (R + 1),
					y: y + i * 2 * (R + 1) + (R + 1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy: -5 + Math.random(),
					color: colors[Math.floor(Math.random() * colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= WINDOW_HEIGHT - R) {
			balls[i].y = WINDOW_HEIGHT - R;
			balls[i].vy = -0.7 * balls[i].vy;
		}
	}

	for (var i = 0; i < balls.length; i++) {

		if (!(balls[i].x+R>0 && balls[i].x-R<WINDOW_WIDTH)) {

			balls.splice(i,1);

		}

	}

}

function renderDigit(x, y, num, ctx) {
	ctx.fillStyle = '#ef3d61';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				ctx.beginPath();
				ctx.arc(x + j * 2 * (R + 1) + (R + 1), y + i * 2 * (R + 1) + (R + 1), R, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}