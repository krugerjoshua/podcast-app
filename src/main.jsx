import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { HistoryProvider } from "./context/HistoryContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <HistoryProvider>
            <PlayerProvider>
                <FavouritesProvider>
                    <App />
                </FavouritesProvider>
            </PlayerProvider>
        </HistoryProvider>
    </BrowserRouter>,
);
