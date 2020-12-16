import { UserModel } from './models/UserModel';

const user = new UserModel({ name: 'Alexandr', age: 36 });
user.set({ name: 'Podoprigora Alexand' });

user.on('save', () => {
    console.log('save user #1');
});
user.on('save', () => {
    console.log('save user #2');
});
user.on('save', () => {
    console.log('save user #3');
});

user.on('delete', () => {
    console.log('delete user');
});

// console.log(user.events);

user.trigger('test');

// console.log(user.get("name"));
