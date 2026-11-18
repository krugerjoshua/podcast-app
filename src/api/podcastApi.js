const BASE_URL = "https://podcast-api.netlify.app";

export async function fetchShows(signal) {
    const response = await fetch(`${BASE_URL}/shows`, { signal });
    if (!response.ok) {
        throw new Error(`Failed to load shows (${response.status})`);
    }
    return response.json();
}

export async function fetchShow(id, signal) {
    const response = await fetch(`${BASE_URL}/id/${id}`, { signal });
    if (!response.ok) {
        throw new Error(`Failed to load show (${response.status})`);
    }
    return response.json();
}
