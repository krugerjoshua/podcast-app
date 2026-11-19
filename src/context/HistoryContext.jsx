import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const HistoryContext = createContext(null);
const KEY = "listening-history";
const POS_KEY = "episode-positions";

function load() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function loadPositions() {
    try {
        const raw = localStorage.getItem(POS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

export function HistoryProvider({ children }) {
    const [history, setHistory] = useState(load);
    const [positions, setPositions] = useState(loadPositions);

    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify(history));
        } catch {
            // storage unavailable; keep working in memory
        }
    }, [history]);

    useEffect(() => {
        try {
            localStorage.setItem(POS_KEY, JSON.stringify(positions));
        } catch {
            // storage unavailable; keep working in memory
        }
    }, [positions]);

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

    const savePosition = useCallback((id, seconds) => {
        setPositions((prev) =>
            prev[id] === seconds ? prev : { ...prev, [id]: seconds },
        );
    }, []);

    const clearPosition = useCallback((id) => {
        setPositions((prev) => {
            if (!(id in prev)) return prev;
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }, []);

    const getPosition = useCallback((id) => positions[id] ?? 0, [positions]);

    const reset = useCallback(() => {
        setHistory([]);
        setPositions({});
    }, []);

    return (
        <HistoryContext.Provider
            value={{
                history,
                positions,
                markListened,
                hasListened,
                reset,
                savePosition,
                clearPosition,
                getPosition,
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useListeningHistory() {
    return useContext(HistoryContext);
}
