import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockValue } from "../components/GameGrid.tsx";

type Status = "UNSELECTED" | "SELECTED";

interface InputState {
    row?: number;
    col?: number;
    value?: number;
}

export interface ControlsState {
    status: Status;
    input: InputState;
}

interface SelectBlockPayload {
    row: number;
    col: number;
    block: BlockValue | undefined;
}

const initialState = {
    status: "UNSELECTED",
    input: {} as InputState,
} as ControlsState;

export const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        selectBlock: (state, action: PayloadAction<SelectBlockPayload>) => {
            const { row, col, block } = action.payload;
            state.status = "SELECTED";
            state.input = {
                row,
                col,
                value: block?.value,
            };
        },
        unselectBlock: (state) => {
            state.status = "UNSELECTED";
            state.input = {} as InputState;
        },
    }
})

export const { unselectBlock, selectBlock } = controlsSlice.actions;
