import React, { useState, useEffect, useMemo, useContext } from "react";

import { CharsContext } from "./Context";
import "./Board.scss";

interface Props {
  word: string;
  tries: number;
}

type GameStates = "in Progress" | "you won!" | "you lost";

const Board: React.FC<Props> = ({ word, tries }) => {
  const { chars } = useContext(CharsContext);
  const [status, setStatus] = useState<GameStates>("in Progress");

  useEffect(() => {
    if (chars.length === 0) return;
    if (tries === 10) {
      setStatus("you lost");
      return;
    }
    // just check a single char in the word that is not in the char array
    // to define the status of the game:
    const uncompleteWord = word.split("").some((char) => !chars.includes(char));
    if (uncompleteWord) return;
    setStatus("you won!");
  }, [chars, tries, word]);

  const getStatusColor = useMemo(() => {
    switch (status) {
      case "you won!":
        return "green";
      case "you lost":
        return "red";
      default:
        return "";
    }
  }, [status]);

  console.log("Board is rendered");

  return (
    <div className="board">
      <img className="image" src={`/src/assets/hangman/${tries}.jpg`} />
      <div>
        Game status: <span className={getStatusColor}>{status}</span>
      </div>
      <div>Remaining tries: {10 - tries}</div>
    </div>
  );
};

export default Board;
