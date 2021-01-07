//Part 1 : Logic
let players = [
    {
        userName: 'Antonis',
        color: 'red',
        positions: [0,0,0,0],
        allAtHome: true
    },
    {
        userName: 'James',
        color: 'green',
        positions: [0,0,0,0],
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
        positions: [1,0,0,0],
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
/* function resetDOM() {
    for (let index = 1; index <= 40; index++) {
        document.getElementById('pos'+position).classList.remove('white');
        document.getElementById('pos'+position).innerHTML = '';
    }
} */


function render () {
    //alert('Hey Render start to run!');
    for (let index = 0; index < players.length; index++) {
        const element = players[index];
        
        for (let i = 0; i < element.positions.length; i++) {
            const position = element.positions[i];
            if (position > 0) {
                    document.getElementById('pos'+position).innerHTML = '<i class="fas fa-chess-pawn"></i>';
                    document.getElementById('pos'+position).classList.add(element.color);
                    document.getElementById('pos'+position).classList.remove('white');
                
            } else {
                    document.getElementById('initial-'+element.color+'-'+i).innerHTML = '<i class="fas fa-chess-pawn"></i>';
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