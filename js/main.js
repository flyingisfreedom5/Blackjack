/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const MSG_LOOKUP = {
  null: 'Place Your Bet',
  'T': "It's a Tie",
  'P': 'Player Is The Winner',
  'D': 'Dealer Is The Winner',
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
const chip10 = document.getElementById("ten");
const chip25 = document.getElementById("twenty-five");
const chip50 = document.getElementById("fifty");
const chip100 = document.getElementById("hundred");

/*----- event listeners -----*/
betAcceptBtnEl.addEventListener('click', handleBet);
document.querySelector('.hit-btn').addEventListener('click', handleHit);
document.querySelector('.stand-btn').addEventListener('click', handleStand);
chip10.addEventListener('click', add10);
chip25.addEventListener('click', add25);
chip50.addEventListener('click', add50);
chip100.addEventListener('click', add100);


/*----- functions -----*/
init();

function add10() {
    cash = cash - 10;
    cashEl.innerHTML = cash;
    bet = bet + 10;
    betEl.innerHTML = bet;
}

function add25() {
    cash = cash - 25;
    cashEl.innerHTML = cash;
    bet = bet + 25;
    betEl.innerHTML = bet;
}

function add50() {
    cash = cash - 50;
    cashEl.innerHTML = cash;
    bet = bet + 50;
    betEl.innerHTML = bet;
}

function add100() {
    cash = cash - 100;
    cashEl.innerHTML = cash;
    bet = bet + 100;
    betEl.innerHTML = bet;
}
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
    setTimeout(function() {
      if (dTotal < 17  && dTotal < pTotal) {
        dHand.push(deck.pop());
        dTotal = getHandTotal(dHand);
        dealerPlay(cb);
      } else {
        cb();
      }
    }, 1000);
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

function handleBet() {
  outcome = null;
  deck = getNewShuffledDeck();
  dHand = [];
  pHand = [];
  dHand.push(deck.pop(), deck.pop());
  pHand.push(deck.pop(), deck.pop());
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
  } else if (outcome === 'T'){
      cash += bet
  }
  bet = 0;
}

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

function init() {
  outcome = null;
  dHand = [];
  pHand = [];
  pTotal = dTotal = 0;
  cash = 1000;
  bet = 0;
  render();
}

function render() {
  renderHands();
  cashEl.innerText = cash;
  betEl.innerText = bet;
  renderControls();
  msgEl.innerHTML = MSG_LOOKUP[outcome];
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
  const tempDeck = [...mainDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function buildMainDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}



