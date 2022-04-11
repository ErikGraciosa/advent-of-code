const fs = require('fs');
const readFile = fs.readFileSync('./Day5Input.txt', 'utf-8');

//Input munging
const inputData = readFile.split('\r\n');

const coordinateStrings = inputData.map(str => str.replace(' -> ', ','));
const coordinates = coordinateStrings.map(str => str.split(',')); //Element Format [ '76', '321', '482', '727' ]

//Evaluate only vertical or horizontal lines
//Count the number of intersections of each line

//Filter out only vertical and horizontal and diagonal
const orthogonalLines = coordinates.filter(arr => {
  let evaluation = false;
  
  if(arr[0] === arr[2] || arr[1] === arr[3]){
    evaluation = true;
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
  if(x1 === x2 && y1 < y2) {
    for(let i = y1; i <= y2; i++) {
      workingMatrix[x1][i]++;
    }
  } else if(x1 === x2 && y1 > y2) {
    for(let i = y2; i <= y1; i++) {
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

//Find the diagonal lines

const differentDiags = coordinates.filter(arr => {
  let isDiag = false;
  if(Math.abs(arr[0] - arr[2]) === Math.abs(arr[1] - arr[3])) {
    isDiag = true;
  }
  return isDiag;
})
console.log(differentDiags);

differentDiags.forEach(diag => {
  const x1 = Number(diag[0]);
  const y1 = Number(diag[1]);
  const x2 = Number(diag[2]);
  const y2 = Number(diag[3]);
  let j = y1;
  if(x1 < x2 && y1 > y2) {
    for(let i = x1; i <= x2; i++) {
      workingMatrix[i][j]++;
      j--;
    }
  } else if(x1 > x2 && y1 < y2) {
    for(let i = x1; i >= x2; i--) {
      workingMatrix[i][j]++;
      j++;
    }
  } else if(x1 < x2 && y1 < y2) {
    for(let i = x1; i <= x2; i++) {
      workingMatrix[i][j]++;
      j++;
    } 
  } else if (x1 > x2 && y1 > y2) {
    for(let i = x1; i >= x2; i--) {
      workingMatrix[i][j]++;
      j--;
    }
  }
});

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
//Errors in loops for y1>y2 and x1>x2, answer is 6007

//Part 2
//Now add in diagonal lines to the filtered list and also count those intersections
//8679 is too low
//Found missing increment to the working matrix, second guess 8789, also too low
//Found not counting when coordinates have x1 > x2 for diagonals
//9330 tool low.
//Bad slope calculation found, problem with division likely.

//Correct answer is 19349.
