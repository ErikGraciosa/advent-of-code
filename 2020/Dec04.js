
const goodArr = [

    {
        pid:087499704,
        hgt:'74in',
        ecl:'grn',
        iyr:2012,
        eyr:2030,
        byr:1980,
        hcl:'#623a2f',
        },
        {
        eyr:2029,
        ecl:'blu',
        cid:129 ,
        byr:1989,
        iyr:2014 ,
        pid:'896056539', 
        hcl:'#a97842',
        hgt:'165cm',
        },
        {
        hcl:'#888785',
        hgt:'164cm',
        byr:2001,
        iyr:2015,
        cid:88,
        pid:545766238, 
        ecl:'hzl',
        eyr:2022,
        },
        {
        iyr:2010,
        hgt:'158cm',
        hcl:'#b6652a', 
        ecl:'blu',
        byr:1944,
        eyr:2021,
        pid:093154719,
        }
    ]
    
//Now with a focus towards interpretation and planning.

//3 letter fields for each passport.

//each passport separated by a blank line, each key: value pair separated by a space or newline.

//having all eight keys is considered a valid passport but also ok if cid is not present and considered value.

//need to parse the input data into an array of objects, each passport will be an object.

const fs = require('fs');
const { off } = require('process');

const readFile = fs.readFileSync('./Dec04Input.txt', 'utf-8');

const data = readFile.split('\r\n');
//now each passport is broken up into a string but not made into an object. But we can check the string directly for the keys using .contains or .find or .indexOf

//Here are the keys we need to look for.
const byr = 'byr' //(Birth Year)
const iyr = 'iyr' //(Issue Year)
const eyr = 'eyr' //(Expiration Year)
const hgt = 'hgt' //(Height)
const hcl = 'hcl' //(Hair Color)
const ecl = 'ecl' //(Eye Color)
const pid = 'pid' //(Passport ID)
// const cid = 'cid' //(Country ID)

//Check if strings are present in the passport for the 7 required keys.
const valid = data.filter(passport => passport.includes(byr) &&
    passport.includes(iyr) &&
    passport.includes(eyr) &&
    passport.includes(hgt) &&
    passport.includes(hcl) &&
    passport.includes(ecl) &&
    passport.includes(pid)
);

// console.log(data)
// console.log(valid.length)
//Answer to part 1 is 170

//Part 2
//Now there are requirements to the values for each key.

//byr (Birth Year) - four digits; at least 1920 and at most 2002.
//iyr (Issue Year) - four digits; at least 2010 and at most 2020.
//eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
//hgt (Height) - a number followed by either cm or in:
//If cm, the number must be at least 150 and at most 193.
//If in, the number must be at least 59 and at most 76.
//hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
//ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
//pid (Passport ID) - a nine-digit number, including leading zeroes.
//cid (Country ID) - ignored, missing or not.

//now count passports where the correct keys are present and valid.

//Put the passports into a single object. Then make an array of passports
const passportArray = [];
for( let i = 0; i < valid.length; i++) {
    const objBuilder = {};
    const newLineSplit = valid[i].split('\n')
    const spaceSplit = newLineSplit.map(el => el.split(' '));
    spaceSplit.forEach(el => {
        el.forEach(pair => {
            const keyValue = String(pair).split(':');
            console.log(keyValue)
            if(keyValue[0] === 'pid') {
                console.log(keyValue[1])
                objBuilder[keyValue[0]] = String(keyValue[1]); 
            } else {
                objBuilder[keyValue[0]] = keyValue[1]; 
            }
            
        })
    })
    passportArray.push(objBuilder)
}
// console.log(passportArray);

const eyeStr = 'amb blu brn gry grn hzl oth'
let validCounter = 0;
const displayPassports = [];
//Now check if each key has a valid value with the give data validations
console.log(goodArr)
passportArray.forEach(passport => {
    const heightUnits = passport.hgt.slice(passport.hgt.length - 2, passport.hgt.length);
    const heightVal = passport.hgt.slice(0, -2);
    
    let heightCheck = false;
    if(heightUnits === 'in' && Number(heightVal) >= 59 && Number(heightVal) <=76) {
        heightCheck = true;
    }
    if(heightCheck === 'cm' && Number(heightVal) >= 150 && Number(heightVal) <=193) {
        heightCheck = true;
    }
    const hairCheck = false;
    const lastSix = passport.hcl.slice(1);
    console.log(lastSix);

    console.log(passport.byr >= 1920,
        passport.byr <= 2002,
        passport.iyr >= 2010,
        passport.iyr <= 2020,
        passport.eyr >= 2020,
        passport.eyr <= 2030,
        heightCheck,
        passport.hcl[0] === '#',
        lastSix.length === 6,
        eyeStr.includes(passport.ecl),
        String(passport.pid))

    if(Number(passport.byr) >= 1920 &&
        Number(passport.byr) <= 2002 &&
        Number(passport.iyr) >= 2010 &&
        Number(passport.iyr) <= 2020 &&
        Number(passport.eyr) >= 2020 &&
        Number(passport.eyr) <= 2030 &&
        heightCheck &&
        passport.hcl[0] === '#' &&
        lastSix.length === 6 &&

        eyeStr.includes(passport.ecl) &&
        passport.pid.length === 9 //not checking if only numbers
    ) {
        validCounter++;
        displayPassports.push(passport);
    }
})

console.log(validCounter);
displayPassports.forEach(el => console.log(el.hcl, el.ecl, el.pid))


//15 and 13 and 11 are wrong.

//now stuck, not sure if just got lucky in part one or if the conditions are bad, might be \r\n problems too in the initial split.
//sample passports not going thru correctly.


//in the pid the leading zero is getting trimmed
//height is also getting weird
