const fs = require('fs');
const readFile = fs.readFileSync('./Day9Input.txt', 'utf-8');

//Input munging, make the input a 2D matrix 'an array of arrays'
const inputData = readFile.split('\r\n');
const matrix = inputData.map(str => str.split('').map(el => Number(el)));
  
// console.log(matrix[0].length, matrix.length);

//9 is highest location, 0 is lowest location

//Find the low points, points where each adjacent orthoganal point is higher than the sample
//Risk level is the height of the point + 1.
//Find the sum of all risk levels from the input.

//Traverse through the input
  //Will need to check N,S,E,W but also make sure that the location exists.
//Find the value of a low point
//Add one to that value
//Create a sum of all the risk values

let totalRisk = 0;

const checkNorth = (i, j) => {
  const locationValue = matrix[i][j];
  const northRow = matrix[i - 1] ?? -1;
  
  if(northRow === -1){
    //North does not exist
    return true;
  }
  
  const northValue = northRow[j];
  if(northValue > locationValue) {
    //North is higher
    return true;
  }
  
  //Default case
  return false;
}

const checkEast = (i, j) => {
  const locationValue = matrix[i][j];
  const eastValue = matrix[i][j + 1] ?? -1;
  
  if(eastValue === -1){
    //North does not exist
    return true;
  }
  
  if(eastValue > locationValue) {
    //North is higher
    return true;
  }
  
  //Default case
  return false;
}

const checkSouth = (i, j) => {
  const locationValue = matrix[i][j];
  const southRow = matrix[i + 1] ?? -1;
  
  if(southRow === -1){
    //South does not exist
    return true;
  }
  
  const southValue = southRow[j];
  if(southValue > locationValue) {
    //South is higher
    return true;
  }
  
  //Default case
  return false;
}

const checkWest = (i, j) => {
  const locationValue = matrix[i][j];
  const westValue = matrix[i][j - 1] ?? -1;
  if(westValue === -1){
    console.log(i, j)
    //West does not exist
    return true;
  }
  if(westValue > locationValue) {
    //West is higher
    return true;
  }
  //Default case
  return false;
}

//Traverse all values
for(let i = 0; i < matrix.length; i++) {
  for(let j = 0; j < matrix.length; j++){
    const northIsHigher = checkNorth(i, j);
    const eastIsHigher = checkEast(i, j);
    const southIsHigher = checkSouth(i, j);
    const westIsHigher = checkWest(i, j);
    if(northIsHigher && eastIsHigher && southIsHigher && westIsHigher) {
      const lowPoint = matrix[i][j];
      const localRisk = lowPoint + 1;
      //console.log(`Value: ${lowPoint} west: ${matrix[i][j - 1]} east: ${matrix[i][j + 1]} south: ${matrix[i + 1][j]} north: ${matrix[i - 1][j]}`)
      totalRisk = totalRisk + localRisk;
    }
  }
}

console.log(totalRisk);

//Guess 450 is too low, used variable++ incorrectly
//Guess 783 is too high
//577 is right answer, needed to use nullish coalescing operator ?? not ||

//Part 2 solve for basins