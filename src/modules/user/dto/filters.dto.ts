import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../enum/userRole.enum';


export class FiltersDto {
    @IsNumberString()
    @IsOptional()
        page?: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    @IsOptional()
        role?: UserRoleEnum;
}
