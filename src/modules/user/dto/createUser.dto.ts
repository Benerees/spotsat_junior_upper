import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRoleEnum } from '../enum/userRole.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
        name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
        email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
        password: string;
    
    @IsNotEmpty()
    @IsString()
        role: UserRoleEnum;
}
