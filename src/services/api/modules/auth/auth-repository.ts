import { BaseApiService } from "../../core/base-service-api";
import { IAuthRepository } from "./auth-repository-interface";
import { ILoginCredentials, IUser } from "@/types/auth";
import { Auth } from "./auth-types";

// TODO: CHECK NAME AND METHODS
export class AuthRepository extends BaseApiService implements IAuthRepository {
    constructor() {
        super();
    }

    /**
     * Authenticate user with credentials via API
     */
    public async login(credentials: ILoginCredentials): Promise<Auth> {
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
    public async verify(_token: string): Promise<IUser> {
        // CHECK THAT
        return this.fetchWithAuth<IUser>("/auth/verify", {
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
