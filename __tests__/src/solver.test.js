const solver = require('../../src/solver');
const puzzle = require('../../src/puzzle');
const allPossibleValues = require('../../src/possibleValues');

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

    describe('assignSoloPossibilities', ()=>{
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

        it('should assign a value if there is only one possibility', ()=>{
            const EXPECTED_VALUE = 1;
            SUT.puzzle.coords[0].possibilities = [EXPECTED_VALUE];

            SUT.assignSoloPossibilities();
            const actualValue = SUT.puzzle.coords[0].value;

            expect(actualValue).toBe(EXPECTED_VALUE);
        });
        it('should not assign a value if there are more than one one possibility', ()=>{
            const EXPECTED_VALUE = 0;
            SUT.puzzle.coords[9].possibilities = allPossibleValues;

            SUT.assignSoloPossibilities();
            const actualValue = SUT.puzzle.coords[0].value;

            expect(actualValue).toBe(EXPECTED_VALUE);
        });
    });

    describe('assignRowUniquePossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,2,3,4,5,6,7,8,0],
                [0,0,0,0,0,0,0,0,1],
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

        it('should assign a one from possibilities when no other position on the row can hold it', ()=>{
            const EXPECTED_VALUE = 1;
            SUT.puzzle.coords[0].possibilities = [EXPECTED_VALUE, 9];
            SUT.puzzle.coords.find(c => c.x === 8 && c.y === 0).possibilities = [9];
            
            SUT.assignRowUniquePossibilities(0);
            const actualValue = SUT.puzzle?.coords[0]?.value;
            
            expect(actualValue).toBe(EXPECTED_VALUE);
        });
        it('should not assign a one from possibilities when another position on the row can hold it', ()=>{
            const EXPECTED_VALUE = 0;
            SUT.puzzle.coords.find(c => c.x === 0 && c.y === 0).possibilities = [1, 9];
            SUT.puzzle.coords.find(c => c.x === 8 && c.y === 0).possibilities = [1, 9];
            
            SUT.assignRowUniquePossibilities(0);
            const actualValue = SUT.puzzle?.coords?.find(c => c.x === 0 && c.y === 0)?.value;
            
            expect(actualValue).toBe(EXPECTED_VALUE);
        });
    });
    describe('assignColumnUniquePossibilities', ()=>{
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
                [0,1,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should assign unique column possibility', ()=>{
            const EXPECTED_VALUE = 1;
            SUT.puzzle.coords[0].possibilities = [EXPECTED_VALUE];
            SUT.puzzle.coords.find(c => c.x === 0 && c.y === 8).possibilities = [9];
            
            SUT.assignColumnUniquePossibilities(0);
            const actualValue = SUT.puzzle?.coords[0]?.value;
            
            expect(actualValue).toBe(EXPECTED_VALUE);
        });
        it('should not assign possibility when it is not unique', ()=>{
            const EXPECTED_VALUE = 0;
            SUT.puzzle.coords[0].possibilities = [1, 9];
            SUT.puzzle.coords.find(c => c.x === 0 && c.y === 8).possibilities = [1, 9];
            
            SUT.assignColumnUniquePossibilities(0);
            const actualValue = SUT.puzzle?.coords[0]?.value;
            
            expect(actualValue).toBe(EXPECTED_VALUE);
        });
    });
    describe('assignSquareUniquePossibilities', ()=>{
        let STUB_PUZZLE;
        let SUT;
        beforeEach(()=>{
            STUB_PUZZLE = new puzzle([
                [0,2,3,0,0,0,0,0,0],
                [4,5,6,0,0,0,0,0,0],
                [7,8,0,1,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
            ]);
            SUT = new solver(STUB_PUZZLE);
        });

        it('should assign unique square possibility', ()=>{
            const EXPECTED_VALUE = 1;
            SUT.puzzle.coords[0].possibilities = [EXPECTED_VALUE];
            SUT.puzzle.coords.find(c => c.x === 2 && c.y === 2).possibilities = [9];
            
            SUT.assignUniqueSquarePossibilities(0);
            const actualValue = SUT.puzzle?.coords[0]?.value;
            
            expect(actualValue).toBe(EXPECTED_VALUE);
        });
        it('should not assign square possibility when not unique', ()=>{
            const EXPECTED_VALUE = 0;
            SUT.puzzle.coords[0].possibilities = [1,9];
            SUT.puzzle.coords.find(c => c.x === 2 && c.y === 2).possibilities = [1,9];
            
            SUT.assignUniqueSquarePossibilities(0);
            const actualValue = SUT.puzzle?.coords[0]?.value;
            
            expect(actualValue).toBe(EXPECTED_VALUE);
        });
    });
});