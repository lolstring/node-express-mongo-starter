import "reflect-metadata";
import { env } from './env';
import { Bootstrap } from './lib/bootstrap/bootstrap';
import { ExpressLoader } from './loaders/expressLoader';
import { LoggerLoader } from './loaders/loggerLoader';
import { MongooseLoader } from './loaders/mongooseLoader';

new Bootstrap({
    config: {
        name: env.app.name,
        port: env.app.port,
        environment: process.env.NODE_ENV
    }, 
    loaders: [
        LoggerLoader,
        ExpressLoader,
        MongooseLoader
    ]
})