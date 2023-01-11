import React, { Dispatch, SetStateAction } from "react";
import "./Alphabet.scss";

interface Props {
  chars: string[];
  enabled: boolean;
  word: string;
  setChars: Dispatch<SetStateAction<string[]>>;
  setTries: Dispatch<SetStateAction<number>>;
}

const Alphabet: React.FC<Props> = ({
  chars,
  enabled,
  word,
  setChars,
  setTries,
}) => {
  const firstLetter = "a".charCodeAt(0);
  const lastLetter = "z".charCodeAt(0);

  let charArray: string[] = [];
  for (let letter = firstLetter; letter <= lastLetter; letter++) {
    charArray.push(String.fromCharCode(letter));
  }

  console.log("Alphabet is rendered");

  return (
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
  );
};

export default React.memo(Alphabet);
