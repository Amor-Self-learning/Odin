class Knight{
  constructor(){
    this.moves = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
  }

  isValid(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  knightMoves(start, end) {
    if (start[0] === end[0] && start[1] === end[1]){
      return start;
    }

    const queue = [[start, [start]]]; // start and path
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0){
      const [current, path] = queue.shift();
      const [x, y] = current;

      for (const [dx, dy] of this.moves) {
        const newX = x + dx;
        const newY = y + dy;
        const newPos = [newX, newY];

        if (newX === end[0] && newY === end[1] ){
          return [...path, newPos];
        }

        if (this.isValid(newX, newY) && !visited.has(newPos.toString())){
          visited.add(newPos.toString());
          queue.push([newPos, [...path, newPos]]);
        }
      }
    }
    return null;
  }
  getKnightMoves(start, end){
    const path = this.knightMoves(start, end);
    console.log(`You made it in ${path.length - 1} moves! Here is your path: `);
    path.forEach(pos => {
      console.log(pos);
    });
    return path;
  }
}

const knight = new Knight();

console.log("Example 1:");
knight.getKnightMoves([0, 0], [3, 3]);

console.log("\nExample 2:");
knight.getKnightMoves([0, 0], [7, 7]);

console.log("\nExample 3:");
knight.getKnightMoves([3, 3], [4, 3]);