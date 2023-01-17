import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// how to use a production ready environment??
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
