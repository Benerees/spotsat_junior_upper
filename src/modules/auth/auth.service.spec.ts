import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as SequelizeMock  from 'sequelize-mock';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'sequelize-typescript';
import { AuthModule } from './auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

const mockUserRepository = {
    destroy: jest.fn(),
};
describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule, AuthModule, SequelizeModule.forFeature([UserEntity])],
        }).compile();
    
        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        // userRepository = module.get<Repository<UserEntity>>('USER_REPOSITORY');
    });

    afterAll(() => {
        jest.unmock('sequelize');
    });

    it('Espera uma autenticacao valida', async () => {
        const result = authService.login('benjamimrees@gmail.com', '123456');

        expect(result);
    });
});
