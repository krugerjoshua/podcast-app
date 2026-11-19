import { Outlet, useParams } from "react-router-dom";
import { useShow } from "../hooks/useShows";
import Loading from "../components/Loading";

export default function ShowLayout() {
    const { id } = useParams();
    const { show, status, error } = useShow(id);

    if (status === "loading") return <Loading label="Loading show..." />;
    if (status === "error")
        return (
            <p role="alert" className="p-6">
                {error}
            </p>
        );

    return <Outlet context={{ show }} />;
}
