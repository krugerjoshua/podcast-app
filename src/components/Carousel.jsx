import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const arrow =
    "grid size-9 place-items-center rounded-full bg-raised text-fg transition active:scale-95 disabled:opacity-30";

export default function Carousel({ shows, title = "On Repeat" }) {
    const trackRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    function updateEdges() {
        const el = trackRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 1);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    }

    useEffect(() => {
        updateEdges();
        window.addEventListener("resize", updateEdges);
        return () => window.removeEventListener("resize", updateEdges);
    }, [shows]);

    function scrollByPage(direction) {
        const el = trackRef.current;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollBy({
            left: direction * el.clientWidth * 0.8,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }

    return (
        <section aria-labelledby="carousel-title" className="pt-6">
            <div className="flex items-center justify-between gap-4 px-4">
                <h2 id="carousel-title" className="text-lg font-semibold">
                    {title}
                </h2>
                <div className="hidden gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={() => scrollByPage(-1)}
                        disabled={atStart}
                        aria-label="Previous shows"
                        className={arrow}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByPage(1)}
                        disabled={atEnd}
                        aria-label="Next shows"
                        className={arrow}
                    >
                        <ChevronRightIcon className="size-4" />
                    </button>
                </div>
            </div>

            <ul
                ref={trackRef}
                onScroll={updateEdges}
                className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
            >
                {shows.map((show) => (
                    <li
                        key={show.id}
                        className="w-28 shrink-0 snap-start sm:w-36"
                    >
                        <Link
                            to={`/show/${show.id}`}
                            className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            <img
                                src={show.image}
                                alt=""
                                loading="lazy"
                                className="aspect-square w-full rounded-2xl object-cover transition group-active:scale-[0.97]"
                            />
                            <span className="mt-2 line-clamp-2 block break-words text-sm font-medium leading-snug">
                                {show.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
