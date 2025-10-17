import {expect, test} from '@jest/globals';
import {Ship} from './main';

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
