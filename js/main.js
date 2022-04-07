/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const MSG_LOOKUP = {
  null: 'Good Luck!',
  'T': "It's a Tie",
  'P': 'Player Wins!',
  'D': 'Dealer Wins',
  'PBJ': 'Player Has Blackjack ',
  'DBJ': 'Dealer Has Blackjack ',
};
const mainDeck = buildMainDeck();

/*----- app's state (variables) -----*/
let deck;  // shuffled deck
let pHand, dHand;  // player/dealer hands (arrays)
let pTotal, dTotal;  // best point value of hand
let cash, bet;  // cash how much money we have & bet is the amount of the bet
let outcome;  // result of the hand (see MSG_LOOKUP)

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const dealerHandEl = document.querySelector('.dealer-area');
const dealerTotalEl = document.querySelector('.d-total-d');
const playerHandEl = document.querySelector('.player-area');
const playerTotalEl = document.querySelector('.p-total-p');
const betEl = document.getElementById('bet-amount');
const cashEl = document.getElementById('cash-amount');
const hitStandBtnsEl = document.querySelector('.buttons');
const betControlsEl = document.querySelector('.casino-chips');
const betAcceptBtnEl = document.getElementById('bet-accept-btn');
const betBtns = document.querySelectorAll('.casino-chips > button');

/*----- event listeners -----*/
betAcceptBtnEl.addEventListener('click', handleAccept);
document.querySelector('.hit-btn').addEventListener('click', handleHit);
document.querySelector('.stand-btn').addEventListener('click', handleStand);
document.querySelector('.casino-chips').addEventListener('click', handleBet);

/*----- functions -----*/
init();

function handleStand() {
  dealerPlay(function() {
    if (pTotal === dTotal) {
      outcome = 'T';
    } else if (dTotal > pTotal && dTotal <= 21 ) {
      outcome = 'D';
    } else {
      outcome = 'P';
    }
    settleBet();
    render();
  });
}

function dealerPlay(cb) {
  outcome = 'D';
  renderHands();
  // while (dTotal < 17) {
    setTimeout(function() {
      if (dTotal < 17  && dTotal < pTotal) {
        dHand.push(deck.pop());
        dTotal = getHandTotal(dHand);
        dealerPlay(cb);
      } else {
        cb();
      }
    }, 1000);
  // }
}

function handleHit() {
  pHand.push(deck.pop());
  pTotal = getHandTotal(pHand);
  if (pTotal > 21) {
    outcome = 'D';
    settleBet();
  }
  render();
}

function handleAccept(evt) {
  const btn = evt.target;
  if (btn.tagName !== 'BUTTON') return;
  const betAmt = parseInt(btn.innerText.replace('$', ''));
  bet += betAmt;
  cash -= betAmt;
  render();
}

function handleBet() {
  outcome = null;
  deck = getNewShuffledDeck();
  dHand = [];
  pHand = [];
  dHand.push(deck.pop(), deck.pop());
  pHand.push(deck.pop(), deck.pop());
  // Check for blackjack
  dTotal = getHandTotal(dHand);
  pTotal = getHandTotal(pHand);
  if (dTotal === 21 && pTotal === 21) {
    outcome = 'T';
  } else if (dTotal === 21) {
    outcome = 'DBJ';
  } else if (pTotal === 21) {
    outcome = 'PBJ';
  }
  if (outcome) settleBet();
  render();
}

function settleBet() {
  if (outcome === 'PBJ') {
    cash += bet + (bet * 1.5);
  } else if (outcome === 'P') {
    cash += bet * 2;
  }
  bet = 0;
}

// compute the best score for the hand passed in
function getHandTotal(hand) {
  let total = 0;
  let aces = 0;
  hand.forEach(function(card) {
    total += card.value;
    if (card.value === 11) aces++;
  });
  while (total > 21 && aces) {
    total -= 10;
    aces--;
  }
  return total;
}

// initialize state, then call render()
function init() {
  outcome = null;
  dHand = [];
  pHand = [];
  pTotal = dTotal = 0;
  cash = 1000;
  bet = 0;
  render();
}

// Visualize all state to the DOM
function render() {
  renderHands();
  cashEl.innerHTML = cash;
  betEl.innerHTML = bet;
  renderControls();
  renderBetBtns();
  msgEl.innerHTML = MSG_LOOKUP[outcome];
}

function renderBetBtns() {
  betBtns.forEach(function(btn) {
    const btnAmt = parseInt(btn.innerText.replace('$', ''));
    btn.disabled = btnAmt > cash;
  });
}

function renderControls() {
  betControlsEl.style.visibility = handInPlay() ? 'hidden' : 'visible';
  hitStandBtnsEl.style.visibility = handInPlay() ? 'visible' : 'hidden'; 
  betAcceptBtnEl.style.visibility = handInPlay() ? 'hidden' : 'visible';
}

function renderHands() {
  playerTotalEl.innerHTML = pTotal;
  dealerTotalEl.innerHTML = outcome ? dTotal : '??';
  playerHandEl.innerHTML = pHand.map(card => `<div class="card ${card.face}"></div>`).join('');
  dealerHandEl.innerHTML = dHand.map((card, idx) => `<div class="card ${idx === 1 && !outcome ? 'back' : card.face}"></div>`).join('');
}

function handInPlay() {
  return pHand.length && !outcome;
}

function getNewShuffledDeck() {
  // Create a copy of the mainDeck (leave mainDeck untouched!)
  const tempDeck = [...mainDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function buildMainDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}