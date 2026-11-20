import { NavLink } from "react-router-dom";
import { ClockIcon, GridIcon, HeartIcon, HomeIcon } from "./Icons";

const items = [
    { to: "/", label: "Home", Icon: HomeIcon, end: true },
    { to: "/collections", label: "Collections", Icon: GridIcon },
    { to: "/favourites", label: "Favourites", Icon: HeartIcon },
    { to: "/history", label: "History", Icon: ClockIcon },
];

export default function BottomNav() {
    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md dark:border-white/10"
        >
            <ul className="mx-auto flex w-full max-w-3xl items-stretch justify-around px-2">
                {items.map(({ to, label, Icon, end }) => (
                    <li key={to} className="flex-1">
                        <NavLink
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-[11px] font-medium transition ${
                                    isActive
                                        ? "text-fg"
                                        : "text-muted hover:text-fg"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={`size-5 ${isActive ? "stroke-[2.2]" : ""}`}
                                    />
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
