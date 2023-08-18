import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Schema({
    collection: 'Chat',
    timestamps: true,
})
export class Chat extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name })
    author: User;

    @Prop()
    question: string;

    @Prop()
    response: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
