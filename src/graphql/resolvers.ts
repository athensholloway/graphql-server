import { RegisterUserService } from "../api/RegisterUser"

const registerUserService = new RegisterUserService();

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

// The resolvers
const resolvers = {
    Query: { books: () => books },
    Mutation: {
        register: async (parent, {username, password}, ctx, info) => {
            return registerUserService.registerUser(username, password);
        }
    }
};

export default resolvers;