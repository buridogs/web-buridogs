import { BaseApiService } from "../../base-service-api";
import { IAuthApi } from "./interfaces/auth-api.interface";
import { LoginCredentials, User } from "@/interfaces/authInterfaces";

// TODO: CHECK NAME AND METHODS
export class HttpAuthApi extends BaseApiService implements IAuthApi {
    constructor() {
        super();
    }

    /**
     * Authenticate user with credentials via API
     */
    public async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
        return this.fetchWithAuth<{ user: User; token: string }>(
            "/auth/signin",
            {
                method: "POST",
                body: JSON.stringify(credentials),
            },
            false
        );
    }

    /**
     * Verify a token via API
     */
    public async verify(token: string): Promise<User> {
        return this.fetchWithAuth<User>("/auth/verify", {
            method: "GET",
        });
    }

    /**
     * Log out the current user via API
     */
    public async logout(): Promise<void> {
        return this.fetchWithAuth<void>("/auth/logout", {
            method: "POST",
        });
    }
}
