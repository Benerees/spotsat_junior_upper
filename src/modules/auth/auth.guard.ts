import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './auth.service';

export interface requisicaoComUser extends Request{
    user: UserPayload
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ){}

    async canActivate(
        contexto: ExecutionContext,
    ): Promise<boolean>{
        const request = contexto.switchToHttp().getRequest<requisicaoComUser>();
        const token = this.extrairTokenDoCabecalho(request);

        if(!token)
            throw new UnauthorizedException('Autentication Error');
        
        try{
            const payload: UserPayload = await this.jwtService.verifyAsync(token);

            request.user = payload;
        }catch(error){
            console.log(error);
            throw new UnauthorizedException('Invalid JWT');
        }
        return true;
    }

    private extrairTokenDoCabecalho(request: Request): string | undefined {
        const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
  
}
