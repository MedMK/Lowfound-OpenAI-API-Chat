import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Configuration, OpenAIApi } from 'openai';
import { Chat } from './schema/chat.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class ChatService {
    private readonly client: OpenAIApi;

    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(User.name) private readonly userModel: Model<User>,) {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        this.client = new OpenAIApi(configuration);
    }
    async generateResponse(prompt: string): Promise<string> {
        const response = await this.client.createCompletion({
            prompt,
            max_tokens: 50,
            model: 'text-davinci-003',
        });

        return response.data.choices[0].text.trim();
    }

    async askQuestion(user: any, question: string): Promise<Chat> {
        const response = await this.generateResponse(question);
        const chat = new this.chatModel({
            author: user._id,
            question,
            response,
        });

        return chat.save();
    }

    async getChats(user: any): Promise<Chat[]> {
        const chats = await this.chatModel.aggregate([
            {
                $match: { author: new mongoose.Types.ObjectId(user._id) },
            }
        ]);

        return chats;
    }

    async deleteChat(chatId: string): Promise<boolean> {
        const deletedChat = await this.chatModel.deleteOne({ _id: chatId });
        return deletedChat.deletedCount > 0;
    }


}
