import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { FiltersDto } from './dto/filters.dto';
import { WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
    ){}

    async create(createUserDto: CreateUserDto) {
        const userEntity = new UserEntity({
            ...createUserDto,
            id: uuid(),
        });
        
        const userCreated =  await this.userRepository.create(userEntity.dataValues);

        return userCreated.dataValues;
    }

    async findAll(filter: FiltersDto) {
        const offset = (filter.page - 1) * 5;

        const whereCondition: WhereOptions = {};
        
        if (filter.role) {
            whereCondition.role = filter.role;
        }
          
        const userSaves = await this.userRepository.findAll({
            attributes:{
                exclude: ['password']
            },
            offset,
            limit: 5,
            where: whereCondition
        });

        const userList = userSaves.map((usuarios) => usuarios.dataValues);

        return userList;
    }

    async findOne(id: string){
        const userSave = await this.findById(id);
        
        const { password, ...userWithoutPassword } = userSave;
        
        return userWithoutPassword;
    }
    
    async findById(id: string) {
        const userSave = await this.userRepository.findOne({
            where: { id }
        });
        
        if(userSave === null)
            throw new NotFoundException('User not found');

        return userSave.dataValues;
    }

    async findByEmail(email: string) {
        const userSave = await this.userRepository.findOne({
            where: { email }
        });

        return userSave;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const userSaves = await this.findById(id);

        Object.assign(userSaves, updateUserDto as UserEntity);

        return await this.userRepository.update(userSaves, {
            where: { id },
        });
    }

    async remove(id: string) {
        const user = await this.findById(id);

        return await this.userRepository.destroy({
            where: { id },
        });
    }
}
