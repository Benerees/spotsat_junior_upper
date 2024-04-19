import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../../../modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './../../../modules/auth/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigModule } from './../../../common/sequelize/sequelize.module';
import { AuthModule } from '../auth.module';
import { UserService } from './../../../modules/user/user.service';

describe('Auth Service', () => {
  let service: AuthService;
  let userService: UserService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        SequelizeConfigModule
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should return true to instance of service', async() => {
    expect(service).toBeDefined()
  });

  it('Should return a throw error when user not exists', async () => {
    const mockResult: any = jest.spyOn(userService, 'findByEmail',).mockResolvedValue(null)

    const retorno = await service.login('testeUNitario@gmail.com','123456')

    expect(retorno).rejects.toThrow('UnauthorizedException: Email or Password incorrect')
    console.log(retorno)
  })

});
