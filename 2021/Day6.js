const fs = require('fs');
const readFile = fs.readFileSync('./Day6Input.txt', 'utf-8');

//Input munging
const inputData = readFile.split(',');


//Following the laternfish repoduction rules how many laternfish exist after 80 days.

const DAYS = 256;

//Initial state
//Array that represents fish.
const laternfish = inputData.map(num => Number(num));
let laternfishPart2 = inputData.map(num => Number(num));
//Need to process a day
//If fish goes to 0 then push an '8' to the end of the array
const processOneDay = (array) => {
  let fishToAdd = 0;
  //Check if any fish need to be added
  for(let i = 0; i < array.length; i++) {
    if(array[i] === 0){
      fishToAdd++;
      array[i] = 6;
    } else {
      array[i]--;
    }
  }

  //Add fish to the array
  while(fishToAdd > 0) {
    array.push(8);
    fishToAdd--;
  }
  return array;
}

//Not good for large arrays
// for(let i = 0; i < DAYS; i++) {
//   processOneDay(laternfish);
// }

//Guess of 3300 too low
//377263 right answer

//Part 2, how many fish if 256 days,
//Has issues with # Fatal error in , line 0
//# Fatal JavaScript invalid size error 144230630

//Is there a calculation for how many fish in the future will spawn for days to simulate?

//Set up for a fish histogram and life cycle
//Initial array
const fishPopulationByDay = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//Distribute the fish
laternfishPart2.forEach(fish => {
  fishPopulationByDay[fish]++;
});

//Array mutating function
const processHistogram = (array) => {
  //Save the day 0 spawning fish
  const spawningFish = array[0];
  
  //Age all fish
  array.shift();

  //Add the spawning fish to 6-index and 8-index
  array[6] = array[6] + spawningFish;
  array[8] = spawningFish;

  return array;
}

for(let i = 0; i < DAYS; i++) {
  processHistogram(fishPopulationByDay);
}

console.log(fishPopulationByDay.reduce((val, total) => val + total));