import jwt from "jsonwebtoken";
import User from "../model/User";

export interface AuthenticateUser {
    authenticateUser(token: string): User | null;
}

export class AuthenticateUserService implements AuthenticateUser {
    authenticateUser(token: string): User | null {
        try {
            if (token) {
                const jwtSecret = process.env.JWT_SECRET as string;
                return jwt.verify(token, jwtSecret) as User;
            }
            return null;
        } catch (err) {
            return null;
        }
    }
}