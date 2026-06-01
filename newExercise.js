'use strict';

const button = document.querySelectorAll('.playBtn');
const text = document.querySelector('.paragraph');
const resetBtn = document.querySelector('.reset');
const firstScore = document.querySelector('.firstPlayerScore');
const secondScore = document.querySelector('.secondPlayerScore');
const drawScore = document.querySelector('.draws');
const resetScore = document.querySelector('.scoreReset');

const firstPlayer = '❌';
const secondPlayer = '⭕';

let currentPlayer = firstPlayer;

let firstPlayerScore = 0;
let secondPlayerScore = 0;
let draws = 0;

let gameOver = false;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const winner = function () {
  for (let i = 0; i < winCombos.length; i++) {
    const combo = winCombos[i];
    const first = combo[0];
    const second = combo[1];
    const third = combo[2];

    if (
      button[first].textContent !== '' &&
      button[first].textContent === button[second].textContent &&
      button[second].textContent === button[third].textContent
    ) {
      text.textContent = button[first].textContent + ' won';
      gameOver = true;
      if (text.textContent === '❌ won') {
        firstPlayerScore++;
        firstScore.textContent = `first player score ${firstPlayerScore}`;
      } else if (text.textContent === '⭕ won') {
        secondPlayerScore++;
        secondScore.textContent = `second player score ${secondPlayerScore}`;
      }

      return;
    }
  }
  let isDraw = true;

  button.forEach(btn => {
    if (btn.textContent === '') {
      isDraw = false;
    }
  });

  if (isDraw && !gameOver) {
    text.textContent = 'Draw';
    draws++;
    drawScore.textContent = `draw's ${draws}`;
    gameOver = true;
  }
};

button.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.textContent !== '') return;
    if (gameOver === true) return;
    btn.textContent = currentPlayer;

    if (currentPlayer === firstPlayer) {
      currentPlayer = secondPlayer;
    } else {
      currentPlayer = firstPlayer;
    }
    winner();
  });
});

resetBtn.addEventListener('click', function () {
  currentPlayer = firstPlayer;
  button.forEach(type => {
    type.textContent = '';
  });
  text.textContent = '';
  gameOver = false;
});

resetScore.addEventListener('click', function () {
  firstPlayerScore = 0;
  secondPlayerScore = 0;
  draws = 0;

  firstScore.textContent = 'first player score 0';
  secondScore.textContent = 'second player score 0';
  drawScore.textContent = "draw's 0";
});
