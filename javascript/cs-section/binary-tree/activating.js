import Tree from './BST';

const tree = new Tree(1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function increaseByOne(arg) {
  arg.value += 1;
}
prettyPrint(tree.root)
console.log(tree.isBalanced(tree.root))
tree.insert(13, tree.root);
prettyPrint(tree.root)
console.log(tree.findValue(13, tree.root))
console.log(tree.isBalanced(tree.root))
tree.deleteItem(13, tree.root);
prettyPrint(tree.root)
tree.levelOrderForEach(increaseByOne, tree.root)
prettyPrint(tree.root)
tree.inOrderForEach(increaseByOne, tree.root)
prettyPrint(tree.root)
console.log(tree.height(10))
console.log(tree.depth(11))
tree.insert(7000, tree.root); 
tree.insert(8000, tree.root);
tree.insert(9000, tree.root)
prettyPrint(tree.root)
console.log(tree.isBalanced(tree.root))
tree.reBalance(tree.root)
prettyPrint(tree.root);
console.log(tree.isBalanced(tree.root))