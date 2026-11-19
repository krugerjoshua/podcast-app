import { useFavourites } from "../context/FavouritesContext";

export default function FavouriteButton({ episode }) {
    const { isFavourite, toggle } = useFavourites();
    const active = isFavourite(episode.id);

    return (
        <button
            onClick={() => toggle(episode)}
            aria-pressed={active}
            aria-label={`${active ? "Remove from favourites" : "Add to favourites"}: ${episode.title}`}
            className="shrink-0 rounded-full border border-fg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            {active ? "Favourited" : "Favourite"}
        </button>
    );
}
