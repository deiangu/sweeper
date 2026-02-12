import { shuffle } from "lodash-es";
import { For } from "solid-js";
import classes from "./Minefield.module.css";

type MinefieldConfig = {
  width: number;
  height: number;
  mines: number;
};

type MinefieldProps = {
  config: MinefieldConfig;
};

export function Minefield({ config }: MinefieldProps) {
  const fields = Array.from<boolean>({
    length: config.width * config.height,
  }).fill(false);
  for (let i = 0; i < config.mines; i++) {
    fields[i] = true;
  }
  const shuffledFields = shuffle(fields);

  return (
    <div class={`${classes.Frame} ${classes.Raise}`}>
      <div class={`${classes.Controls} ${classes.Lower}`}>TODO: Controls</div>

      <div
        class={`${classes.Field} ${classes.Lower}`}
        style={{ width: `${config.width * 24 + 8}px` }}
      >
        <For each={shuffledFields}>
          {(val) => <div class={classes.Cell}>{val ? 1 : 0}</div>}
        </For>
      </div>
    </div>
  );
}

Minefield.SMALL = { width: 9, height: 9, mines: 10 } as MinefieldConfig;
Minefield.MEDIUM = { width: 16, height: 16, mines: 40 } as MinefieldConfig;
Minefield.LARGE = { width: 30, height: 16, mines: 99 } as MinefieldConfig;
