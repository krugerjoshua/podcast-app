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
    const { markListened, savePosition, clearPosition, getPosition } =
        useListeningHistory();
    const resumeAtRef = useRef(0);
    const lastSavedRef = useRef(0);

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
                if (current && audio.currentTime >= 1) {
                    savePosition(
                        current.id,
                        Math.floor(audio.currentTime),
                    ); // keep the episode we are leaving
                }
                resumeAtRef.current = getPosition(episode.id);
                lastSavedRef.current = resumeAtRef.current;
                setCurrent(episode);
            }
        },
        [current, savePosition, getPosition],
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
                onPause={(e) => {
                    setIsPlaying(false);
                    const t = e.currentTarget.currentTime;
                    if (current && t >= 1 && !e.currentTarget.ended)
                        savePosition(current.id, Math.floor(t));
                }}
                onTimeUpdate={(e) => {
                    const t = e.currentTarget.currentTime;
                    setCurrentTime(t);
                    if (
                        current &&
                        t >= 1 &&
                        Math.abs(t - lastSavedRef.current) >= 5
                    ) {
                        lastSavedRef.current = t;
                        savePosition(current.id, Math.floor(t));
                    }
                }}
                onLoadedMetadata={(e) => {
                    const audio = e.currentTarget;
                    setDuration(audio.duration);
                    const resumeAt = resumeAtRef.current;
                    if (resumeAt > 0 && resumeAt < audio.duration - 2)
                        audio.currentTime = resumeAt;
                    resumeAtRef.current = 0;
                }}
                onEnded={() => {
                    setIsPlaying(false);
                    if (current) {
                        markListened(current);
                        clearPosition(current.id);
                    }
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
