import { Link, useOutletContext, useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import FavouriteButton from "../components/FavouriteButton";
import { useListeningHistory } from "../context/HistoryContext";
import { formatTime } from "../utils/formatTime";

export default function SeasonPage() {
    const { show } = useOutletContext();
    const { id, season: seasonParam } = useParams();
    const { play, current, isPlaying } = usePlayer();
    const { hasListened, getPosition } = useListeningHistory();

    const season = show.seasons.find((s) => String(s.season) === seasonParam);

    if (!season) {
        return (
            <div className="px-4 pt-2">
                <p role="alert">That season doesn't exist.</p>
                <Link
                    to={`/show/${id}`}
                    className="mt-3 inline-flex rounded-full bg-raised px-3 py-1.5 text-xs font-medium text-muted hover:text-fg"
                >
                    Back to {show.title}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-w-0 basis-full px-4 pt-2 sm:basis-0 sm:flex-1">
            <Link
                to={`/show/${id}`}
                className="inline-flex items-center rounded-full bg-raised px-3 py-1.5 text-xs font-medium text-muted transition hover:text-fg"
            >
                Back to {show.title}
            </Link>

            <h1 className="mt-4 text-2xl font-bold tracking-tight break-words">
                {show.title}
            </h1>

            <nav aria-label="Seasons" className="mt-3">
                <ul className="flex flex-wrap gap-2">
                    {season.episodes.map((ep) => {
                        const episode = {
                            id: `${show.id}-${season.season}-${ep.episode}`,
                            title: ep.title,
                            file: ep.file,
                            image: season.image,
                            showId: show.id,
                            showTitle: show.title,
                            seasonNumber: season.season,
                            seasonTitle: season.title,
                            episodeNumber: ep.episode,
                            showUpdated: show.updated,
                        };
                        const isCurrent = current?.id === episode.id;
                        return (
                            <li
                                key={ep.episode}
                                className="flex flex-wrap items-start gap-3 rounded-3xl bg-raised p-3"
                            >
                                <button
                                    onClick={() => play(episode)}
                                    aria-label={`${isCurrent && isPlaying ? "Pause" : "Play"} ${ep.title}`}
                                    className="shrink-0 rounded-full bg-fg px-3 py-2 text-sm font-semibold text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                >
                                    {isCurrent && isPlaying ? "Pause" : "Play"}
                                </button>
                                <FavouriteButton episode={episode} />
                                <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
                                    <p className="font-semibold">
                                        {ep.episode}. {ep.title}
                                        {hasListened(episode.id) && (
                                            <span className="ml-2 rounded-full bg-surface px-2 py-0.5 text-xs font-normal text-muted">
                                                Listened
                                            </span>
                                        )}
                                    </p>
                                    {getPosition(episode.id) > 0 && (
                                        <p className="text-sm text-muted">
                                            Left off at{" "}
                                            {formatTime(
                                                getPosition(episode.id),
                                            )}
                                        </p>
                                    )}
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
                    <li
                        key={ep.episode}
                        className="flex flex-wrap items-start gap-3 rounded-3xl bg-raised p-3"
                    >
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
