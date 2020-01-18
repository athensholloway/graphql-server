import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { AuthenticateUserService } from "../api/AuthenticateUser";
import sequelize from "../data/Sequelize";

const authenticateUserService = new AuthenticateUserService();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const tokenWithBearer = req.headers.authorization || "";
        const token = tokenWithBearer.split(" ")[1];
        const user = authenticateUserService.authenticateUser(token);
        const context = { user, sequelize };

        return context;
    },
});

export default server;
