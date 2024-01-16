import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {
    constructor(private userService: UserService) {}

    async validate(value: any): Promise<boolean> {
        //O tipo precisa ser verificado pois passam por todos os validadores e isso pode gerar um erro 500 por inconsistência de dados
        if(typeof value === 'string'){
            const usuarioComEmailExiste = await this.userService.findByEmail(
                value,
            );
            return !usuarioComEmailExiste;
        }else{
            return true;
        }
    }
}

export const EmailUnique = (opcoesValidacao: ValidationOptions) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: EmailUniqueValidator,
        });
    };
};
