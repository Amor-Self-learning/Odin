class Ship {
  constructor(length){
    this.length = length;
    this.hits = 0;
  }

  hit(){
    this.hits ++;
  }
  isSunk(){
    if (this.hits < this.length){
      return false;
    }
    return true;
  }
}

class GameBoard {
  constructor(size = 10, ships = 5) {
    this.size = size;
    this.ships = ships;
    this.sunkShips = 0;
    this.board =  Array.from({length : this.size}, () => Array(this.size).fill(0));
    this.placeShips();
  }

  // Rendomly Place ships on board
  placeShips() {
    for(let i = 0; i < this.ships; i ++) {
      let x, y;
      const length = i + 1;
      let direction = Math.round(Math.random());
      direction = direction === 0 ? 'x' : 'y';
      do {
        x = Math.floor(Math.random() * this.size);
        y = Math.floor(Math.random() * this.size);
      } while(!this.isValidCoords(x, y, length, direction));

      const ship = new Ship(length);

      if(direction === 'y'){
        for(let j = 0; j < length; j++) {
          this.board[x + j][y] = ship;
        }
      } else if (direction === 'x') {
        for(let k = 0; k < length; k++) {
          this.board[x][y + k] = ship;
        }
      }
    }
  }
  
  isValidCoords(x, y, length, direction) {
    if(direction === 'y') {
      for(let i = 0; i < length; i++) {
        if(x + i > this.size - 1){
          return false;
        }
        if(this.board[x + i][y] !== 0) {
          return false;
        }
      }
      return true;
    } else if (direction === 'x') {
      for(let i = 0; i < length; i++) {
        if(y + i > this.size - 1) {
          return false;
        }
        if(this.board[x][y + i] !== 0) {
          return false;
        }
      }
      return true;
    }
    throw new Error(`Unkown Direction: ${direction}`);
  }
  receiveAttack(x, y) {
    if(x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) {
      throw new Error(`Out of index ${x} and ${y}`);
    }

    if(this.board[x][y] === 0) {
      this.board[x][y] = -1;
      return false;
    }
    if (typeof this.board[x][y] === 'object') {
      this.board[x][y].hit();
      if(this.board[x][y].isSunk()) this.sunkShips ++;
      this.board[x][y] = 1;
      return true;
    }
  }

  allShipsSunk() {
    if (this.sunkShips < this.ships) return false;
    return true;
  }
}

export {Ship, GameBoard}