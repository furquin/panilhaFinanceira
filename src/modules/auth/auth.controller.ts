import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginPresenter } from './presenter/login.presenter';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService //
  ) {}

  @HttpCode(200)
  @Post('auth/sign-in')
  async signIn(@Body() data: LoginDto): Promise<LoginPresenter> {
    const { email, password } = data;
    return this.authService.signIn(email, password);
  }
}
