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
let roundCount = 0;
let activeRollCount = 0;
let isLocked = false;


function rollDice() {
    const dice =  Math.floor(Math.random() * 6) + 1;

    return dice;
}

function movePawn(player, pawnIndex, dice) {
    players[player].positions[pawnIndex] = (players[player].positions[pawnIndex] + dice)%40;
}

function diceChecker(dice) {

    lastDice = dice;


    if (dice < 6 && players[currentPlayer]['activePawnCount'] == 0 ) {
        alert('Hey '+ players[currentPlayer]['userName'] +' Please wait for 6! You have ' + dice);
    } else if (dice == 6 && players[currentPlayer]['activePawnCount']  == 0) { 
        //First 6
        //To-Do - 1: Shift user's pawn on to the own home
        //To-Do - 3: Please check movePawn()
        players[currentPlayer]['positions'] = [1,0,0,0];
        players[currentPlayer].activePawnCount += 1;
        
        alert('Congrats you can go out!');
    } 
    else if (dice < 6  && players[currentPlayer]['activePawnCount'] > 1) {
        isLocked = true;

        if (currentPawn == undefined) {
            alert('You have more than 1 pawns in the game! Please chose one to go');
        } else {
            if (players[currentPlayer].positions[currentPawn] == 0) {
                //TO-DO - 4: Hey this works just for red color. Do for others too!
                players[currentPlayer].positions[currentPawn] = 1;
                players[currentPlayer].activePawnCount += 1;
            } else {
                players[currentPlayer].positions[currentPawn] += lastDice;
            }
        }


    }else if (dice < 6  && players[currentPlayer]['activePawnCount'] == 1) {
        //To-Do -5: Send the current pawn index instead of 0;
        movePawn(currentPlayer, 0, dice); 
    } else if (dice == 6  && players[currentPlayer]['activePawnCount'] > 0) {
        

        isLocked = true;
        
        if (currentPawn == undefined) {
            alert('You have 6 please chose a pawn!');
        } else {
            if (players[currentPlayer].positions[currentPawn] == 0) {
                //TO-DO: Hey this works just for red color. Do for others too!
                players[currentPlayer].positions[currentPawn] = 1;
                players[currentPlayer].activePawnCount += 1;
            } else {
                players[currentPlayer].positions[currentPawn] += 6;
            }
        }
    }
}

function currentPawnDet(id) {
    currentPawn = parseInt(id.slice(-1));
    //console.log(currentPawn);

    //TO-DO - 2: Check user color and pawn color. If does not match, then alert a message
    if (isLocked) {
        diceChecker(lastDice);
        render();
    }
    currentPawn = undefined;
    isLocked = false;
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

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % 4;
}

function iterateGame() {

    //Main case, like after first round
    if (roundCount > 0) {
    
        //PLayer has more then 1 pawn in the game and should complete the round
        if (isLocked) {
            alert('Hey you can not roll the dice. You should wait ' + players[currentPlayer].userName);
        } else {
            //No pawn in game and player should roll 3 times
            if (players[currentPlayer].activePawnCount == 0 && activeRollCount < 3) {
                activeRollCount++;
                diceChecker(rollDice());
                render();
            } 
            //PLayer has 6 should roll again
            else if (lastDice == 6) {
                diceChecker(rollDice());
                render();
            }
            else {
                nextPlayer();
                activeRollCount = 1;
                diceChecker(rollDice());
                render();
            }

            
        }
    }
    //First round 
    else {
       /* 
        let red = rollDice();
        let green = rollDice();
        let yellow = rollDice();
        let blue = rollDice();
        */
        let starter = Math.floor(Math.random()*4);
        alert('First player is ' + players[starter].color);
        currentPlayer = starter;
    }
    roundCount += 1;
}