const fs = require('fs');

const readFile = fs.readFileSync('./Dec10Input.txt', 'utf-8');

const data = readFile.split('\n');
    
const letterData = data.map(line => line.split(''));
    

// need to hold seat state to evaluate off of stale state, dont evaluate off of seat state mid changes.

// L = open
// # = occupied
// . = floor

// 1. for each index check all nine positions around it. if all are empty, flip it to occupied.

// 2. then on the next round, check all nine position around a particular seat and if 4 or more seats occupied flip it to empty. then keep iterating step 1 and 2.
//get the index in a nested for loop.

//eval line above,
//eval same line,
//eval line below,


for(let i = 0; i < letterData.length; i++) {
    for(let j = 0; j < letterData[i].length; j++) {    
        if(letterData[i][j] === 'L') {
            console.log(letterData[i][j]);
            letterData[i].splice(j, 1, '#');
        }
    }
}

console.log(letterData);


