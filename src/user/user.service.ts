import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';

import { hash } from 'bcrypt';
import { DeleteUserDto, GoogleLogInDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });
  }

  async create(dto: CreateUserDto) {
    const user = await this.findByEmail(dto.email);

    if (user) throw new ConflictException('email duplicated');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10)
      }
    });

    const { password, ...result } = newUser;
    return result;
  }

  async createGoogleUser(dto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: null
      }
    });

    const { password, ...result } = newUser;
    return result;
  }

  async deleteUser(dto: DeleteUserDto) {
    const user = await this.findById(dto.id);
    if (user) {
      await this.prisma.user.delete({ where: { id: user.id } });
    }
  }
}
