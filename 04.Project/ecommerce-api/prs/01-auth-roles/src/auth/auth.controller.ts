
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt.guard';
import { GetUser } from '../common/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const u = await this.users.create(dto);
    return this.auth.tokenFor(u);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const u = await this.auth.validate(dto.email, dto.password);
    return this.auth.tokenFor(u);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@GetUser() user: any) {
    return user;
  }
}
