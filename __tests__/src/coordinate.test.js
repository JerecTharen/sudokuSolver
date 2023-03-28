const coordinate = require('../../src/coordinate');

describe('coordinate', ()=>{
    describe('construction', ()=>{
        it('should throw if no x', ()=>{
            let hasError = false;
            try {
                new coordinate(undefined, 1);
            } catch (error) {
                hasError = true;
            }
            expect(hasError).toBe(true);
        });
        it('should throw if no y', ()=>{
            let hasError = false;
            try {
                new coordinate(1, undefined);
            } catch (error) {
                hasError = true;
            }
            expect(hasError).toBe(true);
        });
        it('should not throw when there is no value', ()=>{
            let hasError = false;
            new coordinate(1, 1);
            expect(hasError).toBe(false);
        });
        it('should not throw when x is 0', ()=>{
            let hasError = false;
            new coordinate(0, 1);
            expect(hasError).toBe(false);
        });
        it('should not throw when y is 0', ()=>{
            let hasError = false;
            new coordinate(0, 1);
            expect(hasError).toBe(false);
        });
        it('should default value to zero when not provided', ()=>{
            const EXPECTED_VALUE = 0;

            const SUT = new coordinate(1, 1);

            expect(SUT.value).toBe(EXPECTED_VALUE);
        });
        it('should throw if coordinate is less than 0', ()=>{
            let msg = '';

            try {
                new coordinate(-1, 1);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
        it('should throw if coordinate is greater than 8', ()=>{
            let msg = '';

            try {
                new coordinate(9, 1);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
    });

    describe('setValue', ()=>{
        it('should set the value', ()=>{
            const EXPECTED_VALUE = 1;

            const SUT = new coordinate(1, 1);
            SUT.setValue(1);

            expect(SUT.value).toBe(EXPECTED_VALUE);
        });
        it('should throw if the value is less than 1', ()=>{
            let msg = '';
            const SUT = new coordinate(1, 1);

            try {
                SUT.setValue(0);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
        it('should throw if the value is greater than 9', ()=>{
            let msg = '';
            const SUT = new coordinate(1, 1);

            try {
                SUT.setValue(10);
            } catch (error) {
                msg = error.message;
            }

            expect(msg.length).toBeGreaterThan(0);
        });
    });

    describe('addPossibility', ()=>{
        it('should add the possible value', ()=>{
            const EXPECTED_VALUE = 1;
            const SUT = new coordinate(0,0);

            SUT.addPossibility(EXPECTED_VALUE);
            const actualPossibilities = SUT.possibilities;

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
    });
    describe('removePossibility', ()=>{
        it('should remove the possible value', ()=>{
            const EXPECTED_VALUE = 1;
            const SUT = new coordinate(0,0);

            SUT.addPossibility(EXPECTED_VALUE);
            SUT.removePossibility(EXPECTED_VALUE);
            const actualPossibilities = SUT.possibilities;

            expect(actualPossibilities).toEqual([]);
        });
    });
});