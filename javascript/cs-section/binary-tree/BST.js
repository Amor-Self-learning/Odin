class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(...args) {
    args = removeDuplicates(args).sort((a, b) => a - b);
    this.root = buildTree(args)
  }

  insert(value, root) {
    if (root === null) {
      return new Node(value);
    }
    if (!value || value === root.value) {
      return root;
    }
    else if (value < root.value) {
      root.left = this.insert(value, root.left)
    } else if (value > root.value) {
      root.right  = this.insert(value, root.right)
    }
    return root;
  }

  // Got this from geeks for geeks
  deleteItem(value, root) {
    if (root === null) {
        return root;
    }
    if (root.value > value) {
        root.left = this.deleteItem(value, root.left);
    } else if (root.value < value) {
        root.right = this.deleteItem(value, root.right);
    } else {

        // Cases when root has 0 children or 
        // only right child
        if (root.left === null) 
            return root.right;

        // When root has only left child
        if (root.right === null) 
            return root.left;
        // When both children are present
        let succ = getSuccessor(root);
        root.value = succ.value;
        root.right = this.deleteItem(succ.value, root.right);
    }
    return root;
  }
  findValue(value, root) {
    if (root === null) {
      return null;
    }
    if (root.value === value) {
      return root;
    }
    if (root.value > value) {
      return this.findValue(value, root.left);
    } else if (root.value < value) {
      return this.findValue(value, root.right);
    }
    return root;
  }
  
  levelOrderForEach(callback, root) {
    if (!callback || typeof callback !== 'function') {
      throw new TypeError(`Require a callback here you provided ${callback}`)
    }
    let queue = [root]
    while(queue.length > 0) {
      const node = queue.shift();

      callback(node);

      if(node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }
  preOrderForEach(callback, root) {
    if (!callback || typeof callback !== 'function') {
      throw new TypeError(`Require a callback here you provided ${callback}`)
    }
    if (root === null) {
      return root;
    }
    callback(root)
    if (root.left) this.preOrderForEach(callback, root.left);
    if (root.right) this.preOrderForEach(callback, root.right);
    return root;
  }
  
  inOrderForEach(callback, root) {
    if (!callback || typeof callback !== 'function') {
      throw new TypeError(`Require a callback here you provided ${callback}`)
    }
    if (root === null) {
      return root;
    }
    if (root.left) this.inOrderForEach(callback, root.left);
    callback(root);
    if (root.right)  this.inOrderForEach(callback, root.right);
    return root;
  }

  postOrderForEach(callback, root) {
    if (!callback || typeof callback !== 'function') {
      throw new TypeError(`Require a callback here you provided ${callback}`)
    }
    if (root === null) {
      return root;
    }
    if (root.left) this.postOrderForEach(callback, root.left);
    if (root.right)  this.postOrderForEach(callback, root.right);
    callback(root);
    return root;
  }

  height(value) {
    const node = this.findValue(value, this.root);
    if (node === null) {
      return null;
    }
    function findHeight(node) {
      if (node === null) {
        return - 1;
      }
      return 1 + Math.max(findHeight(node.left), findHeight(node.right));
    }
    return findHeight(node);
  }

  depth(value) {
    function findDepth(value, currentDepth, root) {
      if (root === null) {
        return null;
      }
      if (root.value === value) {
        return currentDepth;
      }

      if (value < root.value) {
        return findDepth(value, currentDepth + 1,  root.left);
      }
      else if (value > root.value) {
        return findDepth(value, currentDepth + 1,  root.right);
      }
      return currentDepth;
    }
    return findDepth(value, 0, this.root)
  }

  isBalanced(root) {
      function checkBalance(root) {
      if (root === null) {
        return - 1;
      }

      let leftResult = checkBalance(root.left);
      let rightResult = checkBalance(root.right);

      if (leftResult === -2 || rightResult === -2) {
        return - 2;
      }
      if (Math.abs(leftResult - rightResult) > 1) {
        return -2; // Send the imbalance signal!
      }

      return 1+ Math.max(leftResult, rightResult);
    }
    if (checkBalance(root) !== -2){
      return true;
    }
    return false;
  }
  reBalance() {
    const sortedArr = [];
    const collector = (node) => {
      sortedArr.push(node.value);
    };
    this.inOrderForEach(collector, this.root);

      function sortedArrayToBST(arr, start, end) {
        if (start > end) {
          return null;
        }
      const mid = Math.floor((start + end) / 2);
      const newNode = new Node(arr[mid])
      newNode.left = sortedArrayToBST(arr, start, mid - 1);
      newNode.right = sortedArrayToBST(arr, mid + 1, end);

      return newNode;
    }
    this.root = sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
}
}
function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
        curr = curr.left;
    }
    return curr;
}

// Function that removes duplicates
function removeDuplicates(args) {
  for (let i = 0; i < args.length; i++) {
    for (let j =i + 1; j < args.length - 1; j++) {
      if (args[i] === args[j]) {
        args.splice(j, 1)
      }
    }
  }
  return args;
}

function buildTree(args) {
  if (args.length === 0) {
    return null;
  }
  const rootIndex = Math.floor(args.length / 2);
  const root = new Node(args[rootIndex]);
  const left = args.slice(0, rootIndex);
  const right = args.slice(rootIndex + 1);
  root.left = buildTree(left);
  root.right = buildTree(right);
  return root;
}

export default Tree;