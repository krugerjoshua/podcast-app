import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useShows } from "../hooks/useShows";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";
import Controls from "../components/Controls";
import Carousel from "../components/Carousel";
import { PlayIcon } from "../components/Icons";
import { filterAndSort, SORT_OPTIONS } from "../utils/filterAndSort";
import { formatDate } from "../utils/formatDate";
import { shuffle } from "../utils/shuffle";

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
    const picks = useMemo(() => shuffle(shows).slice(0, 10), [shows]);
    const featured = useMemo(() => {
        if (shows.length === 0) return null;
        return [...shows].sort(
            (a, b) => new Date(b.updated) - new Date(a.updated),
        )[0];
    }, [shows]);

    const browsing = query === "" && genreId === "all";

    if (status === "loading") return <Loading label="Loading shows..." />;
    if (status === "error")
        return (
            <p role="alert" className="p-6">
                {error}
            </p>
        );

    return (
        <div>
            {browsing && featured && (
                <section className="px-4 pt-2">
                    <div className="mb-2 flex items-center gap-2 px-1">
                        <span className="grid size-7 place-items-center rounded-full bg-raised text-[10px] font-semibold">
                            C
                        </span>
                        <div className="min-w-0">
                            <p className="text-[11px] text-muted">
                                New release
                            </p>
                            <p className="truncate text-sm font-semibold">
                                {featured.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-3xl bg-player p-4 text-player-fg shadow-lg shadow-black/10">
                        <img
                            src={featured.image}
                            alt=""
                            className="size-20 shrink-0 rounded-2xl object-cover sm:size-24"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-player-fg/60">
                                Featured
                            </p>
                            <h2 className="mt-1 line-clamp-2 text-lg font-bold leading-tight">
                                {featured.title}
                            </h2>
                            <p className="mt-1 text-xs text-player-fg/60">
                                Updated {formatDate(featured.updated)}
                            </p>
                        </div>
                        <Link
                            to={`/show/${featured.id}`}
                            aria-label={`Open ${featured.title}`}
                            className="grid size-11 shrink-0 place-items-center rounded-full bg-player-fg text-player transition active:scale-95"
                        >
                            <PlayIcon className="size-4" />
                        </Link>
                    </div>
                </section>
            )}

            {browsing && picks.length > 0 && (
                <Carousel shows={picks} title="On Repeat" />
            )}

            <section className="px-4 pt-6">
                <div className="flex items-end justify-between gap-3">
                    <h2 className="text-lg font-semibold">Picked For You</h2>
                    <Link
                        to="/collections"
                        className="text-xs font-medium text-muted underline-offset-4 hover:underline"
                    >
                        Collections
                    </Link>
                </div>

                <Controls
                    query={query}
                    setQuery={(v) => update("q", v, "")}
                    genreId={genreId}
                    setGenreId={(v) => update("genre", v, "all")}
                    sort={sort}
                    setSort={(v) => update("sort", v, "title-asc")}
                />

                <p role="status" className="mt-3 text-xs text-muted">
                    Showing {visible.length} of {shows.length} shows
                </p>

                {visible.length === 0 ? (
                    <p className="mt-4 rounded-3xl bg-raised p-4 text-sm text-muted">
                        No shows match your search. Try a different title or
                        collection.
                    </p>
                ) : (
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {visible.map((show) => (
                            <ShowCard key={show.id} show={show} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
