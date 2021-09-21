function gameboard() {
    function spotMaker(position) {
        const theSpot = {
            position,
            occupied: false,
            hit: false,
            shipName: '',
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
                if (Math.floor(space / 10) !== Math.floor((space + shipLength - 1) / 10)) {
                    return false
                }
                for (let c = 0; c < shipLength; c++) {
                    if (this.spots[space + c].occupied == true) {
                        return false;
                    }
                }
            } else if (orientation == 'vertical') {
                if (space + (shipLength - 1) * 10 >= 100) {
                    return false;
                }
                for (let d = 0; d < shipLength; d++) {
                    if (this.spots[space + d * 10].occupied == true) {
                        return false;
                    }
                }
            }
            return true;
        },
        place: function (space, shipLength, orientation, name) {
            if (orientation == 'horizontal') {
                //if (Math.floor(space / 10) == Math.floor((space + shipLength - 1) / 10)) {
                    if (this.availablePlacement(space, shipLength, orientation)) {
                        for (let a = 0; a < shipLength; a++) {
                            this.spots[space + a].occupied = true;
                            this.spots[space + a].shipName = name;
                        }
                    }
                //}
            }
            if (orientation == 'vertical') {
                //if (space + (shipLength - 1) * 10 < 100) {
                    if (this.availablePlacement(space, shipLength, orientation)) {
                        for (let b = 0; b < shipLength; b++) {
                            this.spots[space + b * 10].occupied = true;
                            this.spots[space + b * 10].shipName = name;
                        }
                   }
                //}
            }
            return;

        },
        receiveAttack: function (space) {
            this.spots[space].hit = true;
        },
    }
    return board;
}
module.exports = gameboard;