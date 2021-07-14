const fs = require('fs');
const { off } = require('process');

const readFile = fs.readFileSync('./Dec18Input.txt', 'utf-8');

const data = readFile.split('\n');

console.log(data[0]);
