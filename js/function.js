
// Shuffle function from http://stackoverflow.com/a/2450976
var shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to display symbol of the clicked card
function displaySymbol(card) {
	for (let i = 0 ; i < card.classList.length ; i++ ) {
		// Check if this card is previously opended and remove 'open' and 'show' class if it is already opened
		if ((card.classList.item(i) === 'open') || (card.classList.item(i) === 'show') ) {
			card.classList.remove('open', 'show');
			// Return the already opened card after removing open and show class
			return card;
		}
	}
	card.classList.add('open', 'show');
}

// Function to add the clicked card to the opened card list
function addCardToOpenList(card, list_array) {
	for (let i = 0 ; i < card.classList.length ; i++ ) {
		// Add only the card which has 'open' and 'show' class from display symbol function
		if ((card.classList.item(i) === 'open') || (card.classList.item(i) === 'show') ) {
			list_array.push(card);
			return list_array;
		}
	}
	// Return empty card list array when the same card was clicked twice
	return list_array = [];
}

// Function to match the clicked two cards 
function matchCards(cardList_array) {
	var list = cardList_array;
	// Match the clicked two cards in the list array
	if (list[0].children[0].classList.item(1) === list[1].children[0].classList.item(1)) {
		list[0].classList.add('match');
		list[1].classList.add('match');
		list =[];	
	}		
	// Not match the clicked two cards in the list array
	else {	
		setTimeout(hideSymbol(list) , 300);	
		list =[];
	}
	return list;
}

// Function to hide the symbol of the opened cards when not matched
function hideSymbol(list_array) {
	// Get the card array list to close cards and return the function which is able to be used as a parameter in SetTimeOut function
	return function () {
	list_array[0].classList.remove('open','show');
	list_array[1].classList.remove('open','show');
	}
}

// Function to reduce a star 
function reduceStar() {
	let starList = [];
	starList = document.getElementsByClassName('fa-star');
	// Remove a star every 20 times of click trial; moveCounter
	starList[0].classList.remove('fa-star');
}

// Function to check all cards are matched & open a modal
function checkAllMatched() {
	if (document.getElementsByClassName('match').length === 16) {		
		// Stop Timter
		clearInterval(timeCounting);
		// Call Nodal Function
		openModal();
	}
}

// Function for modal
function openModal() {
	// Get the modal
	var modal = document.getElementById('myModal');
	// Get the score
	var score = document.getElementsByClassName('fa-star').length;
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// Get the <p> element to insert the modal content
	var modalContent = document.getElementsByClassName('modal-content')[0].children[1];
	// When all cards are matched, open the modal 
	modal.style.display = "block";	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
		    modal.style.display = "none";
		}
	}
	// Comments of the modal when users have no MOVES
	if (moveCounter > 60) {
		modalContent.textContent = "Try Again! Click the reset!";
	}
	// Comments of the modal when users WIN
	else {
		modalContent.textContent = `Congrat! Your score is ${score} out of 3 stars with ${timer} seconds. If you want to play it again, Click the reset!`;
	}
}

function reset() {
	// Initialize timer
	timer = 0;
	// Empty openCardList
	openCardList = [];
	// Initialize moveCounter and display it to the page
	moveCounter = 0;
	document.getElementsByClassName('moves')[0].textContent = moveCounter;
	// Initialize all cards by removing values of 'open' 'show' and 'match' class in each card class
	for (let i = 0 ; i < document.getElementsByClassName('card').length ; i++ ) {
		document.getElementsByClassName('card')[i].classList.remove('open', 'show', 'match');
	}
	// Initialize star rating when stars are under three
	let starsClass = document.getElementsByTagName('i');
	for (let j = 0 ; j < 3 ; j++) {
		starsClass[j].classList.add('fa-star');
	}
}

