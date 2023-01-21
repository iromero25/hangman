import React from "react";
import { GameStates } from "./types";
import "./Board.scss";

interface Props {
  status: GameStates;
  tries: number;
  statusColor: string;
}

const Board: React.FC<Props> = ({ status, tries, statusColor }) => {
  console.log("Board is rendered");

  return (
    <div className="board">
      <img className="image" src={`/src/assets/hangman/${tries}.jpg`} />
      <div>
        Game status: <span className={statusColor}>{status}</span>
      </div>
      <div>Remaining tries: {10 - tries}</div>
    </div>
  );
};

export default Board;
