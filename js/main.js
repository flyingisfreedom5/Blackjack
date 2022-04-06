/*----- constants -----*/

const masterDeck = [
    {name: 'c02', value: 2},
    {name: 'c03', value: 3},
    {name: 'c04', value: 4},
    {name: 'c05', value: 5},
    {name: 'c06', value: 6},
    {name: 'c07', value: 7},
    {name: 'c08', value: 8},
    {name: 'c09', value: 9},
    {name: 'c10', value: 10},
    {name: 'cA', value: 11},
    {name: 'cJ', value: 10},
    {name: 'cQ', value: 10},
    {name: 'cK', value: 10},
    {name: 'd02', value: 2},
    {name: 'd03', value: 3},
    {name: 'd04', value: 4},
    {name: 'd05', value: 5},
    {name: 'd06', value: 6},
    {name: 'd07', value: 7},
    {name: 'd08', value: 8},
    {name: 'd09', value: 9},
    {name: 'd10', value: 10},
    {name: 'dA', value: 11},
    {name: 'dJ', value: 10},
    {name: 'dQ', value: 10},
    {name: 'dK', value: 10},
    {name: 'h02', value: 2},
    {name: 'h03', value: 3},
    {name: 'h04', value: 4},
    {name: 'h05', value: 5},
    {name: 'h06', value: 6},
    {name: 'h07', value: 7},
    {name: 'h08', value: 8},
    {name: 'h09', value: 9},
    {name: 'h10', value: 10},
    {name: 'hA', value: 11},
    {name: 'hJ', value: 10},
    {name: 'hQ', value: 10},
    {name: 'hK', value: 10},
    {name: 's02', value: 2},
    {name: 's03', value: 3},
    {name: 's04', value: 4},
    {name: 's05', value: 5},
    {name: 's06', value: 6},
    {name: 's07', value: 7},
    {name: 's08', value: 8},
    {name: 's09', value: 9},
    {name: 's10', value: 10},
    {name: 'sA', value: 11},
    {name: 'sJ', value: 10},
    {name: 'sQ', value: 10},
    {name: 'sK', value: 10},
];
console.log(masterDeck);

// /*----- app's state (variables) -----*/
let playerHand;
let dealerHand;
let winner; 
let aceCount; 
let ShuffledDeck;
/*----- cached element references -----*/

const pResultEl = document.querySelector('.p-total-p');
const dResultEl = document.querySelector('.d-total-d');
const betAcceptEl = document.querySelector(".bet-accept-btn")
const hitEl = document.querySelector('.hit-btn');
const standEl = document.querySelector('.stand-btn');
const casinoChipsEl = document.querySelector('.casino-chips');
const betAmountEl = document.querySelector('.bet-amount');
const cashEl = document.querySelector('.cash-amount');








/*----- event listeners -----*/
// document.querySelector('body')
//     .addEventListener('click', handleChoice);
/*----- functions -----*/
init();


function init() {
    playerHand = [];
    dealerHand = [];
    winner = '';
    ShuffledDeck = getNewShuffledDeck();   
    render();
}


function render() {
    renderHand();
}

function getNewShuffledDeck() {
   
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
}





