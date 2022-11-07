import { GameMark } from "../_Hooks/GameSystem/types";

export type SquareProps = {
  handleSquareClick(): void;
  gameValue: GameMark;
  positionX: number;
  positionY: number;
  disabled: boolean;
};
