import { Player } from './main.js';
const playerBoard = document.querySelector('.player.board');
const computerBoard = document.querySelector('.computer.board');
const main = document.querySelector('main');
const turnDiv = document.querySelector('.turn');

let turn, player, computer, gameEnd;
function startGame() {
  turnDiv.textContent = "Your Turn!";
  gameEnd = false;
  player = new Player('You');
  computer = new Player('Computer');
  turn = 0;
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++){
      const cell1 = createCell('player');
      cell1.dataset.x = i;
      cell1.dataset.y = j;
      playerBoard.appendChild(cell1);
      const cell2 = createCell('computer');
      cell2.dataset.x = i;
      cell2.dataset.y = j;
      computerBoard.appendChild(cell2);
    }
  }
}
startGame();
main.addEventListener('click', (e) => {
  if(!e.target.dataset.x && !e.target.dataset.y || gameEnd) {
    return false;
  }
  if(turn % 2 === 0 &&
    e.target.classList.contains('computer') &&
    validMove(e.target.dataset.x, e.target.dataset.y)
  ) {
    playerMove(e.target.dataset.x, e.target.dataset.y);
    return true;
  }
})

function validMove(x, y) {
  x = parseInt(x);
  y = parseInt(y);
 
  if (computer.gameboard.board[x][y] === 1 || computer.gameboard.board[x][y] === -1) {
    return false;
  }
  return true;
}
function createCell(player) {
  const cell = document.createElement('div');
  cell.className = `cell ${player}`;
  return cell;
}

function playerMove(x, y) {
  const result = computer.gameboard.receiveAttack(parseInt(x), parseInt(y));
  renderBoard(computerBoard, computer.gameboard.board)
  
  if(computer.gameboard.allShipsSunk()) {
    declareWinner(player);
    return true;
  }

  if (result === true) {
    // If it was a HIT, do NOT increment turn, and tell the player to go again
    turnDiv.textContent = "Hit! Your Turn Again!";
    return true;
  }
  
  turn ++;
  turnDiv.textContent = "Computer's Turn!";
  setTimeout(computerMove, 100);
  return true;
}

function computerMove() {
  let result;
  do {
    const [x, y] = getComputerMove();
    result = player.gameboard.receiveAttack(x, y);
    setTimeout(() => {
      renderBoard(playerBoard, player.gameboard.board);
      turnDiv.textContent = "Your Turn!";
    }, 200); 

    if(player.gameboard.allShipsSunk()) {
      declareWinner(computer);
      return true;
    }
  } while (result); // Continue to loop if result is TRUE (hit)

  turn ++;
  return true;
}

function getComputerMove() {
  let x, y;
  let boardValue;
  do {

    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    boardValue = player.gameboard.board[x][y];
  // Loop while the cell has Not ALREADY been hit (1) or missed (-1)
  } while (boardValue === 1 || boardValue === -1); 
  return [x, y];
}

function renderBoard (dom, board) {
  for(let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j ++) {
      const cell = dom.querySelector(`[data-x="${i}"][data-y="${j}"]`);
      
      // 1. Render Hit (Both Boards)
      if(board[i][j] === 1) {
        cell.classList.add('hitted');
        cell.textContent = 'X';
      } 
      // 2. Render Miss (Both Boards)
      else if(board[i][j] === -1) {
        cell.classList.add('missed');
        cell.textContent = '.';
      }
      else if (dom === playerBoard && typeof board[i][j] === 'object') { 
        cell.classList.add('ship'); // Add a class to style the unhit ship
      }
      else if (board[i][j] === 0) {
        cell.textContent = '';
      }
    }
  }
}
function declareWinner(player) {
  gameEnd = true;
  const header = document.querySelector('header');
  header.textContent = `${player.name} Won the game`;
  clearSections()
  startGame()
}

function clearSections() {
  while(playerBoard.firstChild) {
    playerBoard.firstChild.remove()
  }
  while(computerBoard.firstChild) {
    computerBoard.firstChild.remove()
  }
}