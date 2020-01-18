import jwt from "jsonwebtoken";
// eslint-disable-next-line no-unused-vars
import User from "../model/User";

export interface AuthenticateUser {
    authenticateUser(token: string): User | null;
}

export class AuthenticateUserService implements AuthenticateUser {
    authenticateUser = (token: string): User | null => {
        try {
            if (token) {
                const jwtSecret = process.env.JWT_SECRET as string;
                const user: User = jwt.verify(token, jwtSecret) as User;
                return user;
            }
            return null;
        } catch (err) {
            return null;
        }
    }
}
