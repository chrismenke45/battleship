export function ship(shipLength, shipName) {
  if ((typeof shipLength) !== 'number') {
    throw ('Put number for 1st Argument')
  }
  const boat = {
    shipName,
    shipLength,
    sunk: false,
    hit(position) {
      if ((typeof position) !== 'number') {
        throw ('Put number for Argument')
      }
      this['hit' + position.toString()] = true
    },
    isSunk() {
      for (let j = 1; j <= shipLength; j++) {
        if (this['hit' + j.toString()] == false) {
          return;
        }
        this.sunk = true

      }
    }
  };

  for (let i = 1; i <= shipLength; i++) {
    boat['hit' + i.toString()] = false;
  }
    return boat;
  }
  //module.exports = ship;