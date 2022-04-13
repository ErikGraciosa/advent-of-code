const fs = require('fs');
const readFile = fs.readFileSync('./Day8Input.txt', 'utf-8');

//Input munging
const inputData = readFile.split('\r\n');
const readings = inputData.map(str => str.split('|')[1].trim());
console.log(inputData);

const readingNumberOutputs = [];
let numberCounter = 0;

readings.forEach(reading => {
  const readingSingles = reading.split(' ');
  readingSingles.forEach(single => {
    if(single.length === 2
      || single.length === 3
      || single.length === 4 
      || single.length === 7) {
        numberCounter++;
      }
  })
});

//console.log(numberCounter)
//Example input
//be -- 1
//cfbegad -- 8
//cbdgef -- 9 b/c it is 5 + an extra segment 
const defineNine = (str, decoder) => {
  decoder[str] = 9;
  decoder.num9 = str;
  return decoder;
}
//fgaecd -- 6 b/c is the sixer with no 'be' (whatever 1 is),
  //compare 1 and 6 to find that c === bbb, f === eee
const defineSix = (str, decoder) => {
  decoder[str] = 6;
  decoder.num6 = str;
  return decoder;
}
//cgeb -- 4
//fdcge -- 5 b/c has the 'f' segment learned from 1/6 compare
const defineFive = (str, decoder) => {
  decoder[str] = 5;
  decoder.num5 = str;
  return decoder;
}
//agebfd -- 0 b/c last digit left
//fecdb  -- 3 b/c is the fiver with 'be'(whatever the 1 is)
const defineThree = (str, decoder) => {
  decoder[str] = 3;
  decoder.num3 = str;
  return decoder;
}
//fabcd -- 2 b/c has the 'c' segment learned from 1/6 compare
const defineTwo = (str, decoder) => {
  decoder[str] = 2;
  decoder.num2 = str;
  return decoder;
}
//edb -- 7 
// |
//fdgacbe
//cefdb
//cefbgd
//gcbe


//decode the segments
//a: ddd, find by looking at 1 and 7 segments and is the extra in 7 
//b
//c: bbb comparing 1 and 6 to find
//d
//e
//f: eee comparing 1 and 6 to find
//g

//1 be
//4 cgeb
//7 edb
//8 cfbegad, basically useless

//# of segments
//1 -- 2
//2 -- 5
//3 -- 5
//4 -- 4
//5 -- 5
//6 -- 6
//7 -- 3
//8 -- 7
//9 -- 6
//0 -- 6

//Part 1
//how often do 1, 4, 7 ,8 show up. Get the output as its own array
//count the number of 2, 3, 4, 7 length values.

//Answer: 543

const assignFirstFour = (arr, decoder) => {
  arr.forEach(num => {
    if(num.length === 2) {
      decoder[num] = 1;
      decoder.num1 = num;
    } else if (num.length === 3) {
      decoder[num] = 7;
      decoder.num7 = num;
    } else if (num.length === 4) {
      decoder[num] = 4;
      decoder.num4 = num;
    } else if (num.length === 7) {
      decoder[num] = 8;
      decoder.num8 = num;
    }
  })
}

const sortedSegmentScrambles = (inputString) => {
  const scrambles =  inputString.split('|')[0].trim().split(' ');
  const sortedSegments = scrambles.map(el => el.split('').sort().join(''));
  return sortedSegments;
}

const sortedReadings = (inputString) => {
  const scrambles =  inputString.split('|')[1].trim().split(' ');
  const sortedReadings = scrambles.map(el => el.split('').sort().join(''));
  return sortedReadings;
}

//Example input string 'bgafcde gfcd agc ebdgac adfceb bafeg efgca cgdfae cg ecadf | fabgced gc agc cdfg'
const solvedScramble = (inputString) => {
  const segmentScrambles = sortedSegmentScrambles(inputString);
  const reading = sortedReadings(inputString);
  const decoder = {};

  assignFirstFour(segmentScrambles, decoder);
  
  //Find which string is 6 based on not having both '1' segments
  //split the 1 segements
  const oneSegments = decoder.num1.split('');
  
  let counter = 0;
  while(counter < 3) {
    segmentScrambles.forEach((scramble, index, initialArr) => {
      if(scramble.length === 6
        && (scramble.indexOf(oneSegments[0]) === -1
        || scramble.indexOf(oneSegments[1]) === -1 )) {
          defineSix(scramble, decoder);
          if(decoder.num6.indexOf(oneSegments[0]) != -1) {
            decoder.c = oneSegments[1];
            decoder.f = oneSegments[0];
          } else {
            decoder.c = oneSegments[0];
            decoder.f = oneSegments[1];
          }
        }
      if(scramble.length === 5
        && scramble.indexOf(oneSegments[0]) != -1
        && scramble.indexOf(oneSegments[1]) != -1) {
          defineThree(scramble, decoder);
        }
      if(scramble.length === 5
        && scramble.indexOf(decoder.c) != -1
        && scramble.indexOf(decoder.f) === -1) {
          defineTwo(scramble, decoder);
        }
      if(scramble.length === 5
        && scramble.indexOf(decoder.f) != -1
        && scramble.indexOf(decoder.c) === -1) {
          defineFive(scramble, decoder);
        }
      if(scramble != decoder.num6
        && scramble.length === 6
        && includesFive(scramble, decoder.num5)) {
          defineNine(scramble, decoder);
      }
      // console.log(initialArr)
      const checkForZero = initialArr.filter(el => decoder[el] === undefined);
      if(checkForZero.length === 1){
        decoder.num0 = checkForZero[0];
        decoder[checkForZero[0]] = 0;
      }
    });
    counter++;
  }

  // console.log(segmentScrambles, '|', reading, decoder);

  let unscrambledValue = Number(reading.map(el => decoder[el]).join(''));
  // console.log(decoder);
  return unscrambledValue;
}

const includesFive = (scrambleString, fiveSegment) => {
  if(fiveSegment === undefined) {
    return false;
  }
  const fiveSegments = fiveSegment.split('');
  const segmentsToCompare = scrambleString.split('');
  return fiveSegments.every(el => segmentsToCompare.includes(el));
} 

//testing includesFive
//console.log(includesFive('asdqf', 'asqd'));

// console.log(solvedScramble(inputData[0]));

let totalOutputValues = 0;

for(let i = 0; i < inputData.length; i++) {
  const currentReadingValue = solvedScramble(inputData[i]);
  // console.log(currentReadingValue);
  totalOutputValues = totalOutputValues + currentReadingValue;
}

console.log(totalOutputValues);
// console.log(solvedScramble(inputData[inputData.length - 7]));

//First guess 788322 too low.