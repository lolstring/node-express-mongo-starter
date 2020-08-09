import { BootstrapSettings } from './BootstrapSettings';

export interface BoostrapLoaderConstructorInterface {
    new(boostrapSettings: BootstrapSettings);
}

export interface BootStrapLoaderInterface {
    onStartup(): Promise<any> | any | void;
    onShutdown?(): Promise<any> | any;
}
export abstract class BootstrapLoader implements BootStrapLoaderInterface {
    settings: BootstrapSettings;
    constructor(bootstrapSettings: BootstrapSettings) {
        this.settings = bootstrapSettings;
    }


    abstract onStartup(): Promise<any> | any | void;
}