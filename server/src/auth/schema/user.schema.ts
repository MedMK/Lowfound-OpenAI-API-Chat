import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Chat } from 'src/chat/schema/chat.schema';

@Schema({
    collection: 'Users',
    timestamps: true,
})
export class User extends Document {

    @Prop({ unique: [true, 'This Username has been taken'] })
    username: string;

    @Prop()
    password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);