const fs = require('fs');
const readFile = fs.readFileSync('./Day5Input.txt', 'utf-8');

//Input munging
const inputData = readFile.split('\r\n');

const coordinateStrings = inputData.map(str => str.replace(' -> ', ','));
const coordinates = coordinateStrings.map(str => str.split(','));

//Evaluate only vertical or horizontal lines
//Count the number of intersections of each line

//Filter out only vertical and horizontal
const orthogonalLines = coordinates.filter(arr => {
  let evaluation = false;
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] === arr[j]){
        evaluation = true;
      }
    }
  }
  return evaluation;
});

//Filling matrix with values
const workingMatrix = [];

for(let i = 0; i < 1000; i++) {
  let dummyArr = [];
  for(let j = 0; j < 1000; j++) {
    dummyArr.push(0);
  }
  workingMatrix.push(dummyArr);
}

// Start adding each line as points in the empty matrix any value greater than 1 is where overlaps occur
orthogonalLines.forEach(line => {
  const x1 = Number(line[0]);
  const y1 = Number(line[1]);
  const x2 = Number(line[2]);
  const y2 = Number(line[3]);
  //update vertical lines
  console.log(x1, y1, x2, y2);
  if(x1 === x2 && y1 < y2) {
    for(let i = y1; i <= y2; i++) {
      
      workingMatrix[x1][i]++;
    }
  } else if(x1 === x2 && y1 > y2) {
    for(let i = y2; i <= y1; i++) {
      console.log(x1, i);
      workingMatrix[x1][i]++;
    }
  } else if(y1 === y2 && x1 < x2) {
    for(let i = x1; i <= x2; i++) {
      workingMatrix[i][y1]++;
    }
  } else if(y1 === y2 && x1 > x2) {
    for(let i = x2; i <= x1; i++) {
      workingMatrix[i][y1]++;
    }
  }
});

// console.log(workingMatrix);

//Find how many values of the matrix are greater than 1
let countIntersections = 0;
for(let i = 0; i < 1000; i++) {
  for(let j = 0; j < 1000; j++) {
    if(workingMatrix[i][j] > 1) {
      countIntersections++;
    }
  }
}

console.log(countIntersections);

//first guess of 1207 is too low