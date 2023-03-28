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

    pruneRowPossibilities(rowNum, possibilitiesSoFar){
        return possibilitiesSoFar.filter(p => this.puzzle.testRow(rowNum, p));
    }
    pruneColumnPossibilities(colNum, possibilitiesSoFar){
        return possibilitiesSoFar.filter(p => this.puzzle.testColumn(colNum, p));
    }
    pruneSquarePossibilities(squareNum, possibilitiesSoFar){
        return possibilitiesSoFar.filter(p => this.puzzle.testSquare(squareNum, p));
    }

    checkPossibilities(){
        let hasChanges = false;
        //Filter for all coordinates that don't have a value
        this.puzzle
            .filter(c => c.value === 0)
            .forEach(c => {
                const originalPossibilities = [...c.possibleValues];
                let squareNum = this.puzzle.getSquareNumFromCoords(c.x, c.y);

                c.possibleValues = this.addRowPossibilities(c.y, c.possibleValues);
                c.possibleValues = this.addColumnPossibilities(c.x, c.possibleValues);
                c.possibleValues = this.addSquarePossibilities(squareNum, c.possibleValues);
                
                c.possibleValues = this.pruneRowPossibilities(c.y, c.possibleValues);
                c.possibleValues = this.pruneColumnPossibilities(c.x, c.possibleValues);
                c.possibleValues = this.pruneSquarePossibilities(squareNum, c.possibleValues);

                //Detect if a change was made
                hasChanges = hasChanges 
                    || JSON.stringify(originalPossibilities) !== JSON.stringify(c.possibleValues)
            });

        //Whether a possibility was added or removed
        return hasChanges;
    }
}