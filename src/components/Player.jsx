import { usePlayer } from "../context/PlayerContext";
import { formatTime } from "../utils/formatTime";

export default function Player() {
    const { current, isPlaying, currentTime, duration, toggle, seek } =
        usePlayer();

    return (
        <section
            aria-label="Audio player"
            className="fixed inset-x-0 bottom-0 z-10 flex items-center gap-4 bg-player p-3 text-player-fg"
        >
            {current ? (
                <>
                    <img
                        src={current.image}
                        alt=""
                        className="size-14 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                            {current.title}
                        </p>
                        <p className="truncate text-sm opacity-70">
                            {current.showTitle} · {current.seasonTitle}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-xs">
                            <span>{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                aria-label="Seek"
                                min={0}
                                max={duration || 0}
                                step={1}
                                value={currentTime}
                                onChange={(e) => seek(Number(e.target.value))}
                                className="h-1 flex-1 accent-accent"
                            />
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <button
                        onClick={toggle}
                        className="rounded-full bg-player-fg px-4 py-2 font-semibold text-player focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </>
            ) : (
                <p className="text-sm opacity-70">
                    Select an episode to start listening.
                </p>
            )}
        </section>
    );
}
