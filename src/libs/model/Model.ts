import { HasIdInterface } from './contracts/HasIdInterface';
import { ModelSyncInterface } from './contracts/ModelSyncInterface';
import { ModelAttributes } from './ModelAttributes';
import { ModelEventing } from './ModelEventing';

type EventsType = 'change' | 'save';

type CallbackType = () => void;

interface ModelProps<T> {
    attrs: T;
    syncAdapter?: ModelSyncInterface<T>;
}

export class Model<T extends HasIdInterface> {
    private events = new ModelEventing();
    private sync: ModelSyncInterface<T> | null = null;
    private attribures: ModelAttributes<T>;

    constructor(props: ModelProps<T>) {
        const { attrs, syncAdapter } = props;

        this.attribures = new ModelAttributes<T>(attrs);

        if (syncAdapter) {
            this.sync = syncAdapter;
        }
    }

    get get() {
        return this.attribures.get;
    }

    get getAll() {
        return this.attribures.getAll;
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

        this.sync.fetch(id).then((response: T) => {
            this.set(response);
        });
    }

    save(): void {
        if (!this.sync) {
            return;
        }

        this.sync.save(this.attribures.getAll()).then((response: T) => {
            this.set(response);
            this.trigger('save');
        });
    }
}
