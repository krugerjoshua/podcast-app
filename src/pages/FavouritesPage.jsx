import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { usePlayer } from "../context/PlayerContext";
import { formatDateTime } from "../utils/formatDate";
import { useListeningHistory } from "../context/HistoryContext";

const SORTS = {
    "title-asc": {
        label: "Title A-Z",
        fn: (a, b) => a.title.localeCompare(b.title),
    },
    "title-desc": {
        label: "Title Z-A",
        fn: (a, b) => b.title.localeCompare(a.title),
    },
    "updated-desc": {
        label: "Most recently updated",
        fn: (a, b) => new Date(b.showUpdated) - new Date(a.showUpdated),
    },
    "updated-asc": {
        label: "Furthest back updated",
        fn: (a, b) => new Date(a.showUpdated) - new Date(b.showUpdated),
    },
};

function groupBySeason(list) {
    const groups = new Map();
    for (const ep of list) {
        const key = `${ep.showId}-${ep.seasonNumber}`;
        if (!groups.has(key)) groups.set(key, { key, ...ep, episodes: [] });
        groups.get(key).episodes.push(ep);
    }
    return [...groups.values()];
}

export default function FavouritesPage() {
    const { favourites, toggle } = useFavourites();
    const { play, current, isPlaying } = usePlayer();
    const [sort, setSort] = useState("title-asc");
    const { hasListened } = useListeningHistory();

    const groups = useMemo(
        () => groupBySeason([...favourites].sort(SORTS[sort].fn)),
        [favourites, sort],
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Favourites</h1>

            {favourites.length === 0 ? (
                <p className="mt-4 text-muted">
                    You have no favourites yet. Open a season and choose
                    Favourite on an episode.{" "}
                    <Link to="/" className="text-accent underline">
                        Browse shows
                    </Link>
                </p>
            ) : (
                <>
                    <label className="mt-4 flex w-fit flex-col gap-1 text-sm">
                        Sort by
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-lg border border-muted/40 bg-raised px-3 py-2 text-fg focus-visible:outline-2 focus-visible:outline-accent"
                        >
                            {Object.entries(SORTS).map(([value, { label }]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>

                    {groups.map((group) => (
                        <section
                            key={group.key}
                            className="mt-6"
                            aria-labelledby={`g-${group.key}`}
                        >
                            <h2
                                id={`g-${group.key}`}
                                className="text-lg font-semibold"
                            >
                                {group.showTitle}{" "}
                                <span className="text-muted">
                                    · {group.seasonTitle}
                                </span>
                            </h2>
                            <ul className="mt-2 flex flex-col gap-3">
                                {group.episodes.map((ep) => {
                                    const isCurrent = current?.id === ep.id;
                                    return (
                                        <li
                                            key={ep.id}
                                            className="flex flex-wrap items-center gap-3 rounded-2xl bg-raised p-3"
                                        >
                                            <button
                                                onClick={() => play(ep)}
                                                aria-label={`${isCurrent && isPlaying ? "Pause" : "Play"} ${ep.title}`}
                                                className="rounded-full bg-fg px-3 py-2 text-sm font-semibold text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                            >
                                                {isCurrent && isPlaying
                                                    ? "Pause"
                                                    : "Play"}
                                            </button>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold">
                                                    {ep.episode}. {ep.title}
                                                    {hasListened(
                                                        ep.id,
                                                    ) && (
                                                        <span className="ml-2 rounded-full bg-surface px-2 py-0.5 text-xs font-normal text-muted">
                                                            Listened
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-muted">
                                                    Added{" "}
                                                    {formatDateTime(ep.addedAt)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => toggle(ep)}
                                                aria-label={`Remove from favourites: ${ep.title}`}
                                                className="rounded-full border border-fg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </>
            )}
        </div>
    );
}
