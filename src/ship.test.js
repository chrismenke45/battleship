const ship = require('./ship');


test('check it makes hit areas', () => {
  let boat = ship(3, 'cargo')
  boat.hit()
  expect(boat.hits).toBe(1);
});
test('check it makes multiple hit areas', () => {
  let boat = ship(3, 'cargo')
  boat.hit()
  boat.hit()
  expect(boat.hits).toBe(2);
});
test('check sunk method works if not sunk', () => {
  let boat = ship(3, 'cargo')
  boat.hit()
  boat.hit()
  expect(boat.isSunk()).toBe(false);
});
test('check sunk method works if sunk', () => {
  let boat = ship(3, 'cargo')
  boat.hit()
  boat.hit()
  boat.hit()
  expect(boat.isSunk()).toBe(true);
});
