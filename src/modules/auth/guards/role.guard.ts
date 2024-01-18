import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../auth.service';

export interface requestWithGuard extends Request{
    user: UserPayload
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ){}

    async canActivate(
        contexto: ExecutionContext,
    ): Promise<boolean>{
        const request = contexto.switchToHttp().getRequest<requestWithGuard>();
        const token = this.extrairTokenDoCabecalho(request);

        if(!token)
            throw new UnauthorizedException('Autentication Error');
        
        try{
            const payload: UserPayload = this.jwtService.decode(token) as UserPayload;

            if(payload.role !== 'administrador')
                throw new UnauthorizedException('Without permission');
        }catch(error){
            throw new UnauthorizedException('Without permission');
        }
        return true;
    }

    private extrairTokenDoCabecalho(request: Request): string | undefined {
        const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
  
}
