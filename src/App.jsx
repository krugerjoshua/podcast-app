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
import CollectionsPage from "./pages/CollectionsPage";
import BottomNav from "./components/BottomNav";
import { BellIcon, MoonIcon, SunIcon } from "./components/Icons";

function App() {
    const { theme, toggle } = useTheme();
    const { favourites } = useFavourites();

    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-40 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-surface"
            >
                Skip to content
            </a>

            <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-5 pb-2 pt-6">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                        CueThePod
                    </p>
                    <h1 className="truncate text-2xl font-bold tracking-tight">
                        My Sounds Cued...
                    </h1>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        onClick={toggle}
                        aria-pressed={theme === "dark"}
                        aria-label={
                            theme === "dark"
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        className="grid size-10 place-items-center rounded-full bg-raised text-fg transition active:scale-95"
                    >
                        {theme === "dark" ? (
                            <SunIcon className="size-4" />
                        ) : (
                            <MoonIcon className="size-4" />
                        )}
                    </button>
                    <Link
                        to="/history"
                        aria-label="Listening history"
                        className="grid size-10 place-items-center rounded-full bg-raised text-fg transition active:scale-95"
                    >
                        <BellIcon className="size-4" />
                    </Link>
                    <Link
                        to="/favourites"
                        aria-label={`Favourites (${favourites.length})`}
                        className="grid size-10 place-items-center rounded-full bg-accent text-sm font-semibold text-white transition active:scale-95"
                    >
                        CT
                    </Link>
                </div>
            </header>

            <main
                id="main"
                className="mx-auto w-full max-w-3xl pb-[calc(10rem+env(safe-area-inset-bottom))]"
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
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
            <BottomNav />
        </>
    );
}

export default App;
