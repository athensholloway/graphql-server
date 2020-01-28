export interface User {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
}

export interface UserQuery {
    findAllUsers(): Promise<User>;
}
