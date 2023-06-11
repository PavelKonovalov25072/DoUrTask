import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body('email') email: string, @Body('password') password: string){
        return this.authService.login(email, password);
    }

    @Post('/signup')
    registration(@Body('email') email: string, @Body('password') password: string){
        return this.authService.registration(email, password);
    }
}
