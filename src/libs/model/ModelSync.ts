import Axios, { AxiosResponse } from 'axios';
import { HasIdInterface } from './contracts/HasIdInterface';
import { ModelSyncInterface } from './contracts/ModelSyncInterface';

const formatBaseUrl = (url: string = ''): string => {
    return url.trim().replace(/\/+$/, '');
};

export class ModelSync<T extends HasIdInterface> implements ModelSyncInterface<T> {
    private baseUrl: string;

    private getResponseData(response: AxiosResponse) {
        return response.data;
    }

    constructor(baseUrl: string) {
        this.baseUrl = formatBaseUrl(baseUrl);
    }

    fetch(id: number): Promise<T> {
        return Axios.get(`${this.baseUrl}/${id}`).then(this.getResponseData);
    }

    save(data: T): Promise<T> {
        const { id } = data;

        if (id) {
            return Axios.put(`${this.baseUrl}/${id}`, data).then(this.getResponseData);
        } else {
            return Axios.post(this.baseUrl, data).then(this.getResponseData);
        }
    }
}
