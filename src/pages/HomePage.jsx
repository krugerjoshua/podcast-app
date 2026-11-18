import { useShows } from "../hooks/useShow";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";

export default function HomePage() {
    const { shows, status, error } = useShows();

    if (status === "loading") return <Loading label="Loading shows..." />;
    if (status === "error")
        return (
            <p role="alert" className="p-6">
                {error}
            </p>
        );

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-4">
            {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
            ))}
        </div>
    );
}
