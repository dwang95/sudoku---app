import { Stack } from '@mui/material';
import { ValueInputs } from './ValueInputs.tsx';
import { GameControls } from './GameControls.tsx';
import { GameGrid } from './GameGrid.tsx';

export const Main = () => {
    return (
        <Stack>
            <GameControls />
            <GameGrid />
            <ValueInputs />
        </Stack>
    );
}