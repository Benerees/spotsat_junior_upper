// sequelize.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './sequelize.config';
import { UserEntity } from '../../modules/user/entities/user.entity';

@Module({
    imports: [SequelizeModule.forRoot(sequelizeConfig), SequelizeModule.forFeature([UserEntity])],
    exports: [SequelizeModule],
})
export class SequelizeConfigModule {}
