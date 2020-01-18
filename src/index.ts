import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import server from "./graphql/server";
// eslint-disable-next-line no-unused-vars
import { Logger, newLogger } from "./api/Logger";

env.config();
const logger: Logger = newLogger();

const app = express();
const port = process.env.PORT as string;
const bodyParserLimit = process.env.BODY_PARSER_LIMIT as string;
app.use(bodyParser.json({
    limit: bodyParserLimit,
}));
app.use(cors());

server.applyMiddleware({ app });

app.listen({ port }, () => {
    logger.info(`🚀  ${process.env.NODE_ENV} server ready at http://localhost:${port}/graphql`);
});
