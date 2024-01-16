import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserRoleEnum } from '../enum/userRole.enum';

@Injectable()
@ValidatorConstraint({ async: true })
export class userRoleValidator implements ValidatorConstraintInterface {
    constructor(private userService: UserService) {}

    validate(value: any): boolean {
        return Object.values(UserRoleEnum).includes(value);
    }
}

export const UserRoleValidator = (opcoesValidacao: ValidationOptions) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: userRoleValidator,
        });
    };
};
