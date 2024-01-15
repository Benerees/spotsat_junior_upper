import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SequelizeConfigModule } from './common/sequelize/sequelize.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        UserModule,
        SequelizeConfigModule
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
