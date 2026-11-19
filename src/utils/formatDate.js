export function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function formatDateTime(iso) {
    return new Date(iso).toLocaleString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
