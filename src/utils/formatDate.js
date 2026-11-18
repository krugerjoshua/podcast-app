export function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
