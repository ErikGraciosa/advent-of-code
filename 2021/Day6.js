const fs = require('fs');
const readFile = fs.readFileSync('./Day6Input.txt', 'utf-8');

//Input munging
const inputData = readFile.split(',');


//Following the laternfish repoduction rules how many laternfish exist after 80 days.

const DAYS = 80;

//Initial state
//Array that represents fish.
const laternfish = inputData.map(num => Number(num));
//Need to process a day
//If fish goes to 0 then push an '8' to the end of the array
const processOneDay = (array) => {
  let fishToAdd = 0;
  //Check if any fish need to be added
  for(let i = 0; i < array.length; i++) {
    if(array[i] === 0){
      fishToAdd++;
    }
  }


  //Process the fish
  for(let i = 0; i < array.length; i++) {
    if(array[i] === 0){
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
console.log(laternfish);
for(let i = 0; i < DAYS; i++) {
  processOneDay(laternfish);
  console.log(laternfish)
}

console.log(laternfish.length)
//Guess of 3300 too low