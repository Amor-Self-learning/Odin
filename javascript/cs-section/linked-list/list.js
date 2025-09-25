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
}

export default List;