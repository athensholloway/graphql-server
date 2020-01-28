// eslint-disable-next-line no-unused-vars
import { IResolvers } from "graphql-tools";
// eslint-disable-next-line no-unused-vars
import { RegisterUserService, RegisterUser } from "../api/RegisterUser";
// eslint-disable-next-line no-unused-vars
import { LoginService, Login } from "../api/Login";
// eslint-disable-next-line no-unused-vars
import { User } from "../model/User";

const registerUser: RegisterUser = new RegisterUserService();
const login: Login = new LoginService();

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: "J.K. Rowling",
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton",
    },
];

const authenticateUser = (user: User) => {
    if (!user) {
        throw new Error("Not Authenticated");
    }
};

const resolvers: IResolvers = {
    Query: {
        books: (parent, args, { user }) => {
            authenticateUser(user);
            return books;
        },
    },
    Mutation: {
        register: (_, { username, password }) => registerUser.registerUser(username, password),
        login: (_, { username, password }) => login.login(username, password),
    },
};

export default resolvers;
