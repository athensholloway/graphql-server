import { RegisterUserService } from "../api/RegisterUser"
import { LoginService } from "../api/Login"

const registerUserService = new RegisterUserService();
const loginService = new LoginService();

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    }
];

const authenticateUser = (user) => {
    if (!user) {
        throw new Error('Not Authenticated')
    }
};

// The resolvers
const resolvers = {
    Query: { 
        books: (parent, args, { user }) => {
            authenticateUser(user);
            return books;
        }
    },
    Mutation: {
        register: async (parent, {username, password}, ctx, info) => {
            return registerUserService.registerUser(username, password);
        },
        login: async (parent, {username, password}, ctx, info) => {
            return loginService.login(username, password);
        }
    }
};

export default resolvers;