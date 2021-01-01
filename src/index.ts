import { UserModel } from './models/UserModel';
import { UserListView } from './views/UserListView';

const userCollection = UserModel.createCollection();
const userListView = new UserListView(document.getElementById('root'), userCollection);

userCollection.fetch();
userListView.render();
