const fs = require('fs');
const { join } = require('path/posix');

// Advent of Code[About][Events][Shop][Settings][Log Out]Erik Graciosa 14*
//    sub y{2020}[Calendar][AoC++][Sponsors][Leaderboard][Stats]
// Our sponsors help make Advent of Code possible:
// Yoast - Want to work on a product that's running on 12 million sites worldwide? Good news! You can, because Yoast is hiring!
// --- Day 6: Custom Customs ---
// As your flight approaches the regional airport where you'll switch to a much larger plane, customs declaration forms are distributed to the passengers.

// The form asks a series of 26 yes-or-no questions marked a through z. All you need to do is identify the questions for which anyone in your group answers "yes". Since your group is just you, this doesn't take very long.

// However, the person sitting next to you seems to be experiencing a language barrier and asks if you can help. For each of the people in their group, you write down the questions for which they answer "yes", one per line. For example:

// abcx
// abcy
// abcz
// In this group, there are 6 questions to which anyone answered "yes": a, b, c, x, y, and z. (Duplicate answers to the same question don't count extra; each question counts at most once.)

// Another group asks for your help, then another, and eventually you've collected answers from every group on the plane (your puzzle input). Each group's answers are separated by a blank line, and within each group, each person's answers are on a single line. For example:

// abc

// a
// b
// c

// ab
// ac

// a
// a
// a
// a

// b
// This list represents answers from five groups:

// The first group contains one person who answered "yes" to 3 questions: a, b, and c.
// The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
// The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
// The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
// The last group contains one person who answered "yes" to only 1 question, b.
// In this example, the sum of these counts is 3 + 3 + 3 + 1 + 1 = 11.

// For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?

// To begin, get your puzzle input.

// Answer: 
 

// You can also [Share] this puzzle.

//Pseudocode
//build an array containing each unique character
//count the unique letters of each index of the array
//return the sum of the count of all unique letters for each  

//input
const readFile = fs.readFileSync('./Dec06Input.txt', 'utf-8');

// const groupAnswers = readFile.split('\r\n\r\n');

const data = readFile.split('\n');
console.log(data)
//build the data array, trim the last two characters and concat the characters for each group
const joinedGroupResponses = [];

//combines group reponses to one string
let concatGroup = '';

for(let i = 0; i < data.length; i++){
  concatGroup = concatGroup + data[i].substring(0, data[i].length - 1);
  if(data[i] === '\r' || data[i] === '') {
    joinedGroupResponses.push(concatGroup)
    concatGroup = '';
  }
}
console.log(joinedGroupResponses)
//filter out duplicates by using sets
const uniqueChars = joinedGroupResponses.map(str => {
  const array = str.split('');
  const builderSet = new Set();
  array.forEach(char => builderSet.add(char));
  return builderSet;
});
console.log(uniqueChars)
//count the unique characters
let counter = 0;

uniqueChars.forEach(set => {
  counter = counter + set.size;
})

console.log(counter); //answer is 6662

//Part 2 below
