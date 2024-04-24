import { MicrosoftClarity } from "@/services/clarity/clarity-tag";
import { GoogleAnalytics } from "@/services/google-analytics/google-analytics-tag";

export function TracerTagsWrapper() {
    if (process.env.NODE_ENV !== "production") return null;

    return (
        <>
            <GoogleAnalytics />
            <MicrosoftClarity />
        </>
    );
}
