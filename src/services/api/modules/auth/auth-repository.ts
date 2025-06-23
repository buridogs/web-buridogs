import { BaseApiService } from "../../core/base-service-api";
import { IAuthRepository } from "./auth-repository-interface";
import { LoginCredentials, User } from "@/interfaces/authInterfaces";
import { Auth } from "./auth-types";

// TODO: CHECK NAME AND METHODS
export class AuthRepository extends BaseApiService implements IAuthRepository {
    constructor() {
        super();
    }

    /**
     * Authenticate user with credentials via API
     */
    public async login(credentials: LoginCredentials): Promise<Auth> {
        return this.fetchWithAuth<Auth>(
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async verify(_token: string): Promise<User> {
        // CHECK THAT
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
