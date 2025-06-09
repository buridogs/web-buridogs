"use client";

import { useEffect } from "react";
import ErrorPage from "./(public)/error";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global error caught:", error);
    }, [error]);

    return (
        <html>
            <body>
                <ErrorPage
                    error={error}
                    reset={reset}
                />
            </body>
        </html>
    );
}
