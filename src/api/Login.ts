import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
// eslint-disable-next-line no-unused-vars
import LoginResult from "../model/LoginResult";
// eslint-disable-next-line no-unused-vars
import User from "../model/User";
import UserMap from "./UserMap";


export interface Login {
    login(username: string, password: string): Promise<LoginResult>;
}

export class LoginService implements Login {
        login = async (username: string, password: string): Promise<LoginResult> => {
            const hashedPassword = UserMap.get(username);
            let passwordMatch = false;

            if (hashedPassword) {
                passwordMatch = await bcrypt.compare(password, hashedPassword);
            }

            if (!passwordMatch) {
                throw new Error("Invalid Login");
            }

            const user: User = { id: 1, username };
            const jwtSecret = process.env.JWT_SECRET as string;
            const jwtExpiration = process.env.JWT_EXPIRATION as string;
            const token = jwt.sign(
                user,
                jwtSecret,
                {
                    expiresIn: jwtExpiration,
                },
            );

            const result: LoginResult = { token, user };

            return result;
        }
}
