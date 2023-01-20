import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";

import App from "./App";

// We should be very careful when mocking an APi: need to be sure of what
// it is expected
const secretWord = "mom";
window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([secretWord]),
  })
);

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  function winTheGame() {
    const letter_m = screen.getByRole("button", { name: "m" });
    const letter_o = screen.getByRole("button", { name: "o" });
    fireEvent.click(letter_m);
    fireEvent.click(letter_o);
  }

  test("component should render successfully with right number of tries", () => {
    const initialNumOfTries = new RegExp(/10/i);
    expect(screen.getByText(/remaining tries/i)).toBeVisible();
    expect(screen.getByText(initialNumOfTries)).toBeVisible();
  });

  test("clicking letter not in secret word decreases num of tries", () => {
    const numOfTriesAfterWrongLetter = new RegExp(/9/i);
    const wrongLetter = screen.getByRole("button", { name: "z" });

    expect(wrongLetter).toBeVisible();
    fireEvent.click(wrongLetter);
    expect(screen.getByText(numOfTriesAfterWrongLetter)).toBeVisible();
  });

  test("clicking one of secret letters is revealed in the empty slots", () => {
    const button_m = screen.getByRole("button", { name: "m" });
    fireEvent.click(button_m);
    const secretLettersDivEl = document.getElementsByClassName(
      "wordBox"
    )[0] as HTMLElement;
    const revealedMs = within(secretLettersDivEl).getAllByText("m");
    expect(revealedMs).toHaveLength(2);
  });

  test("wining the game should display the expected status", () => {
    expect(screen.getByText(/in progress/i)).toBeVisible();
    winTheGame();
    expect(screen.getByText(/you won/i)).toBeVisible();
  });

  test("winning the game should disable the alphabet", () => {
    winTheGame();
    const alphabetNotDisabled = screen
      .queryAllByRole("button")
      .some((letterBtn) => !letterBtn.getAttributeNames().includes("disabled"));
    expect(alphabetNotDisabled).toBeFalsy();
  });
});
