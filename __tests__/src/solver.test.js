const solver = require('../../src/solver');
const puzzle = require('../../src/puzzle');

describe('solver', ()=>{
    describe('addRowPossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,2,3,4,5,6,7,8,9],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should add possibility when there is just one to add', ()=>{
            const EXPECTED_VALUE = 1;
            
            const actualPossibilities = SUT.addRowPossibilities(0, []);

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
        it('should add all possibilities when there is all to add', ()=>{
            const EXPECTED_VALUE = [1,2,3,4,5,6,7,8,9];

            const actualPossibilities = SUT.addRowPossibilities(1, []);

            expect(actualPossibilities).toEqual(EXPECTED_VALUE);
        });
        it('should add to existing possibilities', ()=>{
            const EXPECTED_VALUE = [1,2,3,4,5,6,7,8,9];

            const actualPossibilities = SUT.addRowPossibilities(1, [1]);

            expect(actualPossibilities).toEqual(EXPECTED_VALUE);
        });
    });
    describe('addColumnPossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,0,0,0,0,0,0,0,0],
                [2,0,0,0,0,0,0,0,0],
                [3,0,0,0,0,0,0,0,0],
                [4,0,0,0,0,0,0,0,0],
                [5,0,0,0,0,0,0,0,0],
                [6,0,0,0,0,0,0,0,0],
                [7,0,0,0,0,0,0,0,0],
                [8,0,0,0,0,0,0,0,0],
                [9,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should add possibility when there is just one to add', ()=>{
            const EXPECTED_VALUE = 1;
            
            const actualPossibilities = SUT.addColumnPossibilities(0, []);

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
        it('should add all possibilities when there is all to add', ()=>{
            const EXPECTED_VALUE = [1,2,3,4,5,6,7,8,9];

            const actualPossibilities = SUT.addColumnPossibilities(1, []);

            expect(actualPossibilities).toEqual(EXPECTED_VALUE);
        });
        it('should add to existing possibilities', ()=>{
            const EXPECTED_VALUE = [1,2,3,4,5,6,7,8,9];

            const actualPossibilities = SUT.addColumnPossibilities(1, [1]);

            expect(actualPossibilities).toEqual(EXPECTED_VALUE);
        });
    });
    describe('addSquarePossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,2,3,0,0,0,0,0,0],
                [4,5,6,0,0,0,0,0,0],
                [7,8,9,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should add possibility when there is just one to add', ()=>{
            const EXPECTED_VALUE = 1;
            
            const actualPossibilities = SUT.addSquarePossibilities(0, []);

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
        it('should add all possibilities when there is all to add', ()=>{
            const EXPECTED_VALUE = [1,2,3,4,5,6,7,8,9];

            const actualPossibilities = SUT.addSquarePossibilities(1, []);

            expect(actualPossibilities).toEqual(EXPECTED_VALUE);
        });
        it('should add to existing possibilities', ()=>{
            const EXPECTED_VALUE = [1,2,3,4,5,6,7,8,9];

            const actualPossibilities = SUT.addSquarePossibilities(1, [1]);

            expect(actualPossibilities).toEqual(EXPECTED_VALUE);
        });
    });

    describe('pruneRowPossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,2,3,4,5,6,7,8,9],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should remove a single possibility when its test fails', ()=>{
            const rowNum = 0;
            const startingPossibilities = [2];

            const actualPossibilities = SUT.pruneRowPossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([]);
        });
        it('should remove multiple possibilities when its test fails', ()=>{
            const rowNum = 0;
            const startingPossibilities = [2, 3];

            const actualPossibilities = SUT.pruneRowPossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([]);
        });
        it('should remove multiple possibilities but keep valid possibilities', ()=>{
            const EXPECTED_VALUE = 1;
            const rowNum = 0;
            const startingPossibilities = [EXPECTED_VALUE, 2, 3];

            const actualPossibilities = SUT.pruneRowPossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
    });
    describe('pruneColumnPossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,0,0,0,0,0,0,0,0],
                [2,0,0,0,0,0,0,0,0],
                [3,0,0,0,0,0,0,0,0],
                [4,0,0,0,0,0,0,0,0],
                [5,0,0,0,0,0,0,0,0],
                [6,0,0,0,0,0,0,0,0],
                [7,0,0,0,0,0,0,0,0],
                [8,0,0,0,0,0,0,0,0],
                [9,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should remove a single possibility when its test fails', ()=>{
            const startingPossibilities = [2];

            const actualPossibilities = SUT.pruneColumnPossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([]);
        });
        it('should remove multiple possibilities when its test fails', ()=>{
            const startingPossibilities = [2, 3];

            const actualPossibilities = SUT.pruneColumnPossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([]);
        });
        it('should remove multiple possibilities but keep valid possibilities', ()=>{
            const EXPECTED_VALUE = 1;
            const startingPossibilities = [EXPECTED_VALUE, 2, 3];

            const actualPossibilities = SUT.pruneColumnPossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
    });
    describe('pruneSquarePossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,2,3,0,0,0,0,0,0],
                [4,5,6,0,0,0,0,0,0],
                [7,8,9,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should remove a single possibility when its test fails', ()=>{
            const startingPossibilities = [2];

            const actualPossibilities = SUT.pruneSquarePossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([]);
        });
        it('should remove multiple possibilities when its test fails', ()=>{
            const startingPossibilities = [2, 3];

            const actualPossibilities = SUT.pruneSquarePossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([]);
        });
        it('should remove multiple possibilities but keep valid possibilities', ()=>{
            const EXPECTED_VALUE = 1;
            const startingPossibilities = [EXPECTED_VALUE, 2, 3];

            const actualPossibilities = SUT.pruneSquarePossibilities(0, startingPossibilities);

            expect(actualPossibilities).toEqual([EXPECTED_VALUE]);
        });
    });
});