import Axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const baseURL = 'http://localhost:9999';

export class UserModel {
    events = new Eventing();

    constructor(private data: UserProps = {}) {}

    get(propName: string): string | number {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
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
