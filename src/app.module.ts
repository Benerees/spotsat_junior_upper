import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SequelizeConfigModule } from './common/sequelize/sequelize.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        UserModule,
        SequelizeConfigModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        }
    ],
})
export class AppModule {}
