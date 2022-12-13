const fs = require('fs');

const readFile = fs.readFileSync('./day4Input.txt', 'utf-8');

const data = readFile.split('\r\n');
    
console.log(data);

const dataAsTuples = data.map(input => {
  const stepOneMunge = input.split(',');
  const stepTwoMunge = stepOneMunge.map(input => input.split('-'));
  return stepTwoMunge;
})

console.log(dataAsTuples)
//How many section ranges fully contain the other

let overlapSections = 0;

//Assume tuple inputs [number, number]
const checkSections = (sectionOne, sectionTwo) => {
  if(Number(sectionOne[0]) <= Number(sectionTwo[0]) && Number(sectionOne[1]) >= Number(sectionTwo[1])) {
    return true;
  }
  return false;
}

dataAsTuples.forEach(tuple => {
  if(tuple[0][0] === tuple[1][0] && tuple[0][1] === tuple[1][1]) {
    overlapSections++;
  } else if(checkSections(tuple[0], tuple[1])) {
    overlapSections++;
  } else if(checkSections(tuple[1], tuple[0])) {
    overlapSections++;
  }
});

console.log(overlapSections); //496 right answer

//Part 2

