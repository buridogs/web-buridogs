import { LoginCredentials, User, UserRole } from "@/interfaces/authInterfaces";
import { getAuthService } from "../../api-factory";

export class AuthService {
    static readonly mockUsers = [
        {
            id: "1",
            name: "Admin User",
            email: "admin@buridogs.org",
            password: "admin123",
            role: UserRole.ADMIN,
        },
        {
            id: "2",
            name: "Volunteer User",
            email: "volunteer@buridogs.org",
            password: "volunteer123",
            role: UserRole.VOLUNTEER,
        },
    ];

    constructor() {}

    generateToken = (user: User): string => {
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const payload = btoa(
            JSON.stringify({
                sub: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                iat: Date.now() / 1000,
                exp: Date.now() / 1000 + 3600, // Token expires in 1 hour
            })
        );
        const signature = btoa(`${user.id}.${Date.now()}`); // This is not a real signature, just a mock

        return `${header}.${payload}.${signature}`;
    };

    static loginUser = async (
        credentials: LoginCredentials
    ): Promise<{ user: User; token: string }> => {
        // TODO: REVIEW THESE COMMENTS
        // Simulate API delay
        // await new Promise((resolve) => setTimeout(resolve, 800));

        const authService = getAuthService();

        const { user, token } = await authService.login(credentials);

        // const user = mockUsers.find(
        //     (u) => u.email === credentials.email && u.password === credentials.password
        // );

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Create user object without the password
        const { ...userWithoutPassword } = user;
        // const token = generateToken(userWithoutPassword);

        return {
            user: userWithoutPassword,
            token,
        };
    };

    static verifyToken = async (token: string): Promise<User> => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (!token) {
            throw new Error("No token provided");
        }

        try {
            // In a real app, you'd validate the token signature and decode it
            const tokenParts = token.split(".");
            if (tokenParts.length !== 3) {
                throw new Error("Invalid token format");
            }

            const payload = JSON.parse(atob(tokenParts[1]));

            // Check if token is expired
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                throw new Error("Token expired");
            }

            // Find the user
            const user = this.mockUsers.find((u) => u.id === payload.sub);
            if (!user) {
                throw new Error("User not found");
            }

            // Return user without password
            const { ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Token verification error:", error);
            throw new Error("Invalid token");
        }
    };
}
