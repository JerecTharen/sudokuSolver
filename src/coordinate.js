module.exports = class Coordinate{
    constructor(x, y, value = undefined){
        if(x === undefined || x === null || y === undefined || y === null){
            throw new Error('Coordinate must have x and y!');
        }
        else if(x < 0 || y < 0){
            throw new Error('Coordinate out of expected range');
        }
        else if(x > 8 || y > 8){
            throw new Error('Coordinate out of expected range');
        }
        this.x = x;
        this.y = y;
        this.value = value ?? 0;
    }

    setValue(value){
        if(value > 9 || value < 1){
            throw new Error('Value out of expected range');
        }
        else{
            this.value = value;
        }
    }
}