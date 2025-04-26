import { IAuthRepository } from "./modules/auth/auth-repository-interface";
import { AuthRepository } from "./modules/auth/auth-repository";
import { AuthRepositoryMock } from "./modules/auth/auth-repository-mock";

/**
 * Factory for creating API services
 */
export class ApiFactory {
    //TODO: FIX NAME
    private static instance: ApiFactory;
    private _authRepository: IAuthRepository;

    private constructor() {
        // Determine which implementation to use based on environment
        const useMock =
            process.env.NEXT_PUBLIC_USE_MOCK_API === "true" || !process.env.NEXT_PUBLIC_API_URL;
        this._authRepository = useMock ? new AuthRepositoryMock() : new AuthRepository();
    }

    public static getInstance(): ApiFactory {
        if (!ApiFactory.instance) {
            ApiFactory.instance = new ApiFactory();
        }
        return ApiFactory.instance;
    }

    public get authRepository(): IAuthRepository {
        return this._authRepository;
    }

    // Add other services here as needed
}

// Convenience method for accessing the auth service
export const getAuthService = (): IAuthRepository => {
    return ApiFactory.getInstance().authRepository;
};
