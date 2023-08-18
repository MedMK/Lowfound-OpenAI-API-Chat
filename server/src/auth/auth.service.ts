import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';



@Injectable()

export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,

        private jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { username, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            username,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;



        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ id: user._id });

        console.log(' {token:token}', { token: token });
        return { token: token };
    }



}
