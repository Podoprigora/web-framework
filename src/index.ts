import { Sync } from './models/Sync';

const sync = new Sync('http://localhost:1111/users');

sync.fetch(1).then((response) => {
    console.log(response.data);
});
