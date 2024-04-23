import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { getModelToken } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UserRoleEnum } from './enum/userRole.enum';
import { FiltersDto } from './dto/filters.dto';
import { SequelizeConfigModule } from '../../common/sequelize/sequelize.module';

const mockUserRepository = {
    destroy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
};
describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SequelizeConfigModule],
            providers: [
                UserService,
                {
                    provide: getModelToken(UserEntity),
                    useValue: mockUserRepository,
                },
            ]
        }).compile();
    
        userService = module.get<UserService>(UserService);
    });


    it('Deve retornar um usuário pelo Id', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce({
            dataValues: { 
                id: '1',
                name: 'Benjamim Rees',
                email: 'benjamimrees@gmail.com',
                role: 'comum'
            }
        });
        const result = await userService.findById('1');

        expect(result);
    });

    it('Deve retornar um erro de usuário não encontrado', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(null);

        await expect(userService.findById('1')).rejects.toThrowError(NotFoundException);
    });

    it('Deve retornar um usuário pelo Id', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce({
            dataValues: { 
                id: '1',
                name: 'Benjamim Rees',
                email: 'benjamimrees@gmail.com',
                role: 'comum'
            }
        });
        const result = await userService.findOne('1');

        expect(result);
    });

    it('Deve retornar um usuário pelo email', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce({
            dataValues: { 
                id: '1',
                name: 'Benjamim Rees',
                email: 'benjamimrees@gmail.com',
                role: 'comum'
            }
        });
        const result = await userService.findByEmail('benjamimrees@gmail.com');

        expect(result);
    });

    it('Deve retornar 1 se o usuario tiver sido deletado', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce({
            dataValues: { 
                id: '1',
                name: 'Benjamim Rees',
                email: 'benjamimrees@gmail.com',
                role: 'comum'
            }
        });
        mockUserRepository.destroy.mockResolvedValueOnce(1);
        const result = await userService.remove('1');

        expect(result == 1);
    });

    it('Deve criar um usuário', async () => {
        mockUserRepository.create.mockResolvedValueOnce({
            dataValues: { 
                id: '1',
                name: 'Benjamim Rees',
                email: 'benjamimrees@gmail.com',
                role: 'comum',
                password: '123456',
                createdAt: '2024-01-22T14:56:56.406Z',
                updatedAt: '2024-01-22T14:56:56.406Z',
            }
        });

        const result = await userService.create({
            name: 'Benjamim Rees',
            email: 'benjamimrees@gmail.com',
            role: UserRoleEnum.COMUM,
            password: '123456',
        });

        expect(result);
    });

    it('Deve retornar todos os usuários', async () => {
        mockUserRepository.findAll.mockResolvedValueOnce([   
            {
                dataValues: {
                    'id': '24702c0f-4977-4527-8972-abf5eaa9a168',
                    'name': 'Luca',
                    'email': 'luca@gmail.com',
                    'role': 'administrador',
                    'createdAt': '2024-01-18T17:45:04.281Z',
                    'updatedAt': '2024-01-18T17:45:04.281Z'
                }
            },
            {
                dataValues: {
                    'id': 'cf879e64-c9e2-41e2-9cf4-62bdbeae2a24',
                    'name': 'Guilherme',
                    'email': 'guilherme@gmail.br',
                    'role': 'comum',
                    'createdAt': '2024-01-22T14:56:56.406Z',
                    'updatedAt': '2024-01-22T15:02:32.652Z'
                }
            }
        ]);

        const result = await userService.findAll({
            page: 1,
        });

        expect(result);
    });

    it('Deve retornar todos os usuários com uma role específica', async () => {
        mockUserRepository.findAll.mockResolvedValueOnce([   
            {
                dataValues: {
                    'id': '24702c0f-4977-4527-8972-abf5eaa9a168',
                    'name': 'Luca',
                    'email': 'luca@gmail.com',
                    'role': 'administrador',
                    'createdAt': '2024-01-18T17:45:04.281Z',
                    'updatedAt': '2024-01-18T17:45:04.281Z'
                }
            }
        ]);

        const result = await userService.findAll({
            page: 1,
            role: UserRoleEnum.ADMINISTRADOR
        });

        expect(result);
    });

    it('Deve fazer um update no usuário especificado', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(
            {
                dataValues: {
                    'id': '24702c0f-4977-4527-8972-abf5eaa9a168',
                    'name': 'Luca',
                    'email': 'luca@gmail.com',
                    'role': 'administrador',
                    'createdAt': '2024-01-18T17:45:04.281Z',
                    'updatedAt': '2024-01-18T17:45:04.281Z'
                }
            }
        );
        mockUserRepository.update.mockResolvedValueOnce([   
            {
                dataValues: {
                    'id': '24702c0f-4977-4527-8972-abf5eaa9a168',
                    'name': 'Bene',
                    'email': 'luca@gmail.com',
                    'role': 'administrador',
                    'createdAt': '2024-01-18T17:45:04.281Z',
                    'updatedAt': '2024-01-18T17:45:04.281Z'
                }
            }
        ]);

        const result = await userService.update(
            '24702c0f-4977-4527-8972-abf5eaa9a168',
            {name: 'Bene'}
        );

        expect(result);
    });
});
