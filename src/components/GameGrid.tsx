import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux";
import { Block } from "./Block.tsx";
import { BlocksState, newGame } from "../reducers/BlockReducer.ts";
import { GameState } from "../reducers/reducer.ts";
import { useEffect } from "react";
import { createPuzzle, Puzzle } from "../utils/puzzleInit.ts";


export interface BlockValue {
    value: number;
    isOriginal: boolean;
}

export interface BlockMap {
    [key: string]: BlockValue;
}

export const GameGrid = () => {
    const dispatch = useDispatch();
    const { blocks } = useSelector<GameState, BlocksState>(state => state.blocks);

    useEffect(() => {
        createPuzzle().then((puzzle?: Puzzle) => {
            if (puzzle) {
                dispatch(newGame({ puzzle }));
            }
        });
    }, []);
    
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const columns = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <Grid container direction="column" >
            {
                rows.map((row) => {
                    return (
                        <Grid item
                            container
                            key={`row-${row}`}
                            justifyContent="center"
                            direction="row"
                            sx={{
                                flex: `1 1 ${50}`,
                                height: 50,
                            }}
                        >
                            {
                                columns.map((column) => {
                                    const block= blocks[`${row}:${column}`];
                                    return (
                                        <Block key={`column-${column}`}
                                               row={row}
                                               col={column}
                                               block={block}
                                               size={50}/>
                                    );
                                })
                            }
                        </Grid>
                    );
                })
            }
        </Grid>
    )
}