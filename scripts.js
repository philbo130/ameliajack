$(document).ready(function() {

/*//////////////////////////////////////
	   amelia's blackjack game
//////////////////////////////////////*/

//////////////variables/////////
var ameliaScore = 0;
var playerScore = 0;
var ameliaCandy = 5;
var playerCandy = 5;
var candyPot = 0;
var ameliaAce = false;
var playerAce = false;

/* jQuery grabber variables */
var $startButton = $('#start');
var $hitButton = $('#hit');
var $stayButton = $('#stay');
var $betButton = $('#bet');
var $revealButton = $('#reveal');
var $middle = $('#middle');

/* card constructor variables */
var card1 = new Card; 
var card2 = new Card;
var card3 = new Card; 
var card4 = new Card;

/////////////////FUNCTIONS/////////////////

// constructor function to generate random card.. OK, now I realize NOT the best way to do this.
//will refactor late if time

function Card() {
	this.randSuit = function() {
        return Math.floor(Math.random() * 4);
    }, 
    this.suitArr = ['hearts','spades', 'diamonds', 'clubs'], 
    this.suit = this.suitArr[this.randSuit()],

    this.randVal = function() {
        return Math.floor(Math.random() * 13);
    }, 
    //get the face for the card value by index position
    this.faceArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    this.face = this.faceArr[this.randVal()];

    this.getValue = function() {
	    if (typeof this.face == 'number') {
	    		return this.face;
	    	} else if (this.face === 'A') {
	    		return 11;
	    	} else {
	    		return 10;
	    	}
    }
    this.value = this.getValue();

} //<---closes out the getCard constructor function


//add to HTML("Player bets first. Place your bet by selecting the bet button.");

//functions to get random card
var suit = '';
var face = 0;
var value = 0;

function getSuit() {
	var suits = ['hearts','spades', 'diamonds', 'clubs'];
    suit = suits[(Math.floor(Math.random() * 4))];
    return suit;
}

function getFace() {
	var faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    face = (faces[Math.floor(Math.random() * 13)]);
    return face;
}

function getVal() {
if (typeof face == 'number') {
		value = parseInt(face);
	} else if (face === 'A') {
		value = 11;
	} else {
		value = 10;
	} 
	return value;
} 

//Check for blackjack
function checkBlackJack() {
	console.log('checking blackjack');
	if (playerScore === 21 && ameliaScore === 21) {
		console.log('checking both');
		$('header > h2').empty();
		var message = $('<h2>').text('Draw. Everybody gets their candy back');
		$('header').append(message);

		//return candy to player and amelia
		$('#playerCandyContainer').append($('#middle > #candy:first-child'));
		$('#ameliaCandyContainer').append($('#middle > #candy:first-child'));
		playerCandy += 1;
		ameliaCandy +=1;
		candyPot = 0;
	} else if (playerScore === 21) {
		console.log('checking player');
		$('header > h2').empty();
			var message = $('<h2>').text('BLACKJACK!!! You just won all of the candy.');
			$('header').append(message);

			//moves candy from middle to player
			$('#playerCandyContainer').append($('#middle > #candy'));
			playerCandy += candyPot;
			candyPot = 0;

	} else if (ameliaScore === 21) {
		console.log('checking amelia');
		$('#playerCardContainer:first-child').removeAttr('id', 'back');
		$('header > h2').empty();
			var message = $('<h2>').text('Amelia has BLACKJACK!!! She just won all the candy.');
			$('header').append(message);

		$('#ameliaCandyContainer').append($('#middle > #candy'));
			ameliaCandy += candyPot;
			candyPot = 0;
	} else {
		return;
	}
	initialBet = true;
} 


////////////////BEGIN GAME/////////////////

$startButton.click(function(e) {
	//clears out any existing text in the h2, resets the playerScore and ameliaScore to 0
	$('header > h2').empty();

	//remove all cards
	$('#playerCardContainer').empty();
	$('#ameliaCardContainer').empty();

	ameliaScore = 0;
	playerScore = 0;
	ameliaCandy = 6;
	playerCandy = 6;
	candyPot = 0;
	initialBet = true;

	var message = $('<h2>').text('Amelia wants to play ameliajack with you. Select the BET button to make a bet.');
	$('header').append(message);
})

// time to bet, player selects HIT button
var initialBet = true;


$betButton.click(function(e) {
	//remove all cards
	$('#playerCardContainer').empty();
	$('#ameliaCardContainer').empty();
	
	if (initialBet == true) {

	$middle.append($('#playerCandyContainer > #candy:first-child'));

	ameliaCandy -= 1;
	candyPot += 1;
	
	//amelia places bet
	setTimeout(function() {
	$middle.append($('#ameliaCandyContainer > #candy:first-child'));
	//$middle.append($('#playerCandyContainer > #candy')); //<-- takes EVERTHING

	playerCandy -= 1;
	candyPot += 1;

	return;

	}, 1500); //<--- closes set timeout to place bets

	//invoke constructor function to generate random cards. 
	setTimeout(function() {	
		//get player cards
		var value = card1.value;
		var suit = card1.suit;
		var face = card1.face;

		//add card value to playerScore
		playerScore += value;
		
		//recording if card is an ace
		if (face === 'A') {
			playerAce = true;
		}
		console.log(value);
		console.log(suit);
		console.log(face);

		//create new div, and add class for suit and data value for value
		var $card = $('<div>').addClass(suit).addClass('card').html(face);
		$('#playerCardContainer').append($card);	
		
		value = card2.value;
		suit = card2.suit;
		face = card2.face;

		//add card values to playerScore
		playerScore += value;

		//recording if card is an ace
		if (face === 'A') {
			playerAce = true;
		}

		//create new div, and add class for suit and data value for value
		var $card = $('<div>').addClass(suit).addClass('card').html(face);
		$('#playerCardContainer').append($card);	

		console.log(playerScore);

	}, 3000); //<--- closes set timeout for player to get cards

	setTimeout(function() {
		//get amelia's cards
		var value = card3.value;
		var suit = card3.suit;
		var face = card3.face;
		
		//add amelia card value to ameliaScore
		ameliaScore+= value;

		//recording if card is an ace
		if (face === 'A') {
			ameliaAce = true;
		}

		//create new div, and add class for suit and data value for value
		var $card = $('<div>').addClass(suit).addClass('card').html(face).attr('id', 'back');
		$('#ameliaCardContainer').append($card);	

		//get amelia's cards
		var value = card4.value;
		var suit = card4.suit;
		var face = card4.face;

		//add amelia card vaue to ameliaScore
		ameliaScore += value;

		//recording if card is an ace
		if (face === 'A') {
			ameliaAce = true;
		}

		//create new div, and add class for suit and data value for value
		var $card = $('<div>').addClass(suit).addClass('card').html(face);
		$('#ameliaCardContainer').append($card);

		checkBlackJack();

		return;

	}, 4000); //<--- closes set timeout

	//Give player moment to review cards, then ask if they want to hit or stay
	setTimeout(function() {
		$('header > h2').empty();
		//var message = $('<h2>').text('Would you like to HIT or STAY?');
		//$('header').append(message);

	 }, 7000); //<--- closes set timeout to dislay message

	//set initialBet to be false, so another initial bet cannot be made until next round
	initialBet = false;
	
	}//<---closes out initial bet

}) //<--closes out the bet button click function


//Player hits HIT button to get another card
$hitButton.click(function(e) {
	//using getCardSuit and getCardVal functions to get card
	getSuit();
	getFace();
	getVal();

	playerScore += value;

	//recording if card is an ace
	if (face === 'A') {
		playerAce = true;
	}

	console.log(value);
	console.log(face);
	console.log(suit);

	//adding the player's card to the game board
	var $card = $('<div>').addClass(suit).addClass('card').html(face);
		$('#playerCardContainer').append($card);	

	//if playerScore over 21 and no ace, BUST

	if ((playerScore > 21) && (playerAce == false )) {
		$('header > h2').empty();
		var message = $('<h2>').text('BUST! Amelia won this hand, and gets all of the candy.');
		$('header').append(message);

		setTimeout(function() {
		//move all candy from pot to amelia on gameboard
		$('#ameliaCandyContainer').prepend($('#middle > #candy'));
		ameliaCandy += candyPot;
		candyPot = 0;

		}, 3000); //<--- closes set timeout

	} //<---closes out the > 21, no ace if statement

	//if playerScore over 21 and Ace
	if ((playerScore > 21) && (playerAce == true)) {
		playerScore -= 10;
		playerAce = false;

		console.log(playerScore);

	} //<---closes out the >21 with ace 

}) //<---closes out the hit button click function

//STAY button triggers amelia's move
$stayButton.click(function(e) {
	
	// if ameliaScore < 17, get another card
	while (ameliaScore < 17) {
		$('header > h2').empty();
			var message = $('<h2>').text('Amelia is taking another card.');
			$('header').append(message);
		console.log('clicked');

		getSuit();
		getFace();
		getVal();
		ameliaScore += value;

		//recording if card is an ace
		if (face === 'A') {
			playerAce = true;
		}

		//adding the amelia's card to the game board
		var $card = $('<div>').addClass(suit).addClass('card').html(face);
		$('#ameliaCardContainer').append($card);	

		//if ameliaScore over 21, BUST
		if ((ameliaScore > 21) && (ameliaAce = false)) {
			$('header > h2').empty();
			var message = $('<h2>').text('BUST! You won this hand, and you get all of the candy.');
			$('header').append(message);

			setTimeout(function() {
			//move all candy from pot to amelia on gameboard
				$('#playerCandyContainer').prepend($('#middle > #candy'));
				playerCandy += candyPot;
				candyPot = 0;
			}, 5000); //<--- closes set timeout to move amelia's candy
		

		} else if ((ameliaScore > 21) && (ameliaAce = true)) {
			playerScore -= 10;
			playerAce = false;

		}//<---closes out the > 21'  if statement	

	}//<--- closes out the if 17 if-else statement
	checkWinner();
})
	

//determine winner. If amelia cards > player cards && <= 21, amelia wins. 

function checkWinner() {
	$('header > h2').empty();
		var message = $('<h2>').text("Let's see who won." );
		$('header').append(message);
		
	if (playerScore == ameliaScore) {
		$('header > h2').empty();
		var message = $('<h2>').text('Draw. Everybody gets their candy back');
		$('header').append(message);

		//return candy to player and amelia
		$('#playerCandyContainer').prepend($('#middle > #candy:first-child'));
		$('#ameliaCandyContainer').prepend($('#middle > #candy:first-child'));
		playerCandy += 1;
		ameliaCandy +=1;
		candyPot = 0;

	//if amelia score is higher
	} else if ((ameliaScore > playerScore) && (ameliaScore < 21)) {
		$('header > h2').empty();
			var message = $('<h2>').text('Amelia won, and just took her candy winnings.');
			$('header').append(message);

		$('#ameliaCandyContainer').prepend($('#middle > #candy'));
			ameliaCandy += candyPot;
			candyPot = 0;
		
		} 	else {

		//player wins
		$('header > h2').empty();
		var message = $('<h2>').text('You won! Enjoy your candy winnings.');
		$('header').append(message);

		//move candy to player container
		$('#playerCandyContainer').prepend($('#middle > #candy'));
		playerCandy += candyPot;
		candyPot = 0;
		} 

	//sets switch back so player can make another initial bet
	initialBet = true;

} //<---closes out the checkWinner function

$revealButton.click(function(e) {
	//remove back of card to show amelia's first card
	$('#ameliaCardContainer > .card').removeAttr('id', 'back');
})

}); //<--closes out the document ready jQuery


