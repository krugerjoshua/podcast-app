import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useShows } from "../hooks/useShows";
import { GENRE_SHORT, GENRES } from "../constants/genres";
import Loading from "../components/Loading";

export default function CollectionsPage() {
    const { shows, status, error } = useShows();

    const collections = useMemo(
        () =>
            Object.entries(GENRES)
                .map(([id, title]) => {
                    const list = shows.filter((show) =>
                        show.genres.includes(Number(id)),
                    );
                    return {
                        id,
                        title,
                        shortTitle: GENRE_SHORT[id] ?? title,
                        count: list.length,
                        image: list[0]?.image,
                    };
                })
                .filter((collection) => collection.count > 0)
                .sort((a, b) => b.count - a.count),
        [shows],
    );

    if (status === "loading") return <Loading label="Loading collections..." />;
    if (status === "error")
        return (
            <p role="alert" className="p-6">
                {error}
            </p>
        );

    return (
        <div className="px-4 pt-2">
            <div>
                <h2 className="text-xl font-bold tracking-tight">Collections</h2>
                <p className="mt-0.5 text-xs text-muted">
                    {collections.length} collections · {shows.length} shows
                </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {collections.map((collection) => (
                    <Link
                        key={collection.id}
                        to={`/?genre=${collection.id}`}
                        title={collection.title}
                        aria-label={`${collection.title}, ${collection.count} shows`}
                        className="group rounded-3xl bg-raised p-3 transition duration-150 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={collection.image}
                                alt=""
                                loading="lazy"
                                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                        </div>
                        <h3 className="mt-2.5 line-clamp-2 font-semibold leading-tight">
                            {collection.shortTitle}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted">
                            {collection.count}{" "}
                            {collection.count === 1 ? "show" : "shows"}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
