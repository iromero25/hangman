import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

window.fetch = jest.fn().mockResolvedValue(["butterfly"]);

describe("App component", () => {
  test("component should render successfully", () => {
    render(<App />);
  });
});
