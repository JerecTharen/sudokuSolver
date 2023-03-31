const fs = require('fs');
const puzzle = require('./src/puzzle');
const Solver = require('./src/solver');

console.log('Hello There!');

//Constants
const fileName = "easy.json";
//const fileName = "generic_input.json";

//Retrieve puzzle input JSON
const fileStr = fs.readFileSync('./inputs/' + fileName).toString('utf8');

//Construct in memory version of puzzle
const thePuzzle = new puzzle(JSON.parse(fileStr)?.rows ?? []);
console.log('puzzle start: ', thePuzzle.coords);

//Begin solving
const theSolver = new Solver(thePuzzle, true);
theSolver.solve();

//Print results
console.log('Solved puzzle, writting results');
fs.writeFileSync(`./inputs/${fileName}.solved.json`, thePuzzle.print());

console.log('General Kenobi!');