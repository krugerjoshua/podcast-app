import { Link } from "react-router-dom";
import { useListeningHistory } from "../context/HistoryContext";
import { formatDateTime } from "../utils/formatDate";

export default function HistoryPage() {
    const { history, reset } = useListeningHistory();

    function handleReset() {
        if (
            window.confirm(
                "Reset your listening history? This cannot be undone.",
            )
        ) {
            reset();
        }
    }

    const recent = [...history].reverse();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Listening history</h1>

            {history.length === 0 ? (
                <p className="mt-4 text-muted">
                    Nothing here yet. Episodes appear once you listen to them
                    all the way through.{" "}
                    <Link to="/" className="text-accent underline">
                        Browse shows
                    </Link>
                </p>
            ) : (
                <>
                    <button
                        onClick={handleReset}
                        className="mt-4 rounded-full border border-fg px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        Reset listening history
                    </button>

                    <ul className="mt-4 flex flex-col gap-3">
                        {recent.map((ep) => (
                            <li
                                key={ep.id}
                                className="rounded-2xl bg-raised p-3"
                            >
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
                </>
            )}
        </div>
    );
}
