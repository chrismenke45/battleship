function ship(shipLength, shipName) {
  if ((typeof shipLength) !== 'number') {
    throw ('Put number for 1st Argument')
  }
  const boat = {
    shipName,
    shipLength,
    sunk: false,
    hits: 0,
    hit() {
      this.hits++
    },
    isSunk() {
      if (this.hits == this.shipLength) {
        return true;
      } else {
        return false
      }
    }
  };

  for (let i = 1; i <= shipLength; i++) {
    boat['hit' + i.toString()] = false;
  }
  return boat;
}
module.exports = ship;