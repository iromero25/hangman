import ReactDOM from "react-dom/client";

import App from "./App";
import { CharsContextProvider } from "./Context";
import "./index.css";

// Todo: Add Suspense
// Todo: try running this in production mode
// how to use a production ready environment??
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <CharsContextProvider>
    <App />
  </CharsContextProvider>

  // </React.StrictMode>
);
