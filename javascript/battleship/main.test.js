import {expect, test} from '@jest/globals';
import {Ship, GameBoard} from './main';

const gameboard = new GameBoard(1, 1);
const ship = new Ship(3);

test('ship has 0 hits', () => {
  expect(ship.hits).toBe(0);
});
test('ship is not sunked', () => {
  expect(ship.isSunk()).toBeFalsy();
});
test('ship has 1 hits', () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});
test('ship has 2 hits', () => {
  ship.hit();
  expect(ship.hits).toBe(2);
});
test('ship has three hits and is snuked', () => {
  ship.hit();
  expect(ship.hits).toBe(3);
  expect(ship.isSunk()).toBeTruthy();
})

let ships = 0;
  for(let row of gameboard.board) {
    for(let col of row) {
      if(typeof col === 'object') {
        ships ++;
      }
    }
  }

test('game board has 15 ships in it ', () => {
  
  expect(ships).toBe(1);
})

test('Recieve Attack ', () => {
  expect(gameboard.receiveAttack(0, 0)).toBe(true);
})
test('Number of ships sunk ', () => {
  expect(gameboard.ships).toBe(1);
})
test('All ships sunk ', () => {
  expect(gameboard.allShipsSunk()).toBe(true);
})