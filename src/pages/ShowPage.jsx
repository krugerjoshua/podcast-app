import { Link, useOutletContext, useParams } from "react-router-dom";

export default function ShowPage() {
    const { show } = useOutletContext();
    const { id } = useParams();

    return (
        <div className="px-4 pt-2">
            <Link
                to="/"
                className="inline-flex items-center rounded-full bg-raised px-3 py-1.5 text-xs font-medium text-muted transition hover:text-fg"
            >
                Back to all shows
            </Link>
            <h1 className="mt-4 text-2xl font-bold tracking-tight break-words">
                {show.title}
            </h1>
            <p className="mt-2 max-w-prose text-sm text-muted">
                {show.description}
            </p>

            <h2 className="mt-6 text-lg font-semibold">Seasons</h2>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {show.seasons.map((season) => (
                    <li
                        key={season.season}
                        className="relative rounded-3xl bg-raised p-3 transition hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-accent"
                    >
                        <img
                            src={season.image}
                            alt=""
                            className="aspect-square w-full rounded-2xl object-cover"
                        />
                        <p className="mt-2.5 line-clamp-2 font-semibold leading-tight">
                            <Link
                                to={`/show/${id}/season/${season.season}`}
                                className="after:absolute after:inset-0 focus:outline-none"
                            >
                                {season.title}
                            </Link>
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                            {season.episodes.length} episodes
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
