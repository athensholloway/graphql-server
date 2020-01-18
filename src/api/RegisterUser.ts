import bcrypt from "bcryptjs";
// eslint-disable-next-line no-unused-vars
import User from "../model/User";
import UserMap from "./UserMap";

export interface RegisterUser {
    registerUser(username: string, password: string): Promise<User>;
}

export class RegisterUserService implements RegisterUser {
    registerUser = async (username: string, password: string): Promise<User> => {
        const hashedPassword = await bcrypt.hash(password, 10);

        UserMap.set(username, hashedPassword);

        return {
            id: 1,
            username,
        };
    }
}
