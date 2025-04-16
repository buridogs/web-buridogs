import { IAuthApi } from "./auth/repository/interfaces/auth-api.interface";
import { MockAuthApi } from "./auth/repository/auth-api.mock";
import { HttpAuthApi } from "./auth/repository/auth-api";

/**
 * Factory for creating API services
 */
export class ServiceFactory {
    //TODO: FIX NAME
    private static instance: ServiceFactory;
    private _authService: IAuthApi;

    private constructor() {
        // Determine which implementation to use based on environment
        const useMock =
            process.env.NEXT_PUBLIC_USE_MOCK_API === "true" || !process.env.NEXT_PUBLIC_API_URL;
        this._authService = useMock ? new MockAuthApi() : new HttpAuthApi();
    }

    public static getInstance(): ServiceFactory {
        if (!ServiceFactory.instance) {
            ServiceFactory.instance = new ServiceFactory();
        }
        return ServiceFactory.instance;
    }

    public get authService(): IAuthApi {
        return this._authService;
    }

    // Add other services here as needed
}

// Convenience method for accessing the auth service
export const getAuthService = (): IAuthApi => {
    return ServiceFactory.getInstance().authService;
};
