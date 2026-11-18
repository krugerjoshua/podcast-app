import { GENRES } from "../constants/genres";
import { formatDate } from "../utils/formatDate";

export default function ShowCard({ show }) {
    return (
        <article className="show-card">
            <img src={show.image} alt="" loading="lazy" />
            <h2>{show.title}</h2>
            <p className="show-card__meta">
                {show.seasons} {show.seasons === 1 ? "season" : "seasons"}
            </p>
            <ul className="show-card__genres">
                {show.genres.map((id) => (
                    <li key={id}>{GENRES[id] ?? "Other"}</li>
                ))}
            </ul>
            <p className="show-card__meta">
                Updated {formatDate(show.updated)}
            </p>
        </article>
    );
}
