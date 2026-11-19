import { useMemo, useState } from "react";
import { useShows } from "../hooks/useShows";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";
import Controls from "../components/Controls";
import { filterAndSort } from "../utils/filterAndSort";

export default function HomePage() {
    const { shows, status, error } = useShows();
    const [query, setQuery] = useState("");
    const [genreId, setGenreId] = useState("all");
    const [sort, setSort] = useState("title-asc"); // default A-Z (P3.5)

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
                setQuery={setQuery}
                genreId={genreId}
                setGenreId={setGenreId}
                sort={sort}
                setSort={setSort}
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
