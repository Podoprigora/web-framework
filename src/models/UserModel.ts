import { Collection } from '../libs/model/Collection';
import { Model } from '../libs/model/Model';
import { ModelSync } from '../libs/model/ModelSync';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const url = 'http://localhost:1111/users';

export class UserModel extends Model<UserProps> {
    static create(attrs: UserProps): UserModel {
        return new UserModel({
            attrs,
            syncAdapter: new ModelSync<UserProps>(url)
        });
    }

    static createCollection(): Collection<UserModel, UserProps> {
        return new Collection<UserModel, UserProps>(url, (item) => {
            return UserModel.create(item);
        });
    }
}
