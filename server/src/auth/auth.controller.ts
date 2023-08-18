import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        @InjectModel(User.name)
        private userModel: Model<User>,

        private jwtService: JwtService,
    ) { }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    }

    @Get('check-token')
    @UseGuards(JwtAuthGuard) // Use your tokenAuth guard here
    async checkToken(@Request() req) {
        return {
            username: req.user.username,
        };
    }



}
