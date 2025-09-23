function fibs(num) {
  const arr = [0, 1];
  if (num === 0) return [0];
  else if (num === 1) return [0, 1];
  for (let i = 2; i <= num; i++) {
    arr.push(arr[i-1] + arr[i-2]);
  }
  return arr;
}

function fibsRec(num, arr=[]) {
  if (num < 3) {
    const newArr = []
    for (let i = 0; i < num; i ++ ) {
      newArr.push(i)
    }
    return newArr
  }
  const newArr = fibsRec(num - 1)
  return newArr.concat(newArr.at(-1) + newArr.at(-2))
}
console.log(fibs(8));
console.log(fibsRec(9));
