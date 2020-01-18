// eslint-disable-next-line no-unused-vars
import express from "express";
import jwt from "jsonwebtoken";
// eslint-disable-next-line no-unused-vars
import User from "../model/User";

export interface AuthenticateUser {
    authenticateUser(token: string): User | null;
}

export interface TokenResolver {
    getToken(): string;
}

export const newTokenResolver = (req: express.Request): TokenResolver => {
    const tokenResolver: TokenResolver = {
        getToken: () => {
            const tokenWithBearer = req.headers.authorization || "";
            const token = tokenWithBearer.split(" ")[1];
            return token;
        },
    };

    return tokenResolver;
};

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
