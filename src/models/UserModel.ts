import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type EventTypes = 'change' | 'save';

export class UserModel {
    private events = new Eventing();
    private sync = new Sync<UserProps>('http://localhost:1111/users');
    private attribures: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attribures = new Attributes<UserProps>(attrs);
    }

    get get() {
        return this.attribures.get;
    }

    set(update: UserProps): void {
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
