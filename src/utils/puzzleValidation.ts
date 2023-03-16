import { BlockMap } from "../components/GameGrid.tsx";
import { initialValues} from "./puzzleInit.ts";

export interface ValidationError {
    type: "ROW" | "COLUMN" | "SECTOR";
    index: number;
}

export const blockMapKey = (row: number, col: number): string => {
    return `${row}:${col}`;
}
export const validateBoard = (blocks: BlockMap): ValidationError[] => {
    const errors = [] as ValidationError[];

    const SeenSet = new Set();

    for (let i=0;i<9;i++) {
        for (let j=0;j<9;j++) {
            let blockValue = blocks[blockMapKey(i, j)].value;
            let val = `(${blockValue})`;
            let row = `${val}:${i}`;
            let col = `${j}:${val}`;
            let sector = `${Math.floor(i)}:${val}:${Math.floor(j)}`;
            if (SeenSet.has(row)){
                errors.push({
                    type: "ROW", index: j
                } as ValidationError);
                //console.log(row);
            }
            if (SeenSet.has(col)){
                errors.push({
                    type: "COLUMN", index: i
                } as ValidationError);
                //console.log(col);
            }
            if (SeenSet.has(sector)){
                errors.push({
                    type: "SECTOR", index: i
                } as ValidationError);
                //console.log(sector);
            }
            SeenSet.add(row);
            SeenSet.add(col);
            SeenSet.add(sector);
        }
    }
    //console.log(errors.toString());
    return errors;
}