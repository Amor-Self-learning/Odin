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
const tree = new Tree(1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324);