export default function Loading({ label }) {
    return (
        <div role="status" className="flex items-center gap-3 p-6 text-muted">
            <span
                aria-hidden="true"
                className="size-5 animate-spin rounded-full border-2 border-muted border-t-accent"
            />
            {label}
        </div>
    );
}
