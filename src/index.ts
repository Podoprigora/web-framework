import { UserModel } from './models/UserModel';
import { UserFormView } from './views/UserFormView';

const userModel = UserModel.create({ id: 1, name: 'Demo User', age: 20 });
const userFormView = new UserFormView(document.getElementById('root'), userModel);

userFormView.render();
