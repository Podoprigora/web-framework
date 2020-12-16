import Axios, { AxiosPromise, AxiosResponse } from 'axios';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

const baseURL = 'http://localhost:9999';

export class UserModel {
    events: {
        [key: string]: Callback[];
    } = {};

    constructor(private data: UserProps = {}) {}

    get(propName: string): string | number {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];

        this.events[eventName] = [...handlers, callback];
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (handlers && handlers.length > 0) {
            handlers.forEach((callback) => {
                callback();
            });
        }
    }

    fetch(): void {
        const id = this.get('id');

        Axios.get(`${baseURL}/users/${id}`).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    save(): void {
        const id = this.get('id');

        if (id) {
            Axios.put(`${baseURL}/users/${id}`, this.data);
        } else {
            Axios.post(`${baseURL}/users`, this.data).then((response: AxiosResponse): void => {
                this.set(response.data);
            });
        }
    }
}
