import { createSignal, For } from "solid-js";
import { Cell } from "./Cell";
import classes from "./Minefield.module.css";
import { createField, type MinefieldConfig } from "./createField";
import { getNeighborIndices } from "./getNeighborIndices";

type MinefieldProps = {
  config: MinefieldConfig;
};

export function Minefield({ config }: MinefieldProps) {
  const [minefield, setMinefield] = createSignal(createField(config));
  const [isGameLost, setGameLost] = createSignal(false);
  const [isGameWon, setGameWon] = createSignal(false);

  const onOpenCell = (index: number) => {
    const newMinefield = minefield().slice();
    const queue = [index];
    while (queue.length) {
      const idx = queue.pop()!;
      if (!newMinefield[idx].isOpen) {
        newMinefield[idx] = { ...newMinefield[idx], isOpen: true };

        if (newMinefield[idx].isMine) {
          setGameLost(true);
          setMinefield(newMinefield);
          return;
        }
        if (newMinefield[idx].neighborMines === 0) {
          const forQ = getNeighborIndices(idx, config).filter(
            (i) => !newMinefield[i].isOpen,
          );
          queue.push(...forQ);
        }
      }
    }

    const unopenedCount = newMinefield.reduce(
      (acc, cell) => acc + (cell.isOpen ? 0 : 1),
      0,
    );

    if (unopenedCount === config.mines) {
      setGameWon(true);
    }

    setMinefield(newMinefield);
  };

  return (
    <div class={`${classes.Frame} ${classes.Raise}`}>
      <div
        class={`${classes.Controls} ${classes.Lower}`}
        onClick={() => {
          setMinefield(createField(config));
          setGameLost(false);
          setGameWon(false);
        }}
      >
        {isGameLost() && "Game lost! Click here to play again."}
        {isGameWon() && "Game won! Click here to play again."}
        {!isGameWon() && !isGameLost() && "Minefield!"}
      </div>

      <div
        class={`${classes.Field} ${classes.Lower}`}
        style={{ width: `${config.width * 24 + 8}px` }}
      >
        <For each={minefield()}>
          {({ isMine, isOpen, neighborMines }, index) => (
            <Cell
              isMine={isMine}
              isOpen={isOpen}
              neighborMines={neighborMines}
              isGameLost={isGameLost()}
              isGameWon={isGameWon()}
              onOpen={() => onOpenCell(index())}
            />
          )}
        </For>
      </div>
    </div>
  );
}

Minefield.SMALL = { width: 9, height: 9, mines: 10 } as MinefieldConfig;
Minefield.MEDIUM = { width: 16, height: 16, mines: 40 } as MinefieldConfig;
Minefield.LARGE = { width: 30, height: 16, mines: 99 } as MinefieldConfig;
