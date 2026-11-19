import { GENRES } from "../constants/genres";
import { SORT_OPTIONS } from "../utils/filterAndSort";

const field =
    "rounded-lg border border-muted/40 bg-raised px-3 py-2 text-fg focus-visible:outline-2 focus-visible:outline-accent";

export default function Controls({
    query,
    setQuery,
    genreId,
    setGenreId,
    sort,
    setSort,
}) {
    return (
        <div className="flex flex-wrap gap-4 p-4">
            <label className="flex flex-col gap-1 text-sm">
                Search shows
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title"
                    className={field}
                />
            </label>

            <label className="flex flex-col gap-1 text-sm">
                Genre
                <select
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                    className={field}
                >
                    <option value="all">All genres</option>
                    {Object.entries(GENRES).map(([id, title]) => (
                        <option key={id} value={id}>
                            {title}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
                Sort by
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={field}
                >
                    {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}
