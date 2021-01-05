//Part 1 : Logic
let players = {
    player1: {
        userName: 'Antonis',
        color: 'red',
        positions: [0,0,0,0],
        allAtHome: true
    },
    player2: {
        userName: 'James',
        color: 'green',
        positions: [0,0,0,0],
        allAtHome: true
    },
    player3: {
        userName: 'Nikolaos',
        color: 'yellow',
        positions: [0,0,0,0],
        allAtHome: true
    },
    player4: {
        userName: 'Pio',
        color: 'blue',
        positions: [0,0,0,0],
        allAtHome: true
    }
}

function rollDice() {
    const dice =  Math.floor(Math.random() * 6) + 1;

    return dice;
}

function diceChecker(dice, currentPlayer) {
    if (dice < 6 && players[currentPlayer]['allAtHome']) {
        alert('Hey '+ players[currentPlayer]['userName'] +' Please wait for 6! You have ' + dice);
    } else if (dice == 6 && players[currentPlayer]['allAtHome']) {
        alert('Congrats you can go out!');
    }
}

//Part 2: DOM Manipulation
function showDice() {
    //alert(rollDice());
    diceChecker(rollDice(),'player4');
}

