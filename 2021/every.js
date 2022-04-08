const arr = ['18x', '15', '16x'];

function hasX(element) {
  return element.includes('x');
}
const testVar = arr.every(hasX);
console.log(testVar);