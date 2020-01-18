import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;
const loggerFormat = combine(
    timestamp(),
    prettyPrint(),
);
const systemId: string = process.env.SYSTEM_ID as string;
const winstonLogger = createLogger({
    level: process.env.LOGGING_LEVEL,
    format: loggerFormat,
    defaultMeta: { service: systemId },
    transports: [
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/server.log" }),
    ],
});

const isDevelopmentMode = process.env.NODE_ENV === "development";

if (isDevelopmentMode) {
    winstonLogger.add(new transports.Console({
        format: loggerFormat,
    }));
}

export interface Logger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

class WinstonAdapter implements Logger {
    debug = (message: string): void => {
        winstonLogger.log({ level: "debug", message });
    }

    info = (message: string): void => {
        winstonLogger.log({ level: "info", message });
    }

    warn = (message: string): void => {
        winstonLogger.log({ level: "warn", message });
    }

    error = (message: string): void => {
        winstonLogger.log({ level: "error", message });
    }
}

export const newLogger = (): Logger => new WinstonAdapter();
