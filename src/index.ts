import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import server from "./graphql/server"
import {devMiddleware, hotMiddleware} from "./middleware/dev";

const app = express();
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV;

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log('Module disposed. '));
}

app.use(bodyParser.json({
  limit : "100kb"
}));

app.use(cors());

if(mode === "development") {
    console.log("integrating webpack development middleware")
    app.use(devMiddleware);
    app.use(hotMiddleware);
}

server.applyMiddleware({ app });

app.listen({port}, () => {
  console.log(`🚀 Server Athens ready at http://localhost:${port}$/graphql`);
});