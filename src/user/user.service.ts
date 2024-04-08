import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';

import { hash } from 'bcrypt';
import {
  DeleteUserDto,
  ResetPasswordDto,
  ResetTokenDto
} from 'src/auth/dto/auth.dto';

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
    if (result.id) {
      return { statusCode: 200 };
    }
    throw new ConflictException('saving user failed');
  }

  async resetToken(dto: ResetTokenDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          email: dto.email
        },
        data: {
          emailVerificationToken: dto.emailVerificationToken
        }
      });

      if (updatedUser.id) {
        return { statusCode: 200 };
      }
      throw new ConflictException('saving user failed');
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while resetting token.'
      );
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    try {
      const user = await this.findByEmail(dto.email);

      if (user.emailVerificationToken === dto.emailVerificationToken) {
        const updatedUser = await this.prisma.user.update({
          where: {
            email: dto.email
          },
          data: {
            password: dto.password
          }
        });

        if (updatedUser.id) {
          return {
            statusCode: 200,
            message: 'User reset password successful.'
          };
        }
      }
      throw new ConflictException('validating user failed');
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during user verification.'
      );
    }
  }

  async verifyUser(dto: ResetTokenDto) {
    try {
      const user = await this.findByEmail(dto.email);

      if (user.emailVerificationToken === dto.emailVerificationToken) {
        const updatedUser = await this.prisma.user.update({
          where: {
            email: dto.email
          },
          data: {
            emailVerified: true
          }
        });

        if (updatedUser.id) {
          return { statusCode: 200, message: 'User verification successful.' };
        }
      }
      throw new ConflictException('validating user failed');
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred during user verification.'
      );
    }
  }

  async createGoogleUser(dto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        emailVerified: true,
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
