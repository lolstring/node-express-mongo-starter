import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
    @prop()
    public name: string;
}

export const UserModel = getModelForClass(User)