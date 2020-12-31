import Axios, { AxiosError, AxiosResponse } from 'axios';
import { ModelEventing } from './ModelEventing';

type EventsType = 'change';

export class Collection<T, P> {
    private events = new ModelEventing();
    models: T[] = [];

    constructor(public url: string, public deserialize: (json: P) => T) {}

    on(eventName: EventsType, callback: () => void): void {
        this.events.on(eventName, callback);
    }

    trigger(eventName: EventsType): void {
        this.events.trigger(eventName);
    }

    fetch(): void {
        if (this.url) {
            Axios.get(this.url)
                .then((response: AxiosResponse) => {
                    if (response.data.length > 0) {
                        this.models = [];

                        response.data.forEach((item: P) => {
                            const model = this.deserialize(item);
                            this.models.push(model);
                        });

                        this.trigger('change');
                    }
                })
                .catch((error: AxiosError) => {
                    throw new Error(error.message);
                });
        }
    }
}
