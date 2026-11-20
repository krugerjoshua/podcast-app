const NAMED = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
};

export function decodeHtml(value) {
    if (typeof value !== "string") return value;

    return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code) => {
        if (code[0] === "#") {
            const hex = code[1]?.toLowerCase() === "x";
            const number = parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
            return Number.isNaN(number) ? match : String.fromCodePoint(number);
        }
        return NAMED[code.toLowerCase()] ?? match;
    });
}
