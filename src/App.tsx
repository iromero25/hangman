import React, { useState, useEffect, useMemo } from "react";

import Board from "./Board";
import Alphabet from "./Alphabet";

const App = () => {
  // word is reset when the async fetch finishes, this
  // is why the App component is rendered twice
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [tries, setTries] = useState(0);
  const [chars, setChars] = useState<string[]>([]);

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

  // ToDo: there's a bug in my code: we can keep on selecting the alphabet even
  // after finishing, which brings unexpected results.
  // I would like to add testing to my project and test for this case.

  console.log("App is rendered: ");

  return (
    <>
      {!error ? (
        <>
          <Board word={word} chars={chars} tries={tries} />
          <Alphabet
            word={word}
            chars={chars}
            enabled={tries < 10 && uncompleteWord}
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
