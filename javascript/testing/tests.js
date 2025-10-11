function isAlpha(char) {
  return /[a-zA-Z]/.test(char);
}

function capitalize(string){
  let newStr = string[0].toUpperCase();
  for(let i = 1; i < string.length; i++){
    newStr+= string[i];
  }
  return newStr;
}

function reverseString(string) {
  let newStr = '';
  for(let i = string.length - 1; i >=0; i --){
    newStr+= string[i];
  }
  return newStr;
}

const calculator = (function () {
  return {
    add(x, y){
      return x + y;
    },
    multiply(x, y){
      return x * y;
    },
    sub(x, y){
      return x - y;
    },
    divide(x, y){
      if (y !== 0){
        return x / y;
      } else {
        return null;
      }
    }
  }
})();

function ceaserCipher(text, factor) {
  factor = factor % 26;
  let newText = '';
  for (let i = 0; i < text.length; i++){
    if(isAlpha(text[i])){
      newText += String.fromCharCode((text.charCodeAt(i)) + factor);
    } else{
      newText += text[i];
    }
  }
  return newText;
}

function analyzeArray(arr) {
  const results = {};
  let max = arr[0], min = arr[0], sum = 0;
  for (let elem of arr){
    if (elem < min) min = elem;
    if (elem > max) max = elem;
    sum += elem;
  }
  results.avg = sum / arr.length;
  results.min = min;
  results.max = max;
  results.length = arr.length;
  return results;
}

module.exports = {capitalize, reverseString, calculator, ceaserCipher, analyzeArray};