import { Model } from '../libs/model/Model';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export class UserModel extends Model<UserProps> {}
