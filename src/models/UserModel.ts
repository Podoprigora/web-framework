import { ModelsCollection } from '../libs/model/ModelsCollection';
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

    static createCollection(): ModelsCollection<UserModel, UserProps> {
        return new ModelsCollection<UserModel, UserProps>(url, (item) => {
            return UserModel.create(item);
        });
    }

    setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        this.set({ age });
    }
}
