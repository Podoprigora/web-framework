export interface ModelSyncInterface<T> {
    fetch(id: number): Promise<T>;
    save(data: T): Promise<T>;
}
