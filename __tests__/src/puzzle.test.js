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
            const actualIsAssignable = SUT.testRow(1, 0, 1);

            expect(actualIsAssignable).toBe(false);
        });
        it('should be true if the row does not have the value', ()=>{
            const actualIsAssignable = SUT.testRow(1, 0, 3);

            expect(actualIsAssignable).toBe(true);
        });
        it('should be true if the row does not have the value but another row does', ()=>{
            const actualIsAssignable = SUT.testRow(1, 0, 2);

            expect(actualIsAssignable).toBe(true);
        });
        it('should throw if testing a coord that has a value', ()=>{
            let msg = '';

            try {
                SUT.testRow(0, 0, 2);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
    });
    describe('testSquare', ()=>{

    });
    describe('testColumn', ()=>{

    });
});