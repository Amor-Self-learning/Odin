class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

 function hash(key, length) {
   let hashCode = 0;
      
   const primeNumber = 31;
   for (let i = 0; i < key.length; i++) {
     hashCode = primeNumber * hashCode + key.charCodeAt(i);
   }
   return hashCode % length;
 } 

