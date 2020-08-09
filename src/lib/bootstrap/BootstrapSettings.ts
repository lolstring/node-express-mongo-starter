export class BootstrapSettings { 
    data: { [key: string]: any} = {};

    setData(key: string, value: any): void {
        this.data[key] = value;
    }

    getData(key: string | number): any | undefined{
        return this.data[key];
    }
}