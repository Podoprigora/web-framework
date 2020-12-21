import { Model } from '../libs/model/Model';
import { ModelSync } from '../libs/model/ModelSync';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export class UserModel extends Model<UserProps> {
    static create(attrs: UserProps): UserModel {
        return new UserModel({
            attrs,
            syncAdapter: new ModelSync<UserProps>('http://localhost:1111/users')
        });
    }
}
