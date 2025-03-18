import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(['Admin', 'User'], { message: 'A função deve ser um dos seguintes valores: Admin, User' })
  role: 'Admin' | 'User';
}