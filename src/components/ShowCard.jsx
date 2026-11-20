import { Link } from "react-router-dom";
import { GENRE_SHORT, GENRES } from "../constants/genres";

export default function ShowCard({ show }) {
    const genreId = show.genres[0];

    return (
        <article className="relative rounded-3xl bg-raised p-3 transition duration-150 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-accent">
            <div className="relative overflow-hidden rounded-2xl">
                <img
                    src={show.image}
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {GENRE_SHORT[genreId] ?? GENRES[genreId] ?? "Other"}
                </span>
            </div>
            <h2 className="mt-2.5 line-clamp-2 font-semibold leading-tight break-words">
                <Link
                    to={`/show/${show.id}`}
                    className="after:absolute after:inset-0 focus:outline-none"
                >
                    {show.title}
                </Link>
            </h2>
            <p className="mt-0.5 text-xs text-muted">
                {show.seasons} {show.seasons === 1 ? "season" : "seasons"}
            </p>
        </article>
    );
}
