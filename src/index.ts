import { UserModel } from './models/UserModel';

const usersCollection = UserModel.createCollection();

usersCollection.on('change', () => {
    console.log(usersCollection);
});

usersCollection.fetch();
