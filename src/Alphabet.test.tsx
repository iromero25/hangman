// ToDo: I needed to add the React dependency to each component to have
// testing working. Look for a solution.
import React from "react";
import { render, screen } from "@testing-library/react";

import Alphabet from "./Alphabet";

describe("Alphabet component", () => {
  const secretWord = "butterfly";
  beforeEach(() => {
    render(
      <Alphabet
        word={secretWord}
        chars={[]}
        enabled={true}
        setTries={jest.fn()}
        setChars={jest.fn()}
      />
    );
  });

  test("as many empty slots as letters are in `butterfly` are displayed", () => {
    const questionMarks = screen.getAllByRole("strong");
    expect(questionMarks).toHaveLength(secretWord.length);
  });

  test("alphabet is displayed as buttons for each letter", () => {
    const numOfLettersInAlphabet = 26;
    expect(screen.getAllByRole("button")).toHaveLength(numOfLettersInAlphabet);
  });
});
