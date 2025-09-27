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

class HashMap {
  entries = 0;
  length = 16;
  loadFactor = 0.75;
  constructor() {
    this.buckets = [];
    for (let i = 0; i < this.length; i ++) {
      this.buckets[i] = []
    }
  }
}

export default HashMap;