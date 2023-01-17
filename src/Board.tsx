import { useState, useEffect, useMemo } from "react";
import "./Board.scss";

interface Props {
  word: string;
  chars: string[];
  tries: number;
}

type GameStates = "in Progress" | "you won!" | "you lost";

const Board: React.FC<Props> = ({ chars, word, tries }) => {
  const [status, setStatus] = useState<GameStates>("in Progress");

  // maybe we can use another hook like useCallback or useMemo?
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
      <div>
        {word.split("").map((char, index) => (
          <button key={char + index} className="wordBox">
            {chars.includes(char) ? char : "?"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Board;
