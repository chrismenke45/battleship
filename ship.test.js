const ship = require('./ship');

test.skip('check it makes hit areas', () => {
  expect(ship(1, 'cargo').hit1).toBe(false);
});
test.skip('check it makes multiple hit areas', () => {
  expect(ship(2, 'cargo').hit1).toBe(false);
  expect(ship(2, 'cargo').hit2).toBe(false);
});
test.skip('check sunk method works if not sunk', () => {
  let yee = ship(2, 'cargo')
  yee.isSunk();
  expect(yee.sunk).toBe(false);
});
test.skip('check sunk method works if sunk', () => {
  let boat = ship(2, 'cargo');
  boat.hit(1);
  boat.hit(2);
  boat.isSunk();
  expect(boat.sunk).toBe(true);
});