//*/////////////BELOW IS ALL CODE THAT DIDN'T WORK//////////////////////


//Tried to get card1 and card2 using a loop. didn't work
// //using loop to get card1 and card2
// 	for (var i = 1; i < 2; i++) {
// 		var value = card + toString(i).cardVal;
// 		var suit = card + toString(i).cardSuit;
// 		var value = card + toString(i+1).cardVal;
// 		var suit = card + toString(i+1).cardSuit;	
// 		return;
// }

/////////////to get value of card. Doesn't work, because "typeof face" always comes back as "string"
 // function getVal() {
 //    if (typeof face === 'number') {
 //    		value == face;
 //    	} else if (face === 'A') {
 //    		value = 11;
 //    	} else if {
 //    		value = 10;
 //    	}
 //    	return;
 // } //<---closes out the getVal function


//////////this doesn't work!!!!!!!! WHY????
//  function getFace() {
// 	randNum = Math.floor(Math.random() * 13);
//     this.face = faces[randNum];
//     face = this.face;

// 	this.getValue = function() {
// 	    if (typeof this.face == 'number') {
// 	    		return this.face;
// 	    	} else if (this.face === 'A') {
// 	    		return 11;
// 	    	} else {
// 	    		return 10;
// 	    	}
//     }
//     this.value = this.getValue();
//     return;
// }


////////USED THIS TO GRAB RANDOM CARD, BUT ALWAYS RETRIEVED THE SAME CARD
// var nextPlayerCard1 = new Card;
// 	var value = card3.cardVal;
// 	playerScore += value;

// 	var suit = card3.cardSuit;
// 	var face = card3.cardFace;

////USED THIS IN MY CONSTRUCTOR FUNCTION, BUT FACE AND VALUE WERE COMING OUT DIFF
// this.value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11 ], 
//     this.cardVal = this.value[this.randVal()];
//     console.log(this.RandVal);

//     //get the face for the card value by index position
//     this.face = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
//     this.cardFace = this.face[this.randVal()];

//////////////////////////
//var $card = $('<div>').addClass(suit).addClass('card').html(value);
//$('#playerCardContainer').append($card);

//From Alex - overwrite something you’re appending use 
//.empty() comme ca: $("#counter").empty().append(numberPlusCard);
