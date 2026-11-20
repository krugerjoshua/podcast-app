import { Link } from "react-router-dom";
import { useListeningHistory } from "../context/HistoryContext";
import { formatDateTime } from "../utils/formatDate";

export default function HistoryPage() {
    const { history, positions, reset } = useListeningHistory();
    const hasProgress =
        history.length > 0 || Object.keys(positions).length > 0;

    function handleReset() {
        if (
            window.confirm(
                "Reset your listening history and saved positions? This cannot be undone.",
            )
        ) {
            reset();
        }
    }

    const recent = [...history].reverse();

    return (
        <div className="px-4 pt-2">
            <h1 className="text-xl font-bold tracking-tight">
                Listening history
            </h1>

            {hasProgress && (
                <button
                    onClick={handleReset}
                    className="mt-4 rounded-full bg-raised px-4 py-2 text-xs font-medium text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                    Reset listening history
                </button>
            )}

            {history.length === 0 ? (
                <p className="mt-4 rounded-3xl bg-raised p-4 text-sm text-muted">
                    Nothing here yet. Episodes appear once you listen to them
                    all the way through.{" "}
                    <Link to="/" className="text-accent underline">
                        Browse shows
                    </Link>
                </p>
            ) : (
                <ul className="mt-4 flex flex-col gap-3">
                    {recent.map((ep) => (
                        <li key={ep.id} className="rounded-3xl bg-raised p-3">
                            <p className="font-semibold">{ep.title}</p>
                            <p className="text-sm text-muted">
                                {ep.showTitle} · {ep.seasonTitle}
                            </p>
                            <p className="text-sm text-muted">
                                Finished {formatDateTime(ep.listenedAt)}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
