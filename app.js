console.log('Hello World');
//alert element
let alert = $('#status-alert');
//square div elements
let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');
//players
let player1 = 'X';
let player2 = 'O';

//starting values
let winner = false;
let currentPlayer = '';
let round = 1;

//hide alert
alert.hide();

/**
 * diable pointer from clicking
 */
const endGame = () => {
    $('.square').css('pointer-events', 'none');
}
/**
 * Checking if string put into each element of element array are the same 
 * @param {*} currentPlayer the string represnting the player on grid
 * @param {*} a check first element of an element array in array
 * @param {*} b check second element of an element array in array
 * @param {*} c check third element of an element array in array
 * 
 */
const checkWinner = (currentPlayer, a, b, c) => {
    if (a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer) {
        winner = true;
        console.log(`${currentPlayer}`);
        endGame();
    }
}

/**
 * Checking if true outcome was met for any elements on array or if 9 rounds has passed
 */
const checkOutcomes = () => {
    checkWinner(currentPlayer, ...winningOutcome[0]);
    checkWinner(currentPlayer, ...winningOutcome[1]);
    checkWinner(currentPlayer, ...winningOutcome[2]);
    checkWinner(currentPlayer, ...winningOutcome[3]);
    checkWinner(currentPlayer, ...winningOutcome[4]);
    checkWinner(currentPlayer, ...winningOutcome[5]);
    checkWinner(currentPlayer, ...winningOutcome[6]);
    checkWinner(currentPlayer, ...winningOutcome[7]);

    if (round === 9 && winner === false) {
        currentPlayer = 0;
        changeAlert();
        endGame();
    }

};

/**
 * changes contents of alert element based on turn,winner,draw
*/
function changeAlert() {

    if (winner === false) {//alert player1
        if (currentPlayer === player1) {
            alert.empty();
            alert.prepend(`Player 1 Turn`);
            alert.show();

        }
        else if (currentPlayer === player2) {//alert player2
            alert.empty();
            alert.prepend('Player 2 Turn');
            alert.show();
        }
        else {//draw
            alert.empty();
            alert.prepend(`Game Over! It's a draw!`);
            alert.show();
        }
    } else {//winner
        alert.empty();
        alert.prepend(`${currentPlayer} is the winner`);
        alert.show();
    }

}

/**
 * Array of winning conditions
 */
const winningOutcome = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8],//horizontal
    [box0, box3, box6], [box1, box4, box7], [box2, box5, box8],//vertical
    [box0, box4, box8], [box2, box4, box6]//diagonals
];

/**
 * alternate turns between players and send correct alert message
 */
function changePlayer() {
    if (winner === false) {
        if (currentPlayer === 0) {//draw
            changeAlert();
        }
        else if (round % 2 === 1) {
            currentPlayer = player1;
            changeAlert();
        } else {
            currentPlayer = player2;
            changeAlert();
        }

    } else if (winner === true) {//winner
        changeAlert();
    }
}

/**
 * select player 1 to play first, display player icon where player clicked and alternates till there is a winner.
 */
const startGame = () => {
    //player 1 get to go first
    changePlayer();
    //click on square, round++, change to next player
    $('.square').on('click', function () {
        if (round > 4) {
            checkOutcomes();
        }
        if (winner === false) {
            $(this).text(currentPlayer);
            checkOutcomes();
            round++;
            changePlayer();

        }


    })


}

document.getElementById('startBtn').addEventListener('click', () => startGame());
document.getElementById('restartBtn').addEventListener('click', () => document.location.reload(true));