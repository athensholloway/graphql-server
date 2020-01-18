import winston from "winston";

const systemId: string = process.env.SYSTEM_ID as string;
const winstonLogger = winston.createLogger({
    level: process.env.LOGGING_LEVEL,
    format: winston.format.json(),
    defaultMeta: { service: systemId },
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.json(),
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
        winstonLogger.log({ level: "info", message });
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
