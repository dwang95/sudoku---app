import { Button, ButtonGroup, Fab, FormControlLabel, Stack, Switch, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { BlocksState, resetAllBlocks, validateAll } from "../reducers/BlockReducer.ts";
import { GameState } from "../reducers/reducer.ts";

export const GameControls = () => {
    const dispatch = useDispatch();
    const { blocks } = useSelector<GameState, BlocksState>(state => state.blocks);

    const handleResetClicked = (event: React.MouseEvent) => {
        dispatch(resetAllBlocks())
    }
    const handleValidateClicked = (event: React.MouseEvent) => {
        dispatch(validateAll());
    }

    const isBoardFull = Object.keys(blocks).length === 81;
    const buttonFontSize = { xs: "0.5rem", sm: "0.8rem", md: "1rem" };
    return (
        <Stack direction={"row"} >
            <ButtonGroup >
                <Button size="medium"
                    onClick={handleValidateClicked}
                    disabled={!isBoardFull}
                    sx={{
                        fontSize: buttonFontSize,
                        "&.Mui-disabled": {
                            color: "#42a5f5"
                        }
                    }}>
                    Validate
                </Button>
                <Button size="medium"
                    onClick={handleResetClicked}
                    sx={{
                        fontSize: buttonFontSize,
                    }}>
                    Reset
                </Button>
            </ButtonGroup>
        </Stack>
    );
}