import { BootstrapLoader } from '../lib/bootstrap/BootstrapLoader';
import { BootstrapSettings } from '../lib/bootstrap/BootstrapSettings';
import mongoose from 'mongoose';
import { env } from '../env';

export class MongooseLoader extends BootstrapLoader{
    constructor(settings: BootstrapSettings) {
        super(settings);
    }

    onStartup():void {
        mongoose.connect(this.getConnectionURI(), {useNewUrlParser: true, loggerLevel: env.db.logging });
    }

    onShutdown(): void {
        mongoose.disconnect();
    }

    getConnectionURI(): string {
        let uri = 'mongodb://';
        if(env.db.username && env.db.password) {
            uri += `${env.db.username}:${env.db.password}@`;
        }
        uri += `${env.db.host}`;
        if(env.db.port) {
            uri += `:${env.db.port}`;
        } 
        uri += `/${env.db.database}`;
        return uri;
    }
}