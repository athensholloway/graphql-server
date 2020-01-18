import { Sequelize } from "sequelize";
// eslint-disable-next-line no-unused-vars
import { Logger, newLogger } from "../api/Logger";

const logger: Logger = newLogger();
const host = process.env.DATABASE_HOSTNAME as string;
const port = process.env.DATABASE_PORT as string;
const schema = process.env.DATABASE_SCHEMA as string;
const username = process.env.DATABASE_USERNAME as string;
const password = process.env.DATABASE_PASSWORD as string;
const dialect = process.env.SEQUELIZE_DIALECT as string;
const maxConnectionPoolSize = process.env.SEQUELIZE_CONNECTION_POOL_MAX as string;
const minConnectionPoolSize = process.env.SEQUELIZE_CONNECTION_POOL_MIN as string;
const aquireTimeout = process.env.SEQUELIZE_CONNECTION_POOL_AQUIRE_TIMEOUT as string;
const idleTimeout = process.env.SEQUELIZE_CONNECTION_POOL_IDLE_TIMEOUT as string;

const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${schema}`, {
    pool: {
        max: +maxConnectionPoolSize,
        min: +minConnectionPoolSize,
        acquire: +aquireTimeout,
        idle: +idleTimeout,
    },
});

sequelize
    .authenticate()
    .then(() => {
        logger.info(`Connection to database ${dialect}://${host}:${port}/${schema} has been established successfully.`);
    })
    .catch((err) => {
        logger.error(`Unable to connect to database ${dialect}://${host}:${port}/${schema}: ${err}.`);
    });

export default sequelize;
