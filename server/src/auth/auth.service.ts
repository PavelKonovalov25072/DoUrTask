import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async login(email: string, password: string){
        const user = await this.validateUser(email, password);
        const token = await this.generateToken(user);
        return {
            access_token: token,
            expires_in: (await this.jwtService.verifyAsync(token, {secret: process.env.JWT_KEY}))['exp'],
        };
    }

    async registration(email: string, password: string){
        const regUser = await this.userService.getUserByEmail(email);
        if (regUser){
            throw new HttpException('Пользователь с таким email уже существует!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await this.userService.createUser(email, hashPassword);
        return {
            access_token: await this.generateToken(newUser)
        };
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id};
        return this.jwtService.sign(payload)
    }

    private async validateUser(email: string, password: string){
        const user = await this.userService.getUserByEmail(email);
        if(user == undefined) throw new UnauthorizedException({message: "Неправильный email или пароль!"});
        const passwordEquals = await bcrypt.compare(password, user.password);
        if (user && passwordEquals){
            return user;        
        }
        throw new UnauthorizedException({message: "Неправильный email или пароль!"});
    }
}
