import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import server from "./graphql/server"

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json({
  limit : "100kb"
}));

app.use(cors());

server.applyMiddleware({ app });

app.listen({port}, () => {
  console.log(`🚀  ${process.env.NODE_ENV} server ready at http://localhost:${port}/graphql`);
});