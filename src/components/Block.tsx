import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BlocksState } from "../reducers/BlockReducer.ts";
import { ControlsState, selectBlock } from "../reducers/ControlReducer.ts";
import { GameState } from "../reducers/reducer.ts";
import { BlockValue } from "./GameGrid.tsx";

interface BlockProps {
    row: number;
    col: number;
    block?: BlockValue;
}

export const Block = ({ row, col, block }: BlockProps) => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<GameState, ControlsState>(state => state.controls);
    const { validationErrors } = useSelector<GameState, BlocksState>(state => state.blocks);

    const blockSelected = status === "SELECTED" && input.row === row && input.col === col;
    const blockBackgroundColor = (value: BlockValue | undefined, blockSelected: boolean) => {
        if (value?.isOriginal){
            return "grey";
        }
        else if (blockSelected ) {
            return "green";
        }
        return "white";
    }

    const handleClicked = (event: React.MouseEvent) => {
        if (block?.isOriginal) {
            return;
        }
        dispatch(selectBlock({
            row,
            col,
            block,
        }))
    }

    return (
        <div onClick={handleClicked}>
            <Box sx={{
                flex: `1 1 50`,
                width: 50,
                padding: "1px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundColor: blockBackgroundColor(block, blockSelected),
                border: 1,
            }}>
                <div>
                    {block?.value ? block?.value : null}
                </div>
            </Box>
        </div>
    )
}