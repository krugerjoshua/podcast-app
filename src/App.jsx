import { useTheme } from "./hooks/useTheme";
import { useShows } from "./hooks/useShows";
import ShowCard from "./components/ShowCard";

function App() {
  const { theme, toggle } = useTheme();
  const { shows, status, error } = useShows();

  return (
    <>
      <header className="app-header">
        <h1>CueThePod</h1>
        <button onClick={toggle} aria-pressed={theme === "dark"}>
          {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </header>

      <main>
        {status === "loading" && <p role="status">Loading shows...</p>}
        {status === "error" && <p role="alert">{error}</p>}
        {status === "success" && (
          <div className="show-grid">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;