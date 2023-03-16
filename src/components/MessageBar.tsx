import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BlocksState, invalidate } from "../reducers/BlockReducer.ts";
import { GameState } from "../reducers/reducer.ts";
export const MessageBar = () => {
    const dispatch = useDispatch();
    const { gameValidity } = useSelector<GameState, BlocksState>(state => state.blocks);

    const handleClose = () => {
        dispatch(invalidate());
    };

    let severity = 'error';
    let message = '';
    switch (gameValidity) {
        case 'yes' : {
            message = 'Completed';
            severity = 'success'
            break;
        }
        case 'no' : {
            message = 'Invalid';
            break;
        }
        default: {
            break;
        }
    }
    const open = gameValidity !== 'none';
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
        >
            <Alert severity={severity} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
}