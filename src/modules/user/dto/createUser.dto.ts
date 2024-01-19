import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRoleEnum } from '../enum/userRole.enum';
import { EmailUnique } from '../validator/emailUnique.validator';
import { UserRoleValidator } from '../validator/userRole.validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
        name: string;

    @EmailUnique({ message: 'This email is already in use'})
    @IsEmail()
    @IsString()
    @IsNotEmpty()
        email: string;

    @MinLength(6)
    @IsString()
    @IsNotEmpty()
        password: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
        role: UserRoleEnum;
}
