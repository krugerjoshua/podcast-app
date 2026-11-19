export const SORT_OPTIONS = [
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
    { value: "updated-desc", label: "Newest updated" },
    { value: "updated-asc", label: "Oldest updated" },
];

const sorters = {
    "title-asc": (a, b) => a.title.localeCompare(b.title),
    "title-desc": (a, b) => b.title.localeCompare(a.title),
    "updated-desc": (a, b) => new Date(b.updated) - new Date(a.updated),
    "updated-asc": (a, b) => new Date(a.updated) - new Date(b.updated),
};

export function filterAndSort(shows, { query, genreId, sort }) {
    const q = query.trim().toLowerCase();

    return shows
        .filter((s) => !q || s.title.toLowerCase().includes(q))
        .filter((s) => genreId === "all" || s.genres.includes(Number(genreId)))
        .sort(sorters[sort]);
}
