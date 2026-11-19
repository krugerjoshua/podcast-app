import { Link, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import ShowPage from "./pages/ShowPage";
import ShowLayout from "./pages/ShowLayout";
import SeasonPage from "./pages/SeasonPage";
import Player from "./components/Player";
import FavouritesPage from "./pages/FavouritesPage";
import { useFavourites } from "./context/FavouritesContext";
import HistoryPage from "./pages/HistoryPage";

function App() {
    const { theme, toggle } = useTheme();
    const { favourites } = useFavourites();

    return (
        <>
            <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 p-4">
                <Link to="/" className="text-xl font-bold">
                    CueThePod
                </Link>
                <nav
                    aria-label="Main"
                    className="flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                    <Link to="/favourites" className="underline">
                        Favourites ({favourites.length})
                    </Link>
                    <Link to="/history" className="underline">
                        History
                    </Link>
                    <button
                        onClick={toggle}
                        aria-pressed={theme === "dark"}
                        className="rounded-full border border-fg px-3 py-1 text-sm"
                    >
                        {theme === "dark"
                            ? "Switch to light mode"
                            : "Switch to dark mode"}
                    </button>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-surface"
                    >
                        Skip to content
                    </a>
                </nav>
            </header>

            <main id="main" className="pb-36 sm:pb-28">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/show/:id" element={<ShowLayout />}>
                        <Route index element={<ShowPage />} />
                        <Route path="season/:season" element={<SeasonPage />} />
                    </Route>
                    <Route path="/favourites" element={<FavouritesPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route
                        path="*"
                        element={
                            <p className="p-6">
                                Page not found.{" "}
                                <Link to="/" className="text-accent underline">
                                    Back to all shows
                                </Link>
                            </p>
                        }
                    />
                </Routes>
            </main>
            <Player />
        </>
    );
}

export default App;
