const fs = require('fs');

const calledNumbers = '18,99,39,89,0,40,52,72,61,77,69,51,30,83,20,65,93,88,29,22,14,82,53,41,76,79,46,78,56,57,24,36,38,11,50,1,19,26,70,4,54,3,84,33,15,21,9,58,64,85,10,66,17,43,31,27,2,5,95,96,16,97,12,34,74,67,86,23,49,8,59,45,68,91,25,48,13,28,81,94,92,42,7,37,75,32,6,60,63,35,62,98,90,47,87,73,44,71,55,80';

const numbersArray = calledNumbers.split(',');
//const numbersArray = stringArray.map(num => Number(num));
console.log(numbersArray);


const readFile = fs.readFileSync('./Day4Input.txt', 'utf-8');

let data = readFile.split('\r\n\r\n');
let newdata = data.join('\r\n');

const singleLines = newdata.split('\r\n');
console.log(singleLines[0])
let allBingoBoards = [];

for(let i = 0; i < singleLines.length; i = i + 5) {
  const bingoBoardBuilder = [];
  for(let j = 0; j < 5; j++){
    bingoBoardBuilder.push(singleLines[i + j]);
  }
  allBingoBoards.push(bingoBoardBuilder.join(' '));
}

allBingoBoards = allBingoBoards.map(el => el.split(' '));
allBingoBoards = allBingoBoards.map(el => el.filter(el => el != ''));

//Check horizontals for bingos
const checkHorizontalBingo = (board, boardLocation) => {
  //0-4, 5-9, 10-14, 15-19, 20-24
  if(boardLocation >= 0 && boardLocation < 5) {
    return checkValuesForXs([board[0], board[1], board[2], board[3], board[4]]);
  } else if (boardLocation >= 5 && boardLocation < 10) {
    return checkValuesForXs([board[5], board[6], board[7], board[8], board[9]]);
  } else if (boardLocation >= 10 && boardLocation < 15) {
    return checkValuesForXs([board[10], board[11], board[12], board[13], board[14]]);
  } else if (boardLocation >= 15 && boardLocation < 20) {
    return checkValuesForXs([board[15], board[16], board[17], board[18], board[19]]);
  } else if (boardLocation >= 20 && boardLocation < 25) {
    return checkValuesForXs([board[20], board[21], board[22], board[23], board[24]]);
  }
  return false;
}
//Check verticals for bingos
const checkVerticalBingo = (board, boardLocation) => {
  //0, 5, 10, 15, 20
  //1, 6, 11, 16, 21
  //2, 7, 12, 17, 22
  //3, 8, 13, 18, 23
  //4, 9, 14, 19, 24
  if([0, 5, 10, 15, 20].includes(boardLocation)) {
    return checkValuesForXs([board[0], board[5], board[10], board[15], board[20]]);
  } else if ([1, 6, 11, 16, 21].includes(boardLocation)) {
    return checkValuesForXs([board[1], board[6], board[11], board[16], board[21]]);
  } else if ([2, 7, 12, 17, 22].includes(boardLocation)) {
    return checkValuesForXs([board[2], board[7], board[12], board[17], board[22]]);
  } else if ([3, 8, 13, 18, 23].includes(boardLocation)) {
    return checkValuesForXs([board[3], board[8], board[13], board[18], board[23]]);
  } else if ([4, 9, 14, 19, 24].includes(boardLocation)) {
    return checkValuesForXs([board[4], board[9], board[14], board[19], board[24]]);
  }
  return false;
}
//Check 5 numbers for all x's
const checkValuesForXs = (arr) => {
  function hasX(element) {
    return element.includes('x');
  }
  return arr.every(hasX);
}



//Calc final score
const calcFinalScore = (board, numberJustCalled) => {
  let calculatedScore = 0;
  return calculatedScore;
}

//For each number called add an 'x' to the number at end.
let bingoFound = false;
let winningBoard;
let finalNumber;

numbersArray.forEach(calledNum => {
  allBingoBoards.forEach((board, i) => {
    board.forEach((boardNumber, j) => {
      if(calledNum === boardNumber && bingoFound === false){
        allBingoBoards[i][j] = allBingoBoards[i][j].concat('x');
        //Need to add a check if the horizontal or vertical line with this number is a bingo
        if(checkHorizontalBingo(board, j) || checkVerticalBingo(board, j)){
          bingoFound = true;
          winningBoard = i;
          finalNumber = calledNum;
        }
      }
    })
  })
});

console.log(allBingoBoards);
console.log(`Winning board ${winningBoard}`);
console.log(allBingoBoards[60]);
console.log(`Final number ${finalNumber}`)

let total = 0;
allBingoBoards[60].forEach(el => {
  if(!el.includes('x')) {
    total = total + Number(el);
  }
})
console.log(`Total ${total}`);
console.log(`Final score ${total * finalNumber}`)

//first guess of 15432 too low
//second guess too low 41268, bug in horizontal checks.
//25023 Is the answer.

//PART 2
//Update for finding the last board to get a bingo