import { decodeHtml } from "../utils/decodeHtml";

const BASE_URL = "https://podcast-api.netlify.app";

function cleanEpisode(episode) {
    return {
        ...episode,
        title: decodeHtml(episode.title),
        description: decodeHtml(episode.description),
    };
}

function cleanSeason(season) {
    return {
        ...season,
        title: decodeHtml(season.title),
        episodes: Array.isArray(season.episodes)
            ? season.episodes.map(cleanEpisode)
            : season.episodes,
    };
}

function cleanShow(show) {
    return {
        ...show,
        title: decodeHtml(show.title),
        description: decodeHtml(show.description),
        seasons: Array.isArray(show.seasons)
            ? show.seasons.map(cleanSeason)
            : show.seasons,
    };
}

export async function fetchShows(signal) {
    const response = await fetch(`${BASE_URL}/shows`, { signal });
    if (!response.ok) {
        throw new Error(`Failed to load shows (${response.status})`);
    }
    const data = await response.json();
    return data.map(cleanShow);
}

export async function fetchShow(id, signal) {
    const response = await fetch(`${BASE_URL}/id/${id}`, { signal });
    if (!response.ok) {
        throw new Error(`Failed to load show (${response.status})`);
    }
    const data = await response.json();
    return cleanShow(data);
}
