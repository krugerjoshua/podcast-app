import { Link, useOutletContext, useParams } from "react-router-dom";

export default function ShowPage() {
    const { show } = useOutletContext();
    const { id } = useParams();

    return (
        <div className="p-4">
            <Link to="/" className="text-accent underline">
                Back to all shows
            </Link>
            <h1 className="mt-4 text-2xl font-bold break-words">{show.title}</h1>
            <p className="mt-2 max-w-prose text-muted">{show.description}</p>

            <h2 className="mt-6 text-lg font-semibold">Seasons</h2>
            <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
                {show.seasons.map((season) => (
                    <li
                        key={season.season}
                        className="relative rounded-2xl bg-raised p-3 focus-within:ring-2 focus-within:ring-accent"
                    >
                        <img
                            src={season.image}
                            alt=""
                            className="aspect-square w-full rounded-lg object-cover"
                        />
                        <p className="mt-2 font-semibold">
                            <Link
                                to={`/show/${id}/season/${season.season}`}
                                className="after:absolute after:inset-0 focus:outline-none"
                            >
                                {season.title}
                            </Link>
                        </p>
                        <p className="text-sm text-muted">
                            {season.episodes.length} episodes
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
