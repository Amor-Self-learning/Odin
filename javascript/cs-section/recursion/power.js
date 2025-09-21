function sumup(num) {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  return num + sumup(num - 1)
}

console.log(sumup(10))

function power(num, exp) {
  if(exp === 0) {
    return 1;
  }
  if (num === 0) {
    return 0;
  }
  return num * power(num, exp - 1);
}

console.log(power(4, 3))