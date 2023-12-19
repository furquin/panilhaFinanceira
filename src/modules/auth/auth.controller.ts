import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(
    private readonly authService: AuthService,//
    ) {}
   
    @HttpCode(200)
    @Post('auth/sign-in')
    async signIn(@Body() data: { email: string; password: string }) {
        const { email, password } = data;
        return this.authService.signIn(email, password);
    }
}