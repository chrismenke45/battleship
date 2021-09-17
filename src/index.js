import "./style.css"
const ship = require('./ship');
const gameboard = require('./gameboard')

let playerBoard = gameboard();
let computerBoard = gameboard();
const playerBoardArea = document.getElementById('playerBoardArea');
const computerBoardArea = document.getElementById('computerBoardArea');

let cargo = ship(4, 'cargo');
let patrol = ship(2, 'patrol');
let aircraftCarrier = ship(5, 'aircraftCarrier');
let submarine = ship(3, 'submarine');

let randomSpot = function () {
    return Math.floor(Math.random() * 100);
}

let boats = [aircraftCarrier, cargo, submarine, patrol]

playerBoard.spots.forEach((spot) => {
    let playerDiv = document.createElement('div');
    playerDiv.id = spot.position;
    playerDiv.classList.add('boardSquare');
    playerDiv.classList.add('playerSquare');
    playerBoardArea.appendChild(playerDiv);

})
computerBoard.spots.forEach((spot) => {
    let computerDiv = document.createElement('div');
    computerDiv.id = spot.position;
    computerDiv.classList.add('boardSquare');
    computerDiv.classList.add('computerSquare');
    computerBoardArea.appendChild(computerDiv);


})

/*boats.forEach(boat => {
    let x = randomSpot();
    playerBoard.place(x, boat.shipLength, 'horizontal')
})*/
let squares = Array.from(document.getElementsByClassName("boardSquare"));

let playerSquares = Array.from(document.getElementsByClassName("playerSquare"));
let computerSquares = Array.from(document.getElementsByClassName("computerSquare"));

playerBoard.place(0, patrol.shipLength, 'horizontal');
playerBoard.place(8, aircraftCarrier.shipLength, 'vertical');
playerBoard.place(75, submarine.shipLength, 'horizontal');
playerBoard.place(81, cargo.shipLength, 'horizontal');

playerBoard.spots.forEach((spot, index) => {
    if (spot.occupied) {
        playerSquares[index].classList.add('occupied');
    }
})

computerBoard.place(0, patrol.shipLength, 'horizontal');
computerBoard.place(8, aircraftCarrier.shipLength, 'vertical');
computerBoard.place(75, submarine.shipLength, 'horizontal');
computerBoard.place(81, cargo.shipLength, 'horizontal');



computerSquares.forEach(square => square.addEventListener('click', () => {
    if (computerBoard.spots[Number(square.id)].hit == true) {
        return;
    }
    computerBoard.receiveAttack(Number(square.id));
    if (computerBoard.spots[Number(square.id)].occupied == true) {
        square.classList.add('hitShip');
    }
    square.innerHTML = 'X';
    let goodMove = false;
    do {
        let spotChoice = randomSpot();
        if (playerBoard.spots[spotChoice].hit == false) {
            goodMove = true;
            playerBoard.receiveAttack(spotChoice);
            setTimeout(() => {
                playerSquares[spotChoice].innerHTML = 'X';
                if (playerBoard.spots[spotChoice].occupied == true) {
                    playerSquares[spotChoice].classList.add('hitShip');
                }
            }, 300)
        }
    } while (goodMove == false)
}))

/*squares.forEach(square => square.addEventListener('click', () => {
    playerBoard.place(Number(square.id), patrol.shipLength, 'horizontal');
    //square.classList.add('shipON');
}))*/




//let c = ship(4, 'yee');
//console.log(c)