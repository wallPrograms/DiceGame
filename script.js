/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// VARIABLES

var scores, roundScores, activePlayer, gamePlaying;

init();




// DOM MANIPULATION

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1; //Use var since we don't need the function from the outside

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score is the rolled number was not 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add the current score to the global score
        scores[activePlayer] += roundScore; //Use the array [0] or [1]

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if the player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

//Start new game button
document.querySelector('.btn-new').addEventListener('click', init);




//FUNCTIONS

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //same as
    //if (activePlayer === 0) {
        //activePlayer = 1;
    //} else {
        //activePlayer = 0;
    //}

    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //active player greyed
    //change the css style using javascipt
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}



