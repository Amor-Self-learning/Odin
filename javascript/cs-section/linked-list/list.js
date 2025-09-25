class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  head = null;
  tail = null;
  size = 0;
  constructor() {};
  AddHeadTail(node) {
    this.head = node;
    this.tail = node;
  }
  append(elem) {
    const node = new Node(elem);
    if (this.size === 0) {
      this.AddHeadTail(node);
    }
    this.tail.next = node;
    this.tail = node;
    this.size ++;
  }
  prepend(elem) {
    const node = new Node(elem);
    if (this.size === 0) {
      this.AddHeadTail(node);
    }
    node.next = this.head;
    this.head = node;
    this.size ++;
  }

  toString() {
    let temp = this.head;
    let str = '';
    while(temp != null) {
      str += `${String(temp.value)} -> `
      if (temp.next) {
        temp = temp.next
      } else {
        break;
      }
    }
    return str;
  }

  get size() {
    return this.size;
  }

  get head() {
    return this.head;
  }

  get tail() {
    return this.tail;
  }

  at(index) {
    let temp = this.head;
    for (let i = 0; i <= index; i ++) {
      if (i >= this.size || i < 0) {
        throw new Error('Out of index.')
      }
      if (i === index) {
        return temp;
      } else if (temp.next) {
        temp = temp.next
      } 
    }
    return null;
  }

  pop() {
    const nodeToRemove = this.at(this.size - 1);
    const newTail = this.at(this.size - 2);
    newTail.next = null;
    this.tail = newTail;
    this.size --;
    return nodeToRemove;
  }

  contains(value) {
    let temp = this.head;
    while (temp !== null) {
      if (temp.value === value) {
        return true;
      }
        temp = temp.next
    }
    return false;
  }

  find(value) {
    let temp = this.head;
    for (let i = 0; i < this.size; i ++) {
      if (temp.value === value) {
        return i;
      }
      temp = temp.next
    }
    return null;
  }
}

export default List;