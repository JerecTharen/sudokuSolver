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

    testRow = (x, y, value) => {
        const coord = this.coords.find(c => c.x === x && c.y === y);
        if(coord.value !== 0){
            throw new Error('Coordinate being tested already has a value');
        }

        const row = this.coords.filter(c => c.y === y);
        return row.filter(c => c.value === value).length === 0;
    };
}