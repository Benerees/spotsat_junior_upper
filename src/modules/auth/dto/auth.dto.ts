import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
    @IsEmail()
        email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
        password: string;
}
