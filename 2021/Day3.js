//Part 1 answer 775304

//Inputs are 12 digit binary strings

const fs = require('fs');

const readFile = fs.readFileSync('./Day3Input.txt', 'utf-8');

let data = readFile.split('\r\n');
let dataForLess = data;

console.log(data);

//filtering until one value remains.
//For oxyRating check which bit is more popular
//then keep all values with the more popular bit
//Continue for each bit until 1 number left.

//Function to find if more 1s or 0s

const whichBit = (binaryValueArray, index) => {
  let bitChecker = 0;
  binaryValueArray.forEach(element => {
    if(element[index] === '0'){
      bitChecker--;
    }
    else{
      bitChecker++;
    }
    console.log(bitChecker);
  });
  return bitChecker >= 0 ? '1' : '0';
}

const bitCheckerValue = whichBit(data, 0);
console.log(bitCheckerValue);

//filter based on bitCheckerValue

const removedNotMatchingBit = (arrayBinaries, bitCheckerValue, index) => {
  const newArray = arrayBinaries.filter(element => element[index] === bitCheckerValue);
  return newArray;
}

console.log(removedNotMatchingBit(data, bitCheckerValue, 0));


for(let i = 0; i < 12; i++){
  const bitCheckerValue = whichBit(data, i);
  const filteredArray = removedNotMatchingBit(data, bitCheckerValue, i);
  data = filteredArray;
  console.log(data);
}

const whichBitLess = (data, i) => {
  return whichBit(data, i) === '1' ? '0' : '1';
}

for(let i = 0; i < 12 && dataForLess.length != 1; i++){
  const bitCheckerValue = whichBitLess(dataForLess, i);
  const filteredArray = removedNotMatchingBit(dataForLess, bitCheckerValue, i);
  dataForLess = filteredArray;
  console.log(dataForLess);
}


const oxyRating = parseInt(data[0], 2);
console.log(`OxyRating: ${oxyRating}`);

const co2Rating = parseInt(dataForLess[0], 2)
console.log(`CO2rating: ${co2Rating}`); 

console.log(`Life support rating ${oxyRating * co2Rating}`);