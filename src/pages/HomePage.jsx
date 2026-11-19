import { useMemo } from "react";
import { useShows } from "../hooks/useShows";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";
import Controls from "../components/Controls";
import { filterAndSort, SORT_OPTIONS } from "../utils/filterAndSort";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
    const { shows, status, error } = useShows();
    const [params, setParams] = useSearchParams();
    const query = params.get("q") ?? "";
    const genreId = params.get("genre") ?? "all";
    const rawSort = params.get("sort");
    const sort = SORT_OPTIONS.some((o) => o.value === rawSort)
        ? rawSort
        : "title-asc";

    function update(key, value, fallback) {
        setParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                if (value === fallback) next.delete(key);
                else next.set(key, value);
                return next;
            },
            { replace: true },
        );
    }

    const visible = useMemo(
        () => filterAndSort(shows, { query, genreId, sort }),
        [shows, query, genreId, sort],
    );

    if (status === "loading") return <Loading label="Loading shows..." />;
    if (status === "error")
        return (
            <p role="alert" className="p-6">
                {error}
            </p>
        );

    return (
        <>
            <Controls
                query={query}
                setQuery={(v) => update("q", v, "")}
                genreId={genreId}
                setGenreId={(v) => update("genre", v, "all")}
                sort={sort}
                setSort={(v) => update("sort", v, "title-asc")}
            />

            <p role="status" className="px-4 text-sm text-muted">
                Showing {visible.length} of {shows.length} shows
            </p>

            {visible.length === 0 ? (
                <p className="p-4">
                    No shows match your search. Try a different title or genre.
                </p>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-4">
                    {visible.map((show) => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </div>
            )}
        </>
    );
}
