const possibleValues = require('./possibleValues');

module.exports = class Solver{
    constructor(puzzle){
        this.puzzle = puzzle;
    }

    addRowPossibilities(rowNum, possibilitiesSoFar){
        let row = this.puzzle.coords.filter(c => c.y === rowNum);
        let uniquePossibilities = new Set(possibilitiesSoFar);
        possibleValues.filter(pv => !row.map(c => c.value).includes(pv)).forEach(val => {
            uniquePossibilities.add(val);
        });
        return Array.from(uniquePossibilities);
    }
    addColumnPossibilities(colNum, possibilitiesSoFar){
        let col = this.puzzle.coords.filter(c => c.x === colNum);
        let uniquePossibilities = new Set(possibilitiesSoFar);
        possibleValues.filter(pv => !col.map(c => c.value).includes(pv)).forEach(val => {
            uniquePossibilities.add(val);
        });
        return Array.from(uniquePossibilities);
    }
    addSquarePossibilities(squareNum, possibilitiesSoFar){
        let square = this.puzzle.getSquare(squareNum);
        let uniquePossibilities = new Set(possibilitiesSoFar);
        possibleValues.filter(pv => !square.map(c => c.value).includes(pv)).forEach(val => {
            uniquePossibilities.add(val);
        });
        return Array.from(uniquePossibilities);
    }

    checkPossibilities(){
        let hasChanges = false;
        //Filter for all coordinates that don't have a value
        this.puzzle
            .filter(c => c.value === 0)
            .forEach(c => {
                c.possibleValues = this.addRowPossibilities(c.y, c.possibleValues);
                c.possibleValues = this.addColumnPossibilities(c.x, c.possibleValues);
                c.possibleValues = this.addSquarePossibilities(
                    this.puzzle.getSquareNumFromCoords(c.x, c.y), c.possibleValues
                );
                
                //TODO: Remove possibilities against row
                
                //TODO: Remove possibilities against column
                
                //TODO: Remove possibilities against square
            });

        //Whether a possibility was added or removed
        return hasChanges;
    }
}