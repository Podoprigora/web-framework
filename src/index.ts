import { UserModel } from './models/UserModel';
import { UserEditView } from './views/UserEditView';

const userModel = UserModel.create({});

const userEditView = new UserEditView(document.getElementById('root'), userModel);
userEditView.render();
