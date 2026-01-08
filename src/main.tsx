// Бібліотеки
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Стилі
import "./index.css";

// Компоненти
import App from "./components/App/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
