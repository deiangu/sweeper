import classes from "./Cell.module.css";

type CellProps = {
  isMine: boolean;
  isMarked: boolean;
  isOpen: boolean;
  isGameLost: boolean;
  isGameWon: boolean;
  neighborMines: number;
  onOpen(): void;
  onMarkToggle(): void;
};

export function Cell(props: CellProps) {
  return (
    <div
      classList={{
        [classes.Cell]: true,
        [classes.Unopened]: !props.isOpen,
        [classes.Opened]: props.isOpen && !props.isMine,
        [classes.Exploded]: props.isOpen && props.isMine,
      }}
      onMouseUp={() =>
        !props.isGameLost &&
        !props.isGameWon &&
        !props.isMarked &&
        props.onOpen()
      }
      onContextMenu={(e) => {
        e.preventDefault();
        if (!props.isGameLost && !props.isGameWon && !props.isOpen) {
          props.onMarkToggle();
        }
      }}
    >
      {props.isMine &&
        (props.isOpen || (props.isGameLost && !props.isMarked)) &&
        "💣"}
      {!props.isMine && props.isOpen && (
        <b
          classList={{
            [classes.Number]: true,
            [classes.Zero]: props.neighborMines === 0,
            [classes.One]: props.neighborMines === 1,
            [classes.Two]: props.neighborMines === 2,
            [classes.Three]: props.neighborMines === 3,
            [classes.Four]: props.neighborMines === 4,
            [classes.Five]: props.neighborMines === 5,
            [classes.Six]: props.neighborMines === 6,
            [classes.Seven]: props.neighborMines === 7,
            [classes.Eight]: props.neighborMines === 8,
          }}
        >
          {props.neighborMines}
        </b>
      )}
      {(props.isMarked || (props.isGameWon && props.isMine)) && "🚩"}
    </div>
  );
}
