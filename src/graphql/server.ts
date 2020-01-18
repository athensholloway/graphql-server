import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { AuthenticateUserService, newTokenResolver } from "../api/AuthenticateUser";
import sequelize from "../data/Sequelize";

const authenticateUserService = new AuthenticateUserService();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = newTokenResolver(req).getToken();
        const user = authenticateUserService.authenticateUser(token);
        const context = { user, sequelize };

        return context;
    },
});

export default server;
