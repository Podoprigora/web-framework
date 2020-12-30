import { UserModel } from './models/UserModel';

const user = UserModel.create({ id: 16 });

user.fetch();
