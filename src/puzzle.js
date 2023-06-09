const coordinate = require('./coordinate');
const possibleValues = require('./possibleValues');

const squareOneCoords = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 0, y: 2},
    {x: 1, y: 2},
    {x: 2, y: 2},
]

module.exports = class Puzzle{
    coords = [];
    constructor(rows){
        if(rows.length < 9){
            throw new Error('Unexpected row count');
        }
        if (rows.filter(row => row.length < 9).length > 0){
            throw new Error('Unexpected column count');
        }
        for(let y = 0; y < rows.length; y++){
            for(let x = 0; x < rows.length; x++){
                this.coords.push(new coordinate(x, y, rows[y][x]));
            }
        }
        //Has to happen before testing the puzzle input
        this.squareOneCoords = [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 2},
        ];

        possibleValues.forEach(coordNum => {
            const formattedNum = coordNum - 1;
            possibleValues.forEach(testVal => {
                const isValidRow = this.testRow(formattedNum, testVal, true);
                const isValidColumn = this.testColumn(formattedNum, testVal, true);
                const isValidSquare = this.testSquare(formattedNum, testVal, true)
                if(!isValidRow || !isValidColumn || !isValidSquare){
                    throw new Error(
`Invalid puzzle input for value: ${testVal}! 
For square (${formattedNum}): ${isValidSquare}. 
For Row (${formattedNum}): ${isValidRow}
For Column: (${formattedNum}): ${isValidColumn}`
                    );
                }
            })
        })
    }

    testRow = (rowYCoord, value, isValidation = false) => {
        const row = this.coords.filter(c => c.y === rowYCoord);
        const testedRow = row.filter(c => c.value === value);
        if(isValidation){
            return testedRow.length <= 1;
        }
        else{
            return testedRow.length === 0;
        }
    };
    testColumn = (colXCoord, value, isValidation = false) => {
        const col = this.coords.filter(c => c.x === colXCoord);
        const testedCol = col.filter(c => c.value === value);
        if(isValidation){
            return testedCol.length <= 1;
        }
        else{
            return testedCol.length === 0;
        }
    };
    testSquare = (squareNum, value, isValidation = false) => {
        const square = this.getSquare(squareNum);
        const testedSquare = square.filter(c => c.value === value);
        if(isValidation){
            return testedSquare.length <= 1;
        }
        else{
            return testedSquare.length === 0;
        }
    };
    getSquare = (squareNum) => {
        if(squareNum === 0){
            return this.coords.filter(c => !!this.squareOneCoords.find(sc => sc.x === c.x && sc.y === c.y));
        }
        else{
            return this.coords
                .filter(c => !!this
                    .getSquareCoords(squareNum)
                    .find(sc => sc.x === c.x && sc.y === c.y));
        }
    };
    getSquareCoords = (squareNum) =>{
        switch(squareNum){
            case 1:
                return this.squareOneCoords.map(sc => ({x: sc.x + 3, y: sc.y + 0}));
            case 2:
                return this.squareOneCoords.map(sc => ({x: sc.x + 6, y: sc.y + 0}));
            case 3:
                return this.squareOneCoords.map(sc => ({x: sc.x + 0, y: sc.y + 3}));
            case 4:
                return this.squareOneCoords.map(sc => ({x: sc.x + 3, y: sc.y + 3}));
            case 5:
                return this.squareOneCoords.map(sc => ({x: sc.x + 6, y: sc.y + 3}));
            case 6:
                return this.squareOneCoords.map(sc => ({x: sc.x + 0, y: sc.y + 6}));
            case 7:
                return this.squareOneCoords.map(sc => ({x: sc.x + 3, y: sc.y + 6}));
            case 8:
                return this.squareOneCoords.map(sc => ({x: sc.x + 6, y: sc.y + 6}));
        }
    };
    getSquareNumFromCoords = (x, y) => {
        if(this.squareOneCoords.find(c => c.x === x && c.y === y)){
            return 0;
        }
        else{
            const firstRow = [1,2];
            const secondRow = [3,4,5];
            const thirdRow = [6,7,8];
            let squareColumnIndex = x < 3 
                ? 0 
                : x < 6 
                    ? 1 
                    : 2

            if(y < 3){
                //Already know it's not square one so bring down the column by 1
                return firstRow[squareColumnIndex -1];
            }
            else if(y < 6){
                return secondRow[squareColumnIndex];
            }
            else{
                return thirdRow[squareColumnIndex];
            }
        }
    };

    print = ()=>{
        const puzzleBoard = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        this.coords.forEach(c => {
            puzzleBoard[c.y][c.x] = c.value;
        });
        return JSON.stringify({rows: puzzleBoard});
    }
}