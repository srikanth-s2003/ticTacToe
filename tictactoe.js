
const cells = document.querySelectorAll('.cell');
let options = ["", "","", "", "", "", "", "",""];
let currentPlayer = 'X'
const playersTurn = document.querySelector(".playersTurn");
const winConditions = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [3,4,5],
    [2,5,8],
    [6,7,8]
];
const resetBtn = document.querySelector(".btn");
let xresult = document.getElementById('xresult');
let yresult = document.getElementById('yresult');
let draw = document.getElementById('draw');
let xcount = 0;
let ycount = 0;
let tie = 0;
let running = true


if(running){
    start()
}

function start(){
    cells.forEach(cell=>cell.addEventListener('click', cellClicked))
    playersTurn.textContent = `${currentPlayer}'s turn`
}
function cellClicked(){
    // console.log("hello guys")
    const cellIndex = this.getAttribute("cellIndex");
    // console.log(cellIndex);
    if(options[cellIndex]!=""){
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
    
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // console.log(options)
}
function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? "O" : "X"
    playersTurn.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let winner = false;

    for(let i = 0; i< winConditions.length; i++){
        const conditon = winConditions[i];
        const cellA = options[conditon[0]];
        const cellB = options[conditon[1]];
        const cellC = options[conditon[2]];

        // console.log(cellA);
        // console.log("------------------");
        // console.log(conditon)

        if (cellA == "" || cellB == "" || cellC == ""){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            winner =  true;
            break;
        }
    }
    if(winner){
        playersTurn.textContent= `${currentPlayer} wins!!`
        if(currentPlayer == 'X')xcount+=1
        if(currentPlayer == 'O')ycount+=1
        console.log(winner, xcount, ycount)
        running = false
        score()
    }
    else if(!options.includes("")){
        tie+=1;
        playersTurn.textContent= `draw`;
        running = false;
        score()
    }
    else{
        changePlayer();
    }
    reset();
}

function reset(){
    
    resetBtn.addEventListener('click', ()=>{
        currentPlayer = 'X';
        options = ["", "","", "", "", "", "", "",""]
        cells.forEach(cell =>cell.textContent= "");
        if(running) start();
       
    })
    // start();
}

// let colorme = document.querySelector(".colorme");
// let sri = document.getElementById('sri');
// sri.style.color = 'lime'
function score(){
    xresult.textContent = xcount;
    yresult.textContent = ycount;
    draw.textContent = tie;
    console.log(tie)
}