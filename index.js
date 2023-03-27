const fs = require('fs');

console.log('Hello There');

//Constants
const fileName = "generic_input.json";

//TODO: Parse JSON input?
const fileStr = fs.readFileSync('./inputs/' + fileName);
console.log('test file string: ', fileStr.toString('utf-8'))

//TODO: Construct in memory version of puzzle

//TODO: Begin solving
    //TODO: Look for places with only one solution

    //TODO: Look for places that contain the only solution for their: square, row, column

    //TOD: Restart loop if any spot was filled in

    //TODO: Otherwise, pick a spot with two options and enter perspective mode

console.log('General Kenobi!');