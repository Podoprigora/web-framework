import { ModelAttributes } from './ModelAttributes';
import { ModelEventing } from './ModelEventing';
import { ModelSync } from './ModelSync';

type EventTypes = 'change' | 'save';

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    private events = new ModelEventing();
    private sync: ModelSync<T>;
    private attribures: ModelAttributes<T>;

    constructor(attrs: T, baseUrl: string) {
        this.attribures = new ModelAttributes(attrs);
        this.sync = new ModelSync(baseUrl);
    }

    get get() {
        return this.attribures.get;
    }

    set(update: T): void {
        this.attribures.set(update);
        this.events.trigger('change');
    }

    on(eventName: EventTypes, callback: () => void): void {
        this.events.on(eventName, callback);
    }

    trigger(eventName: EventTypes): void {
        this.events.trigger(eventName);
    }

    fetch(): void {
        const id = this.get('id');

        if (!id) {
            throw new Error('Cannot fetch data without an ID!');
        }

        this.sync.fetch(id).then((response) => {
            this.set(response.data);
        });
    }

    save(): void {
        this.sync.save(this.attribures.getAll()).then((response) => {
            this.set(response.data);
            this.trigger('save');
        });
    }
}
