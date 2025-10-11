const {capitalize, reverseString, calculator, ceaserCipher, analyzeArray} = require('./tests');

test('hello should be equal to Hello', () =>{
  expect(capitalize('hello')).toBe('Hello');
});

test('hello should be equal to olleh', () => {
  expect(reverseString('hello')).toBe('olleh');
});

test('11 + 2 equal to 13', () => {
  expect(calculator.add(11, 2)).toBe(13);
});
test('11 * 2 equal to 22', () => {
  expect(calculator.multiply(11, 2)).toBe(22);
});
test('11 / 2 equal to 5.5', () => {
  expect(calculator.divide(11, 2)).toBe(5.5);
});
test('11 - 2 equal to 9', () => {
  expect(calculator.sub(11, 2)).toBe(9);
});

test('Hello, 1 to be Ifmmp', () => {
  expect(ceaserCipher('Hello', 1)).toBe('Ifmmp');
});

test('[-5, 1, 6, 5, 3] to max = 6, min = -5, avg = 2, length = 5', () => {
  expect(analyzeArray([-5, 1, 6, 5, 3])).toEqual({min: -5, max: 6, avg: 2, length:5});
})