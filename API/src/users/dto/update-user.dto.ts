import { IsString, IsEnum } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    username?: string;
  
    @IsString()
    password?: string;
  
    @IsEnum(['Admin', 'User'], { message: 'A função deve ser um dos seguintes valores: Admin, User' })
    role?: string;
}
