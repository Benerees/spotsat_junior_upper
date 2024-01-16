import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '5h' },
            }),
            global: true,
        })
        
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
