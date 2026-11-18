import { useEffect, useState } from "react";
import { fetchShows } from "../api/podcastApi";

export function useShows() {
    const [shows, setShows] = useState([]);
    const [status, setStatus] = useState("loading"); // loading | success | error
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetchShows(controller.signal)
            .then((data) => {
                setShows(data);
                setStatus("success");
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                setError(err.message);
                setStatus("error");
            });

        return () => controller.abort();
    }, []);

    return { shows, status, error };
}
