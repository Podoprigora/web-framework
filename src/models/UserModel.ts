interface UserProps {
    name?: string;
    age?: number;
}

type Callback = () => void;

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
}
