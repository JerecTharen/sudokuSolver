const fs = require('fs');
const puzzle = require('./src/puzzle');

console.log('Hello There');

//Constants
const fileName = "generic_input.json";

//Retrieve puzzle input JSON
const fileStr = fs.readFileSync('./inputs/' + fileName).toString('utf8');

//TODO: Construct in memory version of puzzle
const thePuzzle = new puzzle(JSON.parse(fileStr)?.rows ?? []);
console.log('puzzle start: ', thePuzzle.coords);

//TODO: Begin solving
    //TODO: Look for places with only one solution

    //TODO: Look for places that contain the only solution for their: square, row, column

    //TOD: Restart loop if any spot was filled in

    //TODO: Otherwise, pick a spot with two options and enter perspective mode

console.log('General Kenobi!');