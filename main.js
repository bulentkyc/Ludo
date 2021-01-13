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

function pawnOverlapHandler(landingPos) {

    
    for (let i = 0; i < players[currentPlayer].positions.length; i++) {
        if (players[currentPlayer].positions[i] == landingPos) {
            return 'stop';
        }        
    }

    return 'move';

}

function movePawn(player, pawnIndex, dice) {
    //Go from home to the game

    let isMoveDone = true;

    if (pawnOverlapHandler((players[player].positions[pawnIndex] + dice)%40) == 'stop') {
        alert('Hey you can not do this!');
        isMoveDone = false;
    } else if (players[player].positions[pawnIndex] == 0 && dice == 6) {
            players[player].positions[pawnIndex] = 1 + player * 10;
    //Move around the game
    } else if ( players[player].positions[pawnIndex] > 0
                && 
                (
                (players[player].positions[pawnIndex] < player*10+1)
                ||
                ((player == 0) && (players[player].positions[pawnIndex] > 34))
                )
                && 
                dice + players[player].positions[pawnIndex] >= player*10+1) {

        players[player].positions[pawnIndex] = -1 * ((dice + players[player].positions[pawnIndex]) % (40-((10*(4-player))%40)));
    }
    
    
    /* else if ((dice + players[player].positions[pawnIndex]) / 40 > 1 || ((dice > -1 * (players[player].positions[pawnIndex] - (player * 10)>0)) )){
        alert('hey');
        //players[player].positions[pawnIndex] = (players[player].positions[pawnIndex] + dice)%40;
        
                
    } */ else {
        players[player].positions[pawnIndex] = (players[player].positions[pawnIndex] + dice)%40;
    }

    if (isMoveDone) {
        currentPawn = undefined;
        isLocked = false;
    }
    
}

function nextPawnHandler() {
    for (let i = 0; i < players[currentPlayer].positions.length; i++) {
        if(players[currentPlayer].positions[i]==0){
            return i;
        }
        
    }
}

function currentPawnHandler() {
    for (let i = 0; i < players[currentPlayer].positions.length; i++) {
        if(players[currentPlayer].positions[i]>0){
            return i;
        }
        
    }
}

function diceChecker(dice) {

    lastDice = dice;


    if (dice < 6 && players[currentPlayer]['activePawnCount'] == 0 ) {
        alert('Hey '+ players[currentPlayer]['userName'] +' Please wait for 6! You have ' + dice);
    } else if (dice == 6 && players[currentPlayer]['activePawnCount']  == 0) { 
        //First 6
        
        
       
        movePawn(currentPlayer, nextPawnHandler(), dice);
        //players[currentPlayer]['positions'] = [1,0,0,0];
        players[currentPlayer].activePawnCount += 1;
        
        alert('Congrats you can go out!');
    } 
    else if (dice < 6  && players[currentPlayer]['activePawnCount'] > 1) {
        isLocked = true;

        if (currentPawn == undefined) {
            alert('You have more than 1 pawns in the game! Please chose one to go');
        } else {
            if (players[currentPlayer].positions[currentPawn] == 0) {
                
                //players[currentPlayer].positions[currentPawn] = 1;
                //movePawn(currentPlayer, currentPawn, dice);
                //players[currentPlayer].activePawnCount += 1;
            } else {
                //players[currentPlayer].positions[currentPawn] += lastDice;
                movePawn(currentPlayer, currentPawn, dice);
            }
        }


    }else if (dice < 6  && players[currentPlayer]['activePawnCount'] == 1) {
        
        movePawn(currentPlayer, currentPawnHandler(), dice); 

    } else if (dice == 6  && players[currentPlayer]['activePawnCount'] > 0) {
        

        isLocked = true;
        
        if (currentPawn == undefined) {
            alert('You have 6 please chose a pawn!');
        } else {
            if (players[currentPlayer].positions[currentPawn] == 0) {
                
                movePawn(currentPlayer, currentPawn, dice);
                players[currentPlayer].activePawnCount += 1;
            } else {
                //players[currentPlayer].positions[currentPawn] += 6;
                movePawn(currentPlayer, currentPawn, dice);
            }
        }
    }
}

function currentPawnDet(id) {
    currentPawn = parseInt(id.slice(-1));
    let currentColor = id.slice(0,-1);
    //console.log(currentColorCapital);

    if (isLocked && currentColor == players[currentPlayer].color) {
        diceChecker(lastDice);
        render();
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
            } else if(position < 0) {
                document.getElementById(element.color+'-pos'+position).innerHTML = `<i id="${element.color+i}" class="fas fa-chess-pawn"></i>`;
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