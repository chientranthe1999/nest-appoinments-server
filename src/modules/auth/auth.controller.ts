import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: any) {
    const token = await this.service.login(user.phone, user.password);
    return {
      token,
    };
  }
}
