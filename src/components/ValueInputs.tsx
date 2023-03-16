import { Button, ButtonGroup, Stack, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlock } from "../reducers/BlockReducer.ts";
import { unselectBlock } from "../reducers/ControlReducer.ts";
import { ControlsState } from "../reducers/ControlReducer.ts";
import { GameState } from "../reducers/reducer.ts";

export const ValueInputs = () => {
    const dispatch = useDispatch();
    const { status, input } = useSelector<GameState, ControlsState>(state => state.controls);
    const { row, col, value } = input;

    const [localValue, setLocalValue] = useState<string>(value ? `${value}` : '');

    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === 'SELECTED' && textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [status]);

    const resetControls = () => {
        setLocalValue((currentValue) => {
            if (textFieldRef.current) {
                textFieldRef.current.value = '';
                return '';
            }
            return currentValue;
        });
        dispatch(unselectBlock());
    }
    const dispatchSetBlock = (row: number, col: number, value: number) => {
        dispatch(setBlock({
            row,
            col,
            value,
        }));
        resetControls();
    }

    const handleSetValue = (event: React.MouseEvent) => {
        if (row === undefined || col === undefined) {
            return;
        }
        const number = Number.parseInt(localValue);
        if (Number.isInteger(number) && number > 0 && number < 10) {
            dispatchSetBlock(row, col, number)
        }
    }
    const handleInputValue = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value.trim();

        setLocalValue((currentValue) => {
            if (value === '') {
                return value;
            }
            const number = Number.parseInt(value);
            if (Number.isInteger(number) && number > 0 && number < 10) {
                return `${number}`;
            }
            (event.target as HTMLInputElement).value = currentValue; 
            return currentValue;
        });
    }

    return (
        <Stack direction={"row"}>
            <TextField variant="outlined"
                size="small"
                sx={{
                    flexBasis: "4rem"
                }}
                defaultValue={localValue}
                inputRef={textFieldRef}
                disabled={status === "UNSELECTED"}
                onChange={handleInputValue}/>
            <ButtonGroup variant="contained" color="secondary" aria-label="contained secondary button group">
                <Button variant="contained"
                    onClick={handleSetValue}
                    size="medium"
                    color="primary"
                    disabled={status === "UNSELECTED"}>
                    Set
                </Button>
            </ButtonGroup>
        </Stack>
    );
}