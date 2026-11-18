import { useTheme } from "./hooks/useTheme";
import "./styles/tokens.css";

function App() {
    const { theme, toggle } = useTheme();
    return (
        <button onClick={toggle} aria-pressed={theme === "dark"}>
            {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </button>
    );
}

export default App;
