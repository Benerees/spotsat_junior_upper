import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
    ){}

    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.create(createUserDto);
    }

    async findAll() {
        const usuarioSalvos = await this.userRepository.findAll({
            attributes:{
                exclude: ['password']
            }
        });
        const usuarioLista = usuarioSalvos.map((usuarios) => usuarios.dataValues);

        return usuarioLista;
    }

    async findOne(id: string) {
        if(id){
            return await this.userRepository.findOne({
                where: { id },
            });
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(updateUserDto, {
            where: { id },
        });
    }

    async remove(id: string) {
        return await this.userRepository.destroy({
            where: { id },
        });
    }
}
