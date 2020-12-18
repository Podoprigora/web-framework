import Axios, { AxiosPromise } from 'axios';
import { HasIdInterface } from './Model';

const formatBaseUrl = (url: string = ''): string => {
    return url.trim().replace(/\/+$/, '');
};

export class ModelSync<T extends HasIdInterface> {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = formatBaseUrl(baseUrl);
    }

    fetch(id: number): AxiosPromise<T> {
        return Axios.get(`${this.baseUrl}/${id}`);
    }

    save(data: T): AxiosPromise<T> {
        const { id } = data;

        if (id) {
            return Axios.put(`${this.baseUrl}/${id}`, data);
        } else {
            return Axios.post(this.baseUrl, data);
        }
    }
}
