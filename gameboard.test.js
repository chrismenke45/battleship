/*import { it } from '@jest/globals';
import gameboard from './gameboard.js'
import ship from './ship.js'*/
const gameboard = require('./gameboard');
const ship = require('./ship');

test('check it makes all spots', () => {
    let board = gameboard();
    expect(board.spots.length).toBe(100);
});
test('check it makes spots correctly', () => {
    let board = gameboard();
    expect(board.spots[2]).toEqual({position: '02', occupied: false, hit: false,});
});
test('check if place makes spots occupied horizontally', () => {
    let board = gameboard();
    let boat = ship(3,'cargo');
    board.place(22, boat, 'horizontal');
    expect(board.spots[22].occupied).toBe(true);
    expect(board.spots[23].occupied).toBe(true);
    expect(board.spots[24].occupied).toBe(true);
    expect(board.spots[25].occupied).toBe(false);
    expect(board.spots[21].occupied).toBe(false);
    expect(board.spots[32].occupied).toBe(false);
    
});
test('check if place will makes spots vertically', () => {
    let board = gameboard();
    let boat = ship(3,'cargo');
    board.place(22, boat, 'vertical');
    expect(board.spots[22].occupied).toBe(true);
    expect(board.spots[23].occupied).toBe(false);
    expect(board.spots[24].occupied).toBe(false);
    expect(board.spots[42].occupied).toBe(true);
    expect(board.spots[12].occupied).toBe(false);
    expect(board.spots[32].occupied).toBe(true);
    
});
test('check if place wont place when off map vertically', () => {
    let board = gameboard();
    let boat = ship(3,'cargo');
    board.place(88, boat, 'vertical');
    expect(board.spots[88].occupied).toBe(false);
    expect(board.spots[89].occupied).toBe(false);
    expect(board.spots[87].occupied).toBe(false);
    expect(board.spots[98].occupied).toBe(false);
    expect(board.spots[99].occupied).toBe(false);
    expect(board.spots[78].occupied).toBe(false);
});
test('check if place wont place when off map horizonatally', () => {
    let board = gameboard();
    let boat = ship(3,'cargo');
    board.place(88, boat, 'horizontal');
    expect(board.spots[88].occupied).toBe(false);
    expect(board.spots[89].occupied).toBe(false);
    expect(board.spots[87].occupied).toBe(false);
    expect(board.spots[98].occupied).toBe(false);
    expect(board.spots[90].occupied).toBe(false);
    expect(board.spots[78].occupied).toBe(false);
});
test('check if recieveAttack works', () => {
    let board = gameboard();
    board.receiveAttack(88);
    expect(board.spots[88].hit).toBe(true);
    expect(board.spots[89].hit).toBe(false);
    expect(board.spots[87].hit).toBe(false);
    expect(board.spots[99].hit).toBe(false);
});