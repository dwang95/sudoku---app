import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockMap } from "../components/GameGrid";
import { Puzzle } from "../utils/puzzleInit.ts";
import { blockMapKey, validateBoard, ValidationError } from "../utils/puzzleValidation.ts";

export type GameValidity = "none" | "yes" | "no";

export interface BlocksState {
    blocks: BlockMap;
    gameCompleted: boolean;
    gameValidity: GameValidity;
    validationErrors: ValidationError[];
    puzzle: Puzzle;

}

interface SetBlockPayload {
    row: number;
    col: number;
    value: number;
}

interface NewGamePayload {
    puzzle: Puzzle;
}

  
export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: {
        blocks: [],
        gameCompleted: false,
        gameValidity: "none",
        validationErrors: [] as ValidationError[],
        puzzle: {} as Puzzle,
    } as BlocksState,
    reducers: {
        setBlock: (state, action: PayloadAction<SetBlockPayload>) => {
            const { row, col, value } = action.payload;
            const key = `${row}:${col}`;
            if (value === 0) {
                delete state.blocks[key];
            } else {
                state.blocks[key] = {
                    value,
                    isOriginal: false,
                }
            }
        },
        resetAllBlocks: (state) => {
            Object.entries(state.blocks).map(([key, value]) => {
                if (!value.isOriginal) {
                    delete state.blocks[key];
                }
            })
            state.gameCompleted = false;
            state.gameValidity = "none";
            state.validationErrors = [];
        },
        newGame: (state, action: PayloadAction<NewGamePayload>) => {
            const { puzzle } = action.payload;
            const { givenNumbers } = puzzle;
            state.blocks = {} as BlockMap;
            givenNumbers.forEach(({ row, col, value }) => {
                const key = blockMapKey(row, col);
                state.blocks[key] = {
                    value,
                    isOriginal: true,
                };
            });
            state.puzzle = puzzle;
            state.gameCompleted = false;
            state.gameValidity = "none";
        },
        validateAll: (state) => {
            const valid = validateBoard(state.blocks).length === 0;
            state.gameCompleted = valid ? true : false;
            state.gameValidity = valid ? 'yes' : 'no';
        },
        invalidate: (state) => {
            state.gameValidity = 'none';
        },
    }
})

export const { newGame, setBlock, resetAllBlocks, validate, validateAll, invalidate } = blocksSlice.actions;
