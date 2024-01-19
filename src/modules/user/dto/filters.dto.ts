import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../enum/userRole.enum';


export class FiltersDto {
    @IsOptional()
    @IsNumberString()
        page: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
        role: UserRoleEnum;
}
