import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GenerateTokens, GoogleLogInDto, LogInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

const EXPIN = '15m';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(dto: LogInDto) {
    const user = await this.validateUser(dto);

    const payload = {
      email: user.email,
      sub: { name: user.name }
    };

    return {
      user: user,
      backendTokens: await this.accessToken(payload)
    };
  }

  async validateUser(dto: LogInDto) {
    const user = await this.userService.findByEmail(dto.username);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid name or password');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: EXPIN,
        secret: process.env.jwtSecretKey
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey
      })
    };
  }

  async accessToken(payload: { email: string; sub: { name: string } }) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: EXPIN,
        secret: process.env.jwtSecretKey
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
    };
  }

  async googleLogIn(dto: GoogleLogInDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && user.providerAccountId === dto.providerAccountId) {
      return { message: 'Login successful' };
    }

    const newUser = await this.userService.createGoogleUser(dto);
    if (newUser.id) {
      return { message: 'User saved successfully' };
    }
    return { message: 'Login failed' };
  }

  async generateTokens(dto: GenerateTokens) {
    const user = await this.userService.findByEmail(dto.email);
    if (user && user.providerAccountId === dto.providerAccountId) {
      const payload = {
        email: dto.email,
        sub: { name: dto.name }
      };
      return {
        user: user,
        backendTokens: await this.accessToken(payload)
      };
    }
  }
}
