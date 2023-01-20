// ToDo: I needed to add the React dependency to each component to have
// testing working. Look for a solution.
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import Alphabet from "./Alphabet";
import { CharsContextProvider } from "./Context";

describe("Alphabet component", () => {
  const secretWord = "butterfly";
  beforeEach(() => {
    render(
      <CharsContextProvider>
        <Alphabet enabled={true} word={secretWord} setTries={jest.fn()} />
      </CharsContextProvider>
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

  test("clicking one of secret letters is revealed in the empty slots", () => {
    const t_button = screen.getByRole("button", { name: "t" });
    fireEvent.click(t_button);
    const secretLetters = document.getElementById("wordBox") as HTMLElement;
    const revealedTs = within(secretLetters).getAllByText("t");
    expect(revealedTs).toHaveLength(2);
  });
});
