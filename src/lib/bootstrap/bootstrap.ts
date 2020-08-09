import { BootstrapSettingsConfig, BootstrapConfig } from './BoostrapConfigInterface';
import { BoostrapLoaderConstructorInterface } from './BootstrapLoader';
import { BootstrapSettings } from './BootstrapSettings';

export class Bootstrap {

    private initialConfiguration: BootstrapSettingsConfig;
    private loaders: BoostrapLoaderConstructorInterface[] = [];

    private boostrapSettings: BootstrapSettings;

    private startTime = new Date();

    constructor(bootstrapConfig: BootstrapSettingsConfig) {
       this.initialConfiguration = bootstrapConfig;
       this.registerLoaders(bootstrapConfig.loaders);
       this.bootstrapApp();
    }

    loadConfiguration(config: BootstrapConfig): void {
        console.log(`============================================================`);
        console.log(`App name - ${config.name}`);
        config.port && console.log(`Port - ${config.port}`);
        console.log(`Environment - ${config.environment}`);
        console.log(`Started: ${this.startTime.toString()}`)
        console.log(`=============================================================`);
    }
    
    registerLoaders(loaders:BoostrapLoaderConstructorInterface[]): void {
        this.loaders.push(...loaders);
    }
    
    bootstrapApp(): Promise<any> {
        this.boostrapSettings = new BootstrapSettings();
        this.loadConfiguration(this.initialConfiguration.config);
        return this.runInSequence(this.loaders, (loader: BoostrapLoaderConstructorInterface) => {
            const loaderResult = new loader(this.boostrapSettings).onStartup();
            return loaderResult instanceof Promise ? loaderResult : Promise.resolve();
          });
    }
    

    private runInSequence<T, U>(collection: T[], callback: (item: T) => Promise<U>): Promise<U[]> {
        const results: U[] = [];
        return collection
          .reduce((promise, item) => {
            return promise
              .then(() => {
                return callback(item);
              })
              .then(result => {
                results.push(result);
              });
          }, Promise.resolve())
          .then(() => {
            return results;
          });
      }

}