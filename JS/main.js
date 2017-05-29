window.onload = function() {

	//Declacring variables
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var lineCanvas = document.getElementById("lineCanvas");
	var ltx = lineCanvas.getContext("2d");

	var W = window.innerWidth;
	var H = window.innerHeight;

	canvas.width = W;
	canvas.height = H;
	lineCanvas.width = W;
	lineCanvas.height = H;

	// variables
	var nDots = 100;
	var dots = [];
	var warmColor = ['#793F0D','#AC703D','#C38E63','#E49969','#E5AE86','#EEC5A9'];
	var gorgeousColor = ['#006884','#00909E','#89DBEC','#ED0026','#FA9D00','#FFD09D'];

	var sDot, eDot;

	for (var i = 0; i < nDots; i++) {
		var randomIndex = Math.floor(Math.random() * gorgeousColor.length);
		dots.push({
			x: Math.random()* W, // x coord
			y: Math.random()* H, // y coord
			r: Math.random() * 10, // radius
			sx: Math.random() * 2,// speed x
			sy: Math.random() * 2,// Speed y
			c: randomIndex  // color Index
			});
	};

	//drawing dots on the screen in different colour and attributes
	function draw() {
		ctx.clearRect(0,0,W,H);
		for (var i = 0;  i < nDots; i++) {
			//ctx.clearRect(dot.x,dot.y,dot.r * 2,dot.r * 2);
			ctx.beginPath();
			var dot = dots[i];
			ctx.fillStyle = gorgeousColor[dot.c];
			ctx.moveTo(dot.x, dot.y);
			ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2, true);
			ctx.fill();
		};
		update();

	};

	function update(){
		// the dots should move around slowly in random directions, with different changes in moves, they should move individually

		for (var i = 0; i < nDots; i++) {
			var dot = dots[i];
			dot.x += dot.sx;
			dot.y += dot.sy;
			// Bounce against wall
			if ((dot.x + dot.sx) > W-dot.r || (dot.x + dot.sx) < dot.r)
				dot.sx = -dot.sx;
			if ((dot.y + dot.sy > H-dot.r) || (dot.y + dot.sy) < dot.r)
				dot.sy = -dot.sy;
		};

		drawConnection(sDot,eDot);
	};

	function changeDirection(){
		//changes the direction of 2 dots, and also give sDot and eDot a value so they can be used in drawConnection
		var xRandom = Math.random() < 0.5 ? -1: 1;
		var yRandom = Math.random() < 0.5 ? -1: 1;
		var randomDotStartIndex = Math.floor(Math.random() * dots.length);
		var randomDotEndIndex = Math.floor(Math.random() * dots.length);
		sDot = dots[randomDotStartIndex];
		eDot = dots[randomDotEndIndex];
		sDot.sx = Math.random() * xRandom;
		sDot.sy = Math.random() * yRandom;
		eDot.sx = Math.random() * yRandom;
		eDot.sy = Math.random() * yRandom;
	};

	function drawConnection(fDot, nDot){
		//draws a line from one dot to another one on a different canvas.
		// wont draw when first dot is undefined
		if (typeof fDot != 'undefined') {
			ltx.clearRect(0,0,W,H);
			ltx.beginPath();
			ltx.moveTo(fDot.x, fDot.y); //move to first dot
			//add so the line spreads through all dots?
			ltx.lineTo(nDot.x, nDot.y);// line to second dot
			ltx.strokeStyle = "white";
			ltx.lineWidth = Math.abs(fDot.r - sDot.r);
			ltx.stroke();
		}
	};

	// looping draw to update and change direction on 2 random dots
	setInterval(draw, 33);
	setInterval(changeDirection, 3000);
};
