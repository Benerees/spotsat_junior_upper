import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { EmailUniqueValidator } from './validator/emailUnique.validator';

@Module({
    imports: [SequelizeModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, EmailUniqueValidator],
    exports: [UserService]
})
export class UserModule {}
