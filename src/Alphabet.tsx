import React, { Dispatch, SetStateAction } from "react";
import { createAlphabetArray } from "./utils";
import "./Alphabet.scss";

interface Props {
  word: string;
  chars: string[];
  enabled: boolean;
  statusColor: string;
  setTries: Dispatch<SetStateAction<number>>;
  setChars: Dispatch<SetStateAction<string[]>>;
}

const charArray = createAlphabetArray();

const Alphabet: React.FC<Props> = ({
  word,
  chars,
  enabled,
  statusColor,
  setTries,
  setChars,
}) => {
  console.log("Alphabet is rendered");

  return (
    <div>
      <div className={`wordBox ${statusColor}`}>
        {word.split("").map((char, index) => (
          <strong role="strong" key={char + index}>
            {!enabled || chars.includes(char) ? char : ""}
          </strong>
        ))}
      </div>
      <div className="alphabet">
        {charArray.map((char) => {
          const disableChar = chars.includes(char);
          return (
            <button
              key={char}
              disabled={!enabled || disableChar}
              style={{ color: disableChar ? "red" : "black" }}
              onClick={() => {
                // depending on the version of React, this might be sync or async,
                // I am treating it as async for safety
                setChars((currentArray: string[]) => [...currentArray, char]);
                setTries((currentTries: number) =>
                  word.includes(char) ? currentTries : currentTries + 1
                );
              }}
            >
              {char}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Alphabet);
