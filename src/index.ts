import axios from 'axios';
import { UserModel } from './models/UserModel';

const user = new UserModel({ id: 1, name: 'Alexandr' });

user.events.on('change', () => {
    console.log('user was changed');
});

user.events.trigger('change');
