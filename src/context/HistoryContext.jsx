import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const HistoryContext = createContext(null);
const KEY = "listening-history";

function load() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function HistoryProvider({ children }) {
    const [history, setHistory] = useState(load);

    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify(history));
        } catch {
            // storage unavailable; keep working in memory
        }
    }, [history]);

    const markListened = useCallback((episode) => {
        setHistory((prev) => [
            ...prev.filter((h) => h.id !== episode.id),
            { ...episode, listenedAt: new Date().toISOString() },
        ]);
    }, []);

    const hasListened = useCallback(
        (id) => history.some((h) => h.id === id),
        [history],
    );

    const reset = useCallback(() => setHistory([]), []);

    return (
        <HistoryContext.Provider
            value={{ history, markListened, hasListened, reset }}
        >
            {children}
        </HistoryContext.Provider>
    );
}

export function useListeningHistory() {
    return useContext(HistoryContext);
}
