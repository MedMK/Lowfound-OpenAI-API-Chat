import { Controller, UseGuards, Request, Body, Post, Get, Param, Query, ParseIntPipe, NotFoundException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { Chat } from './schema/chat.schema';


@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Post('ask')
    async askQuestion(@Request() req, @Body() body: { question: string }) {
        const user = req.user; // Assuming JWT payload has user ID
        const question = body.question;

        const chat = await this.chatService.askQuestion(user, question);
        return chat;
    }

    @Get('list')
    async getChats(@Request() req) {
        const user = req.user; // Assuming JWT payload has user ID
        const chats = await this.chatService.getChats(user);
        return chats;
    }

    @Delete(':id')
    async deleteChat(@Param('id') chatId: string): Promise<{ success: boolean }> {
        const isDeleted = await this.chatService.deleteChat(chatId);

        if (!isDeleted) {
            throw new NotFoundException(`Chat with ID ${chatId} not found`);
        }

        return { success: true };
    }

}
