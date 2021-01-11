//Part 1 : Logic
let players = [
    {
        userName: 'Antonis',
        color: 'red',
        //0 -> At home
        //1-40 -> In the game
        //-1- -4 -> In the end
        positions: [0,0,0,0],
        activePawnCount: 0
    },
    {
        userName: 'James',
        color: 'green',
        positions: [0,0,0,0],
        activePawnCount: 0
    },
    {
        userName: 'Nikolaos',
        color: 'yellow',
        positions: [0,0,0,0],
        activePawnCount: 0
    },
    {
        userName: 'Pio',
        color: 'blue',
        positions: [0,0,0,0],
        activePawnCount: 0
    }
];

const initialState = document.getElementById('main-board').innerHTML;

let currentPlayer = 0;
let currentPawn;
let lastDice;

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
        alert('You have 6 [lease chose a pawn!');
        lastDice = dice;
        if (currentPawn == undefined) {
            
        } else {
            if (players[currentPlayer].positions[currentPawn] == 0) {
                //TO-DO: Hey this works just for red color. Do for others too!
                players[currentPlayer].positions[currentPawn] = 1;
            } else {
                players[currentPlayer].positions[currentPawn] += 6;
            }
        }
    }
}

function currentPawnDet(id) {
    currentPawn = parseInt(id.slice(-1));
    console.log(currentPawn);
    diceChecker(lastDice);
    render();
    currentPawn = undefined;
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

function iterateGame() {
    //alert(rollDice());
    diceChecker(rollDice());
    render();
}