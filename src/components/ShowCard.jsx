import { Link } from "react-router-dom";
import { GENRES } from "../constants/genres";
import { formatDate } from "../utils/formatDate";

export default function ShowCard({ show }) {
    return (
        <article className="relative rounded-2xl bg-raised p-3 transition hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-accent">
            <img
                src={show.image}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover"
            />
            <h2 className="mt-2 font-semibold break-words">
                <Link
                    to={`/show/${show.id}`}
                    className="after:absolute after:inset-0 focus:outline-none"
                >
                    {show.title}
                </Link>
            </h2>
            <p className="my-1 text-sm text-muted">
                {show.seasons} {show.seasons === 1 ? "season" : "seasons"}
            </p>
            <ul className="flex flex-wrap gap-1">
                {show.genres.map((id) => (
                    <li
                        key={id}
                        className="rounded-full bg-surface px-2 py-0.5 text-xs"
                    >
                        {GENRES[id] ?? "Other"}
                    </li>
                ))}
            </ul>
            <p className="mt-1 text-sm text-muted">
                Updated {formatDate(show.updated)}
            </p>
        </article>
    );
}
