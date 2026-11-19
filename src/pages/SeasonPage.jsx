import { Link, NavLink, useOutletContext, useParams } from "react-router-dom";

export default function SeasonPage() {
    const { show } = useOutletContext();
    const { id, season: seasonParam } = useParams();

    const season = show.seasons.find((s) => String(s.season) === seasonParam);

    if (!season) {
        return (
            <div className="p-4">
                <p role="alert">That season doesn't exist.</p>
                <Link to={`/show/${id}`} className="text-accent underline">
                    Back to {show.title}
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Link to={`/show/${id}`} className="text-accent underline">
                Back to {show.title}
            </Link>

            <h1 className="mt-4 text-2xl font-bold">{show.title}</h1>

            <nav aria-label="Seasons" className="mt-3">
                <ul className="flex flex-wrap gap-2">
                    {show.seasons.map((s) => (
                        <li key={s.season}>
                            <NavLink
                                to={`/show/${id}/season/${s.season}`}
                                className={({ isActive }) =>
                                    `block rounded-full px-3 py-1 text-sm ${
                                        isActive
                                            ? "bg-fg text-surface"
                                            : "bg-raised text-fg"
                                    }`
                                }
                            >
                                Season {s.season}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <h2 className="mt-6 text-lg font-semibold">
                {season.title} ({season.episodes.length} episodes)
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
                {season.episodes.map((ep) => (
                    <li key={ep.episode} className="rounded-2xl bg-raised p-3">
                        <p className="font-semibold">
                            {ep.episode}. {ep.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted">
                            {ep.description}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
