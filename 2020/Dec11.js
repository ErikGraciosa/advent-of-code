const fs = require('fs');

const readFile = fs.readFileSync('./Dec11Input.txt', 'utf-8');

const data = readFile.split('\n');
    
const directions = data.map(line => [line[0], line[1] + (line[2] || '') + (line[3] || '')]);

let directionsConverter = 40;
//if mod 0 then facing east
//if mod 1 then facing south 
//if mod 2 then facing west
//if mod 3 then facing north
// L will -1
// R will +1
//if F check directionsConverter and assign direction.
//Starts facing East

//Check if L or R then convert the direction with plus or minus then modulo to check postion.


// *********commented out for part 2****************


// for(let i = 0; i < directions.length; i++) {
//     if(directions[i][0] === 'R') {
//         if(directions[i][1] === '90') {
//             directionsConverter++;
//         }
//         if(directions[i][1] === '180') {
//             directionsConverter++;
//             directionsConverter++;
//         }
//         if(directions[i][1] === '270') {
//             directionsConverter++;
//             directionsConverter++;
//             directionsConverter++;
//         }
//         // if(directionsConverter % 4 === 3) {
//         //     directions[i][0] = 'N'
//         // }
//     }
//     if(directions[i][0] === 'L') {
        
//         if(directions[i][1] === '90') {
//             directionsConverter--;
//         }
//         if(directions[i][1] === '180') {
//             directionsConverter--;
//             directionsConverter--;
//         }
//         if(directions[i][1] === '270') {
//             directionsConverter--;
//             directionsConverter--;
//             directionsConverter--;
//         }
//         // if(directionsConverter % 4 === 3) {
//         //     directions[i][0] = 'N'
//         // }
//     }
//     if(directions[i][0] === 'F') {
//         console.log(directionsConverter);
//         if(directionsConverter % 4 === 0) {
//             directions[i][0] = 'E';
//         }
//         if(directionsConverter % 4 === 1) {
//             directions[i][0] = 'S';
//         }
//         if(directionsConverter % 4 === 2) {
//             directions[i][0] = 'W';
//         }
//         if(directionsConverter % 4 === 3) {
//             directions[i][0] = 'N';
//         }
//     }
// }

//************end of part 2 comment out */


console.log(directions);
// N, S, W, E movements and ship has a facing direction.
//Ship starts facing East.
//Only changes direction on a L or R. F stays same direction.

//At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its east/west position and its north/south position) from its starting position is 17 + 8 = 25.

let verticalSum = 0;
let horizontalSum = 0;
let badLetter = 0;

directions.forEach(input => {
    if(input[0] === 'N') {
        verticalSum = verticalSum + Number(input[1]);
    } else if(input[0] === 'S') {
        verticalSum = verticalSum - Number(input[1]);
    } else if(input[0] === 'E') {
        horizontalSum = horizontalSum + Number(input[1]);
    } else if(input[0] === 'W') {
        horizontalSum = horizontalSum - Number(input[1]);
    } else {
        badLetter++;
    }
})


console.log(directions[279])
console.log(horizontalSum, (-1)*verticalSum, horizontalSum + (-1)*verticalSum);

//not right 3856
//not 1360

//not 3672

//1424 is right answer for part 1


//Part 2 
//Waypoint starts at E10 and N1. Each instruction moves the way point that many units, R and L rotate the waypoint about the ship in same config
//F moves the ship to the waypoint a number of times equal to the give value (F10 would move 10x the waypoint value)
//Ship only moves on F values.

let waypoint = [10, 1]; //[E/W, N/S]
let shipLocation = [0, 0];
//if you turn right 90 way point becomes []

//each element now updates the waypoint, rotates the waypoint or moves the ship.

for(let i = 0; i < directions.length; i++) {
    console.log(waypoint);
    if(directions[i][0] === 'R') {
        
        if(directions[i][1] === '90') {
            waypoint = [waypoint[1], (-1)*waypoint[0]];
        }
        if(directions[i][1] === '180') {
            waypoint = [(-1)*waypoint[0], (-1)*waypoint[1]];
        }
        if(directions[i][1] === '270') {
            waypoint = [(-1)*waypoint[1], waypoint[0]];
        }
    }
    if(directions[i][0] === 'L') {
        if(directions[i][1] === '90') {
            waypoint = [(-1)*waypoint[1], waypoint[0]];
        }
        if(directions[i][1] === '180') {
            waypoint = [(-1)*waypoint[0], (-1)*waypoint[1]];
        }
        if(directions[i][1] === '270') {
            waypoint = [waypoint[1], (-1)*waypoint[0]];
        }
    }
    if(directions[i][0] === 'E') {
        waypoint[0] = waypoint[0] + Number(directions[i][1]);
    }
    if(directions[i][0] === 'W') {
        waypoint[0] = waypoint[0] - Number(directions[i][1]);
    }
    if(directions[i][0] === 'N') {
        waypoint[1] = waypoint[1] + Number(directions[i][1]);
    }
    if(directions[i][0] === 'S') {
        waypoint[1] = waypoint[1] - Number(directions[i][1]);
    }
    if(directions[i][0] === 'F') {
        
        shipLocation[0] = shipLocation[0] + waypoint[0] * Number(directions[i][1]);
        shipLocation[1] = shipLocation[1] + waypoint[1] * Number(directions[i][1]);
        console.log('ship is here:    ' + shipLocation);
    }
};

console.log('manhattan value:  ' + (Math.abs(shipLocation[0]) + Math.abs(shipLocation[1])));
//SOLUTION
// ship is here:    -24386,-39061
// manhattan value:  63447