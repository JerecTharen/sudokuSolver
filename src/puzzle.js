const Coordinate = require('./coordinate');
const coordinate = require('./coordinate');

module.exports = class Puzzle{
    rows = [];
    constructor(rows){
        if(rows.length < 9){
            throw new Error('Unexpected row count');
        }
        if (rows.filter(row => row.length < 9).length > 0){
            throw new Error('Unexpected column count');
        }
        for(let x = 0; x < rows.length; x++){
            let row = [];
            for(let y = 0; y < rows.length; y++){
                row.push(new Coordinate(x, y, rows[x][y]));
            }
            this.rows.push(row);
        }
    }
}