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
            const coord = SUT.rows[0][0];

            expect(!Number.isNaN(coord.x) && !Number.isNaN(coord.y) && !Number.isNaN(coord.value)).toBeTruthy();
        });
    });
});