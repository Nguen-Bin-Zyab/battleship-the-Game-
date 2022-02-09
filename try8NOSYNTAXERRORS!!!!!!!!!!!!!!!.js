var model={
	numShips: 3,
	shipLength: 3,
	boardSize: 7,
	shipsSunk: 0,
	ships: [{locations: [0, 0, 0], hits: ["", "", ""]}, {locations: [0, 0, 0], hits: ["", "", ""]}, {locations: [0, 0, 0], hits: ["", "", ""]}],
	fire: function(guess){
		for(var i=0; i<this.numShips; i++){
			var ship=this.ships[i];
			var index=ship.locations.indexOf(guess);
			if(index>=0){
				ship.hits[index] = "hit";
				view.displayMessage("HIT!");
				view.displayHit(guess);
				if(this.isSunk(ship)){
					this.shipsSunk++;
					view.displayMessage("you sank my ship");
				}
				return true;
			}
		}
		
		view.displayMessage("MISS!");
		view.displayMiss(guess);
		return false;
	},
	isSunk: function(ship){
		for(var i=0; i<this.shipLength; i++){
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	},
	generateShipLocations: function(){
		var locations;
		for(var i=0; i<this.numShips; i++){
			do{
			locations=this.generateShip();
			}while(this.collision(locations));
			this.ships[i].locations=locations;
		}
	},
	
	generateShip: function(){
		var direction=Math.floor(Math.random() * 2);
		var row, col;
		
		if(direction === 1){
			row=Math.floor(Math.random() * this.boardSize);
			col=Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));	
		}else{
			col=Math.floor(Math.random() * this.boardSize);
			row=Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));	
		}
		
		var newMassive=[];
		for(var i=0; i<this.shipLength; i++){
			if(direction === 1){
			newMassive.push(row + "" + (col+i));
		}else{
			newMassive.push((row+i) + "" + col);
		   }
		}
		return newMassive;
	},
	
	collision: function(locations){
		for(var i=0; i<this.numShips; i++){
			var ship=this.ships[i];
			for(var j=0; j<locations.length; j++){
				if(ship.locations.indexOf(locations[j]) >=0){
					return true;
				}
			}
		}
		return false;
	}
};
	

var view={
	displayMessage: function(msg){
		var newMessage=document.getElementById("messageArea");
		newMessage.innerHTML=msg;
	},
	
	displayHit: function(location){
		var hitSuccess=document.getElementById(location);
		hitSuccess.setAttribute("class", "hit");
	},
	
	displayMiss: function(location){
		var missSuccess=document.getElementById(location);
		missSuccess.setAttribute("class", "miss");
	}
};
	

var controller={
	guesses: 0,
	processGuess: function(guess){
		var newGuess = parseGuess(guess);
		if(newGuess){
	    this.guesses++;
	    var hit=model.fire(newGuess);
		if(hit && model.shipsSunk === model.numShips){
			view.displayMessage("you sank all my battleships, your score is " + this.guesses + " guesses");
		}
    }  
   }
};

function parseGuess(guess){
	var alphabet=["A", "B", "C", "D", "E", "F", "G"];
	if(guess === null || guess.length !== 2){
		alert("please enter a correct number");
	} else{
		var firstChar=guess.charAt(0);
		var row=alphabet.indexOf(firstChar);
		var col=guess.charAt(1);
		
		if(isNaN(row) || isNaN(col)){
			alert("You still enter a wrong number!");
		}else if(row<0 || row > model.boardSize || col<0 || col>model.boardSize){
			alert("OOOPS, thats off the board!");
		}else{
			return row+col;
		}
	}
	return null;
}





function handleFireButton(){
	var guessInput=document.getElementById("guessInput");
	var guess=guessInput.value;
	controller.processGuess(guess);
	guessInput.value="";
}
	
function handleKeyPress(e){
	var jayAnd=document.getElementById("fireButton");
	if(e.keyCode === 13){
		jayAnd.click();
		return false;
	}
}	
	

window.onload=init;
	
function init(){
	var fireButton=document.getElementById("fireButton");
	fireButton.onclick=handleFireButton;
	var guessInput=document.getElementById("guessInput");
	guessInput.onkeypress=handleKeyPress;
	
	model.generateShipLocations();
}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	