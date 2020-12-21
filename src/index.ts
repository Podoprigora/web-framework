import { UserModel } from './models/UserModel';

const user = UserModel.create({ id: 16 });

user.fetch();

// console.log(user);

// user.on('save', () => {
//     console.log('User was saved.', user);
// });

// user.set({ name: 'Test User', age: 10 });

// user.save();
