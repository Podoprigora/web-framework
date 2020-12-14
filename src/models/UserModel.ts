interface UserProps {
    name?: string;
    age?: number;
}

export class UserModel {
    constructor(private data: UserProps = {}) {}

    get(propName: string): (string | number) {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }
}