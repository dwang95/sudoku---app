interface BlockValue {
    row: number;
    col: number;
    value: number;
}

export interface Puzzle {
    givenNumbers: BlockValue[];
    mysteryNumbers: BlockValue[];
}

export const initialValues = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0],
]
export const createPuzzle = async () => {
    const givenNumbers = [] as BlockValue[];
    const mysteryNumbers = [] as BlockValue[];
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            const val = initialValues[i][j];
            if (val === 0) {
                mysteryNumbers.push({
                    row:i, col:j, value:val
                });
            } else {
                givenNumbers.push({
                    row:i, col:j, value:val
                });
            }
        }
    }
    return {
        givenNumbers: givenNumbers,
        mysteryNumbers: mysteryNumbers,
    } as Puzzle;
}