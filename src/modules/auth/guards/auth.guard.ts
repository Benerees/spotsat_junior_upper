import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../auth.service';
import { UserService } from './../../../modules/user/user.service';

export interface requestWithGuard extends Request{
    user: UserPayload
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ){}

    async canActivate(
        contexto: ExecutionContext,
    ): Promise<boolean>{
        const request = contexto.switchToHttp().getRequest<requestWithGuard>();
        const token = this.extrairTokenDoCabecalho(request);

        if(!token)
            throw new UnauthorizedException('Autentication Error');
        
        try{
            const payload: UserPayload = await this.jwtService.verifyAsync(token);

            const user = this.userService.findById(payload.sub);

            if(!user)
                throw new UnauthorizedException('Invalid JWT');
            
            request.user = payload;
        }catch(error){
            throw new UnauthorizedException('Invalid JWT');
        }
        return true;
    }

    private extrairTokenDoCabecalho(request: Request): string | undefined {
        const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
  
}
