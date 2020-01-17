import User from "./User";

export default interface LoginResult {
    token: string;
    user: User;
}