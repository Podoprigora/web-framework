export class ModelAttributes<T> {
    constructor(private data: T) {}

    get = <K extends keyof T>(propName: K): T[K] => {
        return this.data[propName];
    };

    getAll = (): T => {
        return this.data;
    };

    set(update: T): void {
        Object.assign(this.data, update);
    }
}
