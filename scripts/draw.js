var canvas = document.getElementById('wave');
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;

var binW = 45;
var recW = (binW/1000)*cw;
var recW2 = 3*binW;
var recW3 = 5*binW;


function position(x){
		return 5 + (x/1005)*cw;
}

function draw(x){
		posx = position(x)
		ctx.beginPath();
		ctx.fillStyle = "#d3961f";
		ctx.fillRect(posx-recW3/2, 0, recW3, 150);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "#a4cea3";
		ctx.fillRect(posx-recW2/2, 0, recW2, 150);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "#dd5d3e";
		ctx.fillRect(posx-recW/2, 0, recW, 150);
		ctx.stroke();

}

function drawguess(){
		clearboard()	
		draw(randpos)

		var guess = document.getElementById("guesser").value
		ctx.beginPath();
		ctx.fillStyle = "#d42838";
		ctx.fillRect(position(guess)-2, 0, 4, 150);
		ctx.stroke();

		score(randpos, guess)


}

var points = 0

function score(randpos, guess){
		if (between(guess, randpos - binW/2, randpos + binW/2)){
				document.getElementById("score").innerHTML = '<div class="score">4 points!!!</div>';
				points = 4;
		} else if (between(guess, randpos - 3*binW/2, randpos + 3*binW/2)){
				document.getElementById("score").innerHTML = '<div class="score">3 points!!</div>';
				points = 3;
		} else if (between(guess, randpos - 5*binW/2, randpos + 5*binW/2)){
				document.getElementById("score").innerHTML = '<div class="score">2 points!</div>';
				points = 2;
		} else {
				document.getElementById("score").innerHTML = '<div class="score">0 points</div>';
				points = 0;
		}
}


function between(x, min, max) {
		return x >= min && x <= max;
}

function button_peek(){
		draw(randpos);
		gtag('event', 'peek');
}


function button_guess(){
		drawguess();
		gtag('event', 'guess');
}

function update_seed(){
		Math.seedrandom();
		$("#seed").val(Math.floor(Math.random() * 10000));
		fire();
		gtag('event', 'update_seed');
}

function new_clue(){
		var seed = document.getElementById("seed").value;
	    var clue_num = 0;
		if (seed.split('(')[1]) { clue_num = seed.split('(')[1].split(')')[0] }
		clue_num++;
		$("#seed").val(seed.split('(')[0].concat('(').concat(clue_num).concat(')'));
		fire();

		document.getElementById("guessdisp").innerHTML = "50";
		document.getElementById("guesser").value = 500;
	
		gtag('event', 'new_clue');
}


function update_percentages(){
		var text = document.getElementById("guessdisp");
		text.style.display = "none";
		gtag('event', 'display_percentage');
}

function button_clear(){
		clearboard();
		gtag('event', 'clear_board');

		document.getElementById("guessdisp").innerHTML = "50";
		document.getElementById("guesser").value = 500;
}
