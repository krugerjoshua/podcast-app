import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const FavouritesContext = createContext(null);
const KEY = "favourites";

function load() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState(load);

    useEffect(() => {
        try {
            localStorage.setItem(KEY, JSON.stringify(favourites));
        } catch {
            // storage full or blocked; the app keeps working in memory
        }
    }, [favourites]);

    const toggle = useCallback((episode) => {
        setFavourites((prev) =>
            prev.some((f) => f.id === episode.id)
                ? prev.filter((f) => f.id !== episode.id)
                : [...prev, { ...episode, addedAt: new Date().toISOString() }],
        );
    }, []);

    const isFavourite = useCallback(
        (id) => favourites.some((f) => f.id === id),
        [favourites],
    );

    return (
        <FavouritesContext.Provider value={{ favourites, toggle, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
}

export function useFavourites() {
    return useContext(FavouritesContext);
}
