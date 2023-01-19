import React, { Dispatch, SetStateAction, useContext } from "react";

import { CharsContext } from "./Context";
import "./Alphabet.scss";

interface Props {
  enabled: boolean;
  word: string;
  setTries: Dispatch<SetStateAction<number>>;
}

const Alphabet: React.FC<Props> = ({ enabled, word, setTries }) => {
  const { chars, setChars } = useContext(CharsContext);
  const firstLetter = "a".charCodeAt(0);
  const lastLetter = "z".charCodeAt(0);

  const charArray: string[] = [];
  for (let letter = firstLetter; letter <= lastLetter; letter++) {
    charArray.push(String.fromCharCode(letter));
  }

  console.log("Alphabet is rendered");

  return (
    <div>
      <div className="wordBox">
        {word.split("").map((char, index) => (
          <button key={char + index}>
            {chars.includes(char) ? char : "?"}
          </button>
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
