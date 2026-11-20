import { Component } from "react";

export default class ErrorBoundary extends Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.error) {
            return (
                <div className="mx-auto flex min-h-dvh max-w-md items-center p-6">
                    <div className="w-full rounded-3xl bg-raised p-6">
                        <h1 className="text-xl font-bold">
                            Something went wrong
                        </h1>
                        <p className="mt-2 text-sm text-muted">
                            {this.state.error.message}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-surface"
                        >
                            Reload app
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
