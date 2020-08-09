import { createExpressServer } from "routing-controllers";
import { env } from '../env';
import { BootstrapLoader } from '../lib/bootstrap/BootstrapLoader';
import { BootstrapSettings } from '../lib/bootstrap/BootstrapSettings';

export class ExpressLoader extends BootstrapLoader {
    constructor(settings: BootstrapSettings) {
        super(settings);
    }
    onStartup(): void {
        const app = createExpressServer({
            classTransformer: false, // need to find a fix for typegoose/mongoose to class transformer
            cors: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            controllers: env.app.dirs.controllers, // we specify controllers we want to use
            middlewares: env.app.dirs.middlewares
         });
        if(env.app.port) {
            app.listen(env.app.port, () => {
                console.log('Express started on port' + env.app.port);
            })
        }
        this.settings.setData('expressApp', app);
    }
}