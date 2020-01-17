import User from "../model/User";

export interface CreateUser {
    createUser(user: User): User;
}

export class CreateUserService implements CreateUser {
    createUser(user: User): User {
        user.id = 1;
        return user;
    }
}