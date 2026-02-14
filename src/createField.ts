import { shuffle } from "lodash-es";
import { getNeighborIndices } from "./getNeighborIndices";

export type MinefieldConfig = {
  width: number;
  height: number;
  mines: number;
};

export function createField(config: MinefieldConfig) {

const init = Array.from<boolean>({
    length: config.width * config.height,
  }).fill(false);
  for (let i = 0; i < config.mines; i++) {
    init[i] = true;
  }
  const minefield = shuffle(init);


  function countMinesFor(index: number) {
    return getNeighborIndices(index, config).reduce((acc, index) => acc + (minefield[index] ? 1 : 0), 0);
  }

  return minefield.map((isMine, i) => ({ isMine, isOpen: false, neighborMines: countMinesFor(i) }))
  
}