/*----- constants -----*/

const masterDeck = [
    {name: c02, value: 2,  src: (css\card-deck-css\images\clubs\clubs-r02.svg) },
    {name: c03, value: 3,  src: (css\card-deck-css\images\clubs\clubs-r03.svg) },
    {name: c04, value: 4,  src: (css\card-deck-css\images\clubs\clubs-r04.svg) },
    {name: c05, value: 5,  src: (css\card-deck-css\images\clubs\clubs-r05.svg) },
    {name: c06, value: 6,  src: (css\card-deck-css\images\clubs\clubs-r06.svg) },
    {name: c07, value: 7,  src: (css\card-deck-css\images\clubs\clubs-r07.svg) },
    {name: c08, value: 8,  src: (css\card-deck-css\images\clubs\clubs-r08.svg) },
    {name: c09, value: 9,  src: (css\card-deck-css\images\clubs\clubs-r09.svg) },
    {name: c10, value: 10,  src: (css\card-deck-css\images\clubs\clubs-r10.svg) },
    {name: cA, value: 11,  src: (css\card-deck-css\images\clubs\clubs-A.svg) },
    {name: cJ, value: 10,  src: (css\card-deck-css\images\clubs\clubs-J.svg) },
    {name: cQ, value: 10,  src: (css\card-deck-css\images\clubs\clubs-Q.svg) },
    {name: cK, value: 10,  src: (css\card-deck-css\images\clubs\clubs-K.svg) },
    {name: d02, value: 2,  src: (css\card-deck-css\images\diamonds\diamonds-r02.svg) },
    {name: d03, value: 3,  src: (css\card-deck-css\images\diamonds\diamonds-r03.svg) },
    {name: d04, value: 4,  src: (css\card-deck-css\images\diamonds\diamonds-r04.svg) },
    {name: d05, value: 5,  src: (css\card-deck-css\images\diamonds\diamonds-r05.svg) },
    {name: d06, value: 6,  src: (css\card-deck-css\images\diamonds\diamonds-r06.svg) },
    {name: d07, value: 7,  src: (css\card-deck-css\images\diamonds\diamonds-r07.svg) },
    {name: d08, value: 8,  src: (css\card-deck-css\images\diamonds\diamonds-r08.svg) },
    {name: d09, value: 9,  src: (css\card-deck-css\images\diamonds\diamonds-r09.svg) },
    {name: d10, value: 10,  src: (css\card-deck-css\images\diamonds\diamonds-r10.svg) },
    {name: dA, value: 11,  src: (css\card-deck-css\images\diamonds\diamonds-A.svg) },
    {name: dJ, value: 10,  src: (css\card-deck-css\images\diamonds\diamonds-J.svg) },
    {name: dQ, value: 10,  src: (css\card-deck-css\images\diamonds\diamonds-Q.svg) },
    {name: dK, value: 10,  src: (css\card-deck-css\images\diamonds\diamonds-K.svg) },
    {name: h02, value: 2,  src: (css\card-deck-css\images\hearts\hearts-r02.svg) },
    {name: h03, value: 3,  src: (css\card-deck-css\images\hearts\hearts-r03.svg) },
    {name: h04, value: 4,  src: (css\card-deck-css\images\hearts\hearts-r04.svg) },
    {name: h05, value: 5,  src: (css\card-deck-css\images\hearts\hearts-r05.svg) },
    {name: h06, value: 6,  src: (css\card-deck-css\images\hearts\hearts-r06.svg) },
    {name: h07, value: 7,  src: (css\card-deck-css\images\hearts\hearts-r07.svg) },
    {name: h08, value: 8,  src: (css\card-deck-css\images\hearts\hearts-r08.svg) },
    {name: h09, value: 9,  src: (css\card-deck-css\images\hearts\hearts-r09.svg) },
    {name: h10, value: 10,  src: (css\card-deck-css\images\hearts\hearts-r10.svg) },
    {name: hA, value: 11,  src: (css\card-deck-css\images\hearts\hearts-A.svg) },
    {name: hJ, value: 10,  src: (css\card-deck-css\images\hearts\hearts-J.svg) },
    {name: hQ, value: 10,  src: (css\card-deck-css\images\hearts\hearts-Q.svg) },
    {name: hK, value: 10,  src: (css\card-deck-css\images\hearts\hearts-K.svg) },
    {name: s02, value: 2,  src: (css\card-deck-css\images\spades\spades-r02.svg) },
    {name: s03, value: 3,  src: (css\card-deck-css\images\spades\spades-r03.svg) },
    {name: s04, value: 4,  src: (css\card-deck-css\images\spades\spades-r04.svg) },
    {name: s05, value: 5,  src: (css\card-deck-css\images\spades\spades-r05.svg) },
    {name: s06, value: 6,  src: (css\card-deck-css\images\spades\spades-r06.svg) },
    {name: s07, value: 7,  src: (css\card-deck-css\images\spades\spades-r07.svg) },
    {name: s08, value: 8,  src: (css\card-deck-css\images\spades\spades-r08.svg) },
    {name: s09, value: 9,  src: (css\card-deck-css\images\spades\spades-r09.svg) },
    {name: s10, value: 10,  src: (css\card-deck-css\images\spades\spades-r10.svg) },
    {name: sA, value: 11,  src: (css\card-deck-css\images\spades\spades-rA.svg) },
    {name: sJ, value: 10,  src: (css\card-deck-css\images\spades\spades-rJ.svg) },
    {name: sQ, value: 10,  src: (css\card-deck-css\images\spades\spades-rQ.svg) },
    {name: sK, value: 10,  src: (css\card-deck-css\images\spades\spades-rK.svg) },
    
  

]
/*----- app's state (variables) -----*/
let scores; // An object with keys of 'p' (player), 't' (ties) and 'd' (dealer)
let results // An object with keys of 'p' & 'd' with values of hand total
let winner; // A string with values of either 'p', 'd', 't',  
/*----- cached element references -----*/
const scoreEls = {
    p: document.getElementsByClassName('player-area'),
    d: document.getElementsByClassName('dealer-area')
};

const pResultEl = document.getElementsByClassName('p-total-p');
const dResultEl = document.getElementsByClassName('d-total-d');

let dHand = document.getElementsByClassName('dealer-area');
let pHand = document.getElementsByClassName('player-area');
let cardImg
results.textContent = firstCard + ' ' + secondCard;


d-total-d.textContent = htotal;



/*----- event listeners -----*/
document.querySelector('body')
    .addEventListener('click', handleChoice);
/*----- functions -----*/
Init();

function init() {
    scores = {
        p: 0,
        d: 0
    };
    results = {
        p: 21,
        d: 21,
    };
    winner = '';
    render();
}

function render() {
    renderScores();
    renderResults();
}

function betAccept() {
    if(sum === 21)
    {
        console.log("Blackjack!!");
    
    } else if(sum< 21)

    console.log("You can take a new card");
} else {
    console.log("You busted");
}

function hitButton() {
    if (scores[standButton] === false) {
        let card = randomCard ();
        showCard (card, pHand);
    }
}

function getRandomCard(){
    let randomCard = Math.floor((Math.random()*13))
    return scores[masterDeck.value][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['scores']) <= 21{
        let cardImg = document

    }
}