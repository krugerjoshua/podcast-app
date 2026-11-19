import { useEffect, useState } from "react";
import { fetchShow, fetchShows } from "../api/podcastApi";

export function useShow(id) {
    const [show, setShow] = useState(null);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);
    const [loadedId, setLoadedId] = useState(id);

    if (id !== loadedId) {
        setLoadedId(id);
        setShow(null);
        setStatus("loading");
        setError(null);
    }

    useEffect(() => {
        const controller = new AbortController();

        fetchShow(id, controller.signal)
            .then((data) => {
                setShow(data);
                setStatus("success");
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                setError(err.message);
                setStatus("error");
            });

        return () => controller.abort();
    }, [id]);

    return { show, status, error };
}

export function useShows() {
    const [shows, setShows] = useState([]);
    const [status, setStatus] = useState("loading");
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
