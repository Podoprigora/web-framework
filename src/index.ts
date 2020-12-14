import { UserModel } from "./models/UserModel";

const user = new UserModel({name: "Alexandr", age: 36});
user.set({name: "Podoprigora Alexand"});

console.log(user.get("name"));
