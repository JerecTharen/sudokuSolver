const puzzle = require('../../src/puzzle');

describe('puzzle', ()=>{
    describe('construction', ()=>{
        it('should throw if there are not 9 rows', ()=>{
            let msg = '';

            try {
                new puzzle([]);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
        it('should throw if any row does not have 9 values', ()=>{
            let msg = '';

            try {
                new puzzle([
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ]);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
        it('should pass if every row is assignable to a coordinate', ()=>{
            new puzzle([
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]);

            expect(0).toBe(0);
        });
        it('should make each row item a coordinate', ()=>{
            const SUT = new puzzle([
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]);
            const coord = SUT.coords[0];

            expect(coord.x >= 0 && coord.y >= 0 && coord.value>= 0).toBeTruthy();
        });
        it('should throw for an invalid puzzle', ()=>{
            let msg = '';
            try {
                const SUT = new puzzle([
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9]
                ]);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
    });

    describe('testRow', ()=>{
        let SUT;
        beforeEach(()=>{
            SUT = new puzzle([
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]);
        });


        it('should be false if a row already has the value', ()=>{
            const actualIsAssignable = SUT.testRow(0, 1);

            expect(actualIsAssignable).toBe(false);
        });
        it('should be true if the row does not have the value', ()=>{
            const actualIsAssignable = SUT.testRow(0, 3);

            expect(actualIsAssignable).toBe(true);
        });
        it('should be true if the row does not have the value but another row does', ()=>{
            const actualIsAssignable = SUT.testRow(0, 2);

            expect(actualIsAssignable).toBe(true);
        });
    });
    describe('testSquare', ()=>{
        let SUT;
        beforeEach(()=>{
            SUT = new puzzle([
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]);
        });


        it('should be false if a square already has the value', ()=>{
            const actualIsAssignable = SUT.testSquare(0, 1);

            expect(actualIsAssignable).toBe(false);
        });
        it('should be true if the square does not have the value', ()=>{
            const actualIsAssignable = SUT.testSquare(0, 3);

            expect(actualIsAssignable).toBe(true);
        });
        it('should be true if the square does not have the value but another square does', ()=>{
            const actualIsAssignable = SUT.testSquare(0, 2);

            expect(actualIsAssignable).toBe(true);
        });
    });
    describe('testColumn', ()=>{
        let SUT;
        beforeEach(()=>{
            SUT = new puzzle([
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]);
        });


        it('should be false if a column already has the value', ()=>{
            const actualIsAssignable = SUT.testColumn(0, 1);

            expect(actualIsAssignable).toBe(false);
        });
        it('should be true if the column does not have the value', ()=>{
            const actualIsAssignable = SUT.testColumn(0, 3);

            expect(actualIsAssignable).toBe(true);
        });
        it('should be true if the column does not have the value but another column does', ()=>{
            const actualIsAssignable = SUT.testColumn(0, 2);

            expect(actualIsAssignable).toBe(true);
        });
    });

    describe('getSquare', ()=>{
        let SUT;
        beforeEach(()=>{
            SUT = new puzzle([
                [0,1,9,0,0,0,7,0,0],
                [0,3,5,0,2,0,0,9,1],
                [6,0,0,0,9,0,0,2,4],
                [0,0,0,2,0,8,0,0,0],
                [0,4,2,0,3,0,1,7,0],
                [0,0,0,4,0,7,0,0,0],
                [5,9,0,0,4,0,0,0,7],
                [7,8,0,0,6,0,4,1,0],
                [0,0,4,0,0,0,5,6,0]
            ]);
        });

        it('should return the first square when asked', ()=>{
            let actualSquareValues = SUT.getSquare(0).map(c => c.value);

            expect(actualSquareValues).toEqual([0,1,9,0,3,5,6,0,0]);
        });
        it('should be able to return the second square', ()=>{
            let actualSquareValues = SUT.getSquare(1).map(c => c.value);

            expect(actualSquareValues).toEqual([0,0,0,0,2,0,0,9,0]);
        });
        it('should be able to return the third square', ()=>{
            let actualSquareValues = SUT.getSquare(2).map(c => c.value);

            expect(actualSquareValues).toEqual([7,0,0,0,9,1,0,2,4]);
        });
        it('should be able to return the fifth square', ()=>{
            let actualSquareValues = SUT.getSquare(4).map(c => c.value);

            expect(actualSquareValues).toEqual([2,0,8,0,3,0,4,0,7]);
        });
        it('should be able to return the last square', ()=>{
            let actualSquareValues = SUT.getSquare(8).map(c => c.value);

            expect(actualSquareValues).toEqual([0,0,7,4,1,0,5,6,0]);
        });
    });
    describe('getSquareNumFromCoords', ()=>{
        it('should be able to get the first square from coords', ()=>{
            const EXPECTED_VALUE = 0;
            const x = 0;
            const y = 0;

            const SUT = new puzzle([//Need to instantiate because of squareOneCoords helper
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ]);
            const actualSquareNum = SUT.getSquareNumFromCoords(x, y);

            expect(actualSquareNum).toBe(EXPECTED_VALUE);
        });
        it('should be able to get the second square from coords', ()=>{
            const EXPECTED_VALUE = 1;
            const x = 3;
            const y = 0;

            const SUT = new puzzle([//Need to instantiate because of squareOneCoords helper
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ]);
            const actualSquareNum = SUT.getSquareNumFromCoords(x, y);

            expect(actualSquareNum).toBe(EXPECTED_VALUE);
        });
        it('should be able to get the third square from coords', ()=>{
            const EXPECTED_VALUE = 2;
            const x = 6;
            const y = 0;

            const SUT = new puzzle([//Need to instantiate because of squareOneCoords helper
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ]);
            const actualSquareNum = SUT.getSquareNumFromCoords(x, y);

            expect(actualSquareNum).toBe(EXPECTED_VALUE);
        });
        it('should be able to get the fifth square from coords', ()=>{
            const EXPECTED_VALUE = 4;
            const x = 3;
            const y = 3;

            const SUT = new puzzle([//Need to instantiate because of squareOneCoords helper
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ]);
            const actualSquareNum = SUT.getSquareNumFromCoords(x, y);

            expect(actualSquareNum).toBe(EXPECTED_VALUE);
        });
        it('should be able to get the last square from coords', ()=>{
            const EXPECTED_VALUE = 8;
            const x = 8;
            const y = 8;

            const SUT = new puzzle([//Need to instantiate because of squareOneCoords helper
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ]);
            const actualSquareNum = SUT.getSquareNumFromCoords(x, y);

            expect(actualSquareNum).toBe(EXPECTED_VALUE);
        });
    });
});