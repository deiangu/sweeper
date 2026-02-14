import { createSignal } from "solid-js";
import classes from "./Cell.module.css";

type CellProps = {
  isMine: boolean;
  isOpen: boolean;
  isGameLost: boolean;
  isGameWon: boolean;
  neighborMines: number;
  onOpen(): void;
};

export function Cell(props: CellProps) {
  const [isMarked, setMarked] = createSignal(false);

  return (
    <div
      classList={{
        [classes.Cell]: true,
        [classes.Unopened]: !props.isOpen,
        [classes.Opened]: props.isOpen && !props.isMine,
        [classes.Exploded]: props.isOpen && props.isMine,
      }}
      onClick={() => !isMarked() && props.onOpen()}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!props.isOpen) {
          setMarked((m) => !m);
        }
      }}
    >
      {props.isMine &&
        (props.isOpen || (props.isGameLost && !isMarked())) &&
        "X"}
      {!props.isMine && props.isOpen && props.neighborMines}
      {(isMarked() || (props.isGameWon && props.isMine)) && "m"}
    </div>
  );
}
