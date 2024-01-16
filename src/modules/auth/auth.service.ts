import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface UserPayload{
    sub: string,
    name: string,
    role: string
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    
    async login(email: string, password: string){
        const user = await this.userService.findByEmail(email);

        if(user === null)
            throw new UnauthorizedException('Email or Password incorrect');

        const userAuth = await bcrypt.compare(password, user.password);

        if(!userAuth)
            throw new UnauthorizedException('Email or Password incorrect');

        const payload: UserPayload = {
            sub: user.id,
            name: user.name,
            role: user.role
        };

        return {
            token: await this.jwtService.signAsync(payload)
        };
    }
}
