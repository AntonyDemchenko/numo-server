import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  // @IsStrongPassword()
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  providerAccountId?: string;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @IsOptional()
  @IsString()
  emailVerificationToken?: string;
}

export class CreatGoogleUserDto {}
