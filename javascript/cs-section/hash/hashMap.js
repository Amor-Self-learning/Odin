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

  validCapacity() {
    const capacity =  this.entries / this.length;
    if (capacity >= this.loadFactor) {
      this.updateBuckets();
      return true;
    } 
    return true;
  }
  updateBuckets() {
    this.length *= 2;
    const buckets = structuredClone(this.buckets);
    console.log(buckets, '38')
    this.clear()
    console.log(buckets, '40')
    for (let bucket of buckets) {
      for (let node of bucket) {
        this.set(node.key, node.value)
      }
    }
  }

  clear() {
    for(let i = 0; i < this.length; i++) {
      this.buckets[i] = []
    }
    this.entries = 0;
  }

  set(key, value) {
    this.validCapacity();
    const hashCode = hash(key, this.length);
    let alreadyExist = null;
    const bucket = this.buckets[hashCode].length > 0 ? this.buckets[hashCode] : null;
    if (bucket) {
      for(let node of bucket) {
        if (node.key === key)
        alreadyExist = node;
      }
    }
    if (alreadyExist) {
      alreadyExist.value = value;
      return true;
    }
    const node = new Node(key, value);
    this.buckets[hashCode].push(node);
    this.entries ++
    return true;
  }

  get(key) {
    const hashCode = hash(key, this.length);
    let nodeExist = null;
    const bucket = this.buckets[hashCode].length > 0 ? this.buckets[hashCode] : null;
    if (bucket) {
      for(let node of bucket) {
        if (node.key === key)
        nodeExist = node;
      }
      if (nodeExist) {
        return nodeExist.value
      }
    }
    return null;
  }
}

export default HashMap;