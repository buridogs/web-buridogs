export abstract class BaseApiService {
    protected apiBaseUrl: string;

    constructor() {
        this.apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.buridogs.org";
    }

    protected async fetchWithAuth<T>(
        endpoint: string,
        options: RequestInit = {},
        isPrivateEndpoint = true
    ): Promise<T> {
        const token = this.getAuthToken();

        const headers = new Headers(options.headers || {});
        headers.set("Content-Type", "application/json");

        if (token && isPrivateEndpoint) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        console.log({ options });

        const config: RequestInit = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, config);

            if (!response.ok) {
                if (response.status === 401) {
                    this.handleUnauthorized();
                }

                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API error: ${response.status}`);
            }

            // Check if response is JSON
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                return (await response.json()) as T;
            }

            return {} as T;
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }

    protected getAuthToken(): string | null {
        // In a client-side context
        if (typeof window !== "undefined") {
            return (
                document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("auth-token="))
                    ?.split("=")[1] || null
            );
        }
        return null;
    }

    protected handleUnauthorized(): void {
        // Handle unauthorized errors (e.g., redirect to login)
        console.log("Unauthorized access - handling in base class");
        // You could implement a callback or event system here
    }
}
