'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector(`.message`).textContent = 'πCorrect Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);

*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secretNumber;
// console.log(secretNumber);
let score = 20;
let highscore = 0;
let gameOver = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  gameOver = 0;
});

// TEST

document.querySelector('.check').addEventListener('click', function one() {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  if (!gameOver) {
    // When there is no input
    if (!guess) {
      // document.querySelector(`.message`).textContent = 'β No number!';
      displayMessage('β No number!');

      // When player wins
    } else if (guess === secretNumber) {
      // document.querySelector('.message').textContent = 'π Correct Number!';
      displayMessage('π Correct Number!');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.number').textContent = secretNumber;
      gameOver = 1;

      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }

      //  When guess is wrong
    } else if (guess !== secretNumber) {
      if (score > 1) {
        // document.querySelector('.message').textContent =
        //   guess > secretNumber ? ' π Too high!' : ' π Too low!';
        displayMessage(guess > secretNumber ? ' π Too high!' : ' π Too low!');
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        // document.querySelector('.message').textContent =
        //   ' π₯ You lost the game!';
        displayMessage(' π₯ You lost the game!');
        document.querySelector('.score').textContent = 0;
        gameOver = 1;
      }

      //   //  when guess is too high
      // } else if (guess > secretNumber) {
      //   if (score > 1) {
      //     document.querySelector('.message').textContent = ' π Too high!';
      //     score--;
      //     document.querySelector('.score').textContent = score;
      //   } else {
      //     document.querySelector('.message').textContent =
      //       ' π₯ You lost the game!';
      //     document.querySelector('.score').textContent = 0;
      //     gameOver = 1;
      //   }

      //   // When guess is too low
      // } else if (guess < secretNumber) {
      //   if (score > 1) {
      //     document.querySelector('.message').textContent = ' π Too low!';
      //     score--;
      //     document.querySelector('.score').textContent = score;
      //   } else {
      //     document.querySelector('.message').textContent =
      //       ' π₯ You lost the game!';
      //     document.querySelector('.score').textContent = 0;
      //     gameOver = 1;
      //   }
      // }
    }
  } else {
    document.querySelector('.message').textContent =
      'Press "Again" to play again!';
  }
});
