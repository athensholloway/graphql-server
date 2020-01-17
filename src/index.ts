import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import server from "./graphql/server";

env.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({
    limit: "100kb"
}));
app.use(cors());

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🚀  ${process.env.NODE_ENV} server ready at http://localhost:${port}/graphql`);
});