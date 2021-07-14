const input = [2,20,0,4,1,17];


const test1 = [0, 3, 6]; //results in 2020th number being 436
//other examples 
const test2 = [1, 3, 2]; //2020th result is 1
const test3 = [2, 1, 3]; //2020th is 10
const test4 = [1, 2, 3]; //2020th is 27
const test5 = [2, 3, 1]; //2020th is 78
const test6 = [3, 2, 1]; //2020th is 438
const test7 = [3, 2, 1]; //2020th is 1836

//after the starting number the next number read aloud will be zero if the n-1 number was never spoken
//else if the number has been spoken then calculated the last time before the number had been spoken and subtract current index from the last index the number was spoken and that is the new number to speak.

//need to be able to check the prior number spoken, check if spoken before, if not return 0
//if spoken before, calc current index-past index

//have an index variable that increments for each loop of checking the active array that contains the numbers spoken
let lastNum = 0;
let count = 0;
console.time()


while(count < 300020) {
    count++;
    const matchingNums = [];
    input.forEach((number, index) => {if(number === input[input.length - 1]) {
        matchingNums.push(index);
        }
    });
    if(matchingNums.length <= 1) {
        input.push(0);
    } else {
        input.push(matchingNums[matchingNums.length - 1] - matchingNums[matchingNums.length - 2]);
    }
}
console.timeEnd()
console.log(input.length)
console.log(input[300020 - 1]) // answer is 758
console.log(input)
//now for the 30000000th number
//each 100000 cycles will take 1 minute, would take 300 minutes to
