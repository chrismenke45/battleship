import "./style.css"
const ship = require('./ship');
const gameboard = require('./gameboard')

let playerBoard = gameboard();
let computerBoard = gameboard();
const playerBoardArea = document.getElementById('playerBoardArea');
const computerBoardArea = document.getElementById('computerBoardArea');
const computerSide = document.getElementById('computerSide');
let playerCaption = document.getElementById('playerCaption');
let computerCaption = document.getElementById('computerCaption');
let rotateBtn = document.getElementById('rotate');
let resetBtn = document.getElementById('reset');

let cargo = ship(4, 'Cargo Ship');
let patrol = ship(2, 'Patrol Boat');
let aircraftCarrier = ship(5, 'Aircraft Carrier');
let submarine = ship(3, 'Submarine');

let randomSpot = function () {
    return Math.floor(Math.random() * 100);
}

let orientations = ['horizontal', 'vertical'];

let randomOrientation = function (orientations) {
    let choice = Math.floor(Math.random() * orientations.length);
    return orientations[choice];
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


let playerSquares = Array.from(document.getElementsByClassName("playerSquare"));
let computerSquares = Array.from(document.getElementsByClassName("computerSquare"));


boats.forEach(boat => {
    let canPlace = false;
    do {
        let direction = randomOrientation(orientations);
        let coordinate = randomSpot();

        if (computerBoard.availablePlacement(coordinate, boat.shipLength, direction)) {
            computerBoard.place(coordinate, boat.shipLength, direction, boat.shipName);
            canPlace = true;
        }
    } while (canPlace == false)
})

resetBtn.addEventListener('click', () => {
    playerSquares.forEach(square => {
        square.innerHTML = '';
        square.className = '';
        square.classList.add('boardSquare');
        square.classList.add('playerSquare');
    })
    computerSquares.forEach(square => {
        square.innerHTML = '';
        square.className = '';
        square.classList.add('boardSquare');
        square.classList.add('playerSquare');
        rotateBtn.classList.remove('hidden');
    })
    computerBoard.spots.forEach(spot => {
        spot.occupied = false;
        spot.hit = false;
    })
    playerBoard.spots.forEach(spot => {
        spot.occupied = false;
        spot.hit = false;
    })
    computerSinkCount = 0;
    playerSinkCount =0;
    boats.forEach(boat => {
        boat.hits = 0;
    })
    shipsPlaced = 0;
    computerSide.classList.add('hidden');
    console.log('reset')
    boats.forEach(boat => {
        let canPlace = false;
        do {
            let direction = randomOrientation(orientations);
            let coordinate = randomSpot();
    
            if (computerBoard.availablePlacement(coordinate, boat.shipLength, direction)) {
                computerBoard.place(coordinate, boat.shipLength, direction, boat.shipName);
                canPlace = true;
            }
        } while (canPlace == false)
    })
})

let shipsPlaced = 0;
let rotation = 'vertical';

rotateBtn.addEventListener('click', () => {
    if (rotation == 'vertical') {
        rotation = 'horizontal';
    } else {
        rotation = 'vertical';
    }
})


playerSquares.forEach(square => square.addEventListener('mouseenter', () => {
    if (shipsPlaced < boats.length) {
        if (rotation == 'vertical') {
            for (let u = 0; u < boats[shipsPlaced].shipLength; u++) {
                if (Number(square.id) + u * 10 >= 100) {
                    break;
                }
                playerSquares[Number(square.id) + u * 10].classList.add('thinking')
            }
        } else if (rotation == 'horizontal') {
            for (let u = 0; u < boats[shipsPlaced].shipLength; u++) {
                if (Math.floor((Number(square.id) + u) / 10) !== Math.floor(Number(square.id) / 10)) {
                    break;
                }
                playerSquares[Number(square.id) + u].classList.add('thinking')
            }
        }
    }
}))
playerSquares.forEach(square => square.addEventListener('mouseleave', () => {
    if (shipsPlaced < boats.length) {
        if (rotation == 'vertical') {
            for (let u = 0; u < boats[shipsPlaced].shipLength; u++) {
                if (Number(square.id) + u * 10 >= 100) {
                    break;
                }
                playerSquares[Number(square.id) + u * 10].classList.remove('thinking')
            }
        } else if (rotation == 'horizontal') {
            for (let u = 0; u < boats[shipsPlaced].shipLength; u++) {
                if (Math.floor((Number(square.id) + u) / 10) !== Math.floor(Number(square.id) / 10)) {
                    break;
                }
                playerSquares[Number(square.id) + u].classList.remove('thinking')
            }
        }

    }
}))
playerCaption.innerHTML = 'Place your ' + boats[shipsPlaced].shipName;
playerSquares.forEach(square => square.addEventListener('click', () => {
    if (shipsPlaced < boats.length) {
        if (playerBoard.availablePlacement((Number(square.id)), boats[shipsPlaced].shipLength, rotation)) {
            playerBoard.place((Number(square.id)), boats[shipsPlaced].shipLength, rotation, boats[shipsPlaced].shipname);
            playerBoard.spots.forEach((spot, index) => {
                if (spot.occupied) {
                    playerSquares[index].classList.add('occupied');
                    playerSquares[index].classList.remove('thinking');
                }
            })
            shipsPlaced++;
            if (shipsPlaced >= boats.length) {
                computerSide.classList.remove('hidden');
                playerCaption.innerHTML = 'Player';
                rotateBtn.classList.add('hidden');
            } else {
                playerCaption.innerHTML = 'Place your ' + boats[shipsPlaced].shipName;
            }
        }
    }
}))

let computerSinkCount = 0;
let playerSinkCount = 0;
let playersAllowableHits = 0;
boats.forEach(boat => {
    playersAllowableHits += Number(boat.shipLength);
})
console.log(playersAllowableHits);


computerSquares.forEach(square => square.addEventListener('click', () => {
    if (computerSinkCount >= boats.length || playerSinkCount >= playersAllowableHits) {
        return;
    }
    computerCaption.innerHTML = 'Computer';
    playerCaption.innerHTML = 'Player'
    if (computerBoard.spots[Number(square.id)].hit == true) {
        return;
    }
    computerBoard.receiveAttack(Number(square.id));
    if (computerBoard.spots[Number(square.id)].occupied == true) {
        square.classList.add('hitShip');
        boats.forEach(boat => {
            if (boat.shipName == computerBoard.spots[Number(square.id)].shipName) {
                boat.hit()
                if (boat.isSunk()) {
                    computerCaption.innerHTML = 'The Computer\'s ' + boat.shipName + ' has been sunk';
                    computerSinkCount++;
                    if(computerSinkCount == boats.length) {
                        computerCaption.innerHTML = 'You Won!'
                    }
                }
            }
        })
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
                    playerSinkCount++;
                    if(playerSinkCount >= playersAllowableHits) {
                        playerCaption.innerHTML = 'You Lost!'
                    }
                } 
            }, 300)
        }
    } while (goodMove == false)
}))

