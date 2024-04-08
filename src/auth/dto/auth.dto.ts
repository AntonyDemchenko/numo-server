import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class LogInDto {
  @IsEmail()
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class User {
  @IsString()
  id: string;

  provider: any;

  @IsString()
  providerId: string;

  @IsString()
  username: string;

  @IsString()
  name?: string;

  orders?: any[];

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsString()
  providerAccountId;
}

export class DeleteUserDto {
  @IsString()
  id: string;
}

export class GoogleLogInDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsString()
  providerAccountId: string;
}

export class GenerateTokens {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  providerAccountId: string;
}

export class ResetTokenDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  emailVerificationToken: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  emailVerificationToken: string;
}
