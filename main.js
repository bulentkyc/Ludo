//Part 1 : Logic
let players = [
    {
        userName: 'Antonis',
        color: 'red',
        positions: [1,4,0,0],
        allAtHome: true
    },
    {
        userName: 'James',
        color: 'green',
        positions: [10,0,9,0],
        allAtHome: true
    },
    {
        userName: 'Nikolaos',
        color: 'yellow',
        positions: [0,0,0,0],
        allAtHome: true
    },
    {
        userName: 'Pio',
        color: 'blue',
        positions: [0,0,0,0],
        allAtHome: true
    }
];

let currentPlayer = 0;

function rollDice() {
    const dice =  Math.floor(Math.random() * 6) + 1;

    return dice;
}

function diceChecker(dice) {
    if (dice < 6 && players[currentPlayer]['allAtHome']) {
        alert('Hey '+ players[currentPlayer]['userName'] +' Please wait for 6! You have ' + dice);
    } else if (dice == 6 && players[currentPlayer]['allAtHome']) { //First 6
        players[currentPlayer]['positions'] = [1,0,0,0];
        alert('Congrats you can go out!');
    }
}

//Part 2: DOM Manipulation
function render () {
    for (let index = 0; index < players.length; index++) {
        const element = players[index];
        
        for (let index = 0; index < element.positions.length; index++) {
            const item = element.positions[index];
            if (item > 0) {
                    document.getElementById('pos'+item).innerHTML = '<i class="fas fa-chess-pawn"></i>';
                    document.getElementById('pos'+item).classList.add(element.color);
                    document.getElementById('pos'+item).classList.remove('white');
                
            }
        }
    }
}

render();

function showDice() {
    //alert(rollDice());
    //diceChecker(rollDice());
    render();
}

