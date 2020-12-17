import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export class UserModel {
    events = new Eventing();
    sync = new Sync<UserProps>('http://localhost:1111/users');
    attribures: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attribures = new Attributes<UserProps>(attrs);
    }
}
