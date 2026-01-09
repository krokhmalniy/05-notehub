// Бібліотеки
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider  } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



// Стилі
import "./index.css";

// Компоненти
import App from "./components/App/App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
