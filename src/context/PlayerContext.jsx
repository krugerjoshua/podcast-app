import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useListeningHistory } from "./HistoryContext";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
    const audioRef = useRef(null);
    const [current, setCurrent] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { markListened } = useListeningHistory();

    // load and start a new episode whenever the selection changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !current) return;
        audio.src = current.file;
        audio.play().catch(() => setIsPlaying(false));
    }, [current]);

    // P3.36: warn before closing the tab while audio is playing
    useEffect(() => {
        if (!isPlaying) return;
        const warn = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [isPlaying]);

    const play = useCallback(
        (episode) => {
            const audio = audioRef.current;
            if (current?.id === episode.id) {
                audio.paused ? audio.play() : audio.pause();
            } else {
                setCurrent(episode);
            }
        },
        [current],
    );

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!current) return;
        audio.paused ? audio.play() : audio.pause();
    }, [current]);

    const seek = useCallback((time) => {
        audioRef.current.currentTime = time;
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                current,
                isPlaying,
                currentTime,
                duration,
                play,
                toggle,
                seek,
            }}
        >
            {children}
            <audio
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) =>
                    setCurrentTime(e.currentTarget.currentTime)
                }
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={() => {
                    setIsPlaying(false);
                    if (current) markListened(current);
                }}
                onError={() => setIsPlaying(false)}
            />
        </PlayerContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlayer() {
    return useContext(PlayerContext);
}
