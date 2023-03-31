const possibleValues = require('./possibleValues');

module.exports = class Solver{
    constructor(puzzle, isLoggingOn = false){
        this.puzzle = puzzle;
        this.isLoggingOn = isLoggingOn;
    }

    solve(){
        this.isLoggingOn = true;//This probably won't be unit tested so log everything
        
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
                const originalPossibilities = [...c.possibilities];
                let squareNum = this.puzzle.getSquareNumFromCoords(c.x, c.y);

                c.possibilities = this.addRowPossibilities(c.y, c.possibilities);
                c.possibilities = this.addColumnPossibilities(c.x, c.possibilities);
                c.possibilities = this.addSquarePossibilities(squareNum, c.possibilities);
                
                c.possibilities = this.pruneRowPossibilities(c.y, c.possibilities);
                c.possibilities = this.pruneColumnPossibilities(c.x, c.possibilities);
                c.possibilities = this.pruneSquarePossibilities(squareNum, c.possibilities);

                //Detect if a change was made
                hasChanges = hasChanges 
                    || JSON.stringify(originalPossibilities) !== JSON.stringify(c.possibilities)
            });

        //Whether a possibility was added or removed
        return hasChanges;
    }

    assignSoloPossibilities(){
        let madeChanges = false;
        this.puzzle.coords.forEach(c => {
            if(c.possibilities.length === 1){
                c.setValue(c.possibilities[0]);
                madeChanges = true;
                if(this.isLoggingOn)console.log(`Assigned ${c[possibilities[0]]} to ${c.x}, ${c.y}`);
            }
        });
        return madeChanges;
    }

    assignRowUniquePossibilities(rowNum){
        let madeChanges = false;
        const row = this.puzzle.coords.filter(c => c.y === rowNum);
        row.forEach(c => {
            const otherPossibilities = row
                .filter(rc => rc.x !== c.x)
                .reduce((prev, curr) => [...prev, ...curr.possibilities], []);
            c.possibilities.forEach(p => {
                if(!madeChanges && !otherPossibilities.includes(p)){
                    c.setValue(p);
                    madeChanges = true;
                    if(this.isLoggingOn)console.log(`Set value ${p} to ${c.x}, ${c.y}`);
                }
            });
        });
        return madeChanges;
    }
    assignColumnUniquePossibilities(colNum){
        let madeChanges = false;
        const col = this.puzzle.coords.filter(c => c.x === colNum);
        col.forEach(c => {
            const otherPossibilities = col
                .filter(rc => rc.y !== c.y)
                .reduce((prev, curr) => [...prev, ...curr.possibilities], []);
            c.possibilities.forEach(p => {
                if(!madeChanges && !otherPossibilities.includes(p)){
                    c.setValue(p);
                    madeChanges = true;
                    if(this.isLoggingOn)console.log(`Set value ${p} to ${c.x}, ${c.y}`);
                }
            });
        });
        return madeChanges;
    }
    assignUniqueSquarePossibilities(squareNum){
        let madeChanges = false;
        const square = this.puzzle.getSquare(squareNum);
        square.forEach(c => {
            const otherPossibilities = square
                .filter(rc => rc.y !== c.y || rc.x !== c.x)
                .reduce((prev, curr) => [...prev, ...curr.possibilities], []);
            c.possibilities.forEach(p => {
                if(!madeChanges && !otherPossibilities.includes(p)){
                    c.setValue(p);
                    madeChanges = true;
                    if(this.isLoggingOn)console.log(`Set value ${p} to ${c.x}, ${c.y}`);
                }
            });
        });
        return madeChanges;
    }
}