import { BoostrapLoaderConstructorInterface } from './BootstrapLoader';

export interface BootstrapConfig {
    name: string;
    environment: string;
    port?: number | string | boolean;
}

export interface BootstrapSettingsConfig {
    config: BootstrapConfig;
    loaders: BoostrapLoaderConstructorInterface[]; 
}