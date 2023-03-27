const coordinate = require('./coordinate');

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
    }

    testRow = (rowYCoord, value) => {
        const row = this.coords.filter(c => c.y === rowYCoord);
        return row.filter(c => c.value === value).length === 0;
    };
    testColumn = (colXCoord, value) => {
        const col = this.coords.filter(c => c.x === colXCoord);
        return col.filter(c => c.value === value).length === 0;
    };
}