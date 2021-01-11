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
        positions: [0,0,0,0],
        allAtHome: true
    }
];

const initialState = document.getElementById('main-board').innerHTML;

let currentPlayer = 0;
let currentPawn;

function rollDice() {
    const dice =  Math.floor(Math.random() * 6) + 1;

    return dice;
}

function movePawn(player, pawnIndex, dice) {
    players[player].positions[pawnIndex] = (players[player].positions[pawnIndex] + dice)%40;
}

function diceChecker(dice) {
    if (dice < 6 && players[currentPlayer]['allAtHome']) {
        alert('Hey '+ players[currentPlayer]['userName'] +' Please wait for 6! You have ' + dice);
    } else if (dice == 6 && players[currentPlayer]['allAtHome']) { //First 6
        players[currentPlayer]['positions'] = [1,0,0,0];
        players[currentPlayer].allAtHome = false;
        alert('Congrats you can go out!');
    } else if (dice < 6  && !players[currentPlayer]['allAtHome']) {
        movePawn(currentPlayer, 0, dice);
    } else if (dice == 6  && !players[currentPlayer]['allAtHome']) {
        
    }
}

function currentPawnDet(id) {
    alert(id);
}


//Part 2: DOM Manipulation
/* function resetDOM() {
    for (let index = 1; index <= 40; index++) {
        document.getElementById('pos'+position).classList.remove('white');
        document.getElementById('pos'+position).innerHTML = '';
    }
} */


function render () {
    document.getElementById('main-board').innerHTML = initialState;
    //alert('Hey Render start to run!');
    for (let index = 0; index < players.length; index++) {
        const element = players[index];
        
        for (let i = 0; i < element.positions.length; i++) {
            const position = element.positions[i];
            if (position > 0) {

                    

                    document.getElementById('pos'+position).innerHTML = `<i onClick="currentPawnDet(this.id)" id="${element.color+i}" class="fas fa-chess-pawn"></i>`;
                    
                    console.log(document.getElementById('pos'+position).classList);
                    document.getElementById('pos'+position).classList.remove('white');
                    document.getElementById('pos'+position).classList.remove('red');
                    document.getElementById('pos'+position).classList.remove('green');
                    document.getElementById('pos'+position).classList.remove('yellow');
                    document.getElementById('pos'+position).classList.remove('blue');
                    document.getElementById('pos'+position).classList.add(element.color);
            } else {
                    document.getElementById('initial-'+element.color+'-'+i).innerHTML = `<i onClick="currentPawnDet(this.id)" id="${element.color+i}" class="fas fa-chess-pawn"></i>`;
            }
        }
    }
}


render();

function showDice() {
    //alert(rollDice());
    diceChecker(rollDice());
    render();
}