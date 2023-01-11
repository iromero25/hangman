import { useState, useEffect } from "react";
import Alphabet from "./Alphabet";
import Board from "./Board";

const App = () => {
  const [word, setWord] = useState(""); // this doesn't need to be reset!
  const [error, setError] = useState("");
  const [chars, setChars] = useState<string[]>([]);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("cannot connect to the API");
      })
      .then((result: string[]) => setWord(result[0]))
      .catch((e) => setError(e.message));
  }, []);

  console.log("App is rendered");

  return (
    <>
      {!error ? (
        <>
          <Board chars={chars} word={word} tries={tries} />
          <Alphabet
            chars={chars}
            enabled={tries < 10}
            word={word}
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
