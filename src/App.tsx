import { useState, useEffect } from "react";
import Alphabet from "./Alphabet";
import Board from "./Board";

const App = () => {
  // what if I wanted to make word and chars available to the Board and Alphabet components only?
  // Can I use context?
  const [word, setWord] = useState(""); // this doesn't need to be reset! It does!
  const [error, setError] = useState("");
  const [chars, setChars] = useState<string[]>([]);
  const [tries, setTries] = useState(0);

  const fetchWord = () =>
    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("cannot connect to the API");
      })
      .then((result: string[]) => setWord(result[0]))
      .catch((e) => setError(e.message));

  // Latest version of "react-hooks/exhaustive-deps" is clever: it  realises
  // functions called inside the useEffect hook have no effect even when the
  // functional component is called again (thus re-creating the function).

  // The function is only requested as dependency if in turn, it depends on
  // another variable (as expected).
  useEffect(() => {
    fetchWord();
  }, []);

  console.log("App is rendered");

  return (
    <>
      {!error ? (
        <>
          <Board chars={chars} word={word} tries={tries} />
          <Alphabet
            chars={chars}
            word={word}
            enabled={tries < 10}
            setChars={setChars}
            setTries={setTries}
          />
        </>
      ) : (
        <>An Error has ocurred: {error}</>
      )}
    </>
  );
};

export default App;
