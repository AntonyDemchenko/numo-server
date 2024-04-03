import { UserService } from './../user/user.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import {
  DeleteUserDto,
  GenerateTokens,
  GoogleLogInDto,
  LogInDto
} from './dto/auth.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Post('signin')
  async signIn(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async logIn(@Body() dto: LogInDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @Delete('delete')
  async delete(@Body() dto: DeleteUserDto) {
    return await this.userService.deleteUser(dto);
  }

  @Post('googleLogIn')
  async googleLogIn(@Body() dto: GoogleLogInDto) {
    return await this.authService.googleLogIn(dto);
  }

  @Post('tokens')
  async getToken(@Body() dto: GenerateTokens) {
    return await this.authService.generateTokens(dto);
  }
}
