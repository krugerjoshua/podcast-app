import { useFavourites } from "../context/FavouritesContext";
import { HeartIcon } from "./Icons";

export default function FavouriteButton({ episode }) {
    const { isFavourite, toggle } = useFavourites();
    const active = isFavourite(episode.id);

    return (
        <button
            onClick={() => toggle(episode)}
            aria-pressed={active}
            aria-label={`${active ? "Remove from favourites" : "Add to favourites"}: ${episode.title}`}
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                    ? "border-accent bg-accent text-white"
                    : "border-black/10 bg-surface text-fg dark:border-white/15"
            }`}
        >
            <HeartIcon className="size-4" filled={active} />
        </button>
    );
}
