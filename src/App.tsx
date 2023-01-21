import React, { useState, useEffect, useMemo } from "react";

import Board from "./Board";
import Alphabet from "./Alphabet";
import { GameStates } from "./types";

const App = () => {
  // word is reset when the async fetch finishes, this
  // is why the App component is rendered twice
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [tries, setTries] = useState(0);
  const [chars, setChars] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStates>("in Progress");

  const fetchWord = () =>
    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("cannot connect to the API");
      })
      .then((result: string[]) => setWord(result[0]))
      .catch((e) => setError(e.message));

  // I want this to return true when the word hasn't been set up
  // so we can show the alphabet at the beginning no matter what
  const uncompleteWord = useMemo(
    () => word === "" || word.split("").some((char) => !chars.includes(char)),
    [chars, word]
  );

  // Latest version of "react-hooks/exhaustive-deps" is clever: it  realises
  // functions called inside the useEffect hook have no effect even when the
  // functional component is called again (thus re-creating the function).

  // The function is only requested as dependency if in turn, it depends on
  // another variable (as expected).
  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    if (chars.length === 0) return;
    if (tries === 10) {
      setStatus("you lost");
      return;
    }
    if (uncompleteWord) return;
    setStatus("you won!");
  }, [chars, tries, uncompleteWord]);

  const statusColor = useMemo(() => {
    switch (status) {
      case "you won!":
        return "green";
      case "you lost":
        return "red";
      default:
        return "black";
    }
  }, [status]);

  console.log("App is rendered: ");

  return (
    <>
      {!error ? (
        <>
          <Board status={status} tries={tries} statusColor={statusColor} />
          <Alphabet
            word={word}
            chars={chars}
            enabled={tries < 10 && uncompleteWord}
            statusColor={statusColor}
            setTries={setTries}
            setChars={setChars}
          />
        </>
      ) : (
        <h2>An error has ocurred: {error}</h2>
      )}
    </>
  );
};

export default App;
