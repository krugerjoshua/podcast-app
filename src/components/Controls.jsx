import { GENRES, GENRE_SHORT } from "../constants/genres";
import { SORT_OPTIONS } from "../utils/filterAndSort";
import { SearchIcon } from "./Icons";

function Chip({ active, children, ...props }) {
    return (
        <button
            type="button"
            aria-pressed={active}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition active:scale-95 ${
                active
                    ? "bg-fg text-surface"
                    : "bg-raised text-muted hover:text-fg"
            }`}
            {...props}
        >
            {children}
        </button>
    );
}

export default function Controls({
    query,
    setQuery,
    genreId,
    setGenreId,
    sort,
    setSort,
}) {
    return (
        <div className="mt-3 space-y-3">
            <label className="relative block">
                <span className="sr-only">Search shows</span>
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search podcasts"
                    className="w-full rounded-full border border-black/5 bg-raised py-3 pl-11 pr-4 text-sm text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-white/10"
                />
            </label>

            <div
                role="group"
                aria-label="Filter by collection"
                className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
            >
                <Chip
                    active={genreId === "all"}
                    onClick={() => setGenreId("all")}
                >
                    All
                </Chip>
                {Object.entries(GENRES).map(([id, title]) => (
                    <Chip
                        key={id}
                        active={genreId === id}
                        onClick={() => setGenreId(id)}
                    >
                        {GENRE_SHORT[id] ?? title}
                    </Chip>
                ))}
            </div>

            <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted">Browse by collection</p>
                <label>
                    <span className="sr-only">Sort by</span>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-full border border-black/5 bg-raised px-3 py-2 text-xs font-medium text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-white/10"
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
