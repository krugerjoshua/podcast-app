import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import ShowPage from "./pages/ShowPage";

function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <header className="flex items-center justify-between bg-surface-base p-4">
        <h1 className="text-2xl font-semibold text-text-primary">CueThePod</h1>
        <button
          onClick={toggle}
          aria-pressed={theme === "dark"}
          className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </header>

      <main className="min-h-screen bg-surface-base">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:id" element={<ShowPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
