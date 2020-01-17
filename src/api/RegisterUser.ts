import * as bcrypt from "bcryptjs";
import User from "../model/User";
import UserMap from "./UserMap"

export interface RegisterUser {
    registerUser(username: string, password: string ): Promise<User>;
}

export class RegisterUserService implements RegisterUser {
    async registerUser(username: string, password: string ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        UserMap.set(username, hashedPassword);

        return {
            id: 1,
            username: username
        };
    }
}