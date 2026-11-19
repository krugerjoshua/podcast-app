import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import ShowPage from "./pages/ShowPage";
import ShowLayout from "./pages/ShowLayout";
import SeasonPage from "./pages/SeasonPage";
import Player from "./components/Player";

function App() {
    const { theme, toggle } = useTheme();

    return (
        <>
            <header className="flex items-center justify-between bg-surface-base p-4">
                <h1 className="text-2xl font-semibold text-text-primary">
                    CueThePod
                </h1>
                <button
                    onClick={toggle}
                    aria-pressed={theme === "dark"}
                    className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                    {theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"}
                </button>
            </header>

            <main className="pb-28 min-h-screen bg-surface-base">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/show/:id" element={<ShowLayout />}>
                        <Route index element={<ShowPage />} />
                        <Route path="season/:season" element={<SeasonPage />} />
                    </Route>
                </Routes>
            </main>
            <Player />
        </>
    );
}

export default App;
