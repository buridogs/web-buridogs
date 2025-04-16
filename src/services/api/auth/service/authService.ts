import { LoginCredentials, User, UserRole } from "@/interfaces/authInterfaces";
import { getAuthService } from "../../api-factory";

// This is a mock auth service to simulate API calls
// In a real app, these would be actual API requests to your backend

// TODO CHECK
// Mock user database for demonstration
const mockUsers = [
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
    {
        id: "3",
        name: "Editor User",
        email: "editor@buridogs.org",
        password: "editor123",
        role: UserRole.EDITOR,
    },
];

// Generate a simple mock JWT token
const generateToken = (user: User): string => {
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

export const loginUser = async (
    credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 800));

    const authService = getAuthService();

    console.log("Login credentials:", credentials);
    const { user, token } = await authService.login(credentials);
    console.log("User from API:", user);
    console.log("Token from API:", token);

    // const user = mockUsers.find(
    //     (u) => u.email === credentials.email && u.password === credentials.password
    // );

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Create user object without the password
    const { password, ...userWithoutPassword } = user;
    // const token = generateToken(userWithoutPassword);

    return {
        user: userWithoutPassword,
        token,
    };
};

export const verifyToken = async (token: string): Promise<User> => {
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
        const user = mockUsers.find((u) => u.id === payload.sub);
        if (!user) {
            throw new Error("User not found");
        }

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error("Token verification error:", error);
        throw new Error("Invalid token");
    }
};
