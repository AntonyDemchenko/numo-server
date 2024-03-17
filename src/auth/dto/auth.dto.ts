import { IsEmail, IsString } from 'class-validator';

export class LogInDto {
  @IsEmail()
  @IsString()
  username: string;

  @IsString()
  password: string;
}
