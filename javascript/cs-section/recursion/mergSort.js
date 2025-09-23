function mergeSort(arr) {
  if(arr.length <= 1) {
    return arr
  }
  let newArr = []
  const middle = Math.floor(arr.length/2)
  const array1 =  mergeSort(arr.slice(0, middle));
  const array2 = mergeSort(arr.slice(middle));
  let i = 0;
  let j = 0;
  while(i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      newArr.push(array1[i]);
      i++;
    } else {
      newArr.push(array2[j]);
      j++;
    }
  }
  while (i < array1.length) {
    newArr.push(array1[i]);
    i ++;
  }
  while (j < array2.length) {
    newArr.push(array2[j]);
    j ++;
  }
  return newArr;
}

console.log(mergeSort([0, 4, 3, 2,9]))