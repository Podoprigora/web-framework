import { UserModel } from './models/UserModel';
import { UserEditView } from './views/UserEditView';
import { UserListView } from './views/UserListView';

// const userModel = UserModel.create({});

// const userEditView = new UserEditView(document.getElementById('root'), userModel);
// userEditView.render();

const userCollection = UserModel.createCollection();
const userListView = new UserListView(document.getElementById('root'), userCollection);

userCollection.fetch();
userListView.render();
