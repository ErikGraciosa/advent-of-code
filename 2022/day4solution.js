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

dataAsTuples.forEach(tuples => {
  if(tuples[0][0] === tuples[1][0] && tuples[0][1] === tuples[1][1]) {
    overlapSections++;
  } else if(checkSections(tuples[0], tuples[1])) {
    overlapSections++;
  } else if(checkSections(tuples[1], tuples[0])) {
    overlapSections++;
  }
});

console.log(overlapSections); //496 right answer

//Part 2
//Check for any overlap and increase counter if overlap detected for each pair.
const checkSectionsAnyOverlap = (sectionOne, sectionTwo) => {
  if(
    (Number(sectionOne[0]) >= Number(sectionTwo[0]) && Number(sectionOne[0]) <= Number(sectionTwo[1])) || 
    (Number(sectionOne[1]) >= Number(sectionTwo[0]) && Number(sectionOne[1]) <= Number(sectionTwo[1]))
  ) {
    return true;
  }
  return false;
}


let anyOverlaps = 0;
dataAsTuples.forEach(tuples => {
  if(tuples[0][0] === tuples[1][0] ||
    tuples[0][0] === tuples[1][1] ||
    tuples[0][1] === tuples[1][0] ||
    tuples[0][1] === tuples[1][1]
  ) {
    anyOverlaps++;
  } else if(checkSectionsAnyOverlap(tuples[0], tuples[1])) {
    anyOverlaps++;
  } else if(checkSectionsAnyOverlap(tuples[1], tuples[0])) {
    anyOverlaps++;
  }
})

console.log(anyOverlaps) //Answer is 847
