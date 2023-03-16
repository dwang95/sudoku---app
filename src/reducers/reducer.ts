import { blocksSlice, BlocksState } from "./BlockReducer.ts";
import { controlsSlice, ControlsState } from "./ControlReducer.ts";


export interface GameState {
    blocks: BlocksState;
    controls: ControlsState;
}

export const rootReducer = {
    blocks: blocksSlice.reducer,
    controls: controlsSlice.reducer,
}
