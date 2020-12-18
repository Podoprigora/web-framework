import { AxiosPromise } from 'axios';
import { ModelAttributes } from './ModelAttributes';
import { ModelEventing } from './ModelEventing';
import { ModelSync } from './ModelSync';

type EventsType = 'change' | 'save';

type CallbackType = () => void;

export interface HasIdInterface {
    id?: number;
}

export class Model<T extends HasIdInterface> {
    private events = new ModelEventing();
    private sync: ModelSync<T>;
    private attribures: ModelAttributes<T>;

    constructor(attrs: T, url?: string) {
        this.attribures = new ModelAttributes<T>(attrs);

        if (url && url.length > 0) {
            this.sync = new ModelSync<T>(url);
        }
    }

    get get() {
        return this.attribures.get;
    }

    set(update: T): void {
        this.attribures.set(update);
        this.events.trigger('change');
    }

    on(eventName: EventsType, callback: CallbackType): void {
        this.events.on(eventName, callback);
    }

    trigger(eventName: EventsType): void {
        this.events.trigger(eventName);
    }

    fetch(): void {
        const id = this.get('id');

        if (!id) {
            throw new Error('Cannot fetch data without an ID!');
        }

        if (!this.sync) {
            return;
        }

        this.sync.fetch(id).then((response) => {
            this.set(response.data);
        });
    }

    save(): void {
        if (!this.sync) {
            return;
        }

        this.sync.save(this.attribures.getAll()).then((response) => {
            this.set(response.data);
            this.trigger('save');
        });
    }
}
