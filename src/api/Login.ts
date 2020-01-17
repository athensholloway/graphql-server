import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import LoginResult from "../model/LoginResult";
import User from "../model/User";
import UserMap from "./UserMap"


export interface Login {
    login(username: string, password: string ): Promise<LoginResult>;
}

export class LoginService implements Login {
    async login(username: string, password: string ): Promise<LoginResult> {
        const hashedPassword = UserMap.get(username);
        let passwordMatch = false;

        if(hashedPassword){
            passwordMatch = await bcrypt.compare(password, hashedPassword);
        }

        if (!passwordMatch) {
            throw new Error('Invalid Login')
        }
        
        const user: User = {id: 1,username: username};
        const jwtSecret = process.env.JWT_SECRET as string;
        const token = jwt.sign(
            user, 
            jwtSecret,
            {
                expiresIn: '30d', // token will expire in 30days
            }
            );

        return {
            token: token,
            user: user,
        };
    }
}