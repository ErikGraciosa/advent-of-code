const fs = require('fs');
const { off } = require('process');

const readFile = fs.readFileSync('./Dec12Input.txt', 'utf-8');

const data = readFile.split('\n');

//All busses depart initially at the same time and then departs again from the seaport after the same number of minutes as the ID of the bus.


//Input data
// 1002618
// 19,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,367,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,373,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23

const time = 1002618;
const busses = [19, 41, 37, 367, 13, 17, 29, 373, 23];

//What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus?

//Which one of these busses returns the lowest modulo then multiply that modulo to get the answer.
const pureModulos = busses.map(bus => (time % bus));
const modulos = busses.map(bus => bus - (time % bus));
console.log('pure modulos:   ' + pureModulos);
console.log(modulos);

console.log(busses[7] * modulos[7]);

//right answer is 2238, bus 373 and 6 minutes wait.


//PArt 2: What is the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list?
//index equals the minutes of depart offset from t, bus 19 departs at t. All busses still initially depart at 0. but now find the time when this pattern is when the busses depart. Return the time in minutes.
let x = 0;

const offsetList = [19,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,367,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,373,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23];

//try multiplying them all together with offsets. if you multiplied them together that would be when they all lined up.

const busOffsets = [];
for(let i = 0; i < offsetList.length; i++) {
    if(offsetList[i] != x) {
        busOffsets.push([offsetList[i], i]);
    }
}
console.log(busOffsets);
console.log(offsetList.length);

//if 19 is base how to find the time that 41 is offset departure by 9 minutes?
// answer would be (41*19) + 9
//then for the next one (19*37) + 13 but the time that 19*37 + 13 lined up wouldn't line up with (41*19) + 9
//try getting the sync time and multiply by the rest.



