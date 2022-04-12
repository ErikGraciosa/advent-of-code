const fs = require('fs');
const readFile = fs.readFileSync('./Day7Input.txt', 'utf-8');

//Input munging
const inputData = readFile.split(',');

const horizontalLocations = inputData.map(num => Number(num));
//console.log(horizontalLocations); //~1000 length

const median = arr => {
  let middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
};

const crabMedian = median(horizontalLocations);

let fuelRequired = 0;
for(let i = 0; i < horizontalLocations.length; i++) {
  fuelRequired = fuelRequired + Math.abs(horizontalLocations[i] - crabMedian);
}

console.log(`Linear fuel cost calculated ${fuelRequired}`);

//Answer too low 141695
//.reduce fixed 328657 is too high
//changed to a for loop 328318, right answer

//PART 2

const average = (arr) => {
  return Math.round((arr.reduce((total, val) => total + val) / arr.length));
}

const linearFuelAdded = (distance) => {
  return 0.5 * distance + 0.5 * distance * distance;
}


const crabAverage = average(horizontalLocations);
let newFuelCalc = 0;
for(let i = 0; i < horizontalLocations.length; i++) {
  newFuelCalc = newFuelCalc + linearFuelAdded(Math.abs(horizontalLocations[i] - 467));
}

console.log(crabAverage)
console.log(`Exponential fuel cost calculated ${newFuelCalc}`);
//341134 is too low
//89791190 is too high, rounded average 468
//89791146 is right with rounded average 467