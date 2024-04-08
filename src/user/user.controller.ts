import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserService')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
