import List from './list.js';

const list = new List('0', '1');

list.append('2')
list.append('3')
list.prepend('-1')

console.log(list.toString())
console.log(list.size, list.head, list.tail)
console.log(list.at(0))
console.log(list.contains('-1'), list.contains(4))
console.log(list.find('2'))
console.log(list.insertAt('4', 1), list.toString())
console.log(list.removeAt(1), list.toString())