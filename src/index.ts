import { UserModel } from './models/UserModel';

const user = new UserModel({});

user.on('save', () => {
    console.log('User was saved.', user);
});

user.set({ name: 'Test User', age: 10 });

user.save();
