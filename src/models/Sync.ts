import Axios, { AxiosPromise } from 'axios';

interface DataWithId {
    id?: number;
}

const formatBaseUrl = (url: string = ''): string => {
    return url.trim().replace(/\/+$/, '');
};

export class Sync<T extends DataWithId> {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = formatBaseUrl(baseURL);
    }

    fetch(id: number): AxiosPromise<T> {
        return Axios.get(`${this.baseURL}/${id}`);
    }

    save(data: T): AxiosPromise<T> {
        const { id } = data;

        if (id) {
            return Axios.put(`${this.baseURL}/${id}`, data);
        } else {
            return Axios.post(this.baseURL, data);
        }
    }
}
