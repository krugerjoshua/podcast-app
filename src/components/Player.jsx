import { usePlayer } from "../context/PlayerContext";
import { formatTime } from "../utils/formatTime";
import { PauseIcon, PlayIcon } from "./Icons";

export default function Player() {
    const { current, isPlaying, currentTime, duration, toggle, seek } =
        usePlayer();

    if (!current) return null;

    return (
        <section
            aria-label="Audio player"
            className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-20 px-3"
        >
            <div className="mx-auto w-full max-w-3xl rounded-3xl bg-player p-3 text-player-fg shadow-xl shadow-black/20">
                <div className="flex items-center gap-3">
                    <img
                        src={current.image}
                        alt=""
                        className="size-12 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                            {current.title}
                        </p>
                        <p className="truncate text-xs opacity-60">
                            {current.showTitle} · {current.seasonTitle}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 text-[10px] opacity-70">
                            <span className="w-7 text-right tabular-nums">
                                {formatTime(currentTime)}
                            </span>
                            <input
                                type="range"
                                aria-label="Seek"
                                min={0}
                                max={duration || 0}
                                step={1}
                                value={currentTime}
                                onChange={(e) => seek(Number(e.target.value))}
                                className="h-1 flex-1 cursor-pointer"
                            />
                            <span className="w-7 tabular-nums">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={toggle}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-player-fg text-player transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        {isPlaying ? (
                            <PauseIcon className="size-4" />
                        ) : (
                            <PlayIcon className="size-4" />
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
