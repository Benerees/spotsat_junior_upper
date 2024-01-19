import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SequelizeConfigModule } from './common/sequelize/sequelize.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerGlobalInterceptor } from './common/interceptors/logger-global.interceptor';
import { ExceptionGlobalFilter } from './common/filtros/exception-global-filter';

@Module({
    imports: [
        UserModule,
        SequelizeConfigModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionGlobalFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerGlobalInterceptor
        },
        ConsoleLogger
    ],
})
export class AppModule {}
