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

console.log(fuelRequired);

//Answer too low 141695
//.reduce fixed 328657 is too high
//changed to a for loop 328318, right answer
