function gameboard() {
    function spotMaker(position) {
        const theSpot = {
            position,
            occupied: false,
            hit: false,
        }
        return theSpot;
    }
    let spots = [];
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            let place = (i.toString() + j.toString());
            spots.push(spotMaker(place));
        }
    }
    const board = {
        spots,
        availablePlacement: function (space, shipLength, orientation) {
            if (orientation == 'horizontal') {
                for (let c = 0; c < shipLength; c++) {
                    if (this.spots[space + c].occupied == true) {
                        return false;
                    }
                }
            } else if (orientation == 'vertical') {
                for (let d = 0; d < shipLength; d++) {
                    if (this.spots[space + d * 10].occupied == true) {
                        return false;
                    }
                }
            }
            return true;
        },
        place: function (space, shipLength, orientation) {
            // if (this.availablePlacement(space, ship, orientation)) {
            if (orientation == 'horizontal') {
                if (Math.floor(space / 10) == Math.floor((space + shipLength - 1) / 10)) {
                    if (this.availablePlacement(space, shipLength, orientation)) {
                        for (let a = 0; a < shipLength; a++) {
                            this.spots[space + a].occupied = true;
                        }
                    }
                }
            }
            if (orientation == 'vertical') {
                if (space + (shipLength - 1) * 10 < 100) {
                    if (this.availablePlacement(space, shipLength, orientation)) {
                        for (let b = 0; b < shipLength; b++) {
                            this.spots[space + b * 10].occupied = true;
                        }
                    }
                }
            }
            // }


        },
        receiveAttack: function (space) {
            this.spots[space].hit = true;
        },
    }
    return board;
}
module.exports = gameboard;