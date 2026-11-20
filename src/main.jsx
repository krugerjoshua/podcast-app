import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { HistoryProvider } from "./context/HistoryContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <ErrorBoundary>
        <BrowserRouter>
            <HistoryProvider>
                <PlayerProvider>
                    <FavouritesProvider>
                        <App />
                    </FavouritesProvider>
                </PlayerProvider>
            </HistoryProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);
