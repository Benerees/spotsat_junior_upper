import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SequelizeConfigModule } from './common/sequelize/sequelize.module';

@Module({
    imports: [
        UserModule,
        SequelizeConfigModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
