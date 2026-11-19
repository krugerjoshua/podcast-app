import { Link, useOutletContext, useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export default function SeasonPage() {
    const { show } = useOutletContext();
    const { id, season: seasonParam } = useParams();
    const { play, current, isPlaying } = usePlayer();

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
                    {season.episodes.map((ep) => {
                        const episodeId = `${show.id}-${season.season}-${ep.episode}`;
                        const isCurrent = current?.id === episodeId;
                        return (
                            <li
                                key={ep.episode}
                                className="flex items-start gap-3 rounded-2xl bg-raised p-3"
                            >
                                <button
                                    onClick={() =>
                                        play({
                                            id: episodeId,
                                            title: ep.title,
                                            file: ep.file,
                                            image: season.image,
                                            showTitle: show.title,
                                            seasonTitle: season.title,
                                        })
                                    }
                                    aria-label={`${isCurrent && isPlaying ? "Pause" : "Play"} ${ep.title}`}
                                    className="shrink-0 rounded-full bg-fg px-3 py-1 text-sm font-semibold text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                >
                                    {isCurrent && isPlaying ? "Pause" : "Play"}
                                </button>
                                <div className="min-w-0">
                                    <p className="font-semibold">
                                        {ep.episode}. {ep.title}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                                        {ep.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
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